/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TrendingUp, Award, Activity, Receipt, ShieldAlert } from "lucide-react";
import { Position, Trade, AccountStats } from "../types";
import { TranslationSet } from "../data/translations";

interface AccountStatusProps {
  stats: AccountStats;
  activePosition: Position | null;
  currentPrice: number;
  trades: Trade[];
  t: TranslationSet;
}

export default function AccountStatus({
  stats,
  activePosition,
  currentPrice,
  trades,
  t,
}: AccountStatusProps) {
  // Compute floating P&L of active position
  const floatingPnL = activePosition
    ? activePosition.direction === "LONG"
      ? (currentPrice - activePosition.entryPrice) * activePosition.size
      : (activePosition.entryPrice - currentPrice) * activePosition.size
    : 0;

  const currentEquity = stats.balance + floatingPnL;

  return (
    <div className="w-full flex flex-col gap-5" id="account-status-root">
      {/* 1. CORE STATISTICS CARDS */}
      <div className="grid grid-cols-2 gap-4" id="stats-dashboard-grid">
        {/* Equity Card */}
        <div className="bg-[#1E293B]/40 border border-gray-800 rounded-xl p-4 flex flex-col justify-between" id="stat-card-equity">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs font-medium">{t.accountEquity}</span>
            <Activity size={14} className="text-blue-400" />
          </div>
          <div className="mt-2">
            <span className="text-xl font-bold font-mono text-white">
              ${currentEquity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <div className="text-[10px] text-gray-500 mt-1 font-mono">
              {t.balance}: ${stats.balance.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>

        {/* Realized Net P&L */}
        <div className="bg-[#1E293B]/40 border border-gray-800 rounded-xl p-4 flex flex-col justify-between" id="stat-card-pnl">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs font-medium">{t.netRealizedPnL}</span>
            <TrendingUp size={14} className="text-emerald-400" />
          </div>
          <div className="mt-2">
            <span
              className={`text-xl font-bold font-mono ${
                stats.netPnL > 0 ? "text-emerald-400" : stats.netPnL < 0 ? "text-rose-400" : "text-gray-300"
              }`}
            >
              {stats.netPnL >= 0 ? "+" : ""}${stats.netPnL.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <div className="text-[10px] text-gray-500 mt-1 font-mono">
              {t.fromClosedTrades} ({stats.totalTrades})
            </div>
          </div>
        </div>

        {/* Win Rate */}
        <div className="bg-[#1E293B]/40 border border-gray-800 rounded-xl p-4 flex flex-col justify-between" id="stat-card-winrate">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs font-medium">{t.winRate}</span>
            <Award size={14} className="text-amber-400" />
          </div>
          <div className="mt-2">
            <span className="text-xl font-bold font-mono text-white">
              {stats.winRate.toFixed(1)}%
            </span>
            <div className="text-[10px] text-gray-500 mt-1 font-mono">
              {stats.winningTrades} {t.correctLabel || "W"} / {stats.losingTrades} {t.incorrectLabel || "L"}
            </div>
          </div>
        </div>

        {/* Profit Factor */}
        <div className="bg-[#1E293B]/40 border border-gray-800 rounded-xl p-4 flex flex-col justify-between" id="stat-card-profitfactor">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs font-medium">{t.profitFactor}</span>
            <Receipt size={14} className="text-purple-400" />
          </div>
          <div className="mt-2">
            <span
              className={`text-xl font-bold font-mono ${
                stats.profitFactor >= 2
                  ? "text-emerald-400"
                  : stats.profitFactor >= 1
                  ? "text-blue-400"
                  : "text-rose-400"
              }`}
            >
              {stats.profitFactor === Infinity ? "∞" : stats.profitFactor.toFixed(2)}
            </span>
            <div className="text-[10px] text-gray-500 mt-1 font-mono">
              {t.grossRatio}
            </div>
          </div>
        </div>
      </div>

      {/* 2. DYNAMIC LIVE POSITION TRACKER */}
      {activePosition && (
        <div className="bg-[#10B981]/5 border border-[#10B981]/20 rounded-xl p-4 flex flex-col gap-3" id="live-position-monitor">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                {t.activePositionLive}
              </h4>
            </div>
            <span className="text-[10px] font-mono text-gray-400">
              {t.enteredOnBar}: {activePosition.entryIndex}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono" id="live-position-details">
            <div className="bg-[#0B0F19]/60 p-2.5 rounded border border-gray-800">
              <div className="text-gray-500 text-[10px]">{t.direction}</div>
              <span className={`text-sm font-bold ${activePosition.direction === "LONG" ? "text-emerald-400" : "text-rose-400"}`}>
                {activePosition.direction === "LONG" ? t.buyLong : t.sellShort}
              </span>
            </div>

            <div className="bg-[#0B0F19]/60 p-2.5 rounded border border-gray-800">
              <div className="text-gray-500 text-[10px]">{t.entryPrice}</div>
              <span className="text-sm font-bold text-gray-300">
                ${activePosition.entryPrice.toFixed(2)}
              </span>
            </div>

            <div className="bg-[#0B0F19]/60 p-2.5 rounded border border-gray-800">
              <div className="text-gray-500 text-[10px]">{t.currentPrice}</div>
              <span className="text-sm font-bold text-gray-300">
                ${currentPrice.toFixed(2)}
              </span>
            </div>

            <div className="bg-[#0B0F19]/60 p-2.5 rounded border border-emerald-500/20">
              <div className="text-emerald-500/60 text-[10px] font-semibold">{t.unrealizedPnL}</div>
              <span className={`text-sm font-bold ${floatingPnL >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                {floatingPnL >= 0 ? "+" : ""}${floatingPnL.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-[10px] font-mono text-gray-400 pt-1" id="active-position-brackets">
            {activePosition.stopLoss && (
              <span className="bg-rose-500/5 border border-rose-500/10 px-2 py-0.5 rounded text-rose-300">
                {t.stopLoss}: ${activePosition.stopLoss.toFixed(2)}
              </span>
            )}
            {activePosition.takeProfit && (
              <span className="bg-blue-500/5 border border-blue-500/10 px-2 py-0.5 rounded text-blue-300">
                {t.takeProfit}: ${activePosition.takeProfit.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      )}

      {/* 3. TRADING LEDGER JOURNAL */}
      <div className="bg-[#0F172A] border border-gray-800 rounded-xl p-5 flex flex-col gap-3 shadow-lg" id="trading-ledger-journal">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          {t.tradingLedgerJournal}
        </h4>

        {trades.length === 0 ? (
          <div className="text-center py-8 bg-[#0B0F19]/30 rounded-lg border border-gray-800 border-dashed" id="empty-journal-fallback">
            <ShieldAlert className="mx-auto text-gray-500 mb-2" size={24} />
            <p className="text-xs text-gray-400 font-medium">{t.noRecordedTrades}</p>
            <p className="text-[10px] text-gray-500 mt-1 max-w-xs mx-auto">
              {t.startPlaybackPrompt}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto" id="ledger-table-wrapper">
            <table className="w-full text-xs text-left text-gray-300 font-mono">
              <thead className="text-[10px] uppercase text-gray-500 border-b border-gray-800">
                <tr>
                  <th className="py-2 px-1">{t.dirCol}</th>
                  <th className="py-2 px-1">{t.sizeCol}</th>
                  <th className="py-2 px-1">{t.entryPriceCol}</th>
                  <th className="py-2 px-1">{t.exitPriceCol}</th>
                  <th className="py-2 px-1">{t.exitReasonCol}</th>
                  <th className="py-2 px-1 text-right">{t.pnlCol}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-900">
                {trades.map((tItem) => {
                  const pnl = tItem.realizedPnL || 0;
                  return (
                    <tr key={tItem.id} className="hover:bg-gray-800/20 transition">
                      <td className="py-2.5 px-1 font-bold">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[9px] ${
                            tItem.direction === "LONG" ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                          }`}
                        >
                          {tItem.direction === "LONG" ? t.buyLong : t.sellShort}
                        </span>
                      </td>
                      <td className="py-2.5 px-1 text-gray-400">{tItem.size}</td>
                      <td className="py-2.5 px-1">${tItem.entryPrice.toFixed(2)}</td>
                      <td className="py-2.5 px-1">
                        {tItem.exitPrice ? `$${tItem.exitPrice.toFixed(2)}` : t.openStatus}
                      </td>
                      <td className="py-2.5 px-1 text-gray-400">
                        {tItem.exitPrice ? (
                          <span
                            className={`px-1 rounded text-[9px] ${
                              tItem.exitReason === "STOP_LOSS"
                                ? "bg-rose-500/10 text-rose-400 border border-rose-500/10"
                                : tItem.exitReason === "TAKE_PROFIT"
                                ? "bg-blue-500/10 text-blue-400 border border-blue-500/10"
                                : "bg-gray-900 text-gray-400"
                            }`}
                          >
                            {tItem.exitReason === "STOP_LOSS"
                              ? t.stopLoss
                              : tItem.exitReason === "TAKE_PROFIT"
                              ? t.takeProfit
                              : t.manualExit}
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td
                        className={`py-2.5 px-1 text-right font-bold ${
                          pnl > 0 ? "text-emerald-400" : pnl < 0 ? "text-rose-400" : "text-gray-300"
                        }`}
                      >
                        {pnl >= 0 ? "+" : ""}${pnl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
