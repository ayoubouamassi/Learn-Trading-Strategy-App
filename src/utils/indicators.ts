/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Candlestick } from "../types";

export interface IndicatorValues {
  sma20: (number | null)[];
  sma50: (number | null)[];
  ema20: (number | null)[];
  rsi14: (number | null)[];
  macdLine: (number | null)[];
  macdSignal: (number | null)[];
  macdHist: (number | null)[];
}

export function calculateIndicators(data: Candlestick[]): IndicatorValues {
  const closes = data.map((d) => d.close);
  const len = data.length;

  const sma20: (number | null)[] = Array(len).fill(null);
  const sma50: (number | null)[] = Array(len).fill(null);
  const ema20: (number | null)[] = Array(len).fill(null);
  const rsi14: (number | null)[] = Array(len).fill(null);
  const macdLine: (number | null)[] = Array(len).fill(null);
  const macdSignal: (number | null)[] = Array(len).fill(null);
  const macdHist: (number | null)[] = Array(len).fill(null);

  // 1. Calculate SMA 20
  for (let i = 19; i < len; i++) {
    const sum = closes.slice(i - 19, i + 1).reduce((a, b) => a + b, 0);
    sma20[i] = sum / 20;
  }

  // 2. Calculate SMA 50
  for (let i = 49; i < len; i++) {
    const sum = closes.slice(i - 49, i + 1).reduce((a, b) => a + b, 0);
    sma50[i] = sum / 50;
  }

  // 3. Calculate EMA 20
  if (len >= 20) {
    const sum = closes.slice(0, 20).reduce((a, b) => a + b, 0);
    let prevEma = sum / 20;
    ema20[19] = prevEma;
    const k = 2 / (20 + 1);
    for (let i = 20; i < len; i++) {
      const currentEma = (closes[i] - prevEma) * k + prevEma;
      ema20[i] = currentEma;
      prevEma = currentEma;
    }
  }

  // 4. Calculate RSI 14
  if (len >= 15) {
    let gains = 0;
    let losses = 0;

    // First RSI
    for (let i = 1; i <= 14; i++) {
      const diff = closes[i] - closes[i - 1];
      if (diff > 0) gains += diff;
      else losses -= diff;
    }

    let avgGain = gains / 14;
    let avgLoss = losses / 14;
    rsi14[14] = avgLoss === 0 ? 100 : 100 - 100 / (1 + avgGain / avgLoss);

    for (let i = 15; i < len; i++) {
      const diff = closes[i] - closes[i - 1];
      const gain = diff > 0 ? diff : 0;
      const loss = diff < 0 ? -diff : 0;

      avgGain = (avgGain * 13 + gain) / 14;
      avgLoss = (avgLoss * 13 + loss) / 14;

      rsi14[i] = avgLoss === 0 ? 100 : 100 - 100 / (1 + avgGain / avgLoss);
    }
  }

  // 5. Calculate MACD (12, 26, 9)
  const ema12: (number | null)[] = Array(len).fill(null);
  const ema26: (number | null)[] = Array(len).fill(null);

  // EMA 12 helper
  if (len >= 12) {
    const sum = closes.slice(0, 12).reduce((a, b) => a + b, 0);
    let prevEma12 = sum / 12;
    ema12[11] = prevEma12;
    const k = 2 / (12 + 1);
    for (let i = 12; i < len; i++) {
      const currentEma12 = (closes[i] - prevEma12) * k + prevEma12;
      ema12[i] = currentEma12;
      prevEma12 = currentEma12;
    }
  }

  // EMA 26 helper
  if (len >= 26) {
    const sum = closes.slice(0, 26).reduce((a, b) => a + b, 0);
    let prevEma26 = sum / 26;
    ema26[25] = prevEma26;
    const k = 2 / (26 + 1);
    for (let i = 26; i < len; i++) {
      const currentEma26 = (closes[i] - prevEma26) * k + prevEma26;
      ema26[25 + (i - 25)] = currentEma26;
      prevEma26 = currentEma26;
    }
  }

  // MACD Line = 12 EMA - 26 EMA
  for (let i = 25; i < len; i++) {
    const e12 = ema12[i];
    const e26 = ema26[i];
    if (e12 !== null && e26 !== null) {
      macdLine[i] = e12 - e26;
    }
  }

  // Signal Line = 9 EMA of MACD Line
  // Find first index where MACD Line is not null (which is 25)
  const firstMacdIndex = 25;
  if (len >= firstMacdIndex + 9) {
    const macdSlice = macdLine.slice(firstMacdIndex, firstMacdIndex + 9) as number[];
    const sum = macdSlice.reduce((a, b) => a + b, 0);
    let prevSignal = sum / 9;
    macdSignal[firstMacdIndex + 8] = prevSignal;

    const k = 2 / (9 + 1);
    for (let i = firstMacdIndex + 9; i < len; i++) {
      const mLine = macdLine[i];
      if (mLine !== null) {
        const currentSignal = (mLine - prevSignal) * k + prevSignal;
        macdSignal[i] = currentSignal;
        prevSignal = currentSignal;
      }
    }
  }

  // Histogram = MACD Line - Signal Line
  for (let i = 0; i < len; i++) {
    const mLine = macdLine[i];
    const mSignal = macdSignal[i];
    if (mLine !== null && mSignal !== null) {
      macdHist[i] = mLine - mSignal;
    }
  }

  return {
    sma20,
    sma50,
    ema20,
    rsi14,
    macdLine,
    macdSignal,
    macdHist,
  };
}
