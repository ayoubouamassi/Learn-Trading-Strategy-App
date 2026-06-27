import { Lesson } from "../types";

export const lessons: Lesson[] = [
  {
    id: "basics-candlesticks",
    title: "Price Action & Candlestick Secrets",
    category: "Basics",
    summary: "Learn to read market sentiment directly from price candles and identify major reversal structures like Hammers and Engulfing patterns.",
    difficulty: "Beginner",
    contentMarkdown: `### The Language of the Market: Price Action

Before indicators, there is **Price Action**. Every price bar tells a story of the battle between **Buyers (Bulls)** and **Sellers (Bears)**. A single candlestick condenses price movement over a specific timeframe into four simple data points:
- **Open**: The starting price of the period.
- **High**: The absolute peak price achieved.
- **Low**: The absolute lowest price achieved.
- **Close**: The final price of the period.

---

### Key Candlestick Reversal Patterns

#### 1. The Hammer (Bullish Reversal)
*   **What it looks like**: A tiny body at the top of the candle with a very long lower shadow (at least 2x the body length) and little-to-no upper shadow.
*   **The Story**: Sellers drove the price down aggressively, but buyers completely rejected the lows, pushing the price back up to close near the open. It signals intense demand at lower prices.
*   **Strategy**: When a Hammer forms at a major **Support Level** after a downtrend, it signals an excellent low-risk buying opportunity. Place your Stop Loss right below the low of the Hammer.

#### 2. The Shooting Star (Bearish Reversal)
*   **What it looks like**: A tiny body at the bottom of the candle with a very long upper shadow and little-to-no lower shadow.
*   **The Story**: Buyers drove the price up high, but sellers completely overwhelmed them, hammering the price back down to close near the open.
*   **Strategy**: When a Shooting Star forms at a major **Resistance Level** after an uptrend, it signals a prime short-selling opportunity. Place your Stop Loss above the wick high.

#### 3. Engulfing Patterns (Bullish & Bearish)
*   **Bullish Engulfing**: A small red (bearish) candle followed by a massive green (bullish) candle that completely "engulfs" the entire body of the previous day. Indicates a violent shift in momentum to the upside.
*   **Bearish Engulfing**: A small green candle followed by a large red candle that completely engulfs it. Signals that sellers have seized complete control of the market.

---

### Identifying Support & Resistance

*   **Support**: A price zone where buyers have historically stepped in, creating a "floor" that prevents the price from falling further.
*   **Resistance**: A price zone where sellers have historically dumped shares, creating a "ceiling" that prevents the price from climbing higher.

> **Pro Tip**: Once a resistance level is broken, it often flips and becomes a new **support level** on future pullbacks!`,
    quizzes: [
      {
        id: "c-q1",
        question: "A candle has a very small body near the open price and a long lower shadow that is three times the body length. What pattern is this?",
        options: [
          "Shooting Star",
          "Hammer",
          "Doji Star",
          "Marubozu"
        ],
        correctAnswerIndex: 1,
        explanation: "This is a Hammer. The long lower shadow indicates that sellers drove the price down but buyers strongly rejected those lower prices, forming a powerful bullish reversal signal."
      },
      {
        id: "c-q2",
        question: "When a historical Resistance level is broken by an aggressive breakout, what does it frequently become in the future?",
        options: [
          "An invalid zone to be ignored",
          "A deeper Resistance level",
          "A new Support level",
          "An immediate short signal"
        ],
        correctAnswerIndex: 2,
        explanation: "Broken resistance frequently flips into support. This is called a 'role reversal' or 'breakout retest' strategy, providing low-risk entries as buyers defend the previous ceiling."
      },
      {
        id: "c-q3",
        question: "What is the psychological signal of a Bearish Engulfing pattern?",
        options: [
          "Indecision and market equilibrium",
          "Complete capitulation of buyers as sellers engulf the entire preceding bullish range",
          "A healthy continuation of an uptrend",
          "A low-volume squeeze"
        ],
        correctAnswerIndex: 1,
        explanation: "A Bearish Engulfing pattern means sellers have fully overwhelmed the buyers of the previous period, signaling a major reversal or structural peak in price momentum."
      }
    ],
    recommendedScenarioId: "apple-range"
  },
  {
    id: "strategies-moving-averages",
    title: "Trend Following & Moving Averages",
    category: "Strategies",
    summary: "Discover the classic trend-following indicator. Learn to ride strong bull runs and filter out sideways noise using SMA crossovers.",
    difficulty: "Beginner",
    contentMarkdown: `### The Trend is Your Friend

In trading, **Trend Following** is the most profitable strategy over the long run. It does not try to predict tops or bottoms; instead, it aims to capture the middle 60-80% of a massive market shift.

The primary tool for trend identification is the **Moving Average (MA)**. It smooths out short-term price fluctuations to reveal the true underlying trend.

---

### SMA vs. EMA

*   **Simple Moving Average (SMA)**: The average close price of the last $N$ periods. Treats all periods equally. Perfect for long-term support/resistance.
*   **Exponential Moving Average (EMA)**: Gives more weight to recent prices. It responds much faster to new price changes, allowing quicker entries but suffering more "false signals" (whip-saws).

---

### Core Moving Average Strategies

#### 1. The Dynamic Support Strategy
In a healthy uptrend, a popular MA (like the **20 EMA** or **50 SMA**) acts as a moving support line.
*   **Entry**: Wait for a strong trend to establish. When the price pulls back and bounces off the **20 EMA** or **50 SMA** with a bullish candlestick (e.g., a Hammer), enter long.
*   **Exit**: Hold the trade as long as the candle close remains above the moving average.

#### 2. The Golden Cross & Death Cross (Crossovers)
This uses two MAs: a fast one (e.g., 9 MA or 50 MA) and a slow one (e.g., 20 MA or 200 MA).
*   **Golden Cross (Bullish)**: When the Fast MA crosses **above** the Slow MA. It indicates momentum is accelerating upwards.
*   **Death Cross (Bearish)**: When the Fast MA crosses **below** the Slow MA. It signals a systemic shift into a bear market.

---

### Avoid the Sideways Whip-saw!
Moving averages work **only in trending markets**. In a sideways or range-bound market, MAs will cross back and forth repeatedly, causing a series of small losses if traded blindly. Use oscillators like RSI to confirm if a market is trending or ranging first.`,
    quizzes: [
      {
        id: "ma-q1",
        question: "Why does an Exponential Moving Average (EMA) react faster to price movements than a Simple Moving Average (SMA)?",
        options: [
          "It excludes weekends and gaps",
          "It gives exponentially higher mathematical weight to the most recent price data",
          "It is calculated on High prices rather than Closes",
          "It uses a longer period calculation"
        ],
        correctAnswerIndex: 1,
        explanation: "The EMA places greater weighting on the most recent data points, making it adapt faster to sudden trend changes but slightly more prone to whip-saws."
      },
      {
        id: "ma-q2",
        question: "What is a 'Golden Cross' in technical analysis?",
        options: [
          "When the price crosses above $100",
          "When a faster moving average crosses above a slower moving average",
          "When the RSI crosses above 70",
          "When volume doubles on a flat close"
        ],
        correctAnswerIndex: 1,
        explanation: "A Golden Cross occurs when a short-term MA (like the 50 SMA) crosses above a long-term MA (like the 200 SMA), indicating a powerful shift into a long-term bull market."
      },
      {
        id: "ma-q3",
        question: "In what type of market condition do Moving Average crossover strategies perform poorly?",
        options: [
          "Strong Uptrend",
          "Strong Bear Market",
          "Chop or Range-Bound Sideways Market",
          "High volume breakouts"
        ],
        correctAnswerIndex: 2,
        explanation: "In flat, sideways markets, moving averages repeatedly cross back and forth (known as 'whip-sawing'), which generates costly false signals."
      }
    ],
    recommendedScenarioId: "bitcoin-trend"
  },
  {
    id: "strategies-oscillators",
    title: "Momentum & Oscillators (RSI & MACD)",
    category: "Strategies",
    summary: "Master oscillators to spot overextended markets, profit in range-bound assets, and identify powerful momentum shifts through divergences.",
    difficulty: "Intermediate",
    contentMarkdown: `### Measuring the Speed of Price: Momentum

While moving averages show the *direction* of the trend, **Momentum Indicators (Oscillators)** measure the *velocity* or speed of price changes. They are bound within a specific range (e.g., 0 to 100 for RSI) and help identify when a trend is running out of steam.

---

### Relative Strength Index (RSI)

RSI measures the ratio of upward changes to downward changes over 14 periods.
*   **Overbought (RSI > 70)**: The asset has rallied too fast and is historically overextended. It doesn't mean you should immediately sell short, but it warns that buying now is extremely risky.
*   **Oversold (RSI < 30)**: The asset has crashed too fast and is overextended to the downside. It warns that a relief bounce is likely.

#### Trading Ranges with RSI
In a sideways market (bounded by Support & Resistance):
-   Buy when price hits Support **AND** RSI is under 30.
-   Sell when price hits Resistance **AND** RSI is over 70.

---

### The Holy Grail: Divergence

A **Divergence** occurs when the price action makes a new peak/trough, but the indicator fails to confirm it. This is the single most powerful warning of an impending market reversal.

#### 1. Bullish Divergence (Buy Signal)
*   **Price**: Makes a **Lower Low**.
*   **RSI**: Makes a **Higher Low**.
*   **Meaning**: Even though the price fell further, the selling velocity is actually weaker. Sellers are exhausted; a massive bounce is coming.

#### 2. Bearish Divergence (Sell/Short Signal)
*   **Price**: Makes a **Higher High**.
*   **RSI**: Makes a **Lower High**.
*   **Meaning**: The rally has lost its velocity. Buyers are running out of cash, and a correction is imminent.

---

### MACD (Moving Average Convergence Divergence)

The MACD consists of:
1.  **MACD Line**: (12 EMA - 26 EMA). Shows momentum speed.
2.  **Signal Line**: 9 EMA of the MACD.
3.  **Histogram**: Visualizes the distance between the MACD and Signal lines.
*   **Entry Rule**: Buy when the MACD Line crosses **above** the Signal Line (bullish momentum). Sell/Short when the MACD Line crosses **below** the Signal Line (bearish momentum).`,
    quizzes: [
      {
        id: "osc-q1",
        question: "If an asset's price makes a new higher high, but the RSI makes a lower high, what technical structure has formed?",
        options: [
          "Bullish Divergence",
          "Bearish Divergence",
          "Golden Crossover",
          "Trend Continuation"
        ],
        correctAnswerIndex: 1,
        explanation: "This is a Bearish Divergence. It shows that although the price climbed higher, the underlying momentum and buying speed decreased, signifying a major trend reversal warning."
      },
      {
        id: "osc-q2",
        question: "What does an RSI reading of 85 indicate about an asset?",
        options: [
          "The asset is severely oversold and an upward explosion is guaranteed",
          "The asset has strong bearish trend momentum",
          "The asset is historically overbought and overextended, warning against new long entries",
          "The asset is in a squeeze with zero volatility"
        ],
        correctAnswerIndex: 2,
        explanation: "An RSI above 70 (in this case 85) means the asset is heavily overbought. While the price can continue to rise, buying at these levels offers very poor risk-to-reward because the trend is overextended."
      },
      {
        id: "osc-q3",
        question: "How do you trade a MACD crossover?",
        options: [
          "Buy when MACD crosses below the zero line",
          "Buy when the MACD line crosses above the Signal line, and sell when it crosses below the Signal line",
          "Sell when the histogram turns green",
          "Only buy when RSI and MACD are both at 50"
        ],
        correctAnswerIndex: 1,
        explanation: "A classic MACD strategy is to buy when the MACD line crosses above the Signal line, and sell or go short when it crosses below the Signal line, riding the momentum wave."
      }
    ],
    recommendedScenarioId: "gamestop-momentum"
  },
  {
    id: "risk-management",
    title: "Risk Management & Sizing",
    category: "Risk Management",
    summary: "The professional secret: Why high win rates are a trap. Learn to calculate trade sizes and use stop losses mathematically like a hedge fund.",
    difficulty: "Advanced",
    contentMarkdown: `### The Golden Secret of Professional Trading

Amateur traders obsess over *which stock to buy* and *win rate*.
**Professional traders obsess over Risk Management, Stop Losses, and Trade Sizing.**

You can have a terrible **40% win rate** and still become immensely wealthy if your average win is $3.00 for every $1.00 you lose. Conversely, a **90% win rate** will bankrupt you if your 10% losses are 20 times larger than your average win.

---

### The 1% Rule of Account Protection

Never, under any circumstances, risk more than **1% to 2%** of your total account capital on a single trade.
*   **Risking 10% per trade**: It takes only 5 consecutive losses to destroy **50%** of your account. To recover from a 50% drawdown, you need a **100% gain** just to break even!
*   **Risking 1% per trade**: After 5 consecutive losses, you have lost only **5%** of your capital, and require just a **5.2% gain** to break even.

---

### Calculating Your Position Size Mathematically

Position sizing is not arbitrary. It is a precise formula based on your stop-loss distance:

$$\\text{Position Size (Units)} = \\frac{\\text{Account Capital} \\times \\text{Account Risk \\%}}{\\text{Entry Price} - \\text{Stop Loss Price}}$$

#### Example:
*   **Account Balance**: $10,000
*   **Risk Limit**: 1% ($100 risk)
*   **Stock Price**: $100
*   **Your Stop Loss (Support)**: $95 (distance of $5 per share)
*   **Calculation**: $\\frac{\\text{\\$100}}{\\text{\\$5}} = 20 \\text{ shares}$
*   **Total Position Value**: $2,000 (20 shares $\\times$ $100)
*   *If the stock drops to your stop loss of $95, you lose exactly $100 (1% of your account). You protected 99% of your capital!*

---

### The Power of Risk-to-Reward (R:R) Ratio

Always look for trades with a **minimum Risk-to-Reward ratio of 1:2**.
*   **Risk**: $1.00 (the distance to your Stop Loss)
*   **Reward**: $2.00 (the distance to your target Resistance)

If you maintain a 1:2 R:R ratio, you only need to be right **34% of the time** to break even. If you maintain a 1:3 R:R ratio, you only need to be right **26% of the time** to make money!

---

### The Three Sacred Pillars of a Trade
Before entering any trade, you MUST know:
1.  **Entry Price**: Where you buy or sell.
2.  **Stop Loss**: The price where you admit you are wrong and exit immediately to protect capital.
3.  **Take Profit**: The logical resistance target where you exit to secure your hard-earned gains.`,
    quizzes: [
      {
        id: "rm-q1",
        question: "If you have a $50,000 trading account and follow the 1% risk rule, what is the maximum dollar amount you should lose on any single trade?",
        options: [
          "$5,000",
          "$1,000",
          "$500",
          "$100"
        ],
        correctAnswerIndex: 2,
        explanation: "1% of $50,000 is $500. This is your maximum loss on a single trade. If your stop loss is hit, you lose exactly this amount, keeping your portfolio perfectly safe."
      },
      {
        id: "rm-q2",
        question: "Your account is $10,000. You want to buy Bitcoin at $40,000, with a stop loss at $38,000. Under the 1% risk rule, how much BTC size should you purchase?",
        options: [
          "0.05 BTC",
          "0.10 BTC",
          "0.25 BTC",
          "1.00 BTC"
        ],
        correctAnswerIndex: 0,
        explanation: "Account risk is 1% ($100). The price distance to your stop loss is $40,000 - $38,000 = $2,000. Position size = Risk / Distance = $100 / $2,000 = 0.05 BTC. Buying 0.05 BTC costs $2,000 in total value, but risks exactly $100 of your account."
      },
      {
        id: "rm-q3",
        question: "Why is a 1:3 Risk-to-Reward ratio mathematically superior to a 1:1 ratio?",
        options: [
          "It guarantees that you win 75% of your trades",
          "It is required by retail brokers",
          "It allows you to remain highly profitable even if you lose 60% of your trades",
          "It eliminates the need for Stop Losses"
        ],
        correctAnswerIndex: 2,
        explanation: "With a 1:3 R:R ratio, your wins are 3 times larger than your losses. This means even with a poor 40% win rate (losing 60% of trades), you will be highly profitable because 4 wins generate $12, while 6 losses cost only $6, resulting in a net profit!"
      }
    ],
    recommendedScenarioId: "crash-2008"
  }
];
