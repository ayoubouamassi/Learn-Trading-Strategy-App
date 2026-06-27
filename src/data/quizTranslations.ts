/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LanguageCode } from "./translations";

export interface QuizTransItem {
  question: string;
  options: string[];
  explanation: string;
}

export const quizTranslations: Record<
  Exclude<LanguageCode, "en">,
  Record<string, QuizTransItem[]>
> = {
  es: {
    "basics-candlesticks": [
      {
        question: "Una vela tiene un cuerpo muy pequeño cerca del precio de apertura y una larga sombra inferior que triplica el cuerpo. ¿Qué patrón es?",
        options: ["Estrella Fugaz", "Martillo (Hammer)", "Estrella Doji", "Marubozu"],
        explanation: "Esto es un Martillo. La larga sombra inferior indica que los vendedores empujaron el precio hacia abajo pero los compradores rechazaron con fuerza, formando una fuerte señal de reversión alcista."
      },
      {
        question: "Cuando una resistencia histórica se rompe por una ruptura agresiva, ¿en qué se convierte frecuentemente en el futuro?",
        options: ["Una zona inválida para ignorar", "Una resistencia más profunda", "Un nuevo nivel de Soporte", "Una señal corta inmediata"],
        explanation: "La resistencia rota con frecuencia se convierte en soporte. Esto se llama estrategia de 'retest de ruptura' o inversión de roles, proporcionando entradas de bajo riesgo cuando los compradores defienden el techo roto."
      },
      {
        question: "¿Cuál es la señal psicológica de un patrón Envolvente Bajista?",
        options: ["Indecisión y equilibrio del mercado", "Capitulación de compradores ya que los vendedores envuelven todo el rango anterior", "Continuación alcista sana", "Exprimir volumen bajo"],
        explanation: "Una vela envolvente bajista significa que los vendedores han abrumado por completo a los compradores del período anterior, indicando un giro importante o un techo estructural de momentum."
      }
    ],
    "strategies-moving-averages": [
      {
        question: "¿Por qué una Media Móvil Exponencial (EMA) reacciona más rápido que una Media Móvil Simple (SMA)?",
        options: ["Excluye fines de semana y brechas", "Da mayor peso matemático a los precios más recientes", "Se calcula con los precios altos", "Usa un período más largo"],
        explanation: "La EMA da mayor peso a los datos más recientes, adaptándose más rápido pero siendo ligeramente más propensa a señales falsas."
      },
      {
        question: "¿Qué es un 'Cruce Dorado' en el análisis técnico?",
        options: ["Cuando el precio supera los $100", "Cuando una media móvil rápida cruza por encima de una lenta", "Cuando el RSI cruza por encima de 70", "Cuando el volumen se duplica en un cierre plano"],
        explanation: "Un Cruce Dorado ocurre cuando una MA de corto plazo (como la SMA de 50) cruza por encima de una MA de largo plazo (como la SMA de 200), indicando un cambio potente hacia un mercado alcista duradero."
      },
      {
        question: "¿En qué tipo de condición de mercado funcionan mal las estrategias de cruce de medias móviles?",
        options: ["Tendencia alcista fuerte", "Mercado bajista fuerte", "Mercado picado o lateral en rango", "Rupturas de alto volumen"],
        explanation: "En mercados laterales y planos, las medias móviles se cruzan repetidamente de un lado a otro (picadillo), generando señales falsas costosas."
      }
    ],
    "strategies-oscillators": [
      {
        question: "Si el precio hace un nuevo máximo más alto, pero el RSI hace un máximo más bajo, ¿qué estructura se ha formado?",
        options: ["Divergencia Alcista", "Divergencia Bajista", "Cruce Dorado", "Continuación de Tendencia"],
        explanation: "Es una Divergencia Bajista. Indica que aunque el precio subió, la velocidad de compra disminuyó, advirtiendo un giro inminente de la tendencia."
      },
      {
        question: "¿Qué indica una lectura del RSI de 85 en un activo?",
        options: ["El activo está severamente sobrevendido y se garantiza una subida", "El activo tiene un fuerte impulso bajista", "El activo está sobrecomprado y sobreextendido, advirtiendo contra compras", "El activo está comprimido con volatilidad cero"],
        explanation: "Un RSI superior a 70 (en este caso 85) significa que el activo está sobrecomprado. Comprar aquí ofrece una mala relación riesgo-beneficio porque la tendencia está sobreextendida."
      },
      {
        question: "¿Cómo se opera un cruce de MACD?",
        options: ["Comprar cuando el MACD cruza por debajo de cero", "Comprar cuando la línea MACD cruza por encima de la línea de Señal, y vender cuando cruza por debajo", "Vender cuando el histograma se vuelve verde", "Solo comprar cuando RSI y MACD están en 50"],
        explanation: "Una estrategia clásica de MACD es comprar cuando la línea MACD cruza por encima de la de Señal y vender o ir corto cuando cruza por debajo."
      }
    ],
    "risk-management": [
      {
        question: "Si tiene una cuenta de $50,000 y sigue la regla de riesgo del 1%, ¿cuál es el monto máximo que debe perder en una sola operación?",
        options: ["$5,000", "$1,000", "$500", "$100"],
        explanation: "El 1% de $50,000 es $500. Este es su límite máximo de pérdida para proteger su capital de rachas adversas."
      },
      {
        question: "Su cuenta es de $10,000. Quiere comprar Bitcoin a $40,000 con stop loss a $38,000. Bajo la regla del 1%, ¿qué cantidad de BTC debe comprar?",
        options: ["0.05 BTC", "0.10 BTC", "0.25 BTC", "1.00 BTC"],
        explanation: "El riesgo es el 1% ($100). La distancia al stop loss es $2,000. Tamaño de posición = Riesgo / Distancia = $100 / $2,000 = 0.05 BTC."
      },
      {
        question: "¿Por qué una relación de riesgo-recompensa de 1:3 es matemáticamente superior a una de 1:1?",
        options: ["Garantiza ganar el 75% de las veces", "Es requerida por los corredores", "Permite ser rentable incluso perdiendo el 60% de las operaciones", "Elimina la necesidad de Stop Loss"],
        explanation: "Con una relación R:R de 1:3, sus ganancias son 3 veces mayores que sus pérdidas. Esto significa que incluso con una tasa de acierto del 40% (perdiendo el 60%), será altamente rentable."
      }
    ],
    "math-expected-value-kelly": [
      {
        question: "Un sistema tiene un 55% de acierto. La ganancia promedio es $400 y la pérdida promedio es $200. ¿Cuál es el Valor Esperado (EV) por operación?",
        options: ["$130.00", "$80.00", "$110.00", "$150.00"],
        explanation: "EV = (0.55 * 400) - (0.45 * 200) = 220 - 90 = $130. Al ser positivo, garantiza ganancias a largo plazo sobre una serie grande de operaciones."
      },
      {
        question: "Bajo el Criterio de Kelly, si su tasa de acierto es del 50% y su ganancia promedio duplica la pérdida (b=2), ¿qué fracción (f*) debe arriesgar?",
        options: ["12.5%", "25.0%", "33.3%", "50.0%"],
        explanation: "Kelly f* = (0.50 * (2 + 1) - 1) / 2 = 25%. El tamaño óptimo para arriesgar es el 25.0% de su cuenta."
      }
    ],
    "math-ruin-drawdowns": [
      {
        question: "Si un operador sufre un drawdown del 75%, ¿qué rendimiento requiere en el capital restante para volver al punto de partida?",
        options: ["75%", "150%", "200%", "300%"],
        explanation: "Un drawdown del 75% requiere una ganancia del 300%. Fórmula: 75 / (100 - 75) * 100 = 300%."
      },
      {
        question: "¿Cómo influye aumentar el riesgo por operación del 1% al 5% en el riesgo de ruina a largo plazo?",
        options: ["Aumenta linealmente 5 veces", "No cambia si la tasa de acierto es alta", "Aumenta exponencialmente porque disminuye drásticamente el número de pérdidas para quebrar (N)", "Disminuye el riesgo de ruina al acelerar las ganancias"],
        explanation: "El riesgo de ruina escala exponencialmente. Reducir las unidades de amortiguación N de 100 a 20 eleva drásticamente la probabilidad de quiebra por racha adversa."
      }
    ]
  },
  fr: {
    "basics-candlesticks": [
      {
        question: "Une bougie présente un très petit corps près de l'ouverture et une longue mèche inférieure faisant 3 fois sa taille. Quel est ce motif?",
        options: ["Étoile filante", "Marteau (Hammer)", "Doji", "Marubozu"],
        explanation: "C'est un Marteau. La longue mèche inférieure montre que les vendeurs ont poussé les prix bas, mais les acheteurs ont vigoureusement rejeté ces niveaux, formant un signal haussier fort."
      },
      {
        question: "Lorsqu'une résistance historique est brisée par une cassure agressive, que devient-elle fréquemment à l'avenir?",
        options: ["Une zone invalide à ignorer", "Une résistance plus profonde", "Un nouveau niveau de Support", "Un signal de vente immédiat"],
        explanation: "Une résistance brisée se transforme fréquemment en support. C'est l'inversion des rôles, offrant des entrées à faible risque lorsque les acheteurs défendent l'ancien plafond."
      },
      {
        question: "Quel est le signal psychologique d'un avalement baissier (Bearish Engulfing)?",
        options: ["L'indécision et l'équilibre du marché", "La capitulation complète des acheteurs car les vendeurs englobent tout le range haussier précédent", "La continuation saine d'une tendance haussière", "Un squeeze à faible volume"],
        explanation: "Un avalement baissier signifie que les vendeurs ont totalement submergé les acheteurs de la période précédente, signalant un sommet de momentum."
      }
    ],
    "strategies-moving-averages": [
      {
        question: "Pourquoi la moyenne mobile exponentielle (EMA) réagit-elle plus vite aux prix que la moyenne mobile simple (SMA)?",
        options: ["Elle exclut les week-ends", "Elle attribue un poids mathématique supérieur aux prix les plus récents", "Elle utilise les cours les plus hauts", "Elle utilise une période plus longue"],
        explanation: "L'EMA accorde plus d'importance aux données récentes, ce qui la rend plus réactive mais parfois sujette aux faux signaux."
      },
      {
        question: "Qu'est-ce qu'un 'Golden Cross' (Croix d'or) en analyse technique?",
        options: ["Lorsque le prix dépasse 100$", "Lorsqu'une moyenne mobile rapide croise au-dessus d'une moyenne mobile lente", "Lorsque le RSI croise au-dessus de 70", "Lorsque le volume double sur une clôture plate"],
        explanation: "Un Golden Cross se produit lorsqu'une MA de court terme (comme la SMA 50) croise au-dessus d'une MA de long terme (comme la SMA 200), indiquant un puissant retournement haussier de fond."
      },
      {
        question: "Dans quelles conditions de marché les stratégies de croisement de moyennes mobiles sont-elles peu performantes?",
        options: ["Tendance haussière forte", "Tendance baissière forte", "Marché latéral ou en range (plat)", "Cassures à fort volume"],
        explanation: "Dans un marché plat, les moyennes mobiles se croisent sans cesse de haut en bas (whip-sawing), générant de multiples faux signaux coûteux."
      }
    ],
    "strategies-oscillators": [
      {
        question: "Si le prix d'un actif fait un nouveau sommet plus haut, mais que le RSI fait un sommet plus bas, quelle structure s'est formée?",
        options: ["Divergence haussière", "Divergence baissière", "Crossover doré", "Continuation de tendance"],
        explanation: "C'est une divergence baissière. Elle montre que bien que le prix ait monté, la force acheteuse s'est essoufflée, annonçant une correction imminente."
      },
      {
        question: "Qu'indique un RSI à 85 pour un actif?",
        options: ["L'actif est survendu et une hausse explosive est garantie", "L'actif présente une forte tendance baissière", "L'actif est suracheté et surétendu, déconseillant les achats immédiats", "L'actif est bloqué sans volatilité"],
        explanation: "Un RSI supérieur à 70 (ici 85) montre que l'actif est suracheté. Acheter à ce niveau présente un mauvais ratio risque-gain."
      },
      {
        question: "Comment négocier un croisement MACD?",
        options: ["Acheter quand le MACD passe sous zéro", "Acheter quand la ligne MACD croise au-dessus de la ligne de signal, et vendre quand elle repasse en dessous", "Vendre quand l'histogramme devient vert", "Acheter uniquement lorsque le RSI et le MACD sont tous deux à 50"],
        explanation: "Une stratégie classique consiste à acheter lorsque la ligne MACD croise au-dessus de la ligne de signal, et à vendre ou vendre à découvert lorsqu'elle repasse en dessous."
      }
    ],
    "risk-management": [
      {
        question: "Si vous avez un compte de 50 000$ et appliquez la règle de risque de 1%, quel est le montant maximum que vous devez perdre sur un seul trade?",
        options: ["5 000$", "1 000$", "500$", "100$"],
        explanation: "1% de 50 000$ représente 500$. C'est votre perte maximale tolérée par trade pour garder votre capital en sécurité."
      },
      {
        question: "Votre compte est de 10 000$. Vous voulez acheter du Bitcoin à 40 000$, avec un stop loss à 38 000$. Selon la règle de 1%, quelle taille de BTC devez-vous acheter?",
        options: ["0.05 BTC", "0.10 BTC", "0.25 BTC", "1.00 BTC"],
        explanation: "Le risque autorisé est de 1% (100$). L'écart avec le stop loss est de 40k$ - 38k$ = 2000$. Taille = Risque / Écart = 100$ / 2000$ = 0.05 BTC."
      },
      {
        question: "Pourquoi un ratio Risque-Récompense de 1:3 est-il mathématiquement supérieur à un ratio de 1:1?",
        options: ["Il garantit 75% de trades gagnants", "Il est exigé par les courtiers", "Il vous permet d'être rentable même avec 60% de pertes", "Il élimine le besoin de Stop Loss"],
        explanation: "Avec un ratio 1:3, vos gains sont trois fois supérieurs à vos pertes. Vous pouvez vous permettre de perdre 60% du temps et de rester très rentable."
      }
    ],
    "math-expected-value-kelly": [
      {
        question: "Un système gagne 55% du temps. Le gain moyen est de 400$ et la perte moyenne est de 200$. Quelle est l'espérance mathématique (EV) par trade?",
        options: ["130.00$", "80.00$", "110.00$", "150.00$"],
        explanation: "EV = (0.55 * 400) - (0.45 * 200) = 220 - 90 = 130$. Cette valeur positive garantit une croissance du capital à long terme."
      },
      {
        question: "Selon le critère de Kelly, si votre taux de gain est de 50% et que votre gain moyen est le double de la perte (b = 2), quelle fraction (f*) devez-vous risquer?",
        options: ["12.5%", "25.0%", "33.3%", "50.0%"],
        explanation: "Formule de Kelly f* = (0.50 * (2 + 1) - 1) / 2 = 25%. La fraction optimale à risquer est donc de 25.0% de votre portefeuille."
      }
    ],
    "math-ruin-drawdowns": [
      {
        question: "Si un trader subit une perte de 75% de son capital initial, quel pourcentage de gain doit-il réaliser sur son capital restant pour revenir à l'équilibre?",
        options: ["75%", "150%", "200%", "300%"],
        explanation: "Une perte de 75% exige une hausse de 300% pour récupérer le capital de départ. Formule: 75 / (100 - 75) * 100 = 300%."
      },
      {
        question: "Quel est l'impact à long terme d'une hausse du risque par transaction de 1% à 5% sur votre risque de ruine?",
        options: ["Il augmente de manière linéaire de 5x", "Il ne change pas si votre taux de gain est élevé", "Il augmente de façon exponentielle car le nombre d'unités de perte pour faire faillite (N) chute", "Il diminue le risque de ruine en accélérant les gains"],
        explanation: "Le risque de ruine augmente de manière exponentielle. Réduire le tampon d'échecs tolérés de 100 à 20 augmente dramatiquement la chance qu'une mauvaise série vide le compte."
      }
    ]
  },
  de: {
    "basics-candlesticks": [
      {
        question: "Eine Kerze hat einen sehr kleinen Körper nahe dem Eröffnungskurs und einen langen unteren Schatten. Welches Muster ist das?",
        options: ["Shooting Star", "Hammer", "Doji Star", "Marubozu"],
        explanation: "Dies ist ein Hammer. Er signalisiert eine starke Ablehnung tieferer Preise durch die Käufer und gilt als bullisches Umkehrsignal."
      },
      {
        question: "Wenn eine historische Widerstandslinie durch einen Ausbruch durchbrochen wird, was wird sie in der Zukunft häufig?",
        options: ["Eine ungültige Zone, die ignoriert wird", "Ein tieferer Widerstand", "Ein neues Unterstützungsniveau (Support)", "Ein direktes Verkaufssignal"],
        explanation: "Durchbrochener Widerstand wird häufig zur Unterstützung. Man nennt dies Rollentausch oder Ausbruchs-Retest, was risikoarme Einstiege ermöglicht."
      },
      {
        question: "Was ist das psychologische Signal eines Bearish Engulfing Musters?",
        options: ["Unentschlossenheit und Marktgleichgewicht", "Vollständige Kapitulation der Käufer, da die Verkäufer die gesamte vorherige Kerze umschließen", "Gesunde Fortsetzung eines Aufwärtstrends", "Ein Short-Squeeze bei geringem Volumen"],
        explanation: "Ein Bearish Engulfing bedeutet, dass die Verkäufer die Käufer der Vorperiode komplett überwältigt haben, was auf ein Ende des Aufwärtsmomentums hinweist."
      }
    ],
    "strategies-moving-averages": [
      {
        question: "Warum reagiert ein exponentieller gleitender Durchschnitt (EMA) schneller auf Kursbewegungen als ein einfacher gleitender Durchschnitt (SMA)?",
        options: ["Er schließt Wochenenden aus", "Er gewichtet die jüngsten Kursdaten mathematisch stärker", "Er wird auf Höchstkursen statt Schlusskursen berechnet", "Er verwendet einen längeren Berechnungszeitraum"],
        explanation: "Der EMA gewichtet die neuesten Daten stärker, wodurch er sich schneller anpasst, aber auch anfälliger für Fehlsignale ist."
      },
      {
        question: "Was ist ein 'Golden Cross' in der technischen Analyse?",
        options: ["Wenn der Preis die 100$-Marke überschreitet", "Wenn ein schnellerer gleitender Durchschnitt einen langsameren nach oben kreuzt", "Wenn der RSI die Marke von 70 überschreitet", "Wenn sich das Volumen bei flachem Schlusskurs verdoppelt"],
        explanation: "Ein Golden Cross entsteht, wenn ein kurzfristiger MA (z.B. 50 SMA) einen langfristigen MA (z.B. 200 SMA) nach oben kreuzt. Dies signalisiert einen bullischen Trendwechsel."
      },
      {
        question: "In welcher Marktphase schneiden gleitende Durchschnitts-Kreuzungsstrategien besonders schlecht ab?",
        options: ["Starker Aufwärtstrend", "Starker Abwärtstrend", "Unruhiger Seitwärtsmarkt (Range)", "Ausbrüche mit hohem Volumen"],
        explanation: "In Seitwärtsmärkten kreuzen sich gleitende Durchschnitte ständig hin und her (Whipsawing), was zu teuren Fehlsignalen führt."
      }
    ],
    "strategies-oscillators": [
      {
        question: "Wenn der Kurs ein neues höheres Hoch erreicht, der RSI aber ein niedrigeres Hoch markiert, welche Struktur liegt vor?",
        options: ["Bullische Divergenz", "Bärische Divergenz", "Golden Crossover", "Trendfortsetzung"],
        explanation: "Dies ist eine bärische Divergenz. Sie zeigt, dass das Aufwärtsmomentum trotz steigender Kurse nachlässt, ein starkes Warnsignal für eine Umkehr."
      },
      {
        question: "Was bedeutet ein RSI-Wert von 85 für einen Vermögenswert?",
        options: ["Der Wert ist stark überverkauft, ein Ausbruch nach oben ist garantiert", "Der Wert hat ein starkes bärisches Trendmomentum", "Der Wert ist historisch überkauft und überdehnt, warnt vor Neukäufen", "Der Wert ist in einer Spanne ohne Volatilität gefangen"],
        explanation: "Ein RSI über 70 (in diesem Fall 85) bedeutet, dass der Wert überkauft ist. Neue Käufe weisen hier ein sehr schlechtes Chance-Risiko-Verhältnis auf."
      },
      {
        question: "Wie handelt man einen MACD-Kreuzungspunkt?",
        options: ["Kauf, wenn der MACD unter die Nulllinie fällt", "Kauf, wenn der MACD die Signallinie nach oben kreuzt, Verkauf bei Kreuzung nach unten", "Verkauf, wenn das Histogramm grün wird", "Kauf nur, wenn RSI und MACD beide bei 50 liegen"],
        explanation: "Die klassische MACD-Strategie sieht vor, zu kaufen, wenn die MACD-Linie über die Signallinie steigt, und zu verkaufen, wenn sie darunter fällt."
      }
    ],
    "risk-management": [
      {
        question: "Wenn Sie ein Trading-Konto von 50.000$ haben und der 1%-Risikoregel folgen, was ist der maximale Verlust pro Trade?",
        options: ["5.000$", "1.000$", "500$", "100$"],
        explanation: "1% von 50.000$ sind 500$. Dies ist der maximale Verlust, den Sie pro Trade zulassen sollten, um Ihr Konto zu schützen."
      },
      {
        question: "Ihr Konto hat einen Stand von 10.000$. Sie möchten Bitcoin bei 40.000$ kaufen, mit einem Stop-Loss bei 38.000$. Wie viel BTC sollten Sie kaufen?",
        options: ["0.05 BTC", "0.10 BTC", "0.25 BTC", "1.00 BTC"],
        explanation: "Das Risiko beträgt 1% (100$). Der Abstand zum Stop-Loss beträgt 2.000$. Positionsgröße = Risiko / Abstand = 100$ / 2.000$ = 0.05 BTC."
      },
      {
        question: "Warum ist ein Risiko-Ertrags-Verhältnis (CRV) von 1:3 mathematisch vorteilhafter als ein Verhältnis von 1:1?",
        options: ["Es garantiert eine Gewinnrate von 75%", "Es ist von Brokern vorgeschrieben", "Sie bleiben auch dann hochprofitabel, wenn Sie 60% Ihrer Trades verlieren", "Es macht Stop-Losses überflüssig"],
        explanation: "Bei einem CRV von 1:3 sind Ihre Gewinne dreimal so hoch wie Ihre Verluste. Selbst mit einer Gewinnquote von nur 40% sind Sie langfristig hochprofitabel."
      }
    ],
    "math-expected-value-kelly": [
      {
        question: "Ein System hat eine Gewinnrate von 55%. Der durchschnittliche Gewinn beträgt 400$ und der durchschnittliche Verlust 200$. Wie hoch ist der Erwartungswert (EV)?",
        options: ["130.00$", "80.00$", "110.00$", "150.00$"],
        explanation: "EV = (0.55 * 400) - (0.45 * 200) = 220 - 90 = 130$. Ein positiver Erwartungswert sichert den langfristigen Erfolg."
      },
      {
        question: "Wenn Ihre Gewinnquote bei 50% liegt und Ihr Schnitt-Gewinn doppelt so hoch ist wie der Schnitt-Verlust (b=2), welchen Teil (f*) Ihres Kontos sollten Sie nach der Kelly-Formel riskieren?",
        options: ["12.5%", "25.0%", "33.3%", "50.0%"],
        explanation: "Kelly f* = (0.50 * (2 + 1) - 1) / 2 = 25%. Das mathematisch optimale Risiko liegt bei 25% Ihres Kapitals."
      }
    ],
    "math-ruin-drawdowns": [
      {
        question: "Wenn ein Trader einen schweren Verlust von 75% erlitten hat, welchen Gewinn auf dem Restkapital benötigt er, um wieder auf null zu kommen?",
        options: ["75%", "150%", "200%", "300%"],
        explanation: "Ein Verlust von 75% erfordert einen Gewinn von 300% zur Wiederherstellung. Formel: 75 / (100 - 75) * 100 = 300%."
      },
      {
        question: "Wie wirkt sich eine Erhöhung des Risikos pro Trade von 1% auf 5% langfristig auf Ihr Ruinrisiko aus?",
        options: ["Es steigt linear um das 5-fache", "Es ändert sich nicht bei hoher Trefferquote", "Es steigt exponentiell, da die Anzahl der Fehltrades bis zum Bankrott (N) drastisch sinkt", "Es sinkt, da Gewinne schneller erzielt werden"],
        explanation: "Das Ruinrisiko steigt exponentiell. Die Verringerung der Fehlertoleranz-Einheiten N von 100 auf 20 erhöht die Wahrscheinlichkeit eines Totalverlusts durch Pechsträhnen dramatisch."
      }
    ]
  },
  ar: {
    "basics-candlesticks": [
      {
        question: "شمعة لها جسم صغير جداً بالقرب من سعر الافتتاح وظل سفلي طويل يعادل ثلاثة أضعاف حجم الجسم. ما هذا النموذج؟",
        options: ["الشهاب (Shooting Star)", "المطرقة (Hammer)", "دوجي", "ماروبوزو"],
        explanation: "هذه هي المطرقة. يشير الظل السفلي الطويل إلى أن البائعين دفعوا السعر لأسفل ولكن المشترين رفضوا ذلك بقوة، مما يشكل إشارة انعكاس صعودية قوية."
      },
      {
        question: "عندما يتم اختراق مستوى مقاومة تاريخي بصعود قوي، ماذا يصبح هذا المستوى في الغالب في المستقبل؟",
        options: ["منطقة غير صالحة يتم تجاهلها", "مستوى مقاومة أعمق", "مستوى دعم جديد (Support)", "إشارة بيع فوري قصيرة"],
        explanation: "المقاومة المخترقة غالباً ما تتحول إلى دعم. يسمى هذا 'تبادل الأدوار' أو 'إعادة اختبار الاختراق'، مما يوفر نقاط دخول منخفضة المخاطر."
      },
      {
        question: "ما هي الإشارة النفسية لنموذج الابتلاع الهبوطي (Bearish Engulfing)؟",
        options: ["التردد والتوازن في السوق", "استسلام كامل للمشترين مع ابتلاع البائعين لكامل النطاق الصعودي السابق", "استمرار صحي للاتجاه الصاعد", "عصر سعري بحجم تداول منخفض"],
        explanation: "يعني الابتلاع الهبوطي أن البائعين قد غلبوا المشترين تماماً في الفترة السابقة، مما يشير إلى انعكاس كبير أو قمة هيكلية للزخم."
      }
    ],
    "strategies-moving-averages": [
      {
        question: "لماذا يستجيب المتوسط المتحرك الأسي (EMA) أسرع لحركات الأسعار مقارنة بالمتوسط المتحرك البسيط (SMA)؟",
        options: ["لأنه يستثني عطلات نهاية الأسبوع", "لأنه يعطي وزناً رياضياً أكبر لأحدث بيانات الأسعار", "لأنه يُحسب بناءً على أعلى الأسعار بدلاً من أسعار الإغلاق", "لأنه يستخدم فترة حساب أطول"],
        explanation: "يعطي EMA وزناً أكبر للبيانات الحديثة، مما يجعله يتكيف أسرع ولكنه يجعله أيضاً أكثر عرضة للإشارات الكاذبة."
      },
      {
        question: "ما هو 'التقاطع الذهبي' (Golden Cross) في التحليل الفني؟",
        options: ["عندما يتجاوز السعر 100 دولار", "عندما يتقاطع متوسط متحرك سريع فوق متوسط متحرك بطيء", "عندما يتجاوز مؤشر RSI مستوى 70", "عندما يتضاعف حجم التداول عند إغلاق مسطح"],
        explanation: "يحدث التقاطع الذهبي عندما يتقاطع متوسط قصير المدى (مثل SMA 50) فوق متوسط طويل المدى (مثل SMA 200)، مما يشير إلى تحول قوي لسوق صاعدة طويلة الأجل."
      },
      {
        question: "في أي ظروف سوق تؤدي استراتيجيات تقاطع المتوسطات المتحركة أداءً سيئاً؟",
        options: ["الاتجاه الصاعد القوي", "الاتجاه الهابط القوي", "السوق العرضية أو المتذبذبة ضمن نطاق ضيق", "الاختراقات ذات الأحجام الكبيرة"],
        explanation: "في الأسواق الجانبية والمستقرة، تتقاطع المتوسطات بشكل متكرر ذهاباً وإياباً (الفرم)، مما يؤدي لظهور إشارات كاذبة مكلفة."
      }
    ],
    "strategies-oscillators": [
      {
        question: "إذا شكل السعر قمة صاعدة جديدة بينما شكل مؤشر RSI قمة هابطة، فما هو الهيكل الفني الذي تشكل؟",
        options: ["انحراف صعودي (Bullish Divergence)", "انحراف هبوطي (Bearish Divergence)", "تقاطع ذهبي", "استمرار الاتجاه"],
        explanation: "هذا انحراف هبوطي. يوضح أنه على الرغم من ارتفاع السعر، فإن الزخم وسرعة الشراء الحقيقية قد انخفضا، مما ينذر بانعكاس الاتجاه."
      },
      {
        question: "ماذا تشير قراءة RSI عند مستوى 85 للأصل؟",
        options: ["الأصل في حالة تشبع بيعي مفرط والصعود مضمون", "الأصل لديه زخم هبوطي قوي", "الأصل في حالة تشبع شرائي مفرط وتمدد كبير، مما يحذر من الشراء", "الأصل في نطاق تذبذب صفري"],
        explanation: "يشير RSI فوق 70 (85 في هذه الحالة) إلى تشبع شرائي مفرط. الشراء هنا ينطوي على معدل مخاطرة إلى عائد سيء للغاية."
      },
      {
        question: "كيف تتداول تقاطعات مؤشر MACD؟",
        options: ["الشراء عندما يتقاطع MACD تحت خط الصفر", "الشراء عندما يتقاطع خط MACD فوق خط الإشارة، والبيع عند تقاطعه تحت خط الإشارة", "البيع عندما يتحول الهيستوغرام إلى اللون الأخضر", "الشراء فقط عندما يكون RSI و MACD عند مستوى 50"],
        explanation: "الاستراتيجية الكلاسيكية لـ MACD هي الشراء عندما يتقاطع خط MACD صعوداً فوق خط الإشارة، والبيع أو الدخول في صفقة بيع قصيرة عند تقاطعه هبوطاً."
      }
    ],
    "risk-management": [
      {
        question: "إذا كان لديك حساب تداول بقيمة 50,000 دولار وتتبع قاعدة مخاطرة 1%، فما هو أقصى مبلغ مالي يجب أن تخسره في صفقة واحدة؟",
        options: ["5,000 دولار", "1,000 دولار", "500 دولار", "100 دولار"],
        explanation: "1% من 50,000 دولار هو 500 دولار. هذا هو الحد الأقصى للخسارة في صفقة واحدة لإبقاء حسابك آمناً تماماً."
      },
      {
        question: "رصيد حسابك هو 10,000 دولار وتود شراء بيتكوين بسعر 40,000 دولار مع وقف خسارة عند 38,000 دولار. تحت قاعدة مخاطرة 1%، ما هو حجم صفقة البيتكوين التي تشتريها؟",
        options: ["0.05 BTC", "0.10 BTC", "0.25 BTC", "1.00 BTC"],
        explanation: "المخاطرة المسموح بها هي 1% (100 دولار). المسافة لوقف الخسارة هي 2,000 دولار. الحجم = المخاطرة / المسافة = 100 / 2,000 = 0.05 BTC."
      },
      {
        question: "لماذا تعد نسبة العائد إلى المخاطرة 1:3 متفوقة رياضياً على نسبة 1:1؟",
        options: ["تضمن لك الفوز في 75% من صفقاتك", "مطلوبة من قبل شركات الوساطة", "تتيح لك البقاء رابحاً حتى لو خسرت 60% من صفقاتك", "تلغي الحاجة لوقف الخسارة"],
        explanation: "مع نسبة عائد 1:3، تكون أرباحك ثلاثة أضعاف خسائرك، مما يعني بقاءك رابحاً بشكل كبير حتى لو كانت نسبة نجاح صفقاتك 40% فقط."
      }
    ],
    "math-expected-value-kelly": [
      {
        question: "نظام تداول تبلغ نسبة نجاحه 55%، ومتوسط الصفقة الرابحة 400 دولار والخاسرة 200 دولار. ما هي القيمة المتوقعة (EV) لكل صفقة؟",
        options: ["130.00 دولار", "80.00 دولار", "110.00 دولار", "150.00 دولار"],
        explanation: "القيمة المتوقعة = (0.55 * 400) - (0.45 * 200) = 220 - 90 = 130 دولاراً. تضمن هذه القيمة الإيجابية عوائد ممتازة للمحفظة على المدى الطويل."
      },
      {
        question: "بموجب معيار كيلي، إذا كانت نسبة نجاحك 50% ومتوسط ربحك ضعف متوسط خسارتك (نسبة العائد b = 2)، فما هي النسبة المثالية (f*) للمخاطرة؟",
        options: ["12.5%", "25.0%", "33.3%", "50.0%"],
        explanation: "معادلة كيلي f* = (0.50 * (2 + 1) - 1) / 2 = 25%. بالتالي، فإن الحصة المثالية للمخاطرة هي 25% من رأس مال الحساب."
      }
    ],
    "math-ruin-drawdowns": [
      {
        question: "إذا عانى متداول من تراجع شديد بنسبة 75% من رأس ماله الأولي، فما هي النسبة المئوية للربح التي يجب تحقيقها على رأس المال المتبقي للعودة لنقطة التعادل؟",
        options: ["75%", "150%", "200%", "300%"],
        explanation: "التراجع بنسبة 75% يتطلب تحقيق ربح بنسبة 300% للتعافي. المعادلة: 75 / (100 - 75) * 100 = 300%."
      },
      {
        question: "كيف يؤثر زيادة مخاطرتك لكل صفقة من 1% إلى 5% على خطر الإفلاس (Risk of Ruin) على المدى الطويل؟",
        options: ["يزداد خطياً بمقدار 5 أضعاف", "لا يتغير إذا كانت نسبة نجاحك عالية", "يزداد بشكل أسي لأن عدد الصفقات الخاسرة المطلوبة لتصفير الحساب (N) ينخفض بشدة", "يقلل خطر الإفلاس عن طريق تسريع المكاسب"],
        explanation: "يزداد خطر الإفلاس بشكل أسي، حيث يؤدي خفض عدد الصفقات الخاسرة التي تحتملها من 100 إلى 20 إلى زيادة فرصة حدوث رقعة حظ سيئة تمحو المحفظة تماماً."
      }
    ]
  },
  ja: {
    "basics-candlesticks": [
      {
        question: "始値の近くに非常に小さな実体があり、実体の3倍以上の長さの下ひげを持つローソク足はどのパターンですか？",
        options: ["シューティングスター", "ハンマー（カラカサ）", "十字線（ドージ）", "大陽線/大陰線"],
        explanation: "これはハンマーです。長い下ひげは売り手が価格を押し下げたものの、買い手が強く押し戻したことを示し、強力な買いの反転シグナルとなります。"
      },
      {
        question: "歴史的なレジスタンスライン（抵抗線）が強いブレイクアウトによって突破された場合、将来それは何になりやすいですか？",
        options: ["無視してよい無効なゾーン", "より深いレジスタンスライン", "新しいサポートライン（支持線）", "即座の空売りシグナル"],
        explanation: "突破されたレジスタンスは頻繁にサポートへと変わります。これはロールリバーサル（役割転換）と呼ばれ、リスクの低い押し目買いの根拠を提供します。"
      },
      {
        question: "陰の包み足（ベアリッシュ・エンガルフィング）パターンの心理的なシグナルは何ですか？",
        options: ["気迷いと市場の均衡状態", "買い手が完全に降伏し、売り手が前回の買い範囲を全て包み込んだ状態", "上昇トレンドの健全な継続", "低出来高のショートスクイーズ"],
        explanation: "陰の包み足は、売り手が前期間の買い手を完全に圧倒したことを意味し、トレンド反転や構造的な天井を示す強力なサインです。"
      }
    ],
    "strategies-moving-averages": [
      {
        question: "指数平滑移動平均線（EMA）が、単純移動平均線（SMA）よりも価格変動に対して素早く反応するのはなぜですか？",
        options: ["週末や窓を除外して計算するため", "直近の価格データに対して指数関数的に高い加重を行うため", "終値ではなく高値を基準に計算するため", "より長い期間の計算を使用するため"],
        explanation: "EMAは直近の価格データを重視して計算するため、価格変化に素早く適合しますが、その反面ダマシ（往復ビンタ）にかかりやすくなります。"
      },
      {
        question: "テクニカル分析における「ゴールデンクロス」とは何ですか？",
        options: ["価格が100ドルを突破したとき", "短期移動平均線が長期移動平均線を上抜けたとき", "RSIが70を突破したとき", "保ち合いの終値で出来高が2倍になったとき"],
        explanation: "ゴールデンクロスは、50日線などの短期MAが200日線などの長期MAを上抜ける現象で、長期的な上昇トレンドへの転換を示します。"
      },
      {
        question: "移動平均線のクロスオーバー戦略のパフォーマンスが極端に悪化するのは、どのような相場環境ですか？",
        options: ["強力な上昇トレンド", "強力な下降トレンド", "保ち合いやレンジ（横ばい）相場", "大商いを伴うブレイクアウト"],
        explanation: "レンジ相場では、移動平均線が何度も交差し合う（ダマシの連続）ため、売買シグナルに盲従すると損失を重ねやすくなります。"
      }
    ],
    "strategies-oscillators": [
      {
        question: "資産の価格が新高値を更新しているにもかかわらず、RSIが高値を切り下げている場合、どのようなテクニカル構造が形成されていますか？",
        options: ["強気のダイバージェンス", "弱気のダイバージェンス", "ゴールデンクロス", "トレンドの継続"],
        explanation: "これは弱気のダイバージェンスです。価格は上昇しているものの、その背後にあるモメンタム（買い圧力）が低下していることを示し、上昇トレンドの終わりを警告します。"
      },
      {
        question: "ある資産のRSIが85を示している場合、それは何を意味しますか？",
        options: ["極端な売られすぎで、上昇爆発が約束されている", "強力な下落トレンドの勢いがある", "歴史的な買われすぎ・過熱状態であり、新規買いは極めて危険", "ボラティリティがゼロのスクイーズ状態"],
        explanation: "RSIが70以上（今回は85）は買われすぎを意味します。トレンドが過剰に伸長しているため、ここからの買いはリスク・リワードが極めて悪くなります。"
      },
      {
        question: "MACDのクロスオーバーはどのように取引しますか？",
        options: ["MACDがゼロラインを下抜けたときに買う", "MACDラインがシグナルラインを上抜けたときに買い、下抜けたときに売る", "ヒストグラムが緑に変わったときに売る", "RSIとMACDが共に50のときだけ買う"],
        explanation: "古典的なMACD戦略は、MACDラインがシグナルラインを上抜いたときに買い、下抜いたときに売るか空売りをしてトレンドに乗る方法です。"
      }
    ],
    "risk-management": [
      {
        question: "50,000ドルの口座資金があり、1%リスクルールに従う場合、1回の取引で許容される最大損失額はいくらですか？",
        options: ["5,000ドル", "1,000ドル", "500ドル", "100ドル"],
        explanation: "50,000ドルの1%は500ドルです。1回の取引における損失をこの額に抑えることで、連敗しても資金を安全に保つことができます。"
      },
      {
        question: "口座資金が10,000ドルで、価格40,000ドルのビットコインを、38,000ドルの損切り設定で買いたいとします。1%リスクルールに従う場合、何BTC購入すべきですか？",
        options: ["0.05 BTC", "0.10 BTC", "0.25 BTC", "1.00 BTC"],
        explanation: "1%の許容リスク額は100ドルです。損切り幅は 40,000 - 38,000 = 2,000ドル。ポジションサイズ = リスク額 / 損切り幅 = 100 / 2,000 = 0.05 BTC。"
      },
      {
        question: "リスク・リワード比（R:R）1:3の取引が、1:1の取引に比べて数学的に優れているのはなぜですか？",
        options: ["勝率75%を保証するため", "ブローカーによって規定されているため", "勝率が40%（60%の負け）であっても大きな利益を残せるため", "損切りが不要になるため"],
        explanation: "1:3の比率では、1回の勝ちが損失3回分をカバーします。勝率が40%と低くても、4回の勝ち（12ポイント）が6回の負け（6ポイント）を上回り、十分に利益を上げられます。"
      }
    ],
    "math-expected-value-kelly": [
      {
        question: "ある取引システムの勝率が55%で、平均利益が400ドル、平均損失が200ドルの場合、1取引あたりの期待値（EV）はいくらですか？",
        options: ["130.00ドル", "80.00ドル", "110.00ドル", "150.00ドル"],
        explanation: "EV = (0.55 * 400) - (0.45 * 200) = 220 - 90 = 130ドル。このプラスの期待値は、長期的な大数の法則によって口座の成長を約束します。"
      },
      {
        question: "ケリー基準において、勝率50%で平均利益が平均損失の2倍（ペイオフ比 b = 2）の場合、リスクにさらす最適な資金比率（f*）はいくらですか？",
        options: ["12.5%", "25.0%", "33.3%", "50.0%"],
        explanation: "ケリー公式 f* = (0.50 * (2 + 1) - 1) / 2 = 25% です。数学的に最適な口座リスク比率は25.0%となります。"
      }
    ],
    "math-ruin-drawdowns": [
      {
        question: "トレーダーが初期資金の75%を失う大打撃（ドローダウン）を受けた場合、元本に戻すために残った資金で達成しなければならないリターンは何%ですか？",
        options: ["75%", "150%", "200%", "300%"],
        explanation: "75%のドローダウンからの回復には、300%の利益が必要です。計算：75 / (100 - 75) * 100 = 75 / 25 * 100 = 300%。"
      },
      {
        question: "1トレードあたりのリスクを1%から5%に引き上げた場合、長期的な破産確率（Risk of Ruin）にはどのような影響がありますか？",
        options: ["線形に5倍に増加する", "勝率が高ければ変化しない", "口座を破産に追い込む連敗許容数（N）が急減するため、指数関数的に跳ね上がる", "利益を加速させて破産確率を引き下げる"],
        explanation: "破産確率は指数関数的に増加します。資金のクッションとしての連敗許容数 N が100から20に減ることで、ランダムな不運の波で破産する確率が劇的に高まります。"
      }
    ]
  },
  zh: {
    "basics-candlesticks": [
      {
        question: "一个K线的实体非常小且靠近开盘价，而下影线的长度是实体的三倍。这是什么形态？",
        options: ["流星线", "锤子线", "十字星", "光头光脚K线"],
        explanation: "这是锤子线。长下影线表明空头虽曾猛烈打压价格，但多头最终强力收复失地，是强烈的看涨反转信号。"
      },
      {
        question: "当一个历史阻力位被强力突破后，在未来的走势中它通常会演变成什么？",
        options: ["一个需要忽略的无效区域", "一个更深层的阻力位", "一个全新的支撑位", "一个立即做空信号"],
        explanation: "被突破 class 阻力线通常会转化为支撑线。这被称为“角色互换”或“突破回踩”策略，为多头提供低风险的建仓机会。"
      },
      {
        question: "看跌吞没形态背后的心理学信号是什么？",
        options: ["市场方向不明与多空平衡", "多头彻底放弃抵抗，空头席卷并吞没了之前的全部上涨区间", "上涨趋势的健康延续", "低成交量的空头挤压"],
        explanation: "看跌吞没意味着空头已经彻底压倒了前期的多头买盘，标志着上涨趋势的结束或结构性的中短期顶部。"
      }
    ],
    "strategies-moving-averages": [
      {
        question: "为什么指数移动平均线（EMA）比简单移动平均线（SMA）对价格变化反应更灵敏？",
        options: ["它排除了周末和跳空缺口", "它在数学上给予了近期价格更高的权重", "它是基于最高价而非收盘价计算的", "它使用的计算周期更长"],
        explanation: "EMA给予了最新数据更多的权重，因此能更快适应新趋势，但这也导致它更容易受到虚假信号（洗盘）的干扰。"
      },
      {
        question: "技术分析中的“黄金交叉”是指什么？",
        options: ["当价格突破100美元时", "当快速移动平均线向上穿越慢速移动平均线时", "当RSI突破70时", "当收平盘时成交量突然翻倍"],
        explanation: "黄金交叉是指短期均线（如 50 SMA）向上穿越长期均线（如 200 SMA），表明市场已步入长期牛市。"
      },
      {
        question: "在什么样的市场环境下，均线交叉策略的表现通常会变得非常糟糕？",
        options: ["强劲的上升趋势中", "强劲的下跌趋势中", "震荡市或区间内横盘的无趋势市场", "伴随高成交量的突破"],
        explanation: "在横盘整理或震荡市中，均线会频繁交叉（即反复洗盘），盲目跟从信号会导致连续的摩擦损失。"
      }
    ],
    "strategies-oscillators": [
      {
        question: "如果资产价格创出新高，但RSI指标却形成了更低的高点，这形成了什么技术结构？",
        options: ["看涨背离", "看跌背离", "黄金交叉", "趋势延续"],
        explanation: "这是看跌背离。它表明虽然价格在创新高，但背后的买盘动能和上涨速度正在减弱，是趋势即将见顶的重要警告。"
      },
      {
        question: "当资产的RSI读数达到85时，说明了什么？",
        options: ["该资产处于严重超卖状态，即将大幅反弹", "该资产具有强烈的看跌下行趋势", "该资产处于历史性的超买和超伸展状态，不宜追高买入", "该资产处于零波动的极窄通道中"],
        explanation: "RSI大于70（在此为85）意味着严重超买。此时追高建仓面临着极差的盈亏比，因为趋势回调压力极大。"
      },
      {
        question: "如何操作MACD金叉或死叉？",
        options: ["当MACD穿越零轴下方时买入", "当MACD线向上穿越信号线时买入，向下穿越信号线时卖出/做空", "当柱状图转绿时卖出", "只有在RSI和MACD都处于50时才买入"],
        explanation: "经典的MACD策略是当MACD线向上穿越信号线（金叉）时顺势买入，向下穿越信号线（死叉）时平仓或反手做空。"
      }
    ],
    "risk-management": [
      {
        question: "如果您的交易账户为50,000美元，并严格遵守1%风险法则，那么单笔交易的最大亏损金额应该是多少？",
        options: ["5,000美元", "1,000美元", "500美元", "100美元"],
        explanation: "50,000美元的1%是500美元。这是你单笔交易被强制止损的最大容忍额，可以确保账户不因单次失败而受到重创。"
      },
      {
        question: "您的账户资金为10,000美元。你想在40,000美元买入比特币，并将止损点设在38,000美元。在1%风险法则下，你应该买入多少BTC？",
        options: ["0.05 BTC", "0.10 BTC", "0.25 BTC", "1.00 BTC"],
        explanation: "单笔最大允许风险为1%（100美元）。止损距离为 40,000 - 38,000 = 2,000美元。仓位大小 = 风险额 / 止损距离 = 100 / 2,000 = 0.05 BTC。"
      },
      {
        question: "为什么1:3的盈亏比（Risk-to-Reward）在数学上显著优于1:1的盈亏比？",
        options: ["它能确保你获得至少75%的胜率", "这是所有交易经纪商的强制要求", "它能让你在面临60%的亏损交易时依然保持高额盈利", "它让你不再需要设置止损点"],
        explanation: "在1:3的盈亏比下，你单次盈利是单次亏损的3倍。这意味着即使你的胜率只有40%（亏损率60%），在10次交易中4次盈利赚12个单位，6次亏损赔6个单位，最终依然净赚6个单位。"
      }
    ],
    "math-expected-value-kelly": [
      {
        question: "某交易系统胜率为55%，平均单笔盈利为400美元，平均单笔亏损为200美元。请问该系统的单笔交易期望值（EV）是多少？",
        options: ["$130.00", "$80.00", "$110.00", "$150.00"],
        explanation: "期望值 EV = (0.55 * 400) - (0.45 * 200) = 220 - 90 = 130美元。正的期望值是在大样本下实现财富稳定增长的基石。"
      },
      {
        question: "在凯利公式下，如果你的胜率为50%，且平均盈利是平均亏损的2倍（盈亏比 b = 2），那么你单笔交易应该冒多大比例（f*）的账户风险？",
        options: ["12.5%", "25.0%", "33.3%", "50.0%"],
        explanation: "凯利比例 f* = (0.50 * (2 + 1) - 1) / 2 = 25%。因此，数学上最优的账户仓位暴露比例是25.0%。"
      }
    ],
    "math-ruin-drawdowns": [
      {
        question: "如果一个交易者不幸遭遇了75%的账户净值回撤，他需要用剩余资金实现多少百分比的涨幅才能回本？",
        options: ["75%", "150%", "200%", "300%"],
        explanation: "75%的回撤需要高达300%的回本涨幅。计算公式：75 / (100 - 75) * 100 = 75 / 25 * 100 = 300%。这展示了账户回撤的非对称性。"
      },
      {
        question: "在长期交易生涯中，将单笔交易承受的风险从1%提高到5%，会对你的破产概率（Risk of Ruin）产生什么影响？",
        options: ["呈5倍线性增长", "如果胜率很高，则没有任何影响", "呈指数级暴增，因为承受连败并导致爆仓的次数（N）大幅减少", "会通过加速盈利而降低破产概率"],
        explanation: "破产风险呈指数级上升。将容忍连续亏损爆仓的次数 N 从100次压缩至20次，会使得在随机波动的坏运气下直接爆仓的概率急剧攀升。"
      }
    ]
  },
  pt: {
    "basics-candlesticks": [
      {
        question: "Um candle possui corpo muito pequeno perto da abertura e uma longa sombra inferior (3x o corpo). O que é?",
        options: ["Estrela Cadente", "Martelo (Hammer)", "Doji", "Marubozu"],
        explanation: "Este é um Martelo. Indica forte rejeição dos preços baixos pelos compradores, sendo um sinal de reversão altista potente."
      },
      {
        question: "Quando um nível de Resistência histórico é rompido por um movimento forte de alta, o que ele frequentemente se torna no futuro?",
        options: ["Uma zona inválida a ser ignorada", "Uma resistência ainda mais forte", "Um novo nível de Suporte", "Um sinal de venda imediato"],
        explanation: "Uma resistência rompida frequentemente se torna suporte. Isto é chamado de inversão de polaridade ou teste de rompimento, oferecendo compras de baixo risco."
      },
      {
        question: "Qual o sinal psicológico por trás do padrão de Engolfo de Baixa?",
        options: ["Indecisão e equilíbrio do mercado", "Capitulação completa dos compradores à medida que os vendedores engolem toda a alta anterior", "Continuação saudável de uma tendência de alta", "Um squeeze com baixo volume de negociação"],
        explanation: "O engolfo de baixa indica que os vendedores superaram totalmente os compradores do período anterior, marcando uma reversão ou topo de momentum."
      }
    ],
    "strategies-moving-averages": [
      {
        question: "Por que a Média Móvel Exponencial (EMA) reage mais rápido às variações de preço do que a Média Móvel Simples (SMA)?",
        options: ["Ela ignora lacunas e finais de semana", "Ela dá um peso matemático maior aos dados de preços mais recentes", "Ela é baseada nas máximas em vez dos fechamentos", "Ela usa períodos mais longos de cálculo"],
        explanation: "A EMA atribui maior peso aos dados mais recentes, adaptando-se rapidamente a mudanças de tendência, mas ficando mais propensa a falsos sinais."
      },
      {
        question: "O que representa o cruzamento 'Golden Cross' na análise técnica?",
        options: ["O preço cruzar acima de US$ 100", "Uma média móvel rápida cruzar acima de uma média móvel lenta", "O RSI ultrapassar a marca de 70", "O volume dobrar em um fechamento plano"],
        explanation: "O Golden Cross ocorre quando uma média móvel de curto prazo (como a SMA de 50) cruza acima de uma média de longo prazo (SMA de 200), indicando transição para uma alta sustentada."
      },
      {
        question: "Em que condição de mercado as estratégias de cruzamento de médias móveis apresentam pior desempenho?",
        options: ["Tendência de alta forte", "Tendência de baixa forte", "Mercado lateralizado (em consolidação)", "Rompimentos com volume expressivo"],
        explanation: "Em mercados sem tendência nítida, as médias móveis cruzam-se repetidamente sem direção (violonadas), acumulando perdas por falsos sinais."
      }
    ],
    "strategies-oscillators": [
      {
        question: "Se o preço de um ativo faz uma nova máxima mais alta, mas o RSI registra uma máxima mais baixa, qual estrutura técnica foi formada?",
        options: ["Divergência de Alta", "Divergência de Baixa", "Cruzamento Dourado", "Continuação de Tendência"],
        explanation: "Isto é uma Divergência de Baixa. Mostra que embora o preço tenha subido, a velocidade e a força compradora diminuíram, alertando sobre correção próxima."
      },
      {
        question: "O que uma leitura de RSI em 85 indica sobre um ativo?",
        options: ["Ativo muito sobrevendido, alta expressiva garantida", "Ativo com forte momentum de baixa", "Ativo historicamente sobrecomprado e esticado, desaconselhando novas compras", "Ativo estagnado sem volatilidade"],
        explanation: "Um RSI acima de 70 (85 neste caso) sinaliza sobrecompra extrema. Comprar nestas condições oferece um péssimo retorno ajustado ao risco."
      },
      {
        question: "Como você opera um cruzamento de MACD?",
        options: ["Comprando quando o MACD cruza abaixo de zero", "Comprando quando a linha MACD cruza acima da linha de Sinal, e vendendo quando cruza abaixo", "Vendendo quando o histograma fica verde", "Comprando apenas quando RSI e MACD estão ambos em 50"],
        explanation: "A estratégia clássica de MACD orienta a compra quando a linha MACD cruza acima do Sinal, e venda ou venda a descoberto quando cruza abaixo."
      }
    ],
    "risk-management": [
      {
        question: "Se você tem uma conta de US$ 50.000 e segue a regra de risco de 1%, qual o valor máximo em dólares que pode perder em um único trade?",
        options: ["US$ 5.000", "US$ 1.000", "US$ 500", "US$ 100"],
        explanation: "1% de US$ 50.000 equivale a US$ 500. Este deve ser seu limite rígido de perda por operação para proteger sua carteira."
      },
      {
        question: "Sua conta é de US$ 10.000. Deseja comprar Bitcoin a US$ 40.000 com stop em US$ 38.000. Seguindo a regra de 1%, que tamanho de BTC deve adquirir?",
        options: ["0.05 BTC", "0.10 BTC", "0.25 BTC", "1.00 BTC"],
        explanation: "Seu risco admitido é de 1% (US$ 100). A distância até o stop é de US$ 2.000. Tamanho = Risco / Distância = US$ 100 / US$ 2.000 = 0.05 BTC."
      },
      {
        question: "Por que uma relação de Risco-Retorno de 1:3 é matematicamente superior a uma relação de 1:1?",
        options: ["Garante uma taxa de acerto de 75%", "É uma exigência obrigatória das corretoras", "Permite que você seja altamente lucrativo mesmo perdendo 60% das operações", "Elimina totalmente a necessidade de usar Stop Loss"],
        explanation: "Com uma relação de R:R de 1:3, os ganhos são três vezes maiores que as perdas. Assim, mesmo com uma taxa de acerto modesta de 40%, o saldo final será positivo."
      }
    ],
    "math-expected-value-kelly": [
      {
        question: "Um sistema tem 55% de taxa de acerto. O trade ganho médio é de US$ 400 e o perdido médio é de US$ 200. Qual o Valor Esperado (EV) por trade?",
        options: ["US$ 130.00", "US$ 80.00", "US$ 110.00", "US$ 150.00"],
        explanation: "EV = (0.55 * 400) - (0.45 * 200) = 220 - 90 = US$ 130. Esse EV positivo assegura rentabilidade ao longo de uma série longa de execuções."
      },
      {
        question: "Sob o Critério de Kelly, se sua taxa de acerto é de 50% e seu ganho médio é o dobro da perda média (razão b = 2), qual a fração ideal (f*) do capital a arriscar?",
        options: ["12.5%", "25.0%", "33.3%", "50.0%"],
        explanation: "Fórmula de Kelly f* = (0.50 * (2 + 1) - 1) / 2 = 25%. Logo, a fração matematicamente ótima para arriscar é 25.0% da conta."
      }
    ],
    "math-ruin-drawdowns": [
      {
        question: "Se um trader sofre uma perda severa de 75% de seu capital inicial, qual o retorno percentual que ele precisa obter sobre o capital restante para recuperar o equilíbrio?",
        options: ["75%", "150%", "200%", "300%"],
        explanation: "Um rebaixamento (drawdown) de 75% exige uma alta de 300% para retornar ao capital inicial. Fórmula: 75 / (100 - 75) * 100 = 300%."
      },
      {
        question: "Como o aumento do risco por trade de 1% para 5% impacta seu Risco de Ruína ao longo de uma carreira de trading?",
        options: ["Aumenta linearmente em 5x", "Não muda se sua taxa de acerto for elevada", "Aumenta exponencialmente porque o número de trades perdedores necessários para quebrar (N) cai drasticamente", "Diminui o risco de ruína ao acelerar o crescimento"],
        explanation: "O Risco de Ruína cresce de forma exponencial. Reduzir as perdas suportadas N de 100 para 20 eleva drasticamente a chance de que uma sequência azarada consuma toda a conta."
      }
    ]
  },
  it: {
    "basics-candlesticks": [
      {
        question: "Una candela ha un corpo piccolissimo vicino all'apertura e una mèche inferiore molto lunga. Che pattern è?",
        options: ["Shooting Star", "Martello (Hammer)", "Doji", "Marubozu"],
        explanation: "È un Martello. La lunga mèche inferiore indica che i venditori hanno spinto giù i prezzi, ma i compratori li hanno fortemente respinti, formando un segnale rialzista."
      },
      {
        question: "Quando una resistenza storica viene rotta da un breakout aggressivo, cosa diventa frequentemente in futuro?",
        options: ["Una zona non valida da ignorare", "Una resistenza ancora più profonda", "Un nuovo livello di Supporto", "Un segnale immediato di vendita"],
        explanation: "La vecchia resistenza rotta spesso si trasforma in supporto. Si chiama 'inversione di polarità' o 'retest del breakout', e fornisce entrate a basso rischio."
      },
      {
        question: "Qual è il segnale psicologico di un pattern Engulfing Ribassista?",
        options: ["Indecisione ed equilibrio di mercato", "Completa capitolazione dei compratori poiché i venditori inglobano l'intero range rialzista precedente", "Una sana continuazione del trend rialzista", "Uno squeeze con bassi volumi"],
        explanation: "Un Engulfing Ribassista indica che i venditori hanno completamente sopraffatto i compratori del periodo precedente, anticipando una potenziale inversione di trend."
      }
    ],
    "strategies-moving-averages": [
      {
        question: "Perché una media mobile esponenziale (EMA) reagisce più rapidamente ai movimenti di prezzo rispetto a una media mobile semplice (SMA)?",
        options: ["Esclude i fine settimana e i gap", "Attribuisce un peso matematico superiore ai prezzi più recenti", "Viene calcolata sui prezzi massimi anziché sulle chiusure", "Utilizza un periodo di calcolo più lungo"],
        explanation: "L'EMA attribuisce maggiore importanza ai dati recenti, adattandosi rapidamente ma risultando leggermente più incline a generare falsi segnali."
      },
      {
        question: "Cos'è un 'Golden Cross' (Incrocio d'oro) nell'analisi tecnica?",
        options: ["Quando il prezzo sale sopra i 100$", "Quando una media mobile rapida incrocia al di sopra di una lenta", "Quando l'RSI incrocia al di sopra di 70", "Quando il volume raddoppia su una chiusura piatta"],
        explanation: "Un Golden Cross si verifica quando una MA a breve termine (es. SMA a 50) incrocia al di sopra di una MA a lungo termine (es. SMA a 200), indicando l'inizio di un trend rialzista di fondo."
      },
      {
        question: "In quale condizione di mercato le strategie basate sull'incrocio di medie mobili registrano pessime performance?",
        options: ["Forte trend rialzista", "Forte trend ribassista", "Fase di mercato laterale o trading range", "Breakout con alti volumi"],
        explanation: "In un mercato laterale, le medie mobili si incrociano ripetutamente (whip-sawing), infliggendo una serie di piccole perdite sistematiche."
      }
    ],
    "strategies-oscillators": [
      {
        question: "Se il prezzo compie un nuovo massimo più alto, ma l'RSI mostra un massimo decrescente, quale configurazione tecnica si è formata?",
        options: ["Divergenza Rialzista", "Divergenza Ribassista", "Incrocio d'oro", "Continuazione del trend"],
        explanation: "È una Divergenza Ribassista. Evidenzia che, nonostante il prezzo continui a salire, la forza e la velocità degli acquisti si stanno esaurendo, avvisando di una correzione imminente."
      },
      {
        question: "Cosa indica una lettura dell'RSI pari a 85 su un determinato asset?",
        options: ["L'asset è gravemente ipervenduto ed è garantito un rimbalzo", "L'asset presenta un forte trend ribassista", "L'asset è storicamente in ipercomprato ed esteso, sconsigliando acquisti", "L'asset è bloccato in una fase a volatilità zero"],
        explanation: "Un RSI sopra 70 (in questo caso 85) indica ipercomprato estremo. Acquistare a questi livelli offre un pessimo rapporto rischio-rendimento."
      },
      {
        question: "Come si fa trading su un incrocio della linea MACD?",
        options: ["Si acquista quando il MACD scende sotto lo zero", "Si acquista quando il MACD incrocia al di sopra della Signal Line, e si vende quando scende sotto", "Si vende quando l'istogramma diventa verde", "Si acquista solo se RSI e MACD si trovano a 50"],
        explanation: "La strategia classica consiste nel comprare quando la linea MACD taglia al rialzo la linea di segnale e vendere o aprire posizioni corte quando taglia al ribasso."
      }
    ],
    "risk-management": [
      {
        question: "Se hai un conto di trading di 50.000$ e segui la regola del rischio dell'1%, qual è l'importo massimo che puoi perdere su un singolo trade?",
        options: ["5.000$", "1.000$", "500$", "100$"],
        explanation: "L'1% di 50.000$ è pari a 500$. Questo è il limite massimo di perdita programmato per operazione a tutela del portafoglio."
      },
      {
        question: "Il tuo conto ha un saldo di 10.000$. Vuoi comprare Bitcoin a 40.000$, impostando lo stop loss a 38.000$. Seguendo la regola dell'1%, quanto BTC dovresti acquistare?",
        options: ["0.05 BTC", "0.10 BTC", "0.25 BTC", "1.00 BTC"],
        explanation: "Il rischio del conto è l'1% (100$). La distanza dello stop loss è 40.000$ - 38.000$ = 2.000$. Taglia posizione = Rischio / Distanza = 100$ / 2.000$ = 0.05 BTC."
      },
      {
        question: "Perché un rapporto Rischio-Rendimento pari a 1:3 è matematicamente superiore a un rapporto 1:1?",
        options: ["Garantisce una percentuale di trade vincenti del 75%", "È imposto d'ufficio dai broker", "Consente di essere altamente profittevole anche perdendo il 60% dei trade", "Elimina del tutto la necessità di usare gli Stop Loss"],
        explanation: "Con un rapporto R:R pari a 1:3, i trade vincenti guadagnano il triplo di quanto perdono i trade negativi. Questo garantisce profitto complessivo anche con il 40% di tasso di successo."
      }
    ],
    "math-expected-value-kelly": [
      {
        question: "Un sistema ha una percentuale di successo del 55%. Il profitto medio è di 400$ e la perdita media è di 200$. Qual è il valore atteso (EV) per trade?",
        options: ["130.00$", "80.00$", "110.00$", "150.00$"],
        explanation: "EV = (0.55 * 400) - (0.45 * 200) = 220 - 90 = 130$. Essendo positivo, il sistema garantisce ritorni nel lungo termine."
      },
      {
        question: "In base al criterio di Kelly, se hai il 50% di win rate e la vincita media è il doppio della perdita (payout ratio b=2), quale percentuale (f*) dovresti rischiare?",
        options: ["12.5%", "25.0%", "33.3%", "50.0%"],
        explanation: "Formula di Kelly f* = (0.50 * (2 + 1) - 1) / 2 = 25%. La quota ottimale da rischiare è quindi il 25.0% del conto."
      }
    ],
    "math-ruin-drawdowns": [
      {
        question: "Se un trader subisce un pesante drawdown del 75% del capitale di partenza, quale percentuale di guadagno deve realizzare sul capitale rimanente per tornare in pari?",
        options: ["75%", "150%", "200%", "300%"],
        explanation: "Un drawdown del 75% richiede un profitto di recupero del 300%. Formula: 75 / (100 - 75) * 100 = 300%."
      },
      {
        question: "Che impatto ha a lungo termine l'aumento del rischio per trade dall'1% al 5% sulla probabilità di rovina?",
        options: ["Aumenta linearmente di 5 volte", "Non cambia se la percentuale di successo è elevata", "Aumenta esponenzialmente perché la tolleranza alle serie negative (N) crolla drasticamente", "Diminuisce la probabilità di rovina accelerando i profitti"],
        explanation: "La probabilità di rovina cresce in modo esponenziale. Riducendo il cuscinetto N di perdite tollerate da 100 a 20, aumenta vertiginosamente la probabilità che una racha sfortunata azzeri il conto."
      }
    ]
  },
  ru: {
    "basics-candlesticks": [
      {
        question: "У свечи очень маленькое тело у цены открытия и длинная нижняя тень, которая в три раза больше тела. Что это за паттерн?",
        options: ["Падающая звезда", "Молот (Hammer)", "Доджи", "Марубозу"],
        explanation: "Это Молот. Длинная нижняя тень указывает на то, что продавцы агрессивно опустили цену, но покупатели полностью отыграли падение, создавая бычий сигнал."
      },
      {
        question: "Когда исторический уровень сопротивления пробивается агрессивным выходом вверх, чем он часто становится в будущем?",
        options: ["Недействительной зоной, которую игнорируют", "Более глубоким уровнем сопротивления", "Новым уровнем поддержки", "Мгновенным сигналом на шорт"],
        explanation: "Пробитое сопротивление часто превращается в поддержку. Это называется сменой ролей или ретестом пробоя, что дает возможность для сделок с низким риском."
      },
      {
        question: "Каков психологический сигнал паттерна медвежьего поглощения (Bearish Engulfing)?",
        options: ["Нерешительность и рыночное равновесие", "Полная капитуляция покупателей, когда продавцы поглощают весь предыдущий бычий диапазон", "Здоровое продолжение восходящего тренда", "Шорт-сквиз на малом объеме"],
        explanation: "Медвежье поглощение означает, что продавцы полностью одолели покупателей предыдущего периода, указывая на разворот или вершину импульса."
      }
    ],
    "strategies-moving-averages": [
      {
        question: "Почему экспоненциальная скользящая средняя (EMA) реагирует на изменения цен быстрее, чем простая скользящая средняя (SMA)?",
        options: ["Она исключает выходные и гэпы", "Она придает математически больший вес самым последним ценовым данным", "Она рассчитывается по максимумам, а не по закрытиям", "Она использует более длительный период расчета"],
        explanation: "EMA придает больший вес последним ценам, что позволяет ей быстрее адаптироваться, но делает ее более восприимчивой к ложным сигналам."
      },
      {
        question: "Что такое 'Золотой крест' в техническом анализе?",
        options: ["Когда цена превышает 100 долларов", "Когда более быстрая скользящая средняя пересекает более медленную снизу вверх", "Когда RSI пересекает уровень 70 снизу вверх", "Когда объем удваивается на плоском закрытии"],
        explanation: "Золотой крест происходит, когда краткосрочная скользящая средняя пересекает долгосрочную снизу вверх, указывая на переход к долгосрочному бычьему тренду."
      },
      {
        question: "В каких рыночных условиях стратегии пересечения скользящих средних показывают худшие результаты?",
        options: ["Сильный восходящий тренд", "Сильный нисходящий тренд", "Флэт, боковой или диапазонный рынок", "Прорывы на больших объемах"],
        explanation: "В боковых коридорах скользящие средние постоянно пересекаются туда-обратно (распил), генерируя дорогие ложные сигналы."
      }
    ],
    "strategies-oscillators": [
      {
        question: "Если цена актива обновляет максимумы, а RSI показывает более низкий пик, какая техническая фигура сформировалась?",
        options: ["Бычья дивергенция", "Медвежья дивергенция", "Золотой крест", "Продолжение тренда"],
        explanation: "Это медвежья дивергенция. Она показывает, что хотя цена выросла, сила покупок уменьшилась, предупреждая о скором развороте тренда."
      },
      {
        question: "О чем свидетельствует показатель RSI на уровне 85 для актива?",
        options: ["Актив сильно перепродан, рост гарантирован", "Актив имеет сильный медвежий импульс", "Актив исторически перекуплен и перерастянут, предостерегая от покупок", "Актив зажат в зоне нулевой волатильности"],
        explanation: "RSI выше 70 (в данном случае 85) означает сильную перекупленность. Покупка на этих уровнях предлагает крайне невыгодное соотношение риска и прибыли."
      },
      {
        question: "Как торговать на пересечении MACD?",
        options: ["Покупать, когда MACD пересекает нулевую линию сверху вниз", "Покупать, когда линия MACD пересекает сигнальную линию снизу вверх, и продавать при пересечении сверху вниз", "Продавать, когда гистограмма становится зеленой", "Покупать только когда RSI и MACD находятся на уровне 50"],
        explanation: "Классическая стратегия MACD состоит в покупке, когда линия MACD пересекает сигнальную линию снизу вверх, и продаже или открытии шорта при обратном пересечении."
      }
    ],
    "risk-management": [
      {
        question: "Если у вас торговый счет на 50 000 долларов и вы следуете правилу риска в 1%, какова максимальная сумма убытка в одной сделке?",
        options: ["5 000 долларов", "1 000 долларов", "500 долларов", "100 долларов"],
        explanation: "1% от 50 000 долларов составляет 500 долларов. Это ваш максимальный лимит потерь на сделку для надежной защиты счета."
      },
      {
        question: "Баланс счета 10 000 долларов. Вы хотите купить Биткоин по цене 40 000 долларов со стопом на 38 000 долларов. Каким размером BTC вы должны войти по правилу риска в 1%?",
        options: ["0.05 BTC", "0.10 BTC", "0.25 BTC", "1.00 BTC"],
        explanation: "Ваш допустимый риск 1% (100 долларов). Ценовая дистанция до стопа равна 2 000 долларов. Размер позиции = Риск / Дистанция = 100 / 2 000 = 0.05 BTC."
      },
      {
        question: "Почему соотношение риска и прибыли 1:3 математически превосходит соотношение 1:1?",
        options: ["Оно гарантирует 75% прибыльных сделок", "Оно требуется брокерами по умолчанию", "Оно позволяет оставаться в прибыли, даже если вы теряете в 60% сделок", "Оно устраняет необходимость в стоп-лоссах"],
        explanation: "При соотношении 1:3 прибыль в успешных сделках в три раза превышает убытки в неудачных. Даже при скромном винрейте в 40% счет будет стабильно расти."
      }
    ],
    "math-expected-value-kelly": [
      {
        question: "Система имеет винрейт 55%. Средняя прибыль составляет 400 долларов, средний убыток — 200 долларов. Каково математическое ожидание (EV) на сделку?",
        options: ["130.00 долларов", "80.00 долларов", "110.00 долларов", "150.00 долларов"],
        explanation: "EV = (0.55 * 400) - (0.45 * 200) = 220 - 90 = 130 долларов. Положительное матожидание гарантирует доходность на долгой дистанции."
      },
      {
        question: "По критерию Келли, при винрейте 50% и средней прибыли, вдвое превышающей убыток (b = 2), какой долей капитала (f*) оптимально рисковать?",
        options: ["12.5%", "25.0%", "33.3%", "50.0%"],
        explanation: "Келли f* = (0.50 * (2 + 1) - 1) / 2 = 25%. Таким образом, математически оптимальный риск составляет 25.0% от счета."
      }
    ],
    "math-ruin-drawdowns": [
      {
        question: "Если трейдер теряет 75% своего стартового капитала, какую доходность в процентах он должен показать на оставшиеся деньги, чтобы просто выйти в безубыток?",
        options: ["75%", "150%", "200%", "300%"],
        explanation: "Просадка в 75% требует последующего роста на 300% для восстановления. Формула: 75 / (100 - 75) * 100 = 300%."
      },
      {
        question: "Как увеличение риска на сделку с 1% до 5% влияет на ваш риск разорения (Risk of Ruin) на долгой дистанции?",
        options: ["Растет линейно в 5 раз", "Не меняется, если винрейт высокий", "Растет экспоненциально, так как критическое число убыточных сделок до слива (N) резко падает", "Снижает риск разорения за счет ускорения роста"],
        explanation: "Риск разорения растет экспоненциально. Уменьшение буфера сделок N со 100 до 20 резко увеличивает вероятность того, что случайная череда неудач полностью уничтожит ваш портфель."
      }
    ]
  }
};
