import { Scenario, Candlestick } from "../types";

// Helper to generate realistic candlestick data based on mathematical curves
export function generateScenarioData(scenarioId: string): Candlestick[] {
  const data: Candlestick[] = [];
  let currentPrice = 100;
  const numBars = 80;

  // Setup parameters based on the scenario
  let baseTrend = 0;
  let volatility = 0.02;
  let volumeBase = 100000;
  let cyclePeriod = 20;
  let cycleAmp = 0;

  if (scenarioId === "bitcoin-trend") {
    currentPrice = 9800;
    baseTrend = 0.015; // strong uptrend
    volatility = 0.025;
    volumeBase = 250000;
  } else if (scenarioId === "crash-2008") {
    currentPrice = 145;
    baseTrend = -0.012; // severe downtrend
    volatility = 0.035; // high fear, high volatility
    volumeBase = 400000;
  } else if (scenarioId === "apple-range") {
    currentPrice = 102;
    baseTrend = 0; // range bound
    volatility = 0.012; // low volatility
    volumeBase = 150000;
    cyclePeriod = 18;
    cycleAmp = 6; // oscillates about currentPrice
  } else if (scenarioId === "gamestop-momentum") {
    currentPrice = 18;
    baseTrend = 0.002;
    volatility = 0.015;
    volumeBase = 80000;
  } else if (scenarioId === "dotcom-bubble") {
    currentPrice = 85;
    baseTrend = 0.008;
    volatility = 0.018;
    volumeBase = 120000;
  }

  // Seeded pseudo-random generator for reproducibility
  let seed = 42;
  function random(): number {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  for (let i = 0; i < numBars; i++) {
    const time = new Date(2020, 0, i + 1).toISOString().split("T")[0];
    let expectedPriceChange = baseTrend * currentPrice;

    // Custom behaviors for specific historic phases
    if (scenarioId === "bitcoin-trend") {
      // Accelerating bull market with a healthy mid-term correction
      if (i >= 30 && i <= 42) {
        expectedPriceChange = -0.012 * currentPrice; // Correction phase
      } else if (i > 42) {
        expectedPriceChange = 0.022 * currentPrice; // Parabolic resumption
      }
    } else if (scenarioId === "crash-2008") {
      // Systemic crash with two sharp bear market rallies
      if (i >= 20 && i <= 28) {
        expectedPriceChange = 0.015 * currentPrice; // Relief Rally 1
      } else if (i >= 45 && i <= 52) {
        expectedPriceChange = 0.018 * currentPrice; // Relief Rally 2
      } else {
        expectedPriceChange = -0.022 * currentPrice; // Cascading selling
      }
    } else if (scenarioId === "apple-range") {
      // Oscillating perfectly between 99 and 112, followed by breakout
      if (i < 55) {
        const targetPrice = 106 + Math.sin((i / cyclePeriod) * Math.PI * 2) * cycleAmp;
        expectedPriceChange = (targetPrice - currentPrice) * 0.4;
      } else if (i === 55) {
        // Breakout day
        expectedPriceChange = 0.08 * currentPrice; // massive green breakout candle
      } else {
        // Post-breakout markup phase (retesting previous resistance as support)
        if (i >= 58 && i <= 61) {
          expectedPriceChange = (113 - currentPrice) * 0.3; // Retest pullback
        } else {
          expectedPriceChange = 0.012 * currentPrice; // continuation
        }
      }
    } else if (scenarioId === "gamestop-momentum") {
      // Flat, then exponential short squeeze, then violent pop and decay
      if (i >= 20 && i <= 40) {
        // Squeeze active
        expectedPriceChange = 0.18 * currentPrice; // compounding rocket ride
        volatility = 0.08; // extremely wide ranges
      } else if (i > 40 && i <= 50) {
        // Limit down crash
        expectedPriceChange = -0.15 * currentPrice;
        volatility = 0.09;
      } else if (i > 50) {
        // Low price drift
        expectedPriceChange = -0.01 * currentPrice;
        volatility = 0.03;
      }
    } else if (scenarioId === "dotcom-bubble") {
      // Classic bubble top: climbing price but slowing momentum (RSI Bearish Divergence)
      if (i < 45) {
        // exhausting rally
        expectedPriceChange = (0.012 - (i * 0.00015)) * currentPrice;
      } else if (i >= 45 && i <= 55) {
        // Top distribution range
        const targetPrice = 145 + Math.sin(i) * 3;
        expectedPriceChange = (targetPrice - currentPrice) * 0.5;
      } else {
        // Catastrophic trend reversal breakdown
        expectedPriceChange = -0.028 * currentPrice;
      }
    }

    const open = currentPrice;
    const change = expectedPriceChange + (random() - 0.5) * 2 * currentPrice * volatility;
    let close = open + change;

    // Enforce positive price
    if (close < 1) close = 1;

    // High and Low wicks
    const maxMove = Math.max(open, close);
    const minMove = Math.min(open, close);
    const upperWick = maxMove + random() * currentPrice * volatility;
    const lowerWick = Math.max(0.5, minMove - random() * currentPrice * volatility);

    const high = Math.max(upperWick, open, close);
    const low = Math.min(lowerWick, open, close);

    // Volume rises during breakouts and capitulation
    let volMultiplier = 1;
    if (scenarioId === "bitcoin-trend" && i > 42) volMultiplier = 1.8;
    if (scenarioId === "crash-2008" && expectedPriceChange < 0) volMultiplier = 2.2; // panic selling
    if (scenarioId === "apple-range" && i === 55) volMultiplier = 3.5; // breakout volume confirmation!
    if (scenarioId === "gamestop-momentum" && i >= 20 && i <= 45) volMultiplier = 4.0; // short squeeze volume explosion

    const volume = Math.round(volumeBase * (0.6 + random() * 0.8) * volMultiplier);

    const bar: Candlestick = {
      time,
      open: Math.round(open * 100) / 100,
      high: Math.round(high * 100) / 100,
      low: Math.round(low * 100) / 100,
      close: Math.round(close * 100) / 100,
      volume,
    };

    data.push(bar);
    currentPrice = close;
  }

  return data;
}

export const scenarios: Scenario[] = [
  {
    id: "bitcoin-trend",
    name: "The Bitcoin 2020 Parabolic Rise",
    description: "Experience a legendary trend-following regime. Learn to identify high-probability pullbacks on short-term moving averages (20 EMA) and manage trailing stops during accelerating market momentum.",
    asset: "BTC/USD",
    historicalPeriod: "Late 2020",
    difficulty: "Beginner",
    strategyName: "Moving Average Pullbacks & Crossovers",
    strategyDescription: "Use the 20 EMA and 50 SMA crossover to stay on the correct side of the macro trend, entering buy trades exclusively during pullbacks to the moving average support lines.",
    initialBalance: 10000,
    data: [], // Populated at runtime using generateScenarioData
    keyTakeaway: "In extremely strong bull markets, oscillators like RSI will stay overbought for weeks. Do not sell short! Instead, buy pullback bounces off major moving averages.",
    learningObjectives: [
      "Understand Simple vs Exponential Moving Averages",
      "Identify high-probability pullback zones",
      "Configure trailing stops to ride long trends without closing early",
    ],
  },
  {
    id: "crash-2008",
    name: "The 2008 Great Financial Crisis",
    description: "Put your defensive skills to the test during one of history's deepest stock bear markets. Master the art of Short Selling, identify failing relief rallies, and realize the lifesaving value of strict Stop Loss disciplines.",
    asset: "SPY (S&P 500 ETF)",
    historicalPeriod: "2007-2008",
    difficulty: "Advanced",
    strategyName: "Shorting Resistance Retests & Strict Protection",
    strategyDescription: "Look for bear-market relief rallies that fail at previous horizontal support levels (now flipped to resistance) or near the descending 50 SMA, and execute Short trades with tight stops.",
    initialBalance: 25000,
    data: [],
    keyTakeaway: "Bear markets descend three times faster than bull markets rise. Protecting capital using strict Stop Losses is the difference between survival and total account liquidation.",
    learningObjectives: [
      "Understand the mechanics and risk profiles of Short Selling",
      "Recognize Bear Market Relief Rallies and failing momentum",
      "Appreciate account drawdowns and survival mathematics",
    ],
  },
  {
    id: "apple-range",
    name: "Apple Side-Channel & Breakout",
    description: "Markets consolidate in flat ranges 70% of the time. Learn to buy the range floor, sell the range ceiling, and ride the high-volume breakout once buyers break the consolidation barrier.",
    asset: "AAPL",
    historicalPeriod: "Mid 2021",
    difficulty: "Beginner",
    strategyName: "Support & Resistance Range Trading",
    strategyDescription: "Buy support bounces when price hits the range bottom (near $100) and RSI is oversold (<30). Take profit at range resistance (near $112). Then, watch for a high-volume breakout to go long.",
    initialBalance: 10000,
    data: [],
    keyTakeaway: "In a sideways market, trend-following moving averages will whip-saw you. Swap to Support/Resistance horizontal channels and momentum oscillators like RSI.",
    learningObjectives: [
      "Spot clean horizontal Support and Resistance bounds",
      "Use RSI Overbought/Oversold thresholds to trade sideways channels",
      "Identify genuine high-volume breakout confirmations",
    ],
  },
  {
    id: "gamestop-momentum",
    name: "The GameStop 2021 Short Squeeze",
    description: "Navigate extreme volatility and hyper-momentum. Witness a historic short squeeze where retail traders overwhelmed massive wall street institutions. Learn to trade using strict MACD crossovers and RSI indicators.",
    asset: "GME",
    historicalPeriod: "January 2021",
    difficulty: "Intermediate",
    strategyName: "MACD Momentum & Divergence",
    strategyDescription: "Track MACD crossovers for momentum confirmation on hyper-volatile assets, and look for Bearish RSI Divergences to time exit targets before the bubble bursts.",
    initialBalance: 5000,
    data: [],
    keyTakeaway: "High-momentum assets can create life-changing wealth in days, but can wipe out your account just as fast. Position sizing and momentum indicators are mandatory protectors.",
    learningObjectives: [
      "Learn to interpret MACD histogram acceleration",
      "Spot extreme RSI readings and identify structural trend fatigue",
      "Scale down trade sizes to survive high-volatility assets",
    ],
  },
  {
    id: "dotcom-bubble",
    name: "The 2000 Dot-Com Bubble Top",
    description: "Spot a major macro top before the market implodes. Learn to recognize Bearish Divergence: where price hits new higher highs but RSI shows weaker buying momentum. Trade the ultimate reversal.",
    asset: "NASDAQ Composite",
    historicalPeriod: "1999-2000",
    difficulty: "Advanced",
    strategyName: "RSI Bearish Divergence Reversals",
    strategyDescription: "Observe the price forming a double top while RSI makes a clear lower peak. Short sell the breakdown below the key neckline support to capture the trend reversal.",
    initialBalance: 20000,
    data: [],
    keyTakeaway: "Climbing price on weaker buying speed is a massive warning sign. Spotting Bearish Divergence keeps you safe from buying bubbles at the absolute top.",
    learningObjectives: [
      "Recognize Bearish and Bullish Divergences between price and oscillators",
      "Identify Double Top patterns and trade 'neckline' breakdowns",
      "Manage risk when counter-trend trading macro bubbles",
    ],
  },
];

// Seed the scenario data on load
scenarios.forEach((s) => {
  s.data = generateScenarioData(s.id);
});
