/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Play, Pause, SkipForward, TrendingUp, TrendingDown, Eye, RefreshCw, XCircle } from "lucide-react";
import { Candlestick, Position } from "../types";
import { TranslationSet } from "../data/translations";

interface SimulatorControlsProps {
  currentPrice: number;
  accountBalance: number;
  activePosition: Position | null;
  onBuyLong: (size: number, sl?: number, tp?: number) => void;
  onSellShort: (size: number, sl?: number, tp?: number) => void;
  onClosePosition: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onStepForward: () => void;
  playbackSpeed: number;
  onChangeSpeed: (speed: number) => void;
  indicatorToggles: {
    sma20: boolean;
    sma50: boolean;
    ema20: boolean;
    rsi: boolean;
    macd: boolean;
  };
  onToggleIndicator: (key: "sma20" | "sma50" | "ema20" | "rsi" | "macd") => void;
  onResetScenario: () => void;
  t: TranslationSet;
}

export default function SimulatorControls({
  currentPrice,
  accountBalance,
  activePosition,
  onBuyLong,
  onSellShort,
  onClosePosition,
  isPlaying,
  onTogglePlay,
  onStepForward,
  playbackSpeed,
  onChangeSpeed,
  indicatorToggles,
  onToggleIndicator,
  onResetScenario,
  t,
}: SimulatorControlsProps) {
  // Trade execution parameters
  const [size, setSize] = useState<number>(10);
  const [slPercent, setSlPercent] = useState<string>("");
  const [tpPercent, setTpPercent] = useState<string>("");

  // Auto position sizing calculator states
  const [riskPercent, setRiskPercent] = useState<number>(1);
  const [stopLossGap, setStopLossGap] = useState<number>(5);

  // Synchronize size if we change scenarios or price fluctuates heavily
  useEffect(() => {
    if (currentPrice > 0) {
      // Suggest a default trade size that consumes ~20% of account balance
      const suggestedSize = Math.max(1, Math.round((accountBalance * 0.2) / currentPrice));
      setSize(suggestedSize);
    }
  }, [currentPrice]);

  // Compute calculated risk parameters for display
  const slPrice = slPercent ? currentPrice * (1 - parseFloat(slPercent) / 100) : null;
  const tpPrice = tpPercent ? currentPrice * (1 + parseFloat(tpPercent) / 100) : null;

  const buySlPrice = slPercent ? currentPrice * (1 - parseFloat(slPercent) / 100) : undefined;
  const buyTpPrice = tpPercent ? currentPrice * (1 + parseFloat(tpPercent) / 100) : undefined;

  const shortSlPrice = slPercent ? currentPrice * (1 + parseFloat(slPercent) / 100) : undefined;
  const shortTpPrice = tpPercent ? currentPrice * (1 - parseFloat(tpPercent) / 100) : undefined;

  // Position Sizing calculator under Lesson 4
  const handleAutoCalcSize = () => {
    if (stopLossGap <= 0) return;
    const dollarRisk = accountBalance * (riskPercent / 100);
    const calculatedSize = dollarRisk / stopLossGap;
    setSize(Math.max(1, Math.round(calculatedSize * 100) / 100));
    // Set matching SL percent based on stopLossGap
    const gapPercent = (stopLossGap / currentPrice) * 100;
    setSlPercent(gapPercent.toFixed(1));
    if (!tpPercent) {
      setTpPercent((gapPercent * 2).toFixed(1)); // default 1:2 Risk to Reward!
    }
  };

  const calculatedDollarRisk = slPercent
    ? size * currentPrice * (parseFloat(slPercent) / 100)
    : 0;
  const calculatedRiskPct = (calculatedDollarRisk / accountBalance) * 100;

  return (
    <div className="w-full bg-[#0F172A] border border-gray-800 rounded-xl p-5 flex flex-col gap-5 shadow-lg" id="sim-controls-panel">
      {/* 1. SPEED & PLAYBACK CONTROLS */}
      <div className="flex flex-wrap items-center justify-between border-b border-gray-800 pb-4 gap-4" id="playback-controls-row">
        <div className="flex items-center gap-2">
          <button
            onClick={onTogglePlay}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium transition-all ${
              isPlaying
                ? "bg-amber-500 hover:bg-amber-600 text-[#0F172A]"
                : "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-900/30 shadow-lg"
            }`}
            id="btn-play-pause"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            {isPlaying ? t.pauseSimulation : t.startPlayback}
          </button>

          <button
            onClick={onStepForward}
            disabled={isPlaying}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 transition disabled:opacity-40 disabled:cursor-not-allowed"
            id="btn-step-forward"
            title="Advance 1 candle bar"
          >
            <SkipForward size={16} />
            <span>{t.stepBar}</span>
          </button>
        </div>

        {/* Speed multiplier selection */}
        <div className="flex items-center gap-1.5 bg-gray-900 px-2 py-1 rounded-lg border border-gray-800" id="speed-selectors">
          <span className="text-xs text-gray-500 font-mono pr-1.5">{t.speed}:</span>
          {([500, 1000, 2000] as const).map((speed) => {
            const multiplier = speed === 2000 ? "0.5x" : speed === 1000 ? "1x" : "2x";
            return (
              <button
                key={speed}
                onClick={() => onChangeSpeed(speed)}
                className={`text-[10px] px-2 py-1 font-mono rounded transition ${
                  playbackSpeed === speed
                    ? "bg-blue-500 text-white font-bold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {multiplier}
              </button>
            );
          })}
        </div>

        <button
          onClick={onResetScenario}
          className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 transition px-2.5 py-1.5 rounded-lg border border-rose-500/10 hover:border-rose-500/30"
          id="btn-reset-scenario"
        >
          <RefreshCw size={12} />
          <span>{t.resetChallenge}</span>
        </button>
      </div>

      {/* 2. CORE TRADING EXECUTION INTERFACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5" id="trading-desk-grid">
        {/* Placement input parameters */}
        <div className="lg:col-span-7 flex flex-col gap-4" id="placement-params-col">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
            <Eye size={12} className="text-blue-400" /> {t.bracketOrders}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" id="trade-input-fields">
            {/* Position Size Input */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-gray-400 font-medium">{t.sizingLabel} ({t.units})</label>
              <input
                type="number"
                min="0.01"
                step="any"
                value={size}
                onChange={(e) => setSize(Math.max(0.01, parseFloat(e.target.value) || 0))}
                className="bg-gray-900 border border-gray-800 focus:border-blue-500 text-white rounded-lg px-3 py-2 font-mono text-sm outline-none"
              />
              <span className="text-[10px] text-gray-500 font-mono mt-0.5">
                {t.units}: ${(size * currentPrice).toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </span>
            </div>

            {/* Stop Loss (SL) Percent Input */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-gray-400 font-medium">{t.stopLoss} (%)</label>
              <input
                type="number"
                min="0.1"
                max="50"
                step="0.1"
                placeholder={t.optional}
                value={slPercent}
                onChange={(e) => setSlPercent(e.target.value)}
                className="bg-gray-900 border border-gray-800 focus:border-blue-500 text-white rounded-lg px-3 py-2 font-mono text-sm outline-none"
              />
              <span className="text-[10px] text-gray-500 font-mono mt-0.5">
                {slPercent ? `SL: $${(currentPrice * (1 - parseFloat(slPercent) / 100)).toFixed(2)}` : "-"}
              </span>
            </div>

            {/* Take Profit (TP) Percent Input */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-gray-400 font-medium">{t.takeProfit} (%)</label>
              <input
                type="number"
                min="0.1"
                max="100"
                step="0.1"
                placeholder={t.optional}
                value={tpPercent}
                onChange={(e) => setTpPercent(e.target.value)}
                className="bg-gray-900 border border-gray-800 focus:border-blue-500 text-white rounded-lg px-3 py-2 font-mono text-sm outline-none"
              />
              <span className="text-[10px] text-gray-500 font-mono mt-0.5">
                {tpPercent ? `TP: $${(currentPrice * (1 + parseFloat(tpPercent) / 100)).toFixed(2)}` : "-"}
              </span>
            </div>
          </div>

          {/* Sizing Risk Indicator */}
          {slPercent && (
            <div className="bg-blue-500/5 border border-blue-500/10 rounded-lg p-3 text-xs" id="risk-warning-container">
              <div className="flex justify-between font-mono text-gray-300">
                <span>Risk:</span>
                <span className={`font-semibold ${calculatedRiskPct > 2 ? "text-amber-400 font-bold" : "text-emerald-400"}`}>
                  ${calculatedDollarRisk.toFixed(2)} ({calculatedRiskPct.toFixed(2)}%)
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Action Trade execution buttons */}
        <div className="lg:col-span-5 flex flex-col justify-center gap-3 bg-gray-900/40 p-4 border border-gray-800/60 rounded-xl" id="execution-panel-col">
          {activePosition ? (
            <div className="flex flex-col gap-2.5" id="open-position-action">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">{t.activePositionLive}:</span>
                <span
                  className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                    activePosition.direction === "LONG"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                  }`}
                >
                  {activePosition.direction === "LONG" ? t.buyLong : t.sellShort} ({activePosition.size} {t.units})
                </span>
              </div>

              <button
                onClick={onClosePosition}
                className="w-full flex items-center justify-center gap-1.5 bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-lg font-semibold transition shadow-lg shadow-rose-900/20"
                id="btn-close-flat"
              >
                <XCircle size={16} />
                <span>{t.closePosition}</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3" id="no-position-actions">
              {/* Buy Long */}
              <button
                onClick={() => onBuyLong(size, buySlPrice, buyTpPrice)}
                className="flex flex-col items-center justify-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-4 rounded-lg transition shadow-lg shadow-emerald-950/20"
                id="btn-buy-long"
              >
                <div className="flex items-center gap-1.5">
                  <TrendingUp size={16} />
                  <span>{t.buyLong}</span>
                </div>
                <span className="text-[10px] font-mono font-normal text-emerald-100">${currentPrice.toFixed(2)}</span>
              </button>

              {/* Sell Short */}
              <button
                onClick={() => onSellShort(size, shortSlPrice, shortTpPrice)}
                className="flex flex-col items-center justify-center gap-1 bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 px-4 rounded-lg transition shadow-lg shadow-rose-950/20"
                id="btn-sell-short"
              >
                <div className="flex items-center gap-1.5">
                  <TrendingDown size={16} />
                  <span>{t.sellShort}</span>
                </div>
                <span className="text-[10px] font-mono font-normal text-rose-100">${currentPrice.toFixed(2)}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3. MATHEMATICAL POSITION SIZING CALCULATOR TOOL */}
      <div className="border-t border-gray-800 pt-4" id="mathematic-calc-drawer">
        <details className="group">
          <summary className="list-none flex items-center justify-between cursor-pointer text-xs font-semibold text-gray-400 hover:text-white transition">
            <span className="flex items-center gap-1.5">
              <span className="text-blue-500 text-sm">💡</span> {t.sizingLabel} Calculator
            </span>
            <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded transition group-open:bg-gray-800 group-open:text-gray-300">
              {size ? t.optional : t.stepBar}
            </span>
          </summary>

          <div className="mt-4 p-4 bg-slate-900/50 border border-gray-800 rounded-lg grid grid-cols-1 sm:grid-cols-12 gap-4 items-end text-xs">
            <div className="sm:col-span-4 flex flex-col gap-1.5">
              <span className="text-gray-400">Portfolio Risk (%)</span>
              <div className="flex gap-1.5">
                {[1, 2, 3].map((p) => (
                  <button
                    key={p}
                    onClick={() => setRiskPercent(p)}
                    className={`flex-1 py-1 rounded border text-center font-mono ${
                      riskPercent === p
                        ? "bg-blue-500/10 text-blue-400 border-blue-500"
                        : "bg-gray-900 border-gray-800 text-gray-400 hover:text-white"
                    }`}
                  >
                    {p}%
                  </button>
                ))}
              </div>
            </div>

            <div className="sm:col-span-5 flex flex-col gap-1.5">
              <span className="text-gray-400">Stop Loss Gap ($)</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0.5"
                  step="any"
                  value={stopLossGap}
                  onChange={(e) => setStopLossGap(Math.max(0.1, parseFloat(e.target.value) || 0))}
                  className="w-full bg-gray-900 border border-gray-800 focus:border-blue-500 text-white rounded px-2.5 py-1.5 font-mono text-xs outline-none"
                />
                <span className="text-[10px] text-gray-500 whitespace-nowrap">{t.units}</span>
              </div>
            </div>

            <div className="sm:col-span-3">
              <button
                onClick={handleAutoCalcSize}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 rounded transition shadow-md shadow-blue-900/20"
              >
                {t.sizingLabel}
              </button>
            </div>
          </div>
        </details>
      </div>

      {/* 4. TECHNICAL INDICATORS PANEL TOGGLES */}
      <div className="flex flex-wrap items-center gap-3 border-t border-gray-800 pt-4 text-xs" id="indicator-toggles-row">
        <span className="text-gray-500 font-mono">Chart Overlays:</span>
        <button
          onClick={() => onToggleIndicator("sma20")}
          className={`px-3 py-1.5 rounded-lg border font-mono transition ${
            indicatorToggles.sma20
              ? "bg-amber-500/10 text-amber-400 border-amber-500/30 font-semibold"
              : "bg-gray-900 border-gray-800 text-gray-400 hover:text-gray-300"
          }`}
        >
          SMA 20
        </button>
        <button
          onClick={() => onToggleIndicator("sma50")}
          className={`px-3 py-1.5 rounded-lg border font-mono transition ${
            indicatorToggles.sma50
              ? "bg-blue-500/10 text-blue-400 border-blue-500/30 font-semibold"
              : "bg-gray-900 border-gray-800 text-gray-400 hover:text-gray-300"
          }`}
        >
          SMA 50
        </button>
        <button
          onClick={() => onToggleIndicator("ema20")}
          className={`px-3 py-1.5 rounded-lg border font-mono transition ${
            indicatorToggles.ema20
              ? "bg-purple-500/10 text-purple-400 border-purple-500/30 font-semibold"
              : "bg-gray-900 border-gray-800 text-gray-400 hover:text-gray-300"
          }`}
        >
          EMA 20
        </button>
        <button
          onClick={() => onToggleIndicator("rsi")}
          className={`px-3 py-1.5 rounded-lg border font-mono transition ${
            indicatorToggles.rsi
              ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/30 font-semibold"
              : "bg-gray-900 border-gray-800 text-gray-400 hover:text-gray-300"
          }`}
        >
          RSI Oscillator
        </button>
        <button
          onClick={() => onToggleIndicator("macd")}
          className={`px-3 py-1.5 rounded-lg border font-mono transition ${
            indicatorToggles.macd
              ? "bg-pink-500/10 text-pink-400 border-pink-500/30 font-semibold"
              : "bg-gray-900 border-gray-800 text-gray-400 hover:text-gray-300"
          }`}
        >
          MACD Pane
        </button>
      </div>
    </div>
  );
}
