/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Lesson, QuizQuestion } from "../types";
import { LanguageCode } from "./translations";
import { lessonContentTranslations } from "./lessonTranslations";
import { quizTranslations } from "./quizTranslations";

// Base english lessons with mathematical formulas formatted cleanly
export const englishLessons: Lesson[] = [
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
        options: ["Shooting Star", "Hammer", "Doji Star", "Marubozu"],
        correctAnswerIndex: 1,
        explanation: "This is a Hammer. The long lower shadow indicates that sellers drove the price down but buyers strongly rejected those lower prices, forming a powerful bullish reversal signal."
      },
      {
        id: "c-q2",
        question: "When a historical Resistance level is broken by an aggressive breakout, what does it frequently become in the future?",
        options: ["An invalid zone to be ignored", "A deeper Resistance level", "A new Support level", "An immediate short signal"],
        correctAnswerIndex: 2,
        explanation: "Broken resistance frequently flips into support. This is called a 'role reversal' or 'breakout retest' strategy, providing low-risk entries as buyers defend the previous ceiling."
      },
      {
        id: "c-q3",
        question: "What is the psychological signal of a Bearish Engulfing pattern?",
        options: ["Indecision and market equilibrium", "Complete capitulation of buyers as sellers engulf the entire preceding bullish range", "A healthy continuation of an uptrend", "A low-volume squeeze"],
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
        options: ["It excludes weekends and gaps", "It gives exponentially higher mathematical weight to the most recent price data", "It is calculated on High prices rather than Closes", "It uses a longer period calculation"],
        correctAnswerIndex: 1,
        explanation: "The EMA places greater weighting on the most recent data points, making it adapt faster to sudden trend changes but slightly more prone to whip-saws."
      },
      {
        id: "ma-q2",
        question: "What is a 'Golden Cross' in technical analysis?",
        options: ["When the price crosses above $100", "When a faster moving average crosses above a slower moving average", "When the RSI crosses above 70", "When volume doubles on a flat close"],
        correctAnswerIndex: 1,
        explanation: "A Golden Cross occurs when a short-term MA (like the 50 SMA) crosses above a long-term MA (like the 200 SMA), indicating a powerful shift into a long-term bull market."
      },
      {
        id: "ma-q3",
        question: "In what type of market condition do Moving Average crossover strategies perform poorly?",
        options: ["Strong Uptrend", "Strong Bear Market", "Chop or Range-Bound Sideways Market", "High volume breakouts"],
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
        options: ["Bullish Divergence", "Bearish Divergence", "Golden Crossover", "Trend Continuation"],
        correctAnswerIndex: 1,
        explanation: "This is a Bearish Divergence. It shows that although the price climbed higher, the underlying momentum and buying speed decreased, signifying a major trend reversal warning."
      },
      {
        id: "osc-q2",
        question: "What does an RSI reading of 85 indicate about an asset?",
        options: ["The asset is severely oversold and an upward explosion is guaranteed", "The asset has strong bearish trend momentum", "The asset is historically overbought and overextended, warning against new long entries", "The asset is in a squeeze with zero volatility"],
        correctAnswerIndex: 2,
        explanation: "An RSI above 70 (in this case 85) means the asset is heavily overbought. While the price can continue to rise, buying at these levels offers very poor risk-to-reward because the trend is overextended."
      },
      {
        id: "osc-q3",
        question: "How do you trade a MACD crossover?",
        options: ["Buy when MACD crosses below the zero line", "Buy when the MACD line crosses above the Signal line, and sell when it crosses below the Signal line", "Sell when the histogram turns green", "Only buy when RSI and MACD are both at 50"],
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
*   **Calculation**: $$\\text{Units} = \\frac{10000 \\times 1\\%}{100 - 95} = \\frac{100}{5} = 20\\text{ shares}$$
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
        options: ["$5,000", "$1,000", "$500", "$100"],
        correctAnswerIndex: 2,
        explanation: "1% of $50,000 is $500. This is your maximum loss on a single trade. If your stop loss is hit, you lose exactly this amount, keeping your portfolio perfectly safe."
      },
      {
        id: "rm-q2",
        question: "Your account is $10,000. You want to buy Bitcoin at $40,000, with a stop loss at $38,000. Under the 1% risk rule, how much BTC size should you purchase?",
        options: ["0.05 BTC", "0.10 BTC", "0.25 BTC", "1.00 BTC"],
        correctAnswerIndex: 0,
        explanation: "Account risk is 1% ($100). The price distance to your stop loss is $40,000 - $38,000 = $2,000. Position size = Risk / Distance = $100 / $2,000 = 0.05 BTC."
      },
      {
        id: "rm-q3",
        question: "Why is a 1:3 Risk-to-Reward ratio mathematically superior to a 1:1 ratio?",
        options: ["It guarantees that you win 75% of your trades", "It is required by retail brokers", "It allows you to remain highly profitable even if you lose 60% of your trades", "It eliminates the need for Stop Losses"],
        correctAnswerIndex: 2,
        explanation: "With a 1:3 R:R ratio, your wins are 3 times larger than your losses. This means even with a poor 40% win rate (losing 60% of trades), you will be highly profitable because 4 wins generate $12, while 6 losses cost only $6."
      }
    ],
    recommendedScenarioId: "crash-2008"
  },
  {
    id: "math-expected-value-kelly",
    title: "Expected Value & Kelly Criterion",
    category: "Risk Management",
    summary: "Master the ultimate quantitative formulas of professional finance. Learn to mathematically model your trading edge and optimize leverage.",
    difficulty: "Advanced",
    contentMarkdown: `### Quantifying Your Edge: Expected Value (EV)

In trading, having an "edge" means that if you execute your strategy over a large sample of trades, the net result is positive. We calculate this mathematically using **Expected Value (EV)**:

$$EV = (P_{win} \\times \\text{Avg Win}) - (P_{loss} \\times \\text{Avg Loss})$$

Where:
- $P_{win}$ is the probability of a winning trade (Win Rate).
- $P_{loss}$ is the probability of a losing trade ($1 - P_{win}$).
- $\\text{Avg Win}$ is the average dollar profit from winning trades.
- $\\text{Avg Loss}$ is the average dollar loss from losing trades.

If $EV > 0$, the strategy is mathematically sound and will accumulate wealth over time. If $EV < 0$, you are playing a losing game (like casino roulette) and will eventually go bankrupt, regardless of short-term streaks.

---

### Optimal Capital Allocation: The Kelly Criterion

Once you have a positive Expected Value, how much of your capital should you risk on each trade?
If you risk too little, your account grows slowly. If you risk too much, a single bad luck streak can wipe you out completely.

The mathematical solution is **The Kelly Criterion**:

$$f^* = \\frac{p \\times (b + 1) - 1}{b}$$

Where:
- $f^*$ is the fraction of your current portfolio capital to allocate to the trade.
- $p$ is your probability of winning ($P_{win}$).
- $b$ is your payout ratio, calculated as:
$$\\text{Ratio (b)} = \\frac{\\text{Avg Win}}{\\text{Avg Loss}}$$

#### Critical Rules of Kelly:
1. **Half-Kelly Sizing**: Because market conditions change and historical parameters can be noisy, professionals rarely use the full Kelly fraction. Instead, they use a **Half-Kelly** model ($f^* / 2$) to significantly reduce volatility and drawdown risk while retaining 75%+ of the growth speed.
2. **Negative Kelly**: If the formula gives a negative value, it means you have no edge ($EV < 0$). In this case, the mathematically optimal action is to **not trade** ($0\\%$ allocation).`,
    quizzes: [
      {
        id: "evk-q1",
        question: "A system has a 55% win rate. The average winning trade is $400 and the average losing trade is $200. What is the Expected Value (EV) per trade?",
        options: ["$130.00", "$80.00", "$110.00", "$150.00"],
        correctAnswerIndex: 0,
        explanation: "Using EV = (0.55 * 400) - (0.45 * 200) = 220 - 90 = $130. This positive expected value guarantees long-term returns over a large series of executions."
      },
      {
        id: "evk-q2",
        question: "Under the Kelly Criterion, if your win rate is 50% and your average win is twice your average loss (payoff ratio b = 2), what is the optimal fraction (f*) to risk?",
        options: ["12.5%", "25.0%", "33.3%", "50.0%"],
        correctAnswerIndex: 1,
        explanation: "Kelly f* = (0.50 * (2 + 1) - 1) / 2 = (1.5 - 1) / 2 = 0.50 / 2 = 25%. Thus, the mathematically optimal fraction to risk is 25.0% of your account."
      }
    ],
    recommendedScenarioId: "bitcoin-trend"
  },
  {
    id: "math-ruin-drawdowns",
    title: "Risk of Ruin & Drawdown Math",
    category: "Risk Management",
    summary: "Analyze the harsh realities of account drawdowns. Learn why recovering capital requires exponential gains and how to mathematically insulate yourself.",
    difficulty: "Advanced",
    contentMarkdown: `### The Exponential Trap: Drawdown Recovery

Amateur traders often believe a 50% loss can be fixed with a 50% gain. This is a fatal mathematical misconception.
When you lose capital, you have fewer dollars to trade with. The recovery percentage required scales asymmetrically:

$$\\text{Recovery Gain \\%} = \\frac{D}{100 - D} \\times 100$$

Where $D$ is the percentage drawdown loss.

| Drawdown Loss | Recovery Gain Required |
|---|---|
| **10%** | **11.1%** |
| **20%** | **25.0%** |
| **30%** | **42.9%** |
| **50%** | **100.0%** |
| **75%** | **300.0%** |
| **90%** | **900.0%** |

Once your drawdown passes **50%**, the difficulty of escaping the hole grows exponentially. This is why preserving capital is infinitely more important than chasing huge wins.

---

### The Probability of Ruin

Your "Risk of Ruin" is the probability that your trading account hits zero (or a point of no return).
If your strategy has an edge, the risk of ruin is determined entirely by your **trade size** (the percentage of capital risked per trade).

The simplified formula for Risk of Ruin is:

$$\\text{Risk of Ruin} = \\left(\\frac{1 - A}{1 + A}\\right)^N$$

Where:
- $A$ is your edge advantage ($P_{win} - P_{loss}$).
- $N$ is the number of trading units (e.g., losing trades) required to blow up the account.

If you risk **10%** per trade, you can tolerate only $N = 10$ consecutive losses before ruin. If you risk **1%** per trade, you can tolerate $N = 100$ consecutive losses.
Because bad luck streaks are statistically guaranteed to happen over hundreds of trades, increasing your risk percentage from 1% to 10% multiplies your Risk of Ruin exponentially!`,
    quizzes: [
      {
        id: "rod-q1",
        question: "If a trader suffers a severe drawdown loss of 75% of their starting capital, what percentage return must they achieve on the remaining capital to break even?",
        options: ["75%", "150%", "200%", "300%"],
        correctAnswerIndex: 3,
        explanation: "A drawdown of 75% requires a massive 300% recovery gain. Formula: 75 / (100 - 75) * 100 = 75 / 25 * 100 = 300%."
      },
      {
        id: "rod-q2",
        question: "How does increasing your risk per trade from 1% to 5% impact your Risk of Ruin over a long trading career?",
        options: ["It increases linearly by 5x", "It does not change if your win rate is high", "It increases exponentially because the number of loss units to trigger ruin (N) drops drastically", "It decreases the risk of ruin by speeding up gains"],
        correctAnswerIndex: 2,
        explanation: "Risk of Ruin scales exponentially. Reducing the buffer units N from 100 to 20 dramatically elevates the probability that a random bad streak wipes out the portfolio."
      }
    ],
    recommendedScenarioId: "crash-2008"
  }
];

// Helper to translate core metadata for non-English languages to keep the file light and highly performing
export const getLocalizedLessons = (lang: LanguageCode): Lesson[] => {
  if (lang === "en") return englishLessons;

  // Dictionary of translations for titles, summaries, and categories
  const tDict: Record<LanguageCode, {
    categories: Record<string, string>;
    titles: Record<string, string>;
    summaries: Record<string, string>;
    quizzes: Record<string, { question: string; options: string[]; explanation: string }[]>;
  }> = {
    en: { categories: {}, titles: {}, summaries: {}, quizzes: {} }, // Handled
    es: {
      categories: { "Basics": "Conceptos Básicos", "Strategies": "Estrategias", "Risk Management": "Gestión de Riesgo" },
      titles: {
        "basics-candlesticks": "Secretos de la Acción del Precio y Velas",
        "strategies-moving-averages": "Seguimiento de Tendencias y Medias Móviles",
        "strategies-oscillators": "Momentum y Osciladores (RSI y MACD)",
        "risk-management": "Gestión del Riesgo y Dimensionamiento",
        "math-expected-value-kelly": "Valor Esperado y Criterio de Kelly",
        "math-ruin-drawdowns": "Riesgo de Ruina y Matemáticas del Drawdown"
      },
      summaries: {
        "basics-candlesticks": "Aprenda a leer el sentimiento del mercado directamente de las velas de precios e identifique patrones de reversión clave.",
        "strategies-moving-averages": "Descubra el clásico indicador de seguimiento de tendencias. Aprenda a surfear mercados alcistas y filtrar el ruido lateral.",
        "strategies-oscillators": "Domine osciladores para detectar mercados sobreextendidos, operar en rangos y detectar giros con divergencias.",
        "risk-management": "El secreto profesional: por qué las altas tasas de acierto son una trampa. Calcule el tamaño de su posición como un fondo de cobertura.",
        "math-expected-value-kelly": "Domine las fórmulas cuantitativas definitivas. Modele matemáticamente su ventaja y optimice su apalancamiento.",
        "math-ruin-drawdowns": "Analice las duras realidades de los drawdowns. Aprenda por qué la recuperación requiere ganancias exponenciales."
      },
      quizzes: {
        "basics-candlesticks": [
          { question: "Una vela tiene un cuerpo muy pequeño cerca del precio de apertura y una larga sombra inferior que triplica el cuerpo. ¿Qué patrón es?", options: ["Estrella Fugaz", "Martillo (Hammer)", "Estrella Doji", "Marubozu"], explanation: "Esto es un Martillo. La larga sombra inferior indica que los vendedores empujaron el precio hacia abajo pero los compradores rechazaron con fuerza, formando una fuerte señal de reversión alcista." },
          { question: "Cuando una resistencia histórica se rompe por una ruptura agresiva, ¿en qué se convierte frecuentemente en el futuro?", options: ["Una zona inválida", "Una resistencia más profunda", "Un nuevo nivel de Soporte", "Una señal corta inmediata"], explanation: "La resistencia rota con frecuencia se convierte en soporte. Esto se llama estrategia de 'retest de ruptura' o inversión de roles." },
          { question: "¿Cuál es la señal psicológica de un patrón Envolvente Bajista?", options: ["Indecisión", "Capitulación de compradores ya que los vendedores envuelven todo el rango anterior", "Continuación alcista sana", "Exprimir volumen bajo"], explanation: "Una vela envolvente bajista significa que los vendedores han abrumado por completo a los compradores del período anterior, indicando un giro de momentum." }
        ],
        "strategies-moving-averages": [
          { question: "¿Por qué una Media Móvil Exponencial (EMA) reacciona más rápido que una Media Móvil Simple (SMA)?", options: ["Excluye fines de semana", "Da mayor peso matemático a los precios más recientes", "Se calcula con los precios altos", "Usa un período más largo"], explanation: "La EMA da mayor peso a los datos más recientes, adaptándose más rápido pero siendo ligeramente más propensa a señales falsas." }
        ],
        "strategies-oscillators": [
          { question: "Si el precio hace un nuevo máximo más alto, pero el RSI hace un máximo más bajo, ¿qué estructura se ha formado?", options: ["Divergencia Alcista", "Divergencia Bajista", "Cruce Dorado", "Continuación de Tendencia"], explanation: "Es una Divergencia Bajista. Indica que aunque el precio subió, la velocidad de compra disminuyó, advirtiendo un giro inminente." }
        ],
        "risk-management": [
          { question: "Si tiene una cuenta de $50,000 y sigue la regla de riesgo del 1%, ¿cuál es el monto máximo que debe perder en una sola operación?", options: ["$5,000", "$1,000", "$500", "$100"], explanation: "El 1% de $50,000 es $500. Este es su límite máximo de pérdida para proteger su capital de rachas adversas." }
        ],
        "math-expected-value-kelly": [
          { question: "Un sistema tiene un 55% de acierto. La ganancia promedio es $400 y la pérdida promedio es $200. ¿Cuál es el Valor Esperado (EV)?", options: ["$130.00", "$80.00", "$110.00", "$150.00"], explanation: "EV = (0.55 * 400) - (0.45 * 200) = 220 - 90 = $130. Al ser positivo, garantiza ganancias a largo plazo." }
        ],
        "math-ruin-drawdowns": [
          { question: "Si un operador sufre un drawdown del 75%, ¿qué rendimiento requiere en el capital restante para volver al punto de partida?", options: ["75%", "150%", "200%", "300%"], explanation: "Un drawdown del 75% requiere una ganancia del 300%. Fórmula: 75 / (100 - 75) * 100 = 300%." }
        ]
      }
    },
    fr: {
      categories: { "Basics": "Bases", "Strategies": "Stratégies", "Risk Management": "Gestion des Risques" },
      titles: {
        "basics-candlesticks": "Secrets de l'Action des Prix & Chandeliers",
        "strategies-moving-averages": "Suivi de Tendance & Moyennes Mobiles",
        "strategies-oscillators": "Momentum & Oscillateurs (RSI & MACD)",
        "risk-management": "Gestion des Risques & Dimensionnement",
        "math-expected-value-kelly": "Espérance Mathématique & Critère de Kelly",
        "math-ruin-drawdowns": "Risque de Ruine & Mathématiques du Drawdown"
      },
      summaries: {
        "basics-candlesticks": "Apprenez à lire le sentiment du marché directement depuis les bougies et identifiez les structures de retournement majeures.",
        "strategies-moving-averages": "Découvrez le classique indicateur de suivi de tendance. Apprenez à surfer sur les vagues haussières.",
        "strategies-oscillators": "Maîtrisez les oscillateurs pour repérer les marchés surachetés/sursaturés et profitez des divergences.",
        "risk-management": "Le secret professionnel: pourquoi les taux de réussite élevés sont un piège. Calculez vos tailles de position.",
        "math-expected-value-kelly": "Maîtrisez les formules quantitatives. Modélisez votre avantage mathématique et optimisez l'effet de levier.",
        "math-ruin-drawdowns": "Analysez la dure réalité des drawdowns. Découvrez pourquoi la récupération nécessite des gains exponentiels."
      },
      quizzes: {
        "basics-candlesticks": [
          { question: "Une bougie présente un très petit corps près de l'ouverture et une longue mèche inférieure faisant 3 fois sa taille. Quel est ce motif?", options: ["Étoile filante", "Marteau (Hammer)", "Doji", "Marubozu"], explanation: "C'est un Marteau. La longue mèche inférieure montre que les vendeurs ont poussé les prix bas, mais les acheteurs ont vigoureusement rejeté ces niveaux." }
        ],
        "strategies-moving-averages": [
          { question: "Pourquoi la moyenne mobile exponentielle (EMA) réagit-elle plus vite aux prix que la moyenne mobile simple (SMA)?", options: ["Elle exclut les week-ends", "Elle attribue un poids mathématique supérieur aux prix les plus récents", "Elle utilise les cours les plus hauts", "Elle utilise une période plus longue"], explanation: "L'EMA accorde plus d'importance aux données récentes, ce qui la rend plus réactive mais parfois sujette aux faux signaux." }
        ],
        "strategies-oscillators": [],
        "risk-management": [],
        "math-expected-value-kelly": [],
        "math-ruin-drawdowns": []
      }
    },
    de: {
      categories: { "Basics": "Grundlagen", "Strategies": "Strategien", "Risk Management": "Risikomanagement" },
      titles: {
        "basics-candlesticks": "Price Action & Candlestick-Geheimnisse",
        "strategies-moving-averages": "Trendfolge & Gleitende Durchschnitte",
        "strategies-oscillators": "Momentum & Oszillatoren (RSI & MACD)",
        "risk-management": "Risikomanagement & Positionsgröße",
        "math-expected-value-kelly": "Erwartungswert & Kelly-Kriterium",
        "math-ruin-drawdowns": "Ruinrisiko & Drawdown-Mathematik"
      },
      summaries: {
        "basics-candlesticks": "Lernen Sie die Marktstimmung direkt aus Preiskerzen zu lesen und wichtige Umkehrstrukturen zu identifizieren.",
        "strategies-moving-averages": "Entdecken Sie den klassischen Trendfolge-Indikator. Lernen Sie, starke Bullruns zu reiten.",
        "strategies-oscillators": "Meistern Sie Oszillatoren, um überkaufte Märkte zu erkennen und starke Dynamikwechsel zu handeln.",
        "risk-management": "Das Geheimnis der Profis: Warum hohe Winrates eine Falle sind. Berechnen Sie Positionsgrößen exakt.",
        "math-expected-value-kelly": "Meistern Sie die ultimativen quantitativen Formeln. Modellieren Sie Ihren Vorteil und optimieren Sie die Allokation.",
        "math-ruin-drawdowns": "Analysieren Sie die harte Realität von Drawdowns. Verstehen Sie, warum die Erholung exponentielle Gewinne erfordert."
      },
      quizzes: {
        "basics-candlesticks": [
          { question: "Eine Kerze hat einen sehr kleinen Körper nahe dem Eröffnungskurs und einen langen unteren Schatten. Welches Muster ist das?", options: ["Shooting Star", "Hammer", "Doji Star", "Marubozu"], explanation: "Dies ist ein Hammer. Er signalisiert eine starke Ablehnung tieferer Preise durch die Käufer und gilt als bullisches Umkehrsignal." }
        ],
        "strategies-moving-averages": [],
        "strategies-oscillators": [],
        "risk-management": [],
        "math-expected-value-kelly": [],
        "math-ruin-drawdowns": []
      }
    },
    ar: {
      categories: { "Basics": "الأساسيات", "Strategies": "الاستراتيجيات", "Risk Management": "إدارة المخاطر" },
      titles: {
        "basics-candlesticks": "أسرار حركة السعر والشموع اليابانية",
        "strategies-moving-averages": "تتبع الاتجاه والمتوسطات المتحركة",
        "strategies-oscillators": "الزخم والمذبذبات (RSI & MACD)",
        "risk-management": "إدارة المخاطر وتحديد حجم الصفقات",
        "math-expected-value-kelly": "القيمة المتوقعة ومعيار كيلي",
        "math-ruin-drawdowns": "مخاطر الإفلاس ورياضيات التراجع"
      },
      summaries: {
        "basics-candlesticks": "تعلم قراءة معنويات السوق مباشرة من شموع الأسعار وتحديد هياكل الانعكاس الرئيسية مثل المطرقة والابتلاع.",
        "strategies-moving-averages": "اكتشف مؤشر تتبع الاتجاه الكلاسيكي. تعلم ركوب موجات الصعود القوية وتصفية الضوضاء الجانبية.",
        "strategies-oscillators": "احترف استخدام المذبذبات لتحديد الأسواق المفرطة في الشراء أو البيع ورصد الانعكاسات عبر الانحرافات.",
        "risk-management": "السر الاحترافي: لماذا تعد معدلات الفوز العالية فخاً. تعلم حساب حجم الصفقة رياضياً مثل صناديق التحوط.",
        "math-expected-value-kelly": "احترف المعادلات الكمية النهائية لتمويل المحترفين. نمذج ميزتك التنافسية رياضياً وحسن رافعتك المالية.",
        "math-ruin-drawdowns": "حلل الحقائق القاسية لتراجعات الحساب. تعلم لماذا يتطلب استرداد رأس المال أرباحاً أسية وكيف تحمي نفسك."
      },
      quizzes: {
        "basics-candlesticks": [
          { question: "شمعة لها جسم صغير جداً بالقرب من سعر الافتتاح وظل سفلي طويل يعادل ثلاثة أضعاف حجم الجسم. ما هذا النموذج؟", options: ["الشهاب (Shooting Star)", "المطرقة (Hammer)", "دوجي", "ماروبوزو"], explanation: "هذه هي المطرقة. يشير الظل السفلي الطويل إلى أن البائعين دفعوا السعر لأسفل ولكن المشترين رفضوا ذلك بقوة، مما يشكل إشارة انعكاس صعودية قوية." }
        ],
        "strategies-moving-averages": [],
        "strategies-oscillators": [],
        "risk-management": [],
        "math-expected-value-kelly": [],
        "math-ruin-drawdowns": []
      }
    },
    ja: {
      categories: { "Basics": "基礎知識", "Strategies": "取引戦略", "Risk Management": "リスク管理" },
      titles: {
        "basics-candlesticks": "プライスアクションとローソク足の秘密",
        "strategies-moving-averages": "トレンドフォローと移動平均線",
        "strategies-oscillators": "モメンタムとオシレーター (RSI & MACD)",
        "risk-management": "リスク管理とポジションサイジング",
        "math-expected-value-kelly": "期待値とケリー基準",
        "math-ruin-drawdowns": "破産の危機とドローダウンの数学"
      },
      summaries: {
        "basics-candlesticks": "ローソク足から直接市場の心理を読み解き、ハンマーや包み足などの主要な反転シグナルを特定する方法を学びます。",
        "strategies-moving-averages": "古典的なトレンドフォロー指標である移動平均線をマスターし、強い上昇トレンドに乗り、レンジ相場のノイズを排除します。",
        "strategies-oscillators": "オシレーターを使って買われすぎや売られすぎを判断し、ダイバージェンスから強力なトレンド反転を見極めます。",
        "risk-management": "プロの絶対的秘密：高い勝率がなぜ罠なのか。ヘッジファンドのように数学的に取引サイズを算出します。",
        "math-expected-value-kelly": "プロ金融の究極の定量的数式をマスター。自らの取引エッジを数学的にモデル化し、資金配分を最適化します。",
        "math-ruin-drawdowns": "資金減少（ドローダウン）の過酷な現実を分析。失った資金の回復に指数関数的な利益が必要な理由を解き明かします。"
      },
      quizzes: {
        "basics-candlesticks": [
          { question: "始値の近くに非常に小さな実体があり、実体の3倍以上の長さの下ひげを持つローソク足はどのパターンですか？", options: ["シューティングスター", "ハンマー（カラカサ）", "十字線（ドージ）", "大陽線/大陰線"], explanation: "これはハンマーです。長い下ひげは売り手が価格を押し下げたものの、買い手が強く押し戻したことを示し、強力な買いの反転シグナルとなります。" }
        ],
        "strategies-moving-averages": [],
        "strategies-oscillators": [],
        "risk-management": [],
        "math-expected-value-kelly": [],
        "math-ruin-drawdowns": []
      }
    },
    zh: {
      categories: { "Basics": "基础知识", "Strategies": "交易策略", "Risk Management": "风险管理" },
      titles: {
        "basics-candlesticks": "价格行为与K线形态秘籍",
        "strategies-moving-averages": "趋势跟踪与移动平均线",
        "strategies-oscillators": "动量指标与振荡器 (RSI & MACD)",
        "risk-management": "风险管理与仓位控制",
        "math-expected-value-kelly": "数学期望值与凯利公式",
        "math-ruin-drawdowns": "破产风险与回撤数学"
      },
      summaries: {
        "basics-candlesticks": "学会直接通过K线图读取市场情绪，并识别锤子线和吞没形态等重大反转结构。",
        "strategies-moving-averages": "探索经典的趋势跟踪指标。学习如何骑上强劲的牛市，并过滤掉震荡市的噪音。",
        "strategies-oscillators": "掌握振荡器以捕捉过度延伸的市场，在区间震荡中获利，并利用背离识别动量反转。",
        "risk-management": "专业操盘手的秘密：为什么高胜率是陷阱。像对冲基金一样，用数学公式精确计算仓位。",
        "math-expected-value-kelly": "掌控专业量化金融的终极公式。对你的交易优势进行数学建模，并优化杠杆比例。",
        "math-ruin-drawdowns": "剖析账户回撤的残酷数学事实。了解为什么资金恢复需要指数级增长的利润。"
      },
      quizzes: {
        "basics-candlesticks": [
          { question: "一个K线的实体非常小且靠近开盘价，而下影线的长度是实体的三倍。这是什么形态？", options: ["流星线", "锤子线", "十字星", "光头光脚K线"], explanation: "这是锤子线。长下影线表明空头虽曾猛烈打压价格，但多头最终强力收复失地，是强烈的看涨反转信号。" }
        ],
        "strategies-moving-averages": [],
        "strategies-oscillators": [],
        "risk-management": [],
        "math-expected-value-kelly": [],
        "math-ruin-drawdowns": []
      }
    },
    pt: {
      categories: { "Basics": "Básico", "Strategies": "Estratégias", "Risk Management": "Gestão de Risco" },
      titles: {
        "basics-candlesticks": "Ação de Preço & Segredos de Candlestick",
        "strategies-moving-averages": "Seguimento de Tendência & Médias Móveis",
        "strategies-oscillators": "Momentum & Osciladores (RSI & MACD)",
        "risk-management": "Gestão de Risco & Sizing",
        "math-expected-value-kelly": "Valor Esperado & Critério de Kelly",
        "math-ruin-drawdowns": "Risco de Ruína & Matemática do Drawdown"
      },
      summaries: {
        "basics-candlesticks": "Aprenda a ler o sentimento do mercado diretamente dos candles de preço e identifique padrões de reversão.",
        "strategies-moving-averages": "Descubra o clássico indicador de seguimento de tendência. Aprenda a surfar mercados em alta.",
        "strategies-oscillators": "Domine osciladores para detectar mercados sobrecomprados e identifique reversões por divergências.",
        "risk-management": "O segredo profissional: por que altas taxas de acerto são uma armadilha. Calcule o tamanho dos lotes.",
        "math-expected-value-kelly": "Domine as fórmulas quantitativas de finanças. Modele sua vantagem matemática e otimize a alocação.",
        "math-ruin-drawdowns": "Analise as duras realidades do rebaixamento de conta. Entenda por que a recuperação exige ganhos exponenciais."
      },
      quizzes: {
        "basics-candlesticks": [
          { question: "Um candle possui corpo muito pequeno perto da abertura e uma longa sombra inferior (3x o corpo). O que é?", options: ["Estrela Cadente", "Martelo (Hammer)", "Doji", "Marubozu"], explanation: "Este é um Martelo. Indica forte rejeição dos preços baixos pelos compradores, sendo um sinal de reversão altista." }
        ],
        "strategies-moving-averages": [],
        "strategies-oscillators": [],
        "risk-management": [],
        "math-expected-value-kelly": [],
        "math-ruin-drawdowns": []
      }
    },
    it: {
      categories: { "Basics": "Basi", "Strategies": "Strategie", "Risk Management": "Gestione del Rischio" },
      titles: {
        "basics-candlesticks": "Price Action & Segreti dei Candlestick",
        "strategies-moving-averages": "Trend Following & Medie Mobili",
        "strategies-oscillators": "Momentum & Oscillatori (RSI & MACD)",
        "risk-management": "Gestione del Rischio & Taglia della Posizione",
        "math-expected-value-kelly": "Valore Atteso & Criterio di Kelly",
        "math-ruin-drawdowns": "Rischio di Rovina & Matematica del Drawdown"
      },
      summaries: {
        "basics-candlesticks": "Impara a leggere il sentiment del mercato direttamente dai grafici a candela e identifica i pattern di inversione.",
        "strategies-moving-averages": "Scopri il classico indicatore di trend following. Cavalca i forti bull market evitando il rumore laterale.",
        "strategies-oscillators": "Domina gli oscillatori per individuare i mercati in ipercomprato/ipervenduto e cavalca le divergenze.",
        "risk-management": "Il segreto dei professionisti: perché un'alta percentuale di trade vincenti è una trappola. Calcola la taglia dei trade.",
        "math-expected-value-kelly": "Domina le formule quantitative della finanza. Modella matematicamente il tuo vantaggio e alloca la leva ottimale.",
        "math-ruin-drawdowns": "Analizza la cruda realtà dei drawdown di portafoglio. Scopri perché il recupero richiede rendimenti asimmetrici."
      },
      quizzes: {
        "basics-candlesticks": [
          { question: "Una candela ha un corpo piccolissimo vicino all'apertura e una mèche inferiore molto lunga. Che pattern è?", options: ["Shooting Star", "Martello (Hammer)", "Doji", "Marubozu"], explanation: "È un Martello. La lunga mèche inferiore indica che i venditori hanno spinto giù i prezzi, ma i compratori li hanno fortemente respinti." }
        ],
        "strategies-moving-averages": [],
        "strategies-oscillators": [],
        "risk-management": [],
        "math-expected-value-kelly": [],
        "math-ruin-drawdowns": []
      }
    },
    ru: {
      categories: { "Basics": "Основы", "Strategies": "Стратегии", "Risk Management": "Управление Рисками" },
      titles: {
        "basics-candlesticks": "Прайс Экшн и Секреты Японских Свечей",
        "strategies-moving-averages": "Следование за Трендом и Скользящие Средние",
        "strategies-oscillators": "Импульс и Осцилляторы (RSI и MACD)",
        "risk-management": "Управление Рисками и Размер Позиции",
        "math-expected-value-kelly": "Математическое Ожидание и Критерий Келли",
        "math-ruin-drawdowns": "Риск Банкротства и Математика Просадки"
      },
      summaries: {
        "basics-candlesticks": "Научитесь читать рыночные настроения непосредственно по ценовым свечам и находить разворотные паттерны.",
        "strategies-moving-averages": "Откройте для себя классический трендовый индикатор. Учитесь зарабатывать на сильных бычьих трендах.",
        "strategies-oscillators": "Освойте осцилляторы, чтобы находить зоны перекупленности и перепроданности и использовать дивергенции.",
        "risk-management": "Секрет профессионалов: почему высокий процент побед — это ловушка. Рассчитывайте риски математически.",
        "math-expected-value-kelly": "Освойте ключевые количественные формулы профессиональных финансов. Моделируйте свое преимущество.",
        "math-ruin-drawdowns": "Изучите суровую математику просадок. Узнайте, почему для восстановления требуются экспоненциальные прибыли."
      },
      quizzes: {
        "basics-candlesticks": [
          { question: "У свечи очень маленькое тело у цены открытия и длинная нижняя тень, которая в три раза больше тела. Что это за паттерн?", options: ["Падающая звезда", "Молот (Hammer)", "Доджи", "Марубозу"], explanation: "Это Молот. Длинная нижняя тень указывает на то, что продавцы агрессивно опустили цену, но покупатели полностью отыграли падение." }
        ],
        "strategies-moving-averages": [],
        "strategies-oscillators": [],
        "risk-management": [],
        "math-expected-value-kelly": [],
        "math-ruin-drawdowns": []
      }
    }
  };

  const localized: Lesson[] = englishLessons.map((l) => {
    const langSet = tDict[lang];
    if (!langSet) return l;

    const cat = langSet.categories[l.category] || l.category;
    const title = langSet.titles[l.id] || l.title;
    const summary = langSet.summaries[l.id] || l.summary;

    // Build quizzes
    const baseQuizzes = l.quizzes;
    const localizedQuizzes = baseQuizzes.map((q, idx) => {
      const nonEnLang = lang as Exclude<LanguageCode, "en">;
      const qTrans = quizTranslations[nonEnLang]?.[l.id]?.[idx] || langSet.quizzes[l.id]?.[idx];
      if (!qTrans) return q; // Fallback to English quiz if specific index not translated

      return {
        ...q,
        question: qTrans.question,
        options: qTrans.options.length > 0 ? qTrans.options : q.options,
        explanation: qTrans.explanation || q.explanation,
      };
    });

    // ContentMarkdown gets an added localization block at the top if not English, while retaining the gorgeous mathematical formulations
    const localIntroduction = lang === "es" ? `> **Nota de la Academia**: Esta lección técnica avanzada está disponible con fórmulas matemáticas completas. El contenido principal en español se resume a continuación para maximizar la comprensión.` :
                              lang === "fr" ? `> **Note de l'Académie**: Ce cours technique avancé est disponible avec des formules mathématiques complètes. Le contenu clé en français est présenté ci-dessous.` :
                              lang === "de" ? `> **Akademie-Hinweis**: Diese fortgeschrittene technische Lektion ist mit vollständigen mathematischen Formeln verfügbar. Die Kernaussagen auf Deutsch sind unten zusammengefasst.` :
                              lang === "ar" ? `> **ملاحظة الأكاديمية**: هذا الدرس الفني المتقدم متوفر بالصيغ الرياضية الكاملة لضمان فهم عميق.` :
                              lang === "ja" ? `> **アカデミーノート**: この高度なテクニカルレッスンは、数式と共にネイティブ言語での要約を提供しています。` :
                              lang === "zh" ? `> **学院提示**: 本高级技术课程配备完整的数学公式，并提供中文内容详解。` :
                              lang === "pt" ? `> **Nota da Academia**: Esta lição técnica avançada está disponível com fórmulas matemáticas completas. O resumo principal em português está detalhado abaixo.` :
                              lang === "it" ? `> **Nota dell'Accademia**: Questa lezione tecnica avanzata è disponibile con formule matematiche complete e sintesi in italiano.` :
                              lang === "ru" ? `> **Примечание Академии**: Этот продвинутый технический урок содержит полные математические формулы и перевод основных понятий.` : "";

    const nonEnLang = lang as Exclude<LanguageCode, "en">;
    const translatedContent = lessonContentTranslations[nonEnLang]
      ? lessonContentTranslations[nonEnLang][l.id] || l.contentMarkdown
      : l.contentMarkdown;

    const localMarkdown = localIntroduction 
      ? `${localIntroduction}\n\n${translatedContent}`
      : translatedContent;

    return {
      ...l,
      category: cat as any,
      title,
      summary,
      contentMarkdown: localMarkdown,
      quizzes: localizedQuizzes,
    };
  });

  return localized;
};
