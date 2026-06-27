/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from "react";
import { Candlestick, Position, Trade } from "../types";
import { calculateIndicators } from "../utils/indicators";

interface TradingChartProps {
  data: Candlestick[];
  visibleCount: number;
  indicatorToggles: {
    sma20: boolean;
    sma50: boolean;
    ema20: boolean;
    rsi: boolean;
    macd: boolean;
  };
  trades: Trade[];
  activePosition: Position | null;
}

export default function TradingChart({
  data,
  visibleCount,
  indicatorToggles,
  trades,
  activePosition,
}: TradingChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 420 });
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

  // Use a ResizeObserver to dynamically update chart dimensions
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      setDimensions({
        width: Math.max(width, 300),
        height: Math.max(height, 350),
      });
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Filter data up to the current visibleCount in the playback
  const visibleData = data.slice(0, visibleCount);
  const indicators = calculateIndicators(visibleData);

  // Layout boundaries
  const paddingRight = 65; // Y-axis labels space
  const paddingBottom = 25; // X-axis dates space
  const paddingTop = 25; // OHLC info space

  const rsiActive = indicatorToggles.rsi;
  const macdActive = indicatorToggles.macd;
  const extraPaneCount = (rsiActive ? 1 : 0) + (macdActive ? 1 : 0);

  // Divide height among panels
  const totalChartHeight = dimensions.height - paddingTop - paddingBottom;
  let mainHeight = totalChartHeight;
  let rsiHeight = 0;
  let macdHeight = 0;

  if (extraPaneCount === 1) {
    mainHeight = totalChartHeight * 0.72;
    if (rsiActive) rsiHeight = totalChartHeight * 0.23;
    if (macdActive) macdHeight = totalChartHeight * 0.23;
  } else if (extraPaneCount === 2) {
    mainHeight = totalChartHeight * 0.58;
    rsiHeight = totalChartHeight * 0.19;
    macdHeight = totalChartHeight * 0.19;
  }

  const chartWidth = dimensions.width - paddingRight;

  // Compute scale boundaries for Price
  const prices = visibleData.map((d) => [d.high, d.low]).flat();
  // Include indicator values to keep them in frame
  if (indicatorToggles.sma20) {
    indicators.sma20.forEach((val) => val && prices.push(val));
  }
  if (indicatorToggles.sma50) {
    indicators.sma50.forEach((val) => val && prices.push(val));
  }
  if (indicatorToggles.ema20) {
    indicators.ema20.forEach((val) => val && prices.push(val));
  }
  if (activePosition) {
    prices.push(activePosition.entryPrice);
    if (activePosition.stopLoss) prices.push(activePosition.stopLoss);
    if (activePosition.takeProfit) prices.push(activePosition.takeProfit);
  }

  const minPrice = prices.length ? Math.min(...prices) * 0.995 : 50;
  const maxPrice = prices.length ? Math.max(...prices) * 1.005 : 150;
  const priceRange = maxPrice - minPrice;

  // Index scaling
  const maxVisibleBars = 45;
  const startIndex = Math.max(0, visibleData.length - maxVisibleBars);
  const displayData = visibleData.slice(startIndex);
  const numDisplay = displayData.length;

  const barWidth = numDisplay > 0 ? (chartWidth / numDisplay) * 0.72 : 10;
  const barSpace = numDisplay > 0 ? chartWidth / numDisplay : 15;

  // Coordinate Conversion Functions
  const getX = (idx: number) => {
    return idx * barSpace + barSpace / 2;
  };

  const getY = (price: number) => {
    if (priceRange === 0) return paddingTop + mainHeight / 2;
    return paddingTop + mainHeight - ((price - minPrice) / priceRange) * mainHeight;
  };

  // Convert mouse X to data index
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMouseCoords({ x, y });

    if (x < 0 || x > chartWidth) {
      setHoverIndex(null);
      return;
    }

    const cellIdx = Math.floor(x / barSpace);
    const dataIdx = startIndex + cellIdx;
    if (dataIdx >= 0 && dataIdx < visibleCount) {
      setHoverIndex(dataIdx);
    } else {
      setHoverIndex(null);
    }
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  // Current hovered or latest bar for display
  const activeBarIndex = hoverIndex !== null ? hoverIndex : visibleCount - 1;
  const activeBar = visibleData[activeBarIndex];

  // Draw grid prices
  const gridLinesCount = 5;
  const gridPrices = Array.from({ length: gridLinesCount }, (_, i) => {
    return minPrice + (priceRange * i) / (gridLinesCount - 1);
  });

  return (
    <div className="w-full bg-[#0B0F19] border border-gray-800 rounded-xl p-4 flex flex-col shadow-2xl relative select-none" id="trading-chart-container">
      {/* Chart Header - OHLC and Active Indicators */}
      <div className="flex flex-wrap items-center justify-between text-xs font-mono text-gray-400 border-b border-gray-900 pb-2 mb-2 gap-2" id="chart-ohlc-header">
        {activeBar && (
          <div className="flex items-center gap-3" id="ohlc-values">
            <span className="font-semibold text-gray-200">{activeBar.time}</span>
            <span>
              O: <span className={activeBar.close >= activeBar.open ? "text-emerald-400" : "text-rose-400"}>{activeBar.open.toFixed(2)}</span>
            </span>
            <span>
              H: <span className={activeBar.close >= activeBar.open ? "text-emerald-400" : "text-rose-400"}>{activeBar.high.toFixed(2)}</span>
            </span>
            <span>
              L: <span className={activeBar.close >= activeBar.open ? "text-emerald-400" : "text-rose-400"}>{activeBar.low.toFixed(2)}</span>
            </span>
            <span>
              C: <span className={activeBar.close >= activeBar.open ? "text-emerald-400" : "text-rose-400"}>{activeBar.close.toFixed(2)}</span>
            </span>
            <span>
              Vol: <span className="text-blue-400">{(activeBar.volume / 1000).toFixed(1)}k</span>
            </span>
          </div>
        )}

        <div className="flex gap-2 items-center flex-wrap" id="chart-indicator-tags">
          {indicatorToggles.sma20 && activeBar && (
            <span className="text-[10px] bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/20">
              SMA 20: {indicators.sma20[activeBarIndex]?.toFixed(2) || "N/A"}
            </span>
          )}
          {indicatorToggles.sma50 && activeBar && (
            <span className="text-[10px] bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/20">
              SMA 50: {indicators.sma50[activeBarIndex]?.toFixed(2) || "N/A"}
            </span>
          )}
          {indicatorToggles.ema20 && activeBar && (
            <span className="text-[10px] bg-purple-500/10 text-purple-400 px-1.5 py-0.5 rounded border border-purple-500/20">
              EMA 20: {indicators.ema20[activeBarIndex]?.toFixed(2) || "N/A"}
            </span>
          )}
        </div>
      </div>

      {/* Primary SVG Canvas */}
      <div className="w-full flex-grow relative" ref={containerRef} style={{ height: `${dimensions.height}px` }} id="svg-chart-workspace">
        <svg
          width={dimensions.width}
          height={dimensions.height}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="absolute inset-0 cursor-crosshair overflow-visible"
          id="trading-svg-node"
        >
          {/* DEFINITIONS FOR GRADIENTS AND CLIPPING */}
          <defs>
            <linearGradient id="volume-green" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="volume-red" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="rsi-zone-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.02" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.08" />
            </linearGradient>
          </defs>

          {/* BACKGROUND GRID FOR MAIN PRICE PANEL */}
          <g id="main-grid-lines">
            {/* Horizontal Gridlines */}
            {gridPrices.map((price, i) => {
              const y = getY(price);
              return (
                <g key={`h-grid-${i}`}>
                  <line
                    x1={0}
                    y1={y}
                    x2={chartWidth}
                    y2={y}
                    stroke="#1E293B"
                    strokeDasharray="2 3"
                    strokeWidth={1}
                  />
                  {/* Y-Axis Label */}
                  <text
                    x={chartWidth + 6}
                    y={y + 4}
                    fill="#64748B"
                    fontSize="10"
                    fontFamily="monospace"
                    id={`price-label-${i}`}
                  >
                    {price.toFixed(2)}
                  </text>
                </g>
              );
            })}
          </g>

          {/* DYNAMIC VOLUME CHART OVERLAY (Bottom of price panel) */}
          <g id="volume-bars">
            {displayData.map((d, i) => {
              const idx = startIndex + i;
              const x = getX(i);
              const volYRatio = Math.min(1, d.volume / (Math.max(...visibleData.map((item) => item.volume)) || 1));
              const volHeight = mainHeight * 0.16 * volYRatio;
              const isBull = d.close >= d.open;

              return (
                <rect
                  key={`vol-${idx}`}
                  x={x - barWidth / 2}
                  y={paddingTop + mainHeight - volHeight}
                  width={barWidth}
                  height={volHeight}
                  fill={isBull ? "url(#volume-green)" : "url(#volume-red)"}
                  stroke={isBull ? "#10b981" : "#f43f5e"}
                  strokeOpacity={0.15}
                  id={`volume-bar-${idx}`}
                />
              );
            })}
          </g>

          {/* PRICE CANDLESTICKS */}
          <g id="candlestick-groups">
            {displayData.map((d, i) => {
              const idx = startIndex + i;
              const x = getX(i);
              const oY = getY(d.open);
              const cY = getY(d.close);
              const hY = getY(d.high);
              const lY = getY(d.low);

              const isBull = d.close >= d.open;
              const candleColor = isBull ? "#10b981" : "#f43f5e";

              return (
                <g key={`candle-${idx}`} id={`candle-group-${idx}`}>
                  {/* Wick (High-Low Line) */}
                  <line
                    x1={x}
                    y1={hY}
                    x2={x}
                    y2={lY}
                    stroke={candleColor}
                    strokeWidth={1.5}
                  />
                  {/* Body (Open-Close Rect) */}
                  <rect
                    x={x - barWidth / 2}
                    y={Math.min(oY, cY)}
                    width={barWidth}
                    height={Math.max(1.5, Math.abs(oY - cY))}
                    fill={isBull ? "#10b981" : "#f43f5e"}
                    stroke={candleColor}
                    strokeWidth={0.5}
                    rx={1}
                  />
                </g>
              );
            })}
          </g>

          {/* TECHNICAL INDICATOR LINES */}
          <g id="technical-indicator-lines">
            {/* SMA 20 */}
            {indicatorToggles.sma20 && (
              <path
                d={displayData
                  .map((_, i) => {
                    const idx = startIndex + i;
                    const val = indicators.sma20[idx];
                    return val ? `${i === 0 ? "M" : "L"}${getX(i)},${getY(val)}` : "";
                  })
                  .join(" ")}
                fill="none"
                stroke="#F59E0B"
                strokeWidth={2}
                strokeLinecap="round"
                id="sma20-path"
              />
            )}

            {/* SMA 50 */}
            {indicatorToggles.sma50 && (
              <path
                d={displayData
                  .map((_, i) => {
                    const idx = startIndex + i;
                    const val = indicators.sma50[idx];
                    return val ? `${i === 0 ? "M" : "L"}${getX(i)},${getY(val)}` : "";
                  })
                  .join(" ")}
                fill="none"
                stroke="#3B82F6"
                strokeWidth={2}
                strokeLinecap="round"
                id="sma50-path"
              />
            )}

            {/* EMA 20 */}
            {indicatorToggles.ema20 && (
              <path
                d={displayData
                  .map((_, i) => {
                    const idx = startIndex + i;
                    const val = indicators.ema20[idx];
                    return val ? `${i === 0 ? "M" : "L"}${getX(i)},${getY(val)}` : "";
                  })
                  .join(" ")}
                fill="none"
                stroke="#A855F7"
                strokeWidth={2}
                strokeLinecap="round"
                id="ema20-path"
              />
            )}
          </g>

          {/* HISTORICAL TRADES FLAGS/MARKERS */}
          <g id="chart-trade-markers">
            {trades.map((trade) => {
              // Only render markers if they fit inside our current view range
              const isEntryVisible = trade.entryIndex >= startIndex && trade.entryIndex < visibleCount;
              const isExitVisible = trade.exitIndex !== undefined && trade.exitIndex >= startIndex && trade.exitIndex < visibleCount;

              return (
                <g key={`trade-markers-${trade.id}`}>
                  {isEntryVisible && (
                    <g transform={`translate(${getX(trade.entryIndex - startIndex)}, ${getY(trade.entryPrice)})`}>
                      {trade.direction === "LONG" ? (
                        <path
                          d="M -6,14 L 0,4 L 6,14 Z"
                          fill="#10b981"
                          stroke="#ffffff"
                          strokeWidth={1}
                        />
                      ) : (
                        <path
                          d="M -6,-14 L 0,-4 L 6,-14 Z"
                          fill="#f43f5e"
                          stroke="#ffffff"
                          strokeWidth={1}
                        />
                      )}
                      <circle r={2.5} fill="#ffffff" />
                    </g>
                  )}
                  {isExitVisible && trade.exitPrice !== undefined && trade.exitIndex !== undefined && (
                    <g transform={`translate(${getX(trade.exitIndex - startIndex)}, ${getY(trade.exitPrice)})`}>
                      <circle r={5} fill="#3b82f6" stroke="#ffffff" strokeWidth={1} />
                      <line x1="-3" y1="-3" x2="3" y2="3" stroke="#ffffff" strokeWidth={1.5} />
                      <line x1="3" y1="-3" x2="-3" y2="3" stroke="#ffffff" strokeWidth={1.5} />
                    </g>
                  )}
                </g>
              );
            })}
          </g>

          {/* ACTIVE POSITION CHANNELS (ENTRY, STOP LOSS, TAKE PROFIT) */}
          {activePosition && (
            <g id="active-position-lines">
              {/* Entry Price Dotted Line */}
              <line
                x1={0}
                y1={getY(activePosition.entryPrice)}
                x2={chartWidth}
                y2={getY(activePosition.entryPrice)}
                stroke="#10B981"
                strokeDasharray="4 4"
                strokeWidth={1.5}
              />
              <rect
                x={chartWidth - 5}
                y={getY(activePosition.entryPrice) - 9}
                width={paddingRight + 3}
                height={18}
                fill="#10B981"
                rx={3}
              />
              <text
                x={chartWidth + 4}
                y={getY(activePosition.entryPrice) + 4}
                fill="#FFFFFF"
                fontSize="9"
                fontWeight="bold"
                fontFamily="monospace"
              >
                ENT {activePosition.entryPrice.toFixed(1)}
              </text>

              {/* Stop Loss Line */}
              {activePosition.stopLoss && (
                <g id="sl-line-group">
                  <line
                    x1={0}
                    y1={getY(activePosition.stopLoss)}
                    x2={chartWidth}
                    y2={getY(activePosition.stopLoss)}
                    stroke="#F43F5E"
                    strokeDasharray="4 4"
                    strokeWidth={1.5}
                  />
                  <rect
                    x={chartWidth - 5}
                    y={getY(activePosition.stopLoss) - 9}
                    width={paddingRight + 3}
                    height={18}
                    fill="#F43F5E"
                    rx={3}
                  />
                  <text
                    x={chartWidth + 4}
                    y={getY(activePosition.stopLoss) + 4}
                    fill="#FFFFFF"
                    fontSize="9"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    S/L {activePosition.stopLoss.toFixed(1)}
                  </text>
                </g>
              )}

              {/* Take Profit Line */}
              {activePosition.takeProfit && (
                <g id="tp-line-group">
                  <line
                    x1={0}
                    y1={getY(activePosition.takeProfit)}
                    x2={chartWidth}
                    y2={getY(activePosition.takeProfit)}
                    stroke="#3B82F6"
                    strokeDasharray="4 4"
                    strokeWidth={1.5}
                  />
                  <rect
                    x={chartWidth - 5}
                    y={getY(activePosition.takeProfit) - 9}
                    width={paddingRight + 3}
                    height={18}
                    fill="#3B82F6"
                    rx={3}
                  />
                  <text
                    x={chartWidth + 4}
                    y={getY(activePosition.takeProfit) + 4}
                    fill="#FFFFFF"
                    fontSize="9"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    T/P {activePosition.takeProfit.toFixed(1)}
                  </text>
                </g>
              )}
            </g>
          )}

          {/* RSI PANE (DYNAMIC OSCILLATOR) */}
          {rsiActive && (
            <g transform={`translate(0, ${paddingTop + mainHeight + 10})`} id="rsi-pane">
              {/* Boundary box */}
              <rect
                x={0}
                y={0}
                width={chartWidth}
                height={rsiHeight - 10}
                fill="#0F172A"
                stroke="#1E293B"
                strokeWidth={1}
              />
              {/* Safe Zone Area (RSI 30-70) */}
              <rect
                x={0}
                y={((100 - 70) / 100) * (rsiHeight - 10)}
                width={chartWidth}
                height={((70 - 30) / 100) * (rsiHeight - 10)}
                fill="url(#rsi-zone-gradient)"
                opacity={0.6}
              />
              {/* RSI 70 Line */}
              <line
                x1={0}
                y1={((100 - 70) / 100) * (rsiHeight - 10)}
                x2={chartWidth}
                y2={((100 - 70) / 100) * (rsiHeight - 10)}
                stroke="#ef4444"
                strokeDasharray="2 3"
                opacity={0.4}
              />
              <text x={chartWidth + 6} y={((100 - 70) / 100) * (rsiHeight - 10) + 4} fill="#64748B" fontSize="9" fontFamily="monospace">70</text>

              {/* RSI 50 Midpoint */}
              <line
                x1={0}
                y1={((100 - 50) / 100) * (rsiHeight - 10)}
                x2={chartWidth}
                y2={((100 - 50) / 100) * (rsiHeight - 10)}
                stroke="#64748B"
                strokeDasharray="1 4"
                opacity={0.3}
              />

              {/* RSI 30 Line */}
              <line
                x1={0}
                y1={((100 - 30) / 100) * (rsiHeight - 10)}
                x2={chartWidth}
                y2={((100 - 30) / 100) * (rsiHeight - 10)}
                stroke="#10b981"
                strokeDasharray="2 3"
                opacity={0.4}
              />
              <text x={chartWidth + 6} y={((100 - 30) / 100) * (rsiHeight - 10) + 4} fill="#64748B" fontSize="9" fontFamily="monospace">30</text>

              {/* RSI Label */}
              <text x={10} y={15} fill="#3b82f6" fontSize="10" fontWeight="semibold" fontFamily="monospace">RSI (14)</text>

              {/* RSI Line Path */}
              <path
                d={displayData
                  .map((_, i) => {
                    const idx = startIndex + i;
                    const val = indicators.rsi14[idx];
                    return val
                      ? `${i === 0 ? "M" : "L"}${getX(i)},${((100 - val) / 100) * (rsiHeight - 10)}`
                      : "";
                  })
                  .join(" ")}
                fill="none"
                stroke="#3B82F6"
                strokeWidth={1.5}
                strokeLinecap="round"
              />
            </g>
          )}

          {/* MACD PANE (DYNAMIC OSCILLATOR) */}
          {macdActive && (
            <g
              transform={`translate(0, ${paddingTop + mainHeight + (rsiActive ? rsiHeight : 0) + 15})`}
              id="macd-pane"
            >
              {/* Boundary box */}
              <rect
                x={0}
                y={0}
                width={chartWidth}
                height={macdHeight - 15}
                fill="#0F172A"
                stroke="#1E293B"
                strokeWidth={1}
              />

              {/* Zero Line */}
              <line
                x1={0}
                y1={(macdHeight - 15) / 2}
                x2={chartWidth}
                y2={(macdHeight - 15) / 2}
                stroke="#64748B"
                opacity={0.3}
              />
              <text x={chartWidth + 6} y={(macdHeight - 15) / 2 + 3} fill="#64748B" fontSize="9" fontFamily="monospace">0.00</text>

              {/* MACD Label */}
              <text x={10} y={15} fill="#ec4899" fontSize="10" fontWeight="semibold" fontFamily="monospace">MACD (12, 26, 9)</text>

              {/* Find bounds of MACD values in current displayed window */}
              {(() => {
                const visibleMacdVals = displayData
                  .map((_, i) => {
                    const idx = startIndex + i;
                    return [indicators.macdLine[idx], indicators.macdSignal[idx], indicators.macdHist[idx]];
                  })
                  .flat()
                  .filter((v): v is number => v !== null);

                const maxMacd = visibleMacdVals.length ? Math.max(...visibleMacdVals) * 1.05 : 2;
                const minMacd = visibleMacdVals.length ? Math.min(...visibleMacdVals) * 1.05 : -2;
                const macdRange = maxMacd - minMacd;

                const getMacdY = (val: number) => {
                  if (macdRange === 0) return (macdHeight - 15) / 2;
                  return (macdHeight - 15) - ((val - minMacd) / macdRange) * (macdHeight - 15);
                };

                return (
                  <>
                    {/* MACD HISTOGRAM BARS */}
                    {displayData.map((_, i) => {
                      const idx = startIndex + i;
                      const hist = indicators.macdHist[idx];
                      if (hist === null) return null;
                      const x = getX(i);
                      const zeroY = getMacdY(0);
                      const barY = getMacdY(hist);
                      const fill = hist >= 0 ? "#10b981" : "#f43f5e";

                      return (
                        <rect
                          key={`macd-hist-${idx}`}
                          x={x - barWidth / 2}
                          y={Math.min(zeroY, barY)}
                          width={barWidth}
                          height={Math.max(1, Math.abs(zeroY - barY))}
                          fill={fill}
                          opacity={0.4}
                        />
                      );
                    })}

                    {/* MACD LINE */}
                    <path
                      d={displayData
                        .map((_, i) => {
                          const idx = startIndex + i;
                          const val = indicators.macdLine[idx];
                          return val !== null ? `${i === 0 ? "M" : "L"}${getX(i)},${getMacdY(val)}` : "";
                        })
                        .join(" ")}
                      fill="none"
                      stroke="#F43F5E"
                      strokeWidth={1.5}
                    />

                    {/* SIGNAL LINE */}
                    <path
                      d={displayData
                        .map((_, i) => {
                          const idx = startIndex + i;
                          const val = indicators.macdSignal[idx];
                          return val !== null ? `${i === 0 ? "M" : "L"}${getX(i)},${getMacdY(val)}` : "";
                        })
                        .join(" ")}
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth={1.5}
                    />
                  </>
                );
              })()}
            </g>
          )}

          {/* DATE LABELS (X-Axis) */}
          <g id="x-axis-dates">
            {displayData.map((d, i) => {
              const idx = startIndex + i;
              // Render dates label every 8 bars to prevent clustering
              if (idx % 8 !== 0) return null;
              const x = getX(i);
              return (
                <g key={`date-${idx}`} id={`date-label-${idx}`}>
                  <line
                    x1={x}
                    y1={paddingTop + mainHeight}
                    x2={x}
                    y2={paddingTop + mainHeight + 5}
                    stroke="#1E293B"
                    strokeWidth={1}
                  />
                  <text
                    x={x}
                    y={dimensions.height - paddingBottom + 12}
                    fill="#64748B"
                    fontSize="9"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    {d.time.substring(5)}
                  </text>
                </g>
              );
            })}
          </g>

          {/* INTERACTIVE CROSSHAIR LINES */}
          {hoverIndex !== null && mouseCoords.x <= chartWidth && (
            <g id="interactive-crosshairs">
              {/* Vertical dotted crosshair */}
              <line
                x1={getX(hoverIndex - startIndex)}
                y1={0}
                x2={getX(hoverIndex - startIndex)}
                y2={dimensions.height - paddingBottom}
                stroke="#64748B"
                strokeWidth={1}
                strokeDasharray="2 2"
                opacity={0.8}
              />
              {/* Horizontal dotted crosshair (only in main price chart) */}
              {mouseCoords.y >= paddingTop && mouseCoords.y <= paddingTop + mainHeight && (
                <line
                  x1={0}
                  y1={mouseCoords.y}
                  x2={chartWidth}
                  y2={mouseCoords.y}
                  stroke="#64748B"
                  strokeWidth={1}
                  strokeDasharray="2 2"
                  opacity={0.8}
                />
              )}
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
