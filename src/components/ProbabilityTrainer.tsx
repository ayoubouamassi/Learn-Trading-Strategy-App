/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Award, Brain, CheckCircle2, ChevronRight, HelpCircle, RefreshCw, Sparkles, XCircle } from "lucide-react";
import MathEquation from "./MathEquation";
import { TranslationSet, LanguageCode } from "../data/translations";

interface ProbabilityTrainerProps {
  t: TranslationSet;
  currentLanguage: LanguageCode;
}

type ProblemType = "ev" | "kelly" | "position_size" | "drawdown_recovery" | "losing_streak";

interface ProblemState {
  type: ProblemType;
  title: string;
  question: string;
  correctAnswer: number; // Checked to a precision of 0.1
  precision: number;     // e.g. 0.1, 1, 0.01
  unit: string;          // "%" or "units" or "$"
  formula: string;       // Math equation block to show
  variables: Record<string, number>;
  explanation: string;   // Text explaining the steps
  stepsMath: string;     // LaTeX-like calculation breakdown
}

interface ProblemLocaleStrings {
  title: string;
  question: string;
  explanation: string;
}

const problemLocales: Record<LanguageCode, Record<ProblemType, (vars: any) => ProblemLocaleStrings>> = {
  en: {
    ev: ({ winRate, avgWin, avgLoss }) => ({
      title: "Expected Value (EV) Model",
      question: `A custom algorithmic strategy has a win rate of ${winRate}%. Its average profitable trade yields $${avgWin}, and its average losing trade costs $${avgLoss}. What is the mathematical Expected Value (EV) of this strategy per trade?`,
      explanation: `To calculate the expected outcome of a strategy, we multiply each event's probability by its financial payoff and sum the results. The probability of winning is ${winRate}%, meaning the probability of losing is ${100 - winRate}%.`
    }),
    kelly: ({ winRate, ratio }) => ({
      title: "Kelly Optimal Sizing",
      question: `Your discretionary trading system shows a historical win rate of ${winRate}% and a payoff ratio of ${ratio} (meaning your average winning trade is ${ratio} times the size of your average loss). Under the standard Kelly Criterion formula, what percentage of your total portfolio capital should you allocate to each trade? (State as a percentage. Round to 1 decimal place, e.g. 12.5)`,
      explanation: `The Kelly Criterion calculates the mathematically optimal trade sizing fraction to maximize long-term logarithmic growth. Here, win probability p = ${winRate / 100}, and payoff ratio b = ${ratio}.`
    }),
    position_size: ({ capital, riskPct, entryPrice, stopLossPrice }) => ({
      title: "Absolute Risk Position Sizing",
      question: `You manage a professional account with a starting balance of $${capital.toLocaleString()}. You apply a strict ${riskPct}% maximum account risk per trade. You want to execute a long breakout entry on a stock at $${entryPrice} with a stop loss set at $${stopLossPrice}. How many units (shares) must you buy to risk exactly your planned percentage?`,
      explanation: `First, determine the maximum dollar risk limit: $${capital.toLocaleString()} \\times ${riskPct}\\% = $${(capital * riskPct) / 100}. Next, find the trade price risk distance (Entry - Stop Loss) = $${entryPrice} - $${stopLossPrice} = $${entryPrice - stopLossPrice} per unit. Divide total dollar risk by unit price risk.`
    }),
    drawdown_recovery: ({ drawdown }) => ({
      title: "Asymmetric Drawdown Mathematics",
      question: `A series of highly leveraged trend trades fails, causing your account equity to suffer a sudden drawdown of ${drawdown}%. What exact percentage gain does your remaining capital need to achieve just to return to your original break-even balance? (Round to 1 decimal place, e.g. 33.3)`,
      explanation: `Drawdowns represent an asymmetrical barrier in mathematics because as capital decreases, the absolute value of each remaining dollar increases in relative terms. A 50% loss requires a 100% gain because you are trading with half the original funds.`
    }),
    losing_streak: ({ riskPct, streakLength }) => ({
      title: "Linear Streak Risk Calculation",
      question: `If you risk a fixed, constant ${riskPct}% of your initial account starting capital per trade (without compounding adjustments) and suffer an unfortunate streak of ${streakLength} consecutive losses, what total percentage of your initial account capital have you lost?`,
      explanation: `Under linear risk parameters (fixed-dollar positioning based on initial balance), losses accumulate additively. Risking ${riskPct}% over ${streakLength} consecutive trials yields a straightforward linear accumulation of risk.`
    })
  },
  es: {
    ev: ({ winRate, avgWin, avgLoss }) => ({
      title: "Modelo de Valor Esperado (EV)",
      question: `Una estrategia algorítmica personalizada tiene una tasa de acierto del ${winRate}%. Su transacción rentable promedio rinde $${avgWin} y su pérdida promedio cuesta $${avgLoss}. ¿Cuál es el Valor Esperado (EV) matemático de esta estrategia por transacción?`,
      explanation: `Para calcular el resultado esperado de una estrategia, multiplicamos la probabilidad de cada evento por su recompensa financiera y sumamos los resultados. La probabilidad de ganar es del ${winRate}%, lo que significa que la probabilidad de perder es del ${100 - winRate}%.`
    }),
    kelly: ({ winRate, ratio }) => ({
      title: "Tamaño Óptimo de Kelly",
      question: `Su sistema de trading discrecional muestra una tasa de acierto histórica del ${winRate}% y una relación de ganancias/pérdidas de ${ratio} (lo que significa que su transacción ganadora promedio es ${ratio} veces el tamaño de su pérdida promedio). Bajo la fórmula estándar del Criterio de Kelly, ¿qué porcentaje de su capital total de cartera debería asignar a cada operación? (Redondee a 1 decimal, ej. 12.5)`,
      explanation: `El Criterio de Kelly calcula la fracción óptima del tamaño de la transacción para maximizar el crecimiento logarítmico a largo plazo. Aquí, la probabilidad de ganar p = ${winRate / 100}, y la relación b = ${ratio}.`
    }),
    position_size: ({ capital, riskPct, entryPrice, stopLossPrice }) => ({
      title: "Tamaño de Posición por Riesgo Absoluto",
      question: `Usted gestiona una cuenta profesional con un saldo inicial de $${capital.toLocaleString()}. Aplica un estricto riesgo máximo del ${riskPct}% por operación. Quiere comprar una acción a $${entryPrice} con un stop loss en $${stopLossPrice}. ¿Cuántas unidades (acciones) debe comprar para arriesgar exactamente su porcentaje planificado?`,
      explanation: `Primero, determine el límite de riesgo en dólares: $${capital.toLocaleString()} \\times ${riskPct}\\% = $${(capital * riskPct) / 100}. Luego, busque la distancia de riesgo del precio (Entrada - Stop Loss) = $${entryPrice} - $${stopLossPrice} = $${entryPrice - stopLossPrice} por unidad. Divida el riesgo total en dólares por el riesgo del precio unitario.`
    }),
    drawdown_recovery: ({ drawdown }) => ({
      title: "Matemática Asimétrica de Pérdidas (Drawdown)",
      question: `Una serie de operaciones apalancadas falla, causando que su cuenta sufra una reducción de saldo (drawdown) del ${drawdown}%. ¿Qué porcentaje exacto de ganancia necesita lograr su capital restante solo para volver a su saldo inicial de equilibrio? (Redondee a 1 decimal, ej. 33.3)`,
      explanation: `Los drawdowns representan una barrera asimétrica en matemáticas porque a medida que disminuye el capital, el valor relativo de cada dólar restante aumenta. Una pérdida del 50% requiere una ganancia del 100% porque está operando con la mitad de los fondos originales.`
    }),
    losing_streak: ({ riskPct, streakLength }) => ({
      title: "Cálculo de Riesgo de Racha Lineal",
      question: `Si arriesga un porcentaje fijo y constante del ${riskPct}% de su capital inicial por operación (sin interés compuesto) y sufre una racha consecutiva de ${streakLength} pérdidas, ¿qué porcentaje total de su capital inicial ha perdido?`,
      explanation: `Bajo parámetros de riesgo lineal (posicionamiento de dólares fijos basado en el saldo inicial), las pérdidas se acumulan de forma aditiva. Arriesgar el ${riskPct}% durante ${streakLength} pruebas consecutivas genera una acumulación lineal de riesgo.`
    })
  },
  fr: {
    ev: ({ winRate, avgWin, avgLoss }) => ({
      title: "Modèle d'Espérance Mathématique (EV)",
      question: `Une stratégie algorithmique a un taux de réussite de ${winRate}%. Son gain moyen est de $${avgWin}, et sa perte moyenne est de $${avgLoss}. Quelle est l'Espérance Mathématique (EV) de cette stratégie par transaction ?`,
      explanation: `Pour calculer l'espérance d'une stratégie, on multiplie la probabilité de chaque issue par son gain/perte financier, puis on fait la somme. La probabilité de gain est de ${winRate}%, donc la probabilité de perte est de ${100 - winRate}%.`
    }),
    kelly: ({ winRate, ratio }) => ({
      title: "Taille de Position Optimale de Kelly",
      question: `Votre stratégie montre un taux de réussite historique de ${winRate}% et un ratio de gain de ${ratio} (le gain moyen est ${ratio} fois supérieur à la perte moyenne). Selon la formule de Kelly, quel pourcentage de votre capital devriez-vous allouer à chaque transaction ? (Arrondir à 1 décimale, ex: 12.5)`,
      explanation: `Le critère de Kelly détermine la fraction optimale pour maximiser la croissance logarithmique à long terme. Ici, p = ${winRate / 100} et b = ${ratio}.`
    }),
    position_size: ({ capital, riskPct, entryPrice, stopLossPrice }) => ({
      title: "Dimensionnement par Risque Absolu",
      question: `Vous gérez un compte de $${capital.toLocaleString()} avec un risque maximum de ${riskPct}% par transaction. Vous souhaitez entrer en position longue à $${entryPrice} avec un stop loss à $${stopLossPrice}. Combien d'unités (actions) devez-vous acheter pour respecter exactement ce risque ?`,
      explanation: `D'abord, déterminez le risque maximum en dollars: $${capital.toLocaleString()} \\times ${riskPct}\\% = $${(capital * riskPct) / 100}. Ensuite, déterminez la distance de prix (Entrée - Stop) = $${entryPrice} - $${stopLossPrice} = $${entryPrice - stopLossPrice} par unité. Divisez le risque total en dollars par le risque par unité.`
    }),
    drawdown_recovery: ({ drawdown }) => ({
      title: "Mathématiques Asymétriques des Pertes",
      question: `Suite à une série de pertes avec levier, votre compte subit une baisse (drawdown) de ${drawdown}%. Quel pourcentage de gain votre capital restant doit-il réaliser pour retrouver votre capital initial ? (Arrondir à 1 décimale, ex: 33.3)`,
      explanation: `Les drawdowns sont asymétriques: à mesure que le capital diminue, la valeur relative de chaque dollar restant augmente. Une perte de 50% nécessite un gain de 100% car vous tradez avec la moitié des fonds initiaux.`
    }),
    losing_streak: ({ riskPct, streakLength }) => ({
      title: "Calcul Linéaire du Risque de Série",
      question: `Si vous risquez un montant fixe de ${riskPct}% de votre capital de départ par transaction (sans intérêts composés) et subissez une série de ${streakLength} pertes consécutives, quel pourcentage de votre capital initial avez-vous perdu ?`,
      explanation: `Avec un risque linéaire (calculé sur le solde de départ), les pertes s'additionnent. Risquer ${riskPct}% sur ${streakLength} essais consécutifs donne une accumulation linéaire du risque.`
    })
  },
  de: {
    ev: ({ winRate, avgWin, avgLoss }) => ({
      title: "Erwartungswert-Modell (EV)",
      question: `Eine algorithmische Strategie hat eine Gewinnquote von ${winRate}%. Ihr durchschnittlicher Gewinn beträgt $${avgWin} und ihr durchschnittlicher Verlust $${avgLoss}. Was ist der mathematische Erwartungswert (EV) dieser Strategie pro Trade?`,
      explanation: `Um den Erwartungswert zu berechnen, multiplizieren wir die Wahrscheinlichkeit jedes Ereignisses mit dem finanziellen Ergebnis und addieren die Werte. Die Gewinnwahrscheinlichkeit liegt bei ${winRate}%, was eine Verlustwahrscheinlichkeit von ${100 - winRate}% bedeutet.`
    }),
    kelly: ({ winRate, ratio }) => ({
      title: "Optimale Positionsgröße nach Kelly",
      question: `Ihr Handelssystem hat eine historische Gewinnquote von ${winRate}% und ein Gewinn/Verlust-Verhältnis von ${ratio}. Welchen Prozentsatz Ihres Portfolios sollten Sie laut Kelly-Formel jedem Trade zuweisen? (In % angeben, auf 1 Dezimalstelle runden, z.B. 12.5)`,
      explanation: `Das Kelly-Kriterium berechnet die mathematisch optimale Positionsgröße, um das langfristige Wachstum zu maximieren. Hier ist p = ${winRate / 100} und b = ${ratio}.`
    }),
    position_size: ({ capital, riskPct, entryPrice, stopLossPrice }) => ({
      title: "Positionsgröße nach absolutem Risiko",
      question: `Sie verwalten ein Konto mit einem Guthaben von $${capital.toLocaleString()} und riskieren maximal ${riskPct}% pro Trade. Sie möchten eine Aktie bei $${entryPrice} mit einem Stop-Loss bei $${stopLossPrice} kaufen. Wie viele Einheiten (Aktien) müssen Sie kaufen, um exakt Ihr geplantes Risiko einzuhalten?`,
      explanation: `Zuerst ermitteln Sie das Risiko in Dollar: $${capital.toLocaleString()} \\times ${riskPct}\\% = $${(capital * riskPct) / 100}. Dann berechnen Sie den Preisabstand (Einstieg - Stop-Loss) = $${entryPrice} - $${stopLossPrice} = $${entryPrice - stopLossPrice} pro Einheit. Teilen Sie das Gesamtrisiko durch den Preisabstand.`
    }),
    drawdown_recovery: ({ drawdown }) => ({
      title: "Asymmetrische Drawdown-Mathematik",
      question: `Nach einer Verlustserie erleidet Ihr Konto einen Drawdown von ${drawdown}%. Welchen prozentualen Gewinn muss Ihr verbleibendes Kapital erzielen, um wieder die Gewinnschwelle zu erreichen? (Auf 1 Dezimalstelle runden, z.B. 33.3)`,
      explanation: `Drawdowns stellen eine asymmetrische mathematische Hürde dar: Wenn das Kapital sinkt, steigt der relative Wert jedes verbleibenden Dollars. Ein Verlust von 50% erfordert einen Gewinn von 100%, da Sie mit der Hälfte des ursprünglichen Kapitals handeln.`
    }),
    losing_streak: ({ riskPct, streakLength }) => ({
      title: "Lineares Verlustserien-Risiko",
      question: `Wenn Sie pro Trade ein festes Risiko von ${riskPct}% Ihres Startkapitals eingehen (ohne Zinseszins) und eine Verlustserie von ${streakLength} Trades erleiden, wie viel Prozent Ihres Startkapitals haben Sie insgesamt verloren?`,
      explanation: `Bei linearem Risiko (feste Dollar-Beträge basierend auf dem Startkapital) addieren sich die Verluste. Ein Risiko von ${riskPct}% über ${streakLength} aufeinanderfolgende Trades führt zu einer einfachen linearen Risikoakkumulation.`
    })
  },
  ar: {
    ev: ({ winRate, avgWin, avgLoss }) => ({
      title: "نموذج القيمة المتوقعة (EV)",
      question: `تمتلك استراتيجية خوارزمية معدل ربح قدره ${winRate}%. يبلغ متوسط صفقتها الرابحة $${avgWin}، ومتوسط صفقتها الخاسرة $${avgLoss}. ما هي القيمة المتوقعة (EV) الرياضية لهذه الاستراتيجية لكل صفقة؟`,
      explanation: `لحساب النتيجة المتوقعة لاستراتيجية ما، نضرب احتمال كل حدث في عائده المالي ونجمع النتائج. احتمال الفوز هو ${winRate}%، مما يعني أن احتمال الخسارة هو ${100 - winRate}%.`
    }),
    kelly: ({ winRate, ratio }) => ({
      title: "تحديد حجم الصفقة الأمثل حسب كيلي",
      question: `يظهر نظام تداولك معدل ربح تاريخي قدره ${winRate}% ونسبة عائد تبلغ ${ratio} (متوسط الصفقة الرابحة يعادل ${ratio} أضعاف الصفقة الخاسرة). بموجب صيغة كيلي القياسية، ما هي النسبة المئوية من رأس مال محفظتك التي يجب تخصيصها لكل صفقة؟ (قرب إلى رقم عشري واحد، مثل 12.5)`,
      explanation: `يحسب معيار كيلي الحجم الأمثل للصفقة لتحقيق أقصى نمو لوغاريتمي على المدى الطويل. هنا، احتمال الفوز p = ${winRate / 100}، ونسبة العائد b = ${ratio}.`
    }),
    position_size: ({ capital, riskPct, entryPrice, stopLossPrice }) => ({
      title: "تحديد حجم المركز حسب المخاطرة المطلقة",
      question: `تدير حساباً احترافياً برصيد بداية يبلغ $${capital.toLocaleString()}. تطبق مخاطرة قصوى صارمة تبلغ ${riskPct}% لكل صفقة. تريد شراء سهم بسعر دخول $${entryPrice} مع وقف خسارة عند $${stopLossPrice}. كم عدد الوحدات (الأسهم) التي يجب شراؤها للمخاطرة بالنسبة المخططة تماماً؟`,
      explanation: `أولاً، حدد حد المخاطرة بالدولار: $${capital.toLocaleString()} \\times ${riskPct}\\% = $${(capital * riskPct) / 100}. بعد ذلك، أوجد مسافة خطر السعر (الدخول - وقف الخسارة) = $${entryPrice} - $${stopLossPrice} = $${entryPrice - stopLossPrice} لكل وحدة. اقسم إجمالي المخاطرة بالدولار على مسافة السعر.`
    }),
    drawdown_recovery: ({ drawdown }) => ({
      title: "رياضيات التراجع غير المتماثل (Drawdown)",
      question: `تؤدي سلسلة من الصفقات الخاسرة برافعة مالية عالية إلى تراجع رصيد حسابك بنسبة ${drawdown}%. ما هي النسبة المئوية الدقيقة للربح التي يحتاجها رأس مالك المتبقي للعودة إلى نقطة التعادل الأصلية؟ (قرب إلى رقم عشري واحد، مثل 33.3)`,
      explanation: `يمثل التراجع حاجزاً رياضياً غير متماثل لأنه مع انخفاض رأس المال، تزداد القيمة النسبية لكل دولار متبقي. خسارة 50% تتطلب ربحاً بنسبة 100% لأنك تتداول بنصف رأس المال الأصلي.`
    }),
    losing_streak: ({ riskPct, streakLength }) => ({
      title: "حساب مخاطر سلسلة الخسائر الخطية",
      question: `إذا كنت تخاطر بنسبة ثابتة تبلغ ${riskPct}% من رأس مال حسابك الأصلي لكل صفقة (دون احتساب الفائدة المركبة) وعانيت من سلسلة خسائر متتالية بلغت ${streakLength} صفقات، فما هي النسبة المئوية الإجمالية التي خسرتها من رأس المال الأصلي؟`,
      explanation: `بموجب معايير المخاطر الخطية (تحديد الحجم بالدولار الثابت بناءً على الرصيد الأولي)، تتراكم الخسائر بشكل جمعي. المخاطرة بنسبة ${riskPct}% على مدى ${streakLength} محاولات متتالية تؤدي إلى تراكم خطي للمخاطر.`
    })
  },
  ja: {
    ev: ({ winRate, avgWin, avgLoss }) => ({
      title: "期待値（EV）モデル",
      question: `ある独自のアルゴリズム戦略の勝率は ${winRate}% です。平均利益は $${avgWin}、平均損失は $${avgLoss} です。この戦略の1トレードあたりの数学的期待値（EV）はいくらですか？`,
      explanation: `戦略の期待値を計算するには、各イベントの確率にその金銭的損益を掛け合わせ、それらの結果を合計します。勝率が ${winRate}% であるため、敗率は ${100 - winRate}% になります。`
    }),
    kelly: ({ winRate, ratio }) => ({
      title: "ケリーの最適な資金管理",
      question: `あなたの裁量取引システムの過去の勝率は ${winRate}%、ペイオフ比率は ${ratio} です（平均利益が平均損失の ${ratio} 倍であることを意味します）。ケリー基準の公式に基づくと、各トレードに口座資金の何パーセントを配分すべきですか？（パーセンテージで、小数点第1位まで回答、例: 12.5）`,
      explanation: `ケリー基準は、長期的な対数成長を最大化するための数学的に最適な投資比率を算出します。ここでは、勝率 p = ${winRate / 100}、ペイオフ比率 b = ${ratio} です。`
    }),
    position_size: ({ capital, riskPct, entryPrice, stopLossPrice }) => ({
      title: "許容リスクに基づくポジションサイズ",
      question: `初期残高 $${capital.toLocaleString()} のプロ口座を管理しています。1トレードあたりの許容リスクを最大 ${riskPct}% とします。ある銘柄を $${entryPrice} で買いエントリーし、損切り（ストップロス）を $${stopLossPrice} に設定する場合、計画通りのリスクに抑えるには何単位（株）購入すべきですか？`,
      explanation: `まず、許容リスクのドル額を求めます: $${capital.toLocaleString()} \\times ${riskPct}\\% = $${(capital * riskPct) / 100}。次に、1単位あたりの損切り幅（エントリー価格 - 損切り価格）を計算します: $${entryPrice} - $${stopLossPrice} = $${entryPrice - stopLossPrice}。総許容リスク額を損切り幅で割ります。`
    }),
    drawdown_recovery: ({ drawdown }) => ({
      title: "非対称なドローダウンの数学",
      question: `ハイレバレッジ取引の失敗により、口座資金が ${drawdown}% のドローダウンを被りました。元の元本（ブレイクイーブン）に戻すには、残った資金を何パーセント増やす必要がありますか？（小数点第1位まで回答、例: 33.3）`,
      explanation: `ドローダウンは数学において非対称な壁となります。資金が減少すると、残された1ドルの相対的な価値が高まるためです。50%失った場合、元本に戻すには100%の利益が必要になります。`
    }),
    losing_streak: ({ riskPct, streakLength }) => ({
      title: "線形連敗リスク計算",
      question: `各トレードで初期資金の ${riskPct}% という固定リスクを取り（複利計算なし）、運悪く ${streakLength} 連敗した場合、初期資金の合計何パーセントを失うことになりますか？`,
      explanation: `線形リスク管理（初期資金に基づく固定ドル額のポジショニング）では、損失は加算的に累積します。${riskPct}% のリスクで ${streakLength} 回連続で失敗すると、線形にリスクが累積します。`
    })
  },
  zh: {
    ev: ({ winRate, avgWin, avgLoss }) => ({
      title: "期望值 (EV) 模型",
      question: `某量化交易策略的胜率为 ${winRate}%。其 average 盈利交易产生 $${avgWin} 的收益，平均亏损交易产生 $${avgLoss} 的损失。该策略每笔交易的数学期望值 (EV) 是多少？`,
      explanation: `要计算策略的预期结果，我们将每个事件的发生概率乘以其资金盈亏，然后将结果相加。获胜概率为 ${winRate}%，意味着亏损概率为 ${100 - winRate}%。`
    }),
    kelly: ({ winRate, ratio }) => ({
      title: "凯利公式最优仓位管理",
      question: `您的交易系统历史胜率为 ${winRate}%，盈亏比为 ${ratio}（意味着平均盈利是平均亏损的 ${ratio} 倍）。根据标准凯利公式，您每笔交易应分配总账户资金的百分之几？（用百分数表示，保留一位小数，例如 12.5）`,
      explanation: `凯利公式旨在计算数学上最优的交易仓位比例，以最大化长期的对数增长。此处获胜概率 p = ${winRate / 100}，盈亏比 b = ${ratio}。`
    }),
    position_size: ({ capital, riskPct, entryPrice, stopLossPrice }) => ({
      title: "绝对风险仓位大小计算",
      question: `您管理一个初始余额为 $${capital.toLocaleString()} 的专业账户。您对每笔交易执行严格的单笔 ${riskPct}% 账户最大风险。您打算在 $${entryPrice} 处买入某股票，止损设在 $${stopLossPrice}。您需要买入多少单位（股）才能确保风险刚好等于计划百分比？`,
      explanation: `首先，确定最大美元风险金额：$${capital.toLocaleString()} \\times ${riskPct}% = $${(capital * riskPct) / 100}。接着，计算单股价格风险空间（买入价 - 止损价）= $${entryPrice} - $${stopLossPrice} = $${entryPrice - stopLossPrice}。最后，用美元总风险除以单股风险距离。`
    }),
    drawdown_recovery: ({ drawdown }) => ({
      title: "非对称回撤与恢复数学",
      question: `一连串高杠杆交易失败后，您的账户净值遭受了 ${drawdown}% 的突然回撤。您剩余的资金需要实现百分之几的收益，才能刚好回到原始的保本水平？（保留一位小数，例如 33.3）`,
      explanation: `回撤在数学上呈现非对称的障碍，因为随着资本的减少，每单位剩余资本的相对增值需求呈指数上升。亏损 50% 需要 100% 的盈利才能回本，因为您仅剩一半的本金在运转。`
    }),
    losing_streak: ({ riskPct, streakLength }) => ({
      title: "线性连败风险计算",
      question: `如果您每笔交易承受相当于初始资金固定 ${riskPct}% 的风险（不考虑复利），并且遭遇了连续 ${streakLength} 次亏损的连败，您总共损失了初始资金的百分之几？`,
      explanation: `在线性风险参数下（基于初始余额的固定美元金额风险），亏损是累加的。在连续 ${streakLength} 次交易中每次损失 ${riskPct}% 会产生简单的线性风险累积。`
    })
  },
  pt: {
    ev: ({ winRate, avgWin, avgLoss }) => ({
      title: "Modelo de Valor Esperado (EV)",
      question: `Uma estratégia algorítmica personalizada tem taxa de acerto de ${winRate}%. O trade lucrativo médio rende $${avgWin}, e o prejuízo médio custa $${avgLoss}. Qual o Valor Esperado (EV) matemático desta estratégia por trade?`,
      explanation: `Para calcular o resultado esperado, multiplicamos a probabilidade de cada evento pelo retorno financeiro e somamos. A probabilidade de ganho é de ${winRate}%, o que significa que a probabilidade de perda é de ${100 - winRate}%.`
    }),
    kelly: ({ winRate, ratio }) => ({
      title: "Dimensionamento Ótimo de Kelly",
      question: `Seu sistema de trading apresenta histórico de taxa de acerto de ${winRate}% e payoff de ${ratio} (o ganho médio é ${ratio} vezes a perda média). Sob o Critério de Kelly padrão, que porcentagem do capital total você deve alocar por trade? (Indique como porcentagem, arredondando para 1 casa decimal, ex: 12.5)`,
      explanation: `O Critério de Kelly calcula a fração de tamanho ideal de trade para maximizar o crescimento logarítmico a longo prazo. Aqui, probabilidade p = ${winRate / 100}, e payoff b = ${ratio}.`
    }),
    position_size: ({ capital, riskPct, entryPrice, stopLossPrice }) => ({
      title: "Dimensionamento de Risco Absoluto",
      question: `Você gerencia uma conta com saldo de $${capital.toLocaleString()} e aplica risco máximo estrito de ${riskPct}% por trade. Deseja comprar uma ação a $${entryPrice} com stop loss em $${stopLossPrice}. Quantas unidades deve comprar para arriscar exatamente o planejado?`,
      explanation: `Primeiro, defina o limite de risco em dólares: $${capital.toLocaleString()} \\times ${riskPct}\\% = $${(capital * riskPct) / 100}. Depois, encontre a distância de preço (Entrada - Stop) = $${entryPrice} - $${stopLossPrice} = $${entryPrice - stopLossPrice} por unidade. Divida o risco em dólar pelo risco de preço unitário.`
    }),
    drawdown_recovery: ({ drawdown }) => ({
      title: "Matemática de Drawdown Assimétrico",
      question: `Uma série de trades falha e sua conta sofre um drawdown de ${drawdown}%. Qual porcentagem exata de ganho o capital restante precisa alcançar para retornar ao saldo original? (Arredonde para 1 casa decimal, ex: 33.3)`,
      explanation: `Os drawdowns representam uma barreira matemática assimétrica porque, conforme o capital diminui, o valor absoluto de cada dólar restante aumenta em termos relativos. Uma perda de 50% exige um ganho de 100% porque você opera com metade dos fundos originais.`
    }),
    losing_streak: ({ riskPct, streakLength }) => ({
      title: "Cálculo de Risco de Racha Linear",
      question: `Se você arrisca uma porcentagem fixa de ${riskPct}% do capital inicial por trade (sem juros compostos) e sofre uma sequência de ${streakLength} perdas consecutivas, qual porcentagem total do capital inicial foi perdida?`,
      explanation: `Sob parâmetros de risco linear (tamanho fixo baseado no saldo inicial), as perdas acumulam-se de forma aditiva. Arriscar ${riskPct}% sobre ${streakLength} tentativas consecutivas resulta no acúmulo linear de risco.`
    })
  },
  it: {
    ev: ({ winRate, avgWin, avgLoss }) => ({
      title: "Modello del Valore Atteso (EV)",
      question: `Una strategia algoritmica personalizzata ha una percentuale di trade vincenti del ${winRate}%. Il trade vincente medio frutta $${avgWin}, e il trade perdente medio costa $${avgLoss}. Qual è il Valore Atteso (EV) matematico di questa strategia per singolo trade?`,
      explanation: `Per calcolare il rendimento atteso di una strategia, moltiplichiamo la probabilità di ogni scenario per il suo rendimento finanziario e sommiamo i risultati. La probabilità di vincita é del ${winRate}%, il che significa che la probabilità di perdita è del ${100 - winRate}%.`
    }),
    kelly: ({ winRate, ratio }) => ({
      title: "Dimensionamento Ottimale di Kelly",
      question: `Il tuo trading system mostra una percentuale di vincita storica del ${winRate}% e un rapporto di rendimento di ${ratio} (cioè il profitto medio è ${ratio} volte la perdita media). Secondo la formula del Criterio di Kelly, quale percentuale del capitale totale del portafoglio dovresti allocare a ciascun trade? (Arrotonda a 1 cifra decimale, es. 12.5)`,
      explanation: `Il Criterio di Kelly calcola la frazione ottimale per massimizzare la crescita logaritmica a lungo termine. Qui, probabilità di vincita p = ${winRate / 100}, e rapporto di payoff b = ${ratio}.`
    }),
    position_size: ({ capital, riskPct, entryPrice, stopLossPrice }) => ({
      title: "Dimensionamento a Rischio Assoluto",
      question: `Gestisci un conto professionale con un saldo iniziale di $${capital.toLocaleString()}. Applichi un rigido rischio massimo del ${riskPct}% per trade. Desideri entrare long su un'azione a $${entryPrice} con stop loss impostato a $${stopLossPrice}. Quante unità (azioni) devi acquistare per rischiare esattamente la percentuale pianificata?`,
      explanation: `Per prima cosa, determina il limite massimo di rischio in dollari: $${capital.toLocaleString()} \\times ${riskPct}\\% = $${(capital * riskPct) / 100}. Quindi, trova la distanza di rischio del preço (Entrata - Stop Loss) = $${entryPrice} - $${stopLossPrice} = $${entryPrice - stopLossPrice} per unità. Dividi il rischio totale in dollari per la distanza del prezzo.`
    }),
    drawdown_recovery: ({ drawdown }) => ({
      title: "Matematica dei Drawdown Asimmetrici",
      question: `Una serie di trade con leva fallisce, provocando un improvviso drawdown del ${drawdown}% sul tuo capitale. Quale percentuale esatta di guadagno deve realizzare il capitale rimanente per tornare in pareggio? (Arrotonda a 1 cifra decimale, es. 33.3)`,
      explanation: `I drawdown rappresentano una barriera asimmetrica in matematica perché con il ridursi del capitale, il valore relativo di ogni dollaro rimanente aumenta. Una perdita del 50% richiede un guadagno del 100% poiché si opera con la metà dei fondi originari.`
    }),
    losing_streak: ({ riskPct, streakLength }) => ({
      title: "Calcolo del Rischio di Perdite Lineari",
      question: `Se rischi una percentuale fissa e costante del ${riskPct}% del tuo capitale iniziale per trade (senza capitalizzazione composta) e subisci una serie sfortunata di ${streakLength} perdite consecutive, quale percentuale totale del capitale iniziale hai perso?`,
      explanation: `In condizioni di rischio lineare (posizioni in dollari fissi basate sul saldo iniziale), le perdite si sommano direttamente. Rischiare il ${riskPct}% su ${streakLength} prove consecutive produce un accumulo di rischio lineare.`
    })
  },
  ru: {
    ev: ({ winRate, avgWin, avgLoss }) => ({
      title: "Модель математического ожидания (EV)",
      question: `Алгоритмическая торговая стратегия имеет долю прибыльных сделок ${winRate}%. Средняя прибыль составляет $${avgWin}, а средний убыток — $${avgLoss}. Каково математическое ожидание (EV) этой стратегии на одну сделку?`,
      explanation: `Чтобы рассчитать математическое ожидание стратегии, мы умножаем вероятность каждого исхода на его финансовый результат и суммируем показатели. Вероятность выигрыша составляет ${winRate}%, значит, вероятность убытка равна ${100 - winRate}%.`
    }),
    kelly: ({ winRate, ratio }) => ({
      title: "Оптимальный размер по критерию Келли",
      question: `Ваша торговая система показывает историческую долю прибыльных сделок ${winRate}% и соотношение прибыли к убытку ${ratio} (средняя прибыль в ${ratio} раза больше среднего убытка). По стандартной формуле критерия Келли, какой процент капитала вашего портфеля следует выделять на каждую сделку? (Укажите в процентах, округлив до 1 знака после запятой, например, 12.5)`,
      explanation: `Критерий Келли рассчитывает математически оптимальную долю капитала на сделку для максимизации долгосрочного логарифмического роста. Здесь p = ${winRate / 100}, а соотношение b = ${ratio}.`
    }),
    position_size: ({ capital, riskPct, entryPrice, stopLossPrice }) => ({
      title: "Расчет размера позиции по абсолютному риску",
      question: `Вы управляете профессиональным счетом с начальным балансом $${capital.toLocaleString()}. Вы применяете строгий лимит риска ${riskPct}% на сделку от капитала. Вы хотите открыть длинную позицию по цене $${entryPrice} со стоп-лоссом на уровне $${stopLossPrice}. Сколько единиц (акций) вам нужно купить, чтобы рискнуть ровно запланированным процентом?`,
      explanation: `Сначала определите максимальный риск в долларах: $${capital.toLocaleString()} \\times ${riskPct}% = $${(capital * riskPct) / 100}. Затем найдите ценовую дистанцию риска (Вход - Стоп-лосс) = $${entryPrice} - $${stopLossPrice} = $${entryPrice - stopLossPrice} на акцию. Разделите общий риск в долларах на ценовую дистанцию риска.`
    }),
    drawdown_recovery: ({ drawdown }) => ({
      title: "Математика асимметрии просадки",
      question: `Серия сделок с кредитным плечом привела к просадке вашего счета на ${drawdown}%. Какой процент прибыли должен показать ваш оставшийся капитал, чтобы вернуться к исходному балансу безубыточности? (Округлите до 1 знака после запятой, например, 33.3)`,
      explanation: `Просадки представляют собой асимметричный барьер в математике, поскольку по мере уменьшения капитала относительное значение каждого оставшегося доллара возрастает. Убыток в 50% требует 100% прибыли для восстановления, так как вы торгуете с половиной первоначальных средств.`
    }),
    losing_streak: ({ riskPct, streakLength }) => ({
      title: "Линейный расчет риска серии убытков",
      question: `Если вы рискуете фиксированным процентом в размере ${riskPct}% от своего первоначального капитала счета за сделку (без сложного процента) и терпите неудачную серию из ${streakLength} убыточных сделок подряд, какой общий процент первоначального капитала счета вы потеряли?`,
      explanation: `При линейных параметрах риска (позиционирование с фиксированной суммой на основе начального баланса) убытки суммируются. Риск в размере ${riskPct}% в течение ${streakLength} последовательных сделок дает прямое линейное накопление риска.`
    })
  }
};

const localizedSharesMap: Record<LanguageCode, string> = {
  en: "shares",
  es: "acciones",
  fr: "actions",
  de: "Aktien",
  ar: "أسهم",
  ja: "株",
  zh: "股",
  pt: "ações",
  it: "azioni",
  ru: "акций"
};

export default function ProbabilityTrainer({ t, currentLanguage }: ProbabilityTrainerProps) {
  const [problem, setProblem] = useState<ProblemState | null>(null);
  const [userInput, setUserInput] = useState<string>("");
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [streak, setStreak] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [solvedCount, setSolvedCount] = useState<number>(0);

  // Load stats from LocalStorage
  useEffect(() => {
    const savedStreak = localStorage.getItem("quant_trainer_streak");
    const savedHighScore = localStorage.getItem("quant_trainer_highscore");
    const savedSolved = localStorage.getItem("quant_trainer_solved");

    if (savedStreak) setStreak(parseInt(savedStreak, 10));
    if (savedHighScore) setHighScore(parseInt(savedHighScore, 10));
    if (savedSolved) setSolvedCount(parseInt(savedSolved, 10));

    generateNewProblem();
  }, []);

  // Synchronize active problem strings and localized units when the language changes
  useEffect(() => {
    if (!problem) return;
    const type = problem.type;
    const vars = problem.variables;
    const strings = (problemLocales[currentLanguage] || problemLocales.en)[type](vars);
    const localizedShares = localizedSharesMap[currentLanguage] || "shares";

    setProblem((prev) => {
      if (!prev) return null;
      let updatedUnit = prev.unit;
      let updatedStepsMath = prev.stepsMath;

      if (type === "position_size") {
        updatedUnit = localizedShares;
        // Recreate stepsMath to use the localized share word
        const riskAmount = (vars.capital * vars.riskPct) / 100;
        const correctUnits = riskAmount / vars.stopDistance;
        updatedStepsMath = `$$\\text{Units} = \\frac{${vars.capital} \\times ${vars.riskPct}\\%}{${vars.entryPrice} - ${vars.stopLossPrice}} = \\frac{${riskAmount}}{${vars.stopDistance}} = ${correctUnits}\\text{ ${localizedShares}}$$`;
      }

      return {
        ...prev,
        title: strings.title,
        question: strings.question,
        explanation: strings.explanation,
        unit: updatedUnit,
        stepsMath: updatedStepsMath,
      };
    });
  }, [currentLanguage]);

  const generateNewProblem = () => {
    const types: ProblemType[] = ["ev", "kelly", "position_size", "drawdown_recovery", "losing_streak"];
    const randomType = types[Math.floor(Math.random() * types.length)];

    let newProb: ProblemState;
    const localizedShares = localizedSharesMap[currentLanguage] || "shares";

    switch (randomType) {
      case "ev": {
        // Expected Value: EV = (P_win * Avg_Win) - (P_loss * Avg_Loss)
        const winRate = [35, 40, 45, 50, 55, 60, 65][Math.floor(Math.random() * 7)];
        const avgWin = [300, 400, 500, 600, 800, 1000][Math.floor(Math.random() * 6)];
        const avgLoss = [100, 150, 200, 250, 300][Math.floor(Math.random() * 5)];
        const pWin = winRate / 100;
        const pLoss = 1 - pWin;
        const ev = parseFloat(((pWin * avgWin) - (pLoss * avgLoss)).toFixed(2));

        const strings = (problemLocales[currentLanguage] || problemLocales.en).ev({ winRate, avgWin, avgLoss });

        newProb = {
          type: "ev",
          title: strings.title,
          question: strings.question,
          correctAnswer: ev,
          precision: 0.1,
          unit: "$",
          formula: "$$EV = (P_{win} \\times \\text{Avg Win}) - (P_{loss} \\times \\text{Avg Loss})$$",
          variables: { winRate, avgWin, avgLoss },
          explanation: strings.explanation,
          stepsMath: `$$EV = (${pWin} \\times ${avgWin}) - (${pLoss.toFixed(2)} \\times ${avgLoss}) = ${pWin * avgWin} - ${(pLoss * avgLoss).toFixed(1)} = ${ev}$$`,
        };
        break;
      }

      case "kelly": {
        // Kelly Criterion: f* = (p * (b + 1) - 1) / b
        const winRate = [45, 50, 55, 60, 65][Math.floor(Math.random() * 5)];
        const ratio = [1.5, 2.0, 2.5, 3.0][Math.floor(Math.random() * 4)];
        const p = winRate / 100;
        const fKelly = ((p * (ratio + 1)) - 1) / ratio;
        const kellyPct = parseFloat((fKelly * 100).toFixed(1));

        const strings = (problemLocales[currentLanguage] || problemLocales.en).kelly({ winRate, ratio });

        newProb = {
          type: "kelly",
          title: strings.title,
          question: strings.question,
          correctAnswer: kellyPct < 0 ? 0 : kellyPct, // if Kelly is negative, ideal allocation is 0% (no edge)
          precision: 0.1,
          unit: "%",
          formula: "$$f^* = \\frac{p \\times (b + 1) - 1}{b}$$",
          variables: { winRate, ratio },
          explanation: strings.explanation,
          stepsMath: `$$f^* = \\frac{${p} \\times (${ratio} + 1) - 1}{${ratio}} = \\frac{${(p * (ratio + 1)).toFixed(3)} - 1}{${ratio}} = \\frac{${((p * (ratio + 1)) - 1).toFixed(3)}}{${ratio}} = ${(fKelly * 100).toFixed(1)}\\%$$`,
        };
        break;
      }

      case "position_size": {
        // Position Size: size = (Capital * Risk%) / (Entry - StopLoss)
        const capital = [10000, 20000, 50000, 100000][Math.floor(Math.random() * 4)];
        const riskPct = [1, 2][Math.floor(Math.random() * 2)];
        const riskAmount = (capital * riskPct) / 100;

        // Choose a division that gives integer shares
        const entryPrice = [100, 150, 200, 300, 500][Math.floor(Math.random() * 5)];
        // Create an entry/stop distance that divides riskAmount perfectly
        const distances = riskAmount >= 500 ? [5, 10, 20, 50] : [2, 4, 5, 10, 20];
        const stopDistance = distances[Math.floor(Math.random() * distances.length)];
        const stopLossPrice = entryPrice - stopDistance;
        const correctUnits = riskAmount / stopDistance;

        const strings = (problemLocales[currentLanguage] || problemLocales.en).position_size({ capital, riskPct, entryPrice, stopLossPrice });

        newProb = {
          type: "position_size",
          title: strings.title,
          question: strings.question,
          correctAnswer: correctUnits,
          precision: 0.1,
          unit: localizedShares,
          formula: "$$\\text{Units} = \\frac{\\text{Capital} \\times \\text{Risk \\%}}{\\text{Entry} - \\text{Stop Loss}}$$",
          variables: { capital, riskPct, entryPrice, stopLossPrice, stopDistance },
          explanation: strings.explanation,
          stepsMath: `$$\\text{Units} = \\frac{${capital} \\times ${riskPct}\\%}{${entryPrice} - ${stopLossPrice}} = \\frac{${riskAmount}}{${stopDistance}} = ${correctUnits}\\text{ ${localizedShares}}$$`,
        };
        break;
      }

      case "drawdown_recovery": {
        // Drawdown recovery: R = D / (100 - D) * 100
        const drawdown = [10, 20, 25, 30, 50, 60, 75, 80, 90][Math.floor(Math.random() * 9)];
        const recoveryRequired = parseFloat(((drawdown / (100 - drawdown)) * 100).toFixed(1));

        const strings = (problemLocales[currentLanguage] || problemLocales.en).drawdown_recovery({ drawdown });

        newProb = {
          type: "drawdown_recovery",
          title: strings.title,
          question: strings.question,
          correctAnswer: recoveryRequired,
          precision: 0.1,
          unit: "%",
          formula: "$$\\text{Recovery Gain \\%} = \\frac{D}{100 - D} \\times 100$$",
          variables: { drawdown },
          explanation: strings.explanation,
          stepsMath: `$$\\text{Recovery} = \\frac{${drawdown}}{100 - ${drawdown}} \\times 100 = \\frac{${drawdown}}{${100 - drawdown}} \\times 100 = ${recoveryRequired}\\%$$`,
        };
        break;
      }

      case "losing_streak": {
        // Streak risk: Linear total lost = Risk% * Streak
        const riskPct = [1, 2, 3, 5, 10][Math.floor(Math.random() * 5)];
        const streakLength = [4, 5, 6, 7, 8][Math.floor(Math.random() * 5)];
        const totalLost = riskPct * streakLength;

        const strings = (problemLocales[currentLanguage] || problemLocales.en).losing_streak({ riskPct, streakLength });

        newProb = {
          type: "losing_streak",
          title: strings.title,
          question: strings.question,
          correctAnswer: totalLost,
          precision: 0.1,
          unit: "%",
          formula: "$$\\text{Total Loss \\%} = \\text{Risk \\%} \\times \\text{Consecutive Losses}$$",
          variables: { riskPct, streakLength },
          explanation: strings.explanation,
          stepsMath: `$$\\text{Total Lost} = ${riskPct}\\% \\times ${streakLength} = ${totalLost}\\%$$`,
        };
        break;
      }

      default:
        return;
    }

    setProblem(newProb);
    setUserInput("");
    setIsAnswered(false);
    setIsCorrect(null);
  };

  const handleVerify = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!problem || isAnswered) return;

    const parsed = parseFloat(userInput.trim());
    if (isNaN(parsed)) return;

    // Check with precision margin of error
    const absDiff = Math.abs(parsed - problem.correctAnswer);
    const correct = absDiff <= problem.precision;

    setIsCorrect(correct);
    setIsAnswered(true);

    const newSolvedCount = solvedCount + 1;
    setSolvedCount(newSolvedCount);
    localStorage.setItem("quant_trainer_solved", newSolvedCount.toString());

    if (correct) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      localStorage.setItem("quant_trainer_streak", newStreak.toString());

      if (newStreak > highScore) {
        setHighScore(newStreak);
        localStorage.setItem("quant_trainer_highscore", newStreak.toString());
      }
    } else {
      setStreak(0);
      localStorage.setItem("quant_trainer_streak", "0");
    }
  };

  return (
    <div className="w-full flex flex-col gap-6" id="quant-trainer-root">
      {/* Score and stats header */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" id="quant-trainer-stats-row">
        <div className="bg-[#0F172A] border border-gray-800 rounded-xl p-4 flex items-center justify-between shadow-lg">
          <div>
            <div className="text-[10px] text-gray-400 uppercase tracking-wider font-mono">{t.currentStreak}</div>
            <div className="text-2xl font-extrabold text-blue-400 font-mono mt-1 flex items-center gap-1.5">
              <span>{streak}</span>
              {streak >= 3 && <Sparkles className="text-amber-400 animate-pulse" size={16} />}
            </div>
          </div>
          <Brain size={24} className="text-blue-500/50" />
        </div>

        <div className="bg-[#0F172A] border border-gray-800 rounded-xl p-4 flex items-center justify-between shadow-lg">
          <div>
            <div className="text-[10px] text-gray-400 uppercase tracking-wider font-mono">{t.highScore}</div>
            <div className="text-2xl font-extrabold text-amber-400 font-mono mt-1">
              {highScore}
            </div>
          </div>
          <Award size={24} className="text-amber-500/50" />
        </div>

        <div className="bg-[#0F172A] border border-gray-800 rounded-xl p-4 flex items-center justify-between shadow-lg">
          <div>
            <div className="text-[10px] text-gray-400 uppercase tracking-wider font-mono">{t.problemsPracticed}</div>
            <div className="text-2xl font-extrabold text-emerald-400 font-mono mt-1">
              {solvedCount}
            </div>
          </div>
          <RefreshCw size={24} className="text-emerald-500/50" />
        </div>
      </div>

      {/* Main training panel */}
      {problem && (
        <div className="bg-[#0F172A] border border-gray-800 rounded-2xl p-6 shadow-xl flex flex-col gap-5 relative overflow-hidden" id="quant-trainer-problem-card">
          {/* Top banner */}
          <div className="flex justify-between items-center border-b border-gray-800 pb-3">
            <span className="text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full uppercase tracking-widest font-mono">
              {problem.title}
            </span>
            <span className="text-[10px] text-gray-500 font-mono">
              {t.precisionLabel}: ±{problem.precision} {problem.unit}
            </span>
          </div>

          {/* Problem Statement */}
          <div className="py-2">
            <h3 className="text-sm md:text-base font-semibold text-white leading-relaxed">
              {problem.question}
            </h3>
          </div>

          {/* Core Concept Formula Header */}
          <div className="bg-[#0B0F19]/40 border border-gray-900 rounded-xl p-3 flex flex-col items-center gap-1.5">
            <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider">{t.governingTheory}</span>
            <MathEquation equation={problem.formula} block={false} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center pt-3 border-t border-gray-800/50">
            <div className="relative flex-1">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                disabled={isAnswered}
                placeholder={t.answerPlaceholder.replace("{unit}", problem.unit).replace("{example}", problem.correctAnswer.toString())}
                className="w-full bg-[#070A13] text-white border border-gray-800 rounded-xl px-4 py-3 text-sm font-mono outline-none focus:border-blue-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                required
              />
              {problem.unit && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-mono font-bold text-xs">
                  {problem.unit}
                </span>
              )}
            </div>

            {!isAnswered ? (
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-xl text-xs tracking-wider uppercase transition shrink-0 active:scale-95 shadow-lg shadow-blue-950/40"
              >
                {t.verifyAnswer}
              </button>
            ) : (
              <button
                type="button"
                onClick={generateNewProblem}
                className="bg-gray-800 hover:bg-gray-700 text-white font-bold px-6 py-3 rounded-xl text-xs tracking-wider uppercase transition shrink-0 flex items-center justify-center gap-1.5 active:scale-95 border border-gray-700"
              >
                <span>{t.nextProblem}</span>
                <ChevronRight size={14} />
              </button>
            )}
          </form>

          {/* Explanation / Result banner */}
          {isAnswered && (
            <div className="flex flex-col gap-4 animate-in slide-in-from-top-4 duration-300">
              {/* Correct / Incorrect alert */}
              {isCorrect ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl p-4 flex items-start gap-3">
                  <CheckCircle2 className="shrink-0 text-emerald-400 mt-0.5 animate-bounce" size={18} />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider">{t.correctAnswerAlert}</h4>
                    <p className="text-[11px] text-gray-300 mt-1">
                      {t.correctAnswerDesc}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl p-4 flex items-start gap-3">
                  <XCircle className="shrink-0 text-rose-400 mt-0.5" size={18} />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider">{t.incorrectAnswerAlert}</h4>
                    <p className="text-[11px] text-gray-300 mt-1">
                      {t.incorrectAnswerDesc.replace("{answer}", `${problem.correctAnswer} ${problem.unit}`)}
                    </p>
                  </div>
                </div>
              )}

              {/* Explanatory visual solver */}
              <div className="bg-[#0B0F19]/60 border border-gray-800 rounded-xl p-5 flex flex-col gap-3.5">
                <div className="flex items-center gap-1.5 border-b border-gray-900 pb-2">
                  <HelpCircle size={14} className="text-blue-400" />
                  <span className="text-[10px] uppercase font-bold tracking-wider font-mono text-gray-400">
                    {t.mathWalkthrough}
                  </span>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed">
                  {problem.explanation}
                </p>

                {/* Styled Math Equation Block */}
                <div className="py-1">
                  <MathEquation equation={problem.stepsMath} block={true} />
                </div>

                <div className="text-[10px] text-gray-500 font-mono italic">
                  {t.quantTrainerNote}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
