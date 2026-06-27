/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Candlestick {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export type ScenarioDifficulty = "Beginner" | "Intermediate" | "Advanced";

export interface Scenario {
  id: string;
  name: string;
  description: string;
  asset: string;
  historicalPeriod: string;
  difficulty: ScenarioDifficulty;
  strategyName: string;
  strategyDescription: string;
  initialBalance: number;
  data: Candlestick[];
  keyTakeaway: string;
  learningObjectives: string[];
}

export type TradeDirection = "LONG" | "SHORT";

export interface Trade {
  id: string;
  direction: TradeDirection;
  entryIndex: number;
  entryPrice: number;
  entryTime: string;
  exitIndex?: number;
  exitPrice?: number;
  exitTime?: string;
  size: number;
  realizedPnL?: number;
  exitReason?: "MANUAL" | "STOP_LOSS" | "TAKE_PROFIT";
  stopLoss?: number;
  takeProfit?: number;
}

export interface Position {
  direction: TradeDirection;
  entryPrice: number;
  size: number;
  entryIndex: number;
  entryTime: string;
  stopLoss?: number;
  takeProfit?: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  category: "Basics" | "Strategies" | "Risk Management" | "Psychology";
  summary: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  contentMarkdown: string;
  quizzes: QuizQuestion[];
  recommendedScenarioId?: string;
}

export interface AccountStats {
  balance: number;
  initialBalance: number;
  equity: number;
  winRate: number; // 0 to 100
  profitFactor: number;
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  maxDrawdown: number; // percentage
  netPnL: number;
}
