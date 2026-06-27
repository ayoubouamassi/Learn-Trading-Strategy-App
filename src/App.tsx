/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { BookOpen, BarChart3, Landmark, Award, HelpCircle, ChevronDown, CheckCircle, Flame, ShieldAlert, AlertTriangle, User as UserIcon } from "lucide-react";
import { scenarios } from "./data/scenarios";
import { Scenario, Position, Trade, AccountStats } from "./types";
import TradingChart from "./components/TradingChart";
import SimulatorControls from "./components/SimulatorControls";
import AccountStatus from "./components/AccountStatus";
import Academy from "./components/Academy";
import { getLocalizedLessons } from "./data/localizedLessons";
import { getLocalizedScenario } from "./data/scenarioTranslations";
import { LanguageCode, languages, translations } from "./data/translations";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, saveUserData, loadUserData } from "./lib/firebase";
import AuthModal from "./components/AuthModal";
import { authTranslations } from "./data/authTranslations";

export default function App() {
  const [currentTab, setCurrentTab] = useState<"simulator" | "academy">("simulator");
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");
  const t = translations[currentLanguage];

  // Scenario and Simulation States
  const [activeScenario, setActiveScenario] = useState<Scenario>(scenarios[0]);
  const localizedActiveScenario = getLocalizedScenario(activeScenario, currentLanguage);
  const localizedScenarios = scenarios.map((sc) => getLocalizedScenario(sc, currentLanguage));
  const [visibleCount, setVisibleCount] = useState<number>(35); // Start with 35 candles visible
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1000); // 1000ms delay per candle
  const [scenarioDropdownOpen, setScenarioDropdownOpen] = useState<boolean>(false);

  // Position and Portfolio States
  const [activePosition, setActivePosition] = useState<Position | null>(null);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [balance, setBalance] = useState<number>(scenarios[0].initialBalance);

  // Educational Progress States
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [systemAlert, setSystemAlert] = useState<{ type: "success" | "warning" | "error"; text: string } | null>(null);
  
  // Account / Cloud Auth States
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Chart Indicators State
  const [indicatorToggles, setIndicatorToggles] = useState({
    sma20: true,
    sma50: false,
    ema20: false,
    rsi: true,
    macd: false,
  });

  // Load saved lesson progress from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("trading_academy_lessons");
      if (saved) {
        setCompletedLessons(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load completed lessons from storage", e);
    }
  }, []);

  // Sync / Listen to Auth Changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const cloudData = await loadUserData(user.uid);
          if (cloudData && cloudData.completedLessons) {
            setCompletedLessons((prevLocal) => {
              const merged = Array.from(new Set([...prevLocal, ...cloudData.completedLessons]));
              localStorage.setItem("trading_academy_lessons", JSON.stringify(merged));
              saveUserData(user.uid, {
                completedLessons: merged,
                email: user.email || "guest@anonymous.com"
              });
              return merged;
            });
            const authT = authTranslations[currentLanguage] || authTranslations.en;
            triggerAlert("success", authT.progressSynced);
          } else {
            // First time login, push existing local progress to cloud
            const saved = localStorage.getItem("trading_academy_lessons");
            const localLessons = saved ? JSON.parse(saved) : [];
            await saveUserData(user.uid, {
              completedLessons: localLessons,
              email: user.email || "guest@anonymous.com"
            });
          }
        } catch (err) {
          console.error("Error synchronizing cloud data on auth:", err);
        }
      }
    });
    return () => unsubscribe();
  }, [currentLanguage]);

  const handleCompleteLesson = async (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      const next = [...completedLessons, lessonId];
      setCompletedLessons(next);
      localStorage.setItem("trading_academy_lessons", JSON.stringify(next));
      
      if (currentUser) {
        try {
          await saveUserData(currentUser.uid, {
            completedLessons: next,
            email: currentUser.email || "guest@anonymous.com"
          });
        } catch (e) {
          console.error("Failed to save completed lesson to Firestore:", e);
        }
      }
      
      triggerAlert("success", `🎉 ${t.lessonCompletedAlert || "Lesson completed!"}`);
    }
  };

  // Helper to trigger system alerts / notifications
  const triggerAlert = (type: "success" | "warning" | "error", text: string) => {
    setSystemAlert({ type, text });
    setTimeout(() => {
      setSystemAlert(null);
    }, 4500);
  };

  // Switch scenarios, resetting portfolio
  const handleSelectScenario = (scenario: Scenario) => {
    setActiveScenario(scenario);
    setVisibleCount(35);
    setIsPlaying(false);
    setActivePosition(null);
    setTrades([]);
    setBalance(scenario.initialBalance);
    setScenarioDropdownOpen(false);
    triggerAlert("success", `Loaded Challenge: ${scenario.name}`);
  };

  const handleResetScenario = () => {
    setVisibleCount(35);
    setIsPlaying(false);
    setActivePosition(null);
    setTrades([]);
    setBalance(activeScenario.initialBalance);
    triggerAlert("warning", t.resetWarning);
  };

  const currentCandle = activeScenario.data[visibleCount - 1] || activeScenario.data[0];

  // Playback Loop
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        const next = prev + 1;
        if (next > activeScenario.data.length) {
          setIsPlaying(false);
          triggerAlert("success", `🏁 ${t.simulationComplete}`);
          return prev;
        }

        // Bracket Orders Checking: Check if the new candle triggered active SL or TP
        const newCandle = activeScenario.data[next - 1];
        if (activePosition && newCandle) {
          const { direction, stopLoss, takeProfit, size, entryPrice } = activePosition;

          let exitPrice: number | null = null;
          let reason: "STOP_LOSS" | "TAKE_PROFIT" | null = null;

          if (direction === "LONG") {
            // Check Stop Loss
            if (stopLoss !== undefined && newCandle.low <= stopLoss) {
              exitPrice = stopLoss;
              reason = "STOP_LOSS";
            }
            // Check Take Profit
            else if (takeProfit !== undefined && newCandle.high >= takeProfit) {
              exitPrice = takeProfit;
              reason = "TAKE_PROFIT";
            }
          } else {
            // SHORT position
            // Check Stop Loss
            if (stopLoss !== undefined && newCandle.high >= stopLoss) {
              exitPrice = stopLoss;
              reason = "STOP_LOSS";
            }
            // Check Take Profit
            else if (takeProfit !== undefined && newCandle.low <= takeProfit) {
              exitPrice = takeProfit;
              reason = "TAKE_PROFIT";
            }
          }

          if (exitPrice !== null && reason !== null) {
            const pnl = direction === "LONG"
              ? (exitPrice - entryPrice) * size
              : (entryPrice - exitPrice) * size;

            const finalizedTrade: Trade = {
              id: Math.random().toString(36).substring(2, 9),
              direction,
              entryIndex: activePosition.entryIndex,
              entryPrice,
              entryTime: activePosition.entryTime,
              exitIndex: next - 1,
              exitPrice,
              exitTime: newCandle.time,
              size,
              realizedPnL: pnl,
              exitReason: reason,
            };

            setTrades((prevTrades) => [...prevTrades, finalizedTrade]);
            setBalance((prevBal) => prevBal + pnl);
            setActivePosition(null);

            if (reason === "STOP_LOSS") {
              triggerAlert("error", `🔴 ${t.stopLossHit} -$${Math.abs(pnl).toFixed(2)}`);
            } else {
              triggerAlert("success", `🟢 ${t.takeProfitHit} +$${pnl.toFixed(2)}`);
            }
          }
        }

        return next;
      });
    }, playbackSpeed);

    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, activePosition, activeScenario, t]);

  // Trade Actions
  const handleBuyLong = (size: number, sl?: number, tp?: number) => {
    if (activePosition) {
      triggerAlert("error", t.alreadyOpen);
      return;
    }
    const entryPrice = currentCandle.close;
    const positionValue = size * entryPrice;

    if (positionValue > balance * 3) {
      triggerAlert("error", t.insufficientFunds);
      return;
    }

    const pos: Position = {
      direction: "LONG",
      entryPrice,
      size,
      entryIndex: visibleCount - 1,
      entryTime: currentCandle.time,
      stopLoss: sl,
      takeProfit: tp,
    };
    setActivePosition(pos);
    triggerAlert("success", `${t.executedLong} @ $${entryPrice.toFixed(2)} (${size} ${t.units})`);
  };

  const handleSellShort = (size: number, sl?: number, tp?: number) => {
    if (activePosition) {
      triggerAlert("error", t.alreadyOpen);
      return;
    }
    const entryPrice = currentCandle.close;
    const positionValue = size * entryPrice;

    if (positionValue > balance * 3) {
      triggerAlert("error", t.insufficientFunds);
      return;
    }

    const pos: Position = {
      direction: "SHORT",
      entryPrice,
      size,
      entryIndex: visibleCount - 1,
      entryTime: currentCandle.time,
      stopLoss: sl,
      takeProfit: tp,
    };
    setActivePosition(pos);
    triggerAlert("success", `${t.executedShort} @ $${entryPrice.toFixed(2)} (${size} ${t.units})`);
  };

  const handleClosePosition = () => {
    if (!activePosition) return;
    const exitPrice = currentCandle.close;
    const { direction, entryPrice, size, entryIndex, entryTime, stopLoss, takeProfit } = activePosition;

    const pnl = direction === "LONG"
      ? (exitPrice - entryPrice) * size
      : (entryPrice - exitPrice) * size;

    const completedTrade: Trade = {
      id: Math.random().toString(36).substring(2, 9),
      direction,
      entryIndex,
      entryPrice,
      entryTime,
      exitIndex: visibleCount - 1,
      exitPrice,
      exitTime: currentCandle.time,
      size,
      realizedPnL: pnl,
      exitReason: "MANUAL",
      stopLoss,
      takeProfit,
    };

    setTrades((prev) => [...prev, completedTrade]);
    setBalance((prev) => prev + pnl);
    setActivePosition(null);
    triggerAlert(pnl >= 0 ? "success" : "warning", `${t.manualClose} P&L: ${pnl >= 0 ? "+" : ""}$${pnl.toFixed(2)}`);
  };

  // Toggle indicators
  const handleToggleIndicator = (key: "sma20" | "sma50" | "ema20" | "rsi" | "macd") => {
    setIndicatorToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Dynamic portfolio performance calculator
  const calculateStats = (): AccountStats => {
    const winningTrades = trades.filter((t) => (t.realizedPnL || 0) > 0);
    const losingTrades = trades.filter((t) => (t.realizedPnL || 0) < 0);

    const grossProfit = winningTrades.reduce((acc, curr) => acc + (curr.realizedPnL || 0), 0);
    const grossLoss = Math.abs(losingTrades.reduce((acc, curr) => acc + (curr.realizedPnL || 0), 0));

    const totalTrades = trades.length;
    const winRate = totalTrades > 0 ? (winningTrades.length / totalTrades) * 100 : 0;
    const profitFactor = grossLoss > 0 ? grossProfit / grossLoss : (grossProfit > 0 ? Infinity : 1);

    const netPnL = balance - activeScenario.initialBalance;

    return {
      balance,
      initialBalance: activeScenario.initialBalance,
      equity: balance, // simplified
      winRate,
      profitFactor,
      totalTrades,
      winningTrades: winningTrades.length,
      losingTrades: losingTrades.length,
      maxDrawdown: 0,
      netPnL,
    };
  };

  const stats = calculateStats();

  const handleLaunchPracticeScenario = (scenarioId: string) => {
    const target = scenarios.find((s) => s.id === scenarioId);
    if (target) {
      handleSelectScenario(target);
      setCurrentTab("simulator");
    }
  };

  const isRtl = languages.find(l => l.code === currentLanguage)?.rtl || false;

  return (
    <div
      className="min-h-screen bg-[#070A13] text-gray-200 flex flex-col font-sans"
      id="application-root"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* 1. TOP NAVIGATION / SCENARIO BAR */}
      <header className="bg-[#0B0F19] border-b border-gray-900 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 z-50 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/10 text-white">
            <Landmark size={20} />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-wide uppercase">{t.title}</h1>
            <p className="text-[10px] text-gray-500 font-mono tracking-wider uppercase mt-0.5">{t.subtitle}</p>
          </div>
        </div>

        {/* Language dropdown and Scenario dropdown */}
        <div className="flex flex-wrap items-center gap-3" id="navigation-actions-wrapper">
          {/* Cloud Sync / Account Button */}
          <button
            onClick={() => setAuthModalOpen(true)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
              currentUser 
                ? "bg-emerald-500/5 hover:bg-emerald-500/10 border-emerald-500/25 hover:border-emerald-500/40 text-emerald-400"
                : "bg-blue-600/10 hover:bg-blue-600/20 border-blue-500/25 hover:border-blue-500/40 text-blue-400 shadow-sm shadow-blue-500/5"
            }`}
            id="btn-trigger-auth-modal"
          >
            <UserIcon size={14} className={currentUser ? "text-emerald-400" : "text-blue-400"} />
            <span>
              {currentUser 
                ? (currentUser.email ? currentUser.email.split("@")[0] : (authTranslations[currentLanguage] || authTranslations.en).account) 
                : (authTranslations[currentLanguage] || authTranslations.en).account}
            </span>
          </button>

          {/* Elegant Language Selector */}
          <div className="relative" id="language-picker-wrapper">
            <select
              value={currentLanguage}
              onChange={(e) => {
                const targetLang = e.target.value as LanguageCode;
                setCurrentLanguage(targetLang);
                const langName = languages.find((l) => l.code === targetLang)?.name || "";
                triggerAlert("success", `🌐 Switched language to ${langName}`);
              }}
              className="bg-gray-950 text-white border border-gray-800 rounded-xl px-3 py-2 text-xs font-semibold outline-none cursor-pointer hover:border-gray-700 transition"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Challenge selection dropdown */}
          <div className="relative" id="dropdown-scenarios-wrapper">
            <button
              onClick={() => setScenarioDropdownOpen(!scenarioDropdownOpen)}
              className="flex items-center gap-2 bg-gray-950 hover:bg-gray-900 px-4 py-2 rounded-xl text-xs font-semibold border border-gray-800 hover:border-gray-700 transition"
            >
              <span className="text-gray-500 font-normal">{t.activeScenario}</span>
              <span className="text-blue-400 font-mono font-bold">{localizedActiveScenario.name}</span>
              <ChevronDown size={14} className={`text-gray-500 transition-transform ${scenarioDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {scenarioDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-[#0F172A] border border-gray-800 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in-50 duration-200">
                <div className="p-3 bg-gray-950/80 border-b border-gray-900 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  {t.selectChallenge}
                </div>
                <div className="divide-y divide-gray-900 max-h-80 overflow-y-auto">
                  {localizedScenarios.map((sc) => (
                    <button
                      key={sc.id}
                      onClick={() => handleSelectScenario(sc)}
                      className="w-full text-left p-3 hover:bg-gray-900/60 transition flex flex-col gap-1 text-xs"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-200">{sc.name}</span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono uppercase ${
                          sc.difficulty === "Beginner"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : sc.difficulty === "Intermediate"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                        }`}>
                          {sc.difficulty === "Beginner"
                            ? t.beginner
                            : sc.difficulty === "Intermediate"
                            ? t.intermediate
                            : t.advanced}
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-400 leading-normal">{sc.asset} • {sc.historicalPeriod}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      {/* 3. TABS SELECTOR / WORKSPACE HEADER */}
      <div className="bg-[#0B0F19]/40 border-b border-gray-900/60 px-6 py-2 flex items-center justify-between" id="tabs-navigation-header">
        <div className="flex gap-1.5" id="nav-tabs">
          <button
            onClick={() => setCurrentTab("simulator")}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wider transition ${
              currentTab === "simulator"
                ? "bg-blue-600/10 text-blue-400 border-b-2 border-blue-500 rounded-b-none"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <BarChart3 size={14} />
            <span>{t.tabSimulator}</span>
          </button>
          <button
            onClick={() => setCurrentTab("academy")}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wider transition relative ${
              currentTab === "academy"
                ? "bg-blue-600/10 text-blue-400 border-b-2 border-blue-500 rounded-b-none"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <BookOpen size={14} />
            <span>{t.tabAcademy}</span>
            {completedLessons.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold text-white shadow">
                {completedLessons.length}
              </span>
            )}
          </button>
        </div>

        {/* Scenario metadata readout */}
        <div className="hidden sm:flex items-center gap-4 text-xs font-mono" id="metadata-indicators">
          <span className="text-gray-500">{t.asset}: <strong className="text-gray-300">{activeScenario.asset}</strong></span>
          <span className="text-gray-500">{t.period}: <strong className="text-gray-300">{activeScenario.historicalPeriod}</strong></span>
          <span className="text-gray-500">{t.recommendedSystem}: <strong className="text-blue-400 font-semibold">{localizedActiveScenario.strategyName}</strong></span>
        </div>
      </div>

      {/* 4. MAIN WORKSPACE CONTENT */}
      <main className="flex-grow p-6 flex flex-col gap-6 overflow-x-hidden" id="workspace-main-content">
        {currentTab === "simulator" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="simulator-grid-layout">
            {/* Left Main column - Chart and Controls */}
            <div className="lg:col-span-8 flex flex-col gap-6" id="simulator-canvas-col">
              {/* Core interactive chart */}
              <TradingChart
                data={activeScenario.data}
                visibleCount={visibleCount}
                indicatorToggles={indicatorToggles}
                trades={trades}
                activePosition={activePosition}
              />

              {/* Simulation execution and controls panel */}
              <SimulatorControls
                currentPrice={currentCandle.close}
                accountBalance={balance}
                activePosition={activePosition}
                onBuyLong={handleBuyLong}
                onSellShort={handleSellShort}
                onClosePosition={handleClosePosition}
                isPlaying={isPlaying}
                onTogglePlay={() => setIsPlaying(!isPlaying)}
                onStepForward={() => setVisibleCount((prev) => Math.min(activeScenario.data.length, prev + 1))}
                playbackSpeed={playbackSpeed}
                onChangeSpeed={setPlaybackSpeed}
                indicatorToggles={indicatorToggles}
                onToggleIndicator={handleToggleIndicator}
                onResetScenario={handleResetScenario}
                t={t}
              />
            </div>

            {/* Right column - Account stats and active details */}
            <div className="lg:col-span-4 flex flex-col gap-6 font-sans" id="simulator-sidebar-col">
              {/* Sizing theory brief */}
              <div className="bg-gradient-to-r from-slate-900 to-[#0F172A] border border-gray-800 rounded-xl p-5 shadow flex flex-col gap-3" id="strategy-brief-panel">
                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                  <Flame size={12} /> {t.playbookBrief}
                </h3>
                <p className="text-xs text-gray-200 font-semibold leading-relaxed">
                  {localizedActiveScenario.strategyName}
                </p>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  {localizedActiveScenario.strategyDescription}
                </p>
                <div className="flex flex-col gap-1.5 bg-[#0B0F19]/50 border border-gray-900 p-3 rounded-lg" id="learn-objectives">
                  <span className="text-[10px] font-mono text-gray-500 font-bold uppercase tracking-wider">{t.objectives}:</span>
                  {localizedActiveScenario.learningObjectives.map((obj, i) => (
                    <div key={i} className="flex gap-1.5 items-start text-[10.5px] text-gray-400 leading-normal">
                      <span className="text-blue-500 font-bold">•</span>
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Account statistics ledger */}
              <AccountStatus
                stats={stats}
                activePosition={activePosition}
                currentPrice={currentCandle.close}
                trades={trades}
                t={t}
              />
            </div>
          </div>
        )}

        {currentTab === "academy" && (
          <Academy
            lessons={getLocalizedLessons(currentLanguage)}
            onSelectPracticeScenario={handleLaunchPracticeScenario}
            completedLessons={completedLessons}
            onCompleteLesson={handleCompleteLesson}
            t={t}
            currentLanguage={currentLanguage}
          />
        )}
      </main>

      {/* FOOTER SYSTEM GREETINGS AND COMPLIANCE */}
      <footer className="bg-[#0B0F19] border-t border-gray-900 py-4 px-6 text-center text-[10px] font-mono text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span>{t.footerRights}</span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span>{t.footerEngineActive}</span>
        </span>
      </footer>

      {/* Cloud Account Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        currentLanguage={currentLanguage}
        currentUser={currentUser}
        onSyncCompleted={(completed) => {
          setCompletedLessons(completed);
        }}
      />
    </div>
  );
}
