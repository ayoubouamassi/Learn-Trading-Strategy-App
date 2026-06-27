/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LanguageCode } from "./translations";

export interface ScenarioTransItem {
  name: string;
  description: string;
  strategyName: string;
  strategyDescription: string;
  learningObjectives: string[];
}

export const scenarioTranslations: Record<
  Exclude<LanguageCode, "en">,
  Record<string, ScenarioTransItem>
> = {
  es: {
    "bitcoin-trend": {
      name: "El Ascenso Parabólico de Bitcoin 2020",
      description: "Experimenta un régimen legendario de seguimiento de tendencias. Aprende a identificar retrocesos de alta probabilidad en medias móviles de corto plazo (20 EMA) y a gestionar stops dinámicos durante un impulso acelerado del mercado.",
      strategyName: "Retrocesos y Cruces de Medias Móviles",
      strategyDescription: "Utiliza el cruce de la EMA de 20 y la SMA de 50 para mantenerte en el lado correcto de la tendencia macro, entrando en compras exclusivamente durante retrocesos a las líneas de soporte de la media móvil.",
      learningObjectives: [
        "Comprender las Medias Móviles Simples vs Exponenciales",
        "Identificar zonas de retroceso de alta probabilidad",
        "Configurar stops dinámicos para seguir tendencias largas sin cerrar antes de tiempo"
      ]
    },
    "crash-2008": {
      name: "La Gran Crisis Financiera de 2008",
      description: "Pon a prueba tus habilidades defensivas durante uno de los mercados bajistas de acciones más profundos de la historia. Domina el arte de las ventas en corto, identifica rebotes fallidos y comprende el valor vital de la disciplina estricta del Stop Loss.",
      strategyName: "Ventas en Corto en Retest de Resistencia y Protección Estricta",
      strategyDescription: "Busca rebotes en mercados bajistas que fallen en niveles previos de soporte horizontal (ahora convertidos en resistencia) o cerca de la SMA descendente de 50, y ejecuta operaciones en Corto con stops ajustados.",
      learningObjectives: [
        "Comprender la mecánica y los perfiles de riesgo de las Ventas en Corto",
        "Reconocer rebotes de alivio en mercados bajistas y el impulso debilitado",
        "Valorar los drawdowns de la cuenta y las matemáticas de supervivencia"
      ]
    },
    "apple-range": {
      name: "Canal Lateral de Apple y Ruptura",
      description: "Los mercados se consolidan en rangos planos el 70% del tiempo. Aprende a comprar en el suelo del rango, vender en el techo del rango y aprovechar la ruptura de alto volumen una vez que los compradores rompen la barrera de consolidación.",
      strategyName: "Operación en Rangos de Soporte y Resistencia",
      strategyDescription: "Compra rebotes de soporte cuando el precio toque la parte inferior del rango (cerca de $100) y el RSI esté sobrevendido (<30). Toma ganancias en la resistencia del rango (cerca de $112). Luego, vigila una ruptura de alto volumen para entrar en largo.",
      learningObjectives: [
        "Detectar límites limpios de Soporte y Resistencia horizontales",
        "Usar umbrales de RSI sobrecomprado/sobrevendido para operar canales laterales",
        "Identificar confirmaciones genuinas de ruptura con alto volumen"
      ]
    },
    "gamestop-momentum": {
      name: "El Short Squeeze de GameStop 2021",
      description: "Navega por la volatilidad extrema y el hiperimpulso. Presencia un estrangulamiento de posiciones cortas histórico donde los traders minoristas abrumaron a grandes instituciones de Wall Street. Aprende a operar utilizando cruces estrictos de MACD e indicadores RSI.",
      strategyName: "Impulso y Divergencia de MACD",
      strategyDescription: "Sigue los cruces de MACD para la confirmación de impulso en activos hipervolátiles, y busca divergencias bajistas de RSI para cronometrar objetivos de salida antes de que estalle la burbuja.",
      learningObjectives: [
        "Aprender a interpretar la aceleración del histograma MACD",
        "Detectar lecturas extremas de RSI e identificar fatiga estructural de la tendencia",
        "Reducir el tamaño de las posiciones para sobrevivir a activos de alta volatilidad"
      ]
    },
    "dotcom-bubble": {
      name: "La Cima de la Burbuja Puntocom de 2000",
      description: "Detecta un techo macro importante antes de que el mercado implosionara. Aprende a reconocer la divergencia bajista: donde el precio alcanza nuevos máximos más altos pero el RSI muestra un impulso de compra más débil. Opera la reversión definitiva.",
      strategyName: "Reversiones por Divergencia Bajista del RSI",
      strategyDescription: "Observa el precio formando un doble techo mientras el RSI hace un pico claramente más bajo. Vende en corto la ruptura por debajo del soporte clave del cuello para capturar el cambio de tendencia.",
      learningObjectives: [
        "Reconocer divergencias bajistas y alcistas entre el precio y los osciladores",
        "Identificar patrones de Doble Techo y operar rupturas de líneas de cuello",
        "Gestionar el riesgo al operar contra tendencia en burbujas macro"
      ]
    }
  },
  fr: {
    "bitcoin-trend": {
      name: "La Hausse Parabolique du Bitcoin en 2020",
      description: "Découvrez un régime légendaire de suivi de tendance. Apprenez à identifier les replis à haute probabilité sur les moyennes mobiles à court terme (EMA 20) et à gérer les stop suiveurs pendant une accélération du momentum.",
      strategyName: "Replis de Moyenne Mobile & Croisements",
      strategyDescription: "Utilisez le croisement de l'EMA 20 et de la SMA 50 pour rester du bon côté de la tendance macro, en entrant à l'achat exclusivement lors des replis sur les lignes de support des moyennes mobiles.",
      learningObjectives: [
        "Comprendre les moyennes mobiles simples vs exponentielles",
        "Identifier les zones de repli à haute probabilité",
        "Configurer des stop suiveurs pour accompagner les longues tendances sans sortir trop tôt"
      ]
    },
    "crash-2008": {
      name: "La Grande Crise Financière de 2008",
      description: "Mettez vos compétences défensives à l'épreuve pendant l'un des marchés baissiers les plus profonds de l'histoire. Maîtrisez l'art de la vente à découvert, identifiez les rebonds techniques défaillants et comprenez la valeur vitale d'une discipline de Stop Loss stricte.",
      strategyName: "Vente à Découvert sur Test de Résistance & Protection Stricte",
      strategyDescription: "Recherchez les rebonds techniques qui échouent sur les anciens supports horizontaux (devenus résistances) ou près de la SMA 50 descendante, et exécutez des ventes à découvert avec des stop serrés.",
      learningObjectives: [
        "Comprendre les mécanismes et profils de risque de la Vente à Découvert",
        "Reconnaître les rebonds techniques baissiers et l'essoufflement du momentum",
        "Apprécier les drawdowns de portefeuille et les mathématiques de survie"
      ]
    },
    "apple-range": {
      name: "Canal Latéral Apple & Breakout",
      description: "Les marchés consolident dans des ranges plats 70% du temps. Apprenez à acheter le bas du range, vendre le haut du range, et accompagner la cassure à fort volume dès que les acheteurs franchissent la barrière de consolidation.",
      strategyName: "Trading de Range sur Supports & Résistances",
      strategyDescription: "Achetez les rebonds sur support lorsque le prix touche le bas du canal (proche des 100$) et que le RSI est survendu (<30). Prenez vos bénéfices sur la résistance (proche de 112$). Observez ensuite la cassure à fort volume pour passer acheteur.",
      learningObjectives: [
        "Repérer des zones de support et résistance horizontales claires",
        "Utiliser les seuils de surachat/survente du RSI sur les canaux horizontaux",
        "Identifier les confirmations de cassure authentiques avec du volume"
      ]
    },
    "gamestop-momentum": {
      name: "Le Short Squeeze GameStop de 2021",
      description: "Naviguez dans l'extrême volatilité et l'hyper-momentum. Assistez à un short squeeze historique où les traders particuliers ont submergé les institutions de Wall Street. Apprenez à trader avec les croisements du MACD et du RSI.",
      strategyName: "Momentum MACD & Divergence",
      strategyDescription: "Suivez les croisements du MACD pour la confirmation de l'accélération sur actifs hyper-volatiles, et recherchez les divergences baissières du RSI pour fixer vos objectifs de sortie avant l'éclatement de la bulle.",
      learningObjectives: [
        "Apprendre à interpréter l'accélération de l'histogramme MACD",
        "Détecter les valeurs extrêmes du RSI et la fatigue structurelle de la tendance",
        "Adapter et réduire la taille des positions pour survivre aux actifs volatils"
      ]
    },
    "dotcom-bubble": {
      name: "Le Sommet de la Bulle Dot-Com en 2000",
      description: "Détectez un sommet macro majeur avant l'effondrement du marché. Apprenez à identifier une divergence baissière : quand le cours inscrit de nouveaux sommets plus hauts mais que le RSI montre une force d'achat affaiblie. Tradez le retournement ultime.",
      strategyName: "Retournements sur Divergence Baissière du RSI",
      strategyDescription: "Observez le prix formant un double sommet alors que le RSI affiche un pic nettement plus bas. Vendez à découvert la cassure de la ligne de cou pour capter le retournement de tendance historique.",
      learningObjectives: [
        "Reconnaître les divergences baissières et haussières prix/oscillateurs",
        "Identifier les configurations en Double Sommet et trader les cassures de ligne de cou",
        "Gérer le risque lors de transactions à contre-courant de bulles macro"
      ]
    }
  },
  de: {
    "bitcoin-trend": {
      name: "Der parabolische Bitcoin-Anstieg 2020",
      description: "Erleben Sie ein legendäres Trendfolgesystem. Lernen Sie, hochwahrscheinliche Rücksetzer auf kurzfristigen gleitenden Durchschnitten (20 EMA) zu identifizieren und Trailing-Stops während einer beschleunigten Marktdynamik zu verwalten.",
      strategyName: "Gleitender Durchschnitt Pullbacks & Crossovers",
      strategyDescription: "Nutzen Sie den Crossover von 20 EMA und 50 SMA, um auf der richtigen Seite des Makrotrends zu bleiben, und steigen Sie ausschließlich bei Rücksetzern auf die Unterstützungslinien der gleitenden Durchschnitte ein.",
      learningObjectives: [
        "Verstehen Sie einfache vs. exponentielle gleitende Durchschnitte",
        "Identifizieren Sie Rücksetzerzonen mit hoher Wahrscheinlichkeit",
        "Konfigurieren Sie Trailing-Stops, um lange Trends zu reiten, ohne vorzeitig zu schließen"
      ]
    },
    "crash-2008": {
      name: "Die Große Finanzkrise von 2008",
      description: "Stellen Sie Ihre defensiven Fähigkeiten in einem der tiefsten Bärenmärkte der Geschichte unter Beweis. Meistern Sie die Kunst des Leerverkaufs, erkennen Sie scheiternde Erholungsrallyes und schätzen Sie den unschätzbaren Wert einer strengen Stop-Loss-Disziplin ein.",
      strategyName: "Leerverkäufe bei Widerstands-Retests & Strenger Schutz",
      strategyDescription: "Suchen Sie nach Erholungsrallyes im Bärenmarkt, die an früheren horizontalen Unterstützungsniveaus (jetzt Widerstand) oder nahe der fallenden 50 SMA scheitern, und führen Sie Leerverkäufe mit engen Stops aus.",
      learningObjectives: [
        "Verstehen Sie die Mechanismen und Risikoprofile von Leerverkäufen",
        "Erkennen Sie Bärenmarkt-Erholungsrallyes und nachlassende Dynamik",
        "Verstehen Sie Konto-Drawdowns und Überlebensmathematik"
      ]
    },
    "apple-range": {
      name: "Apple Seitwärtskanal & Ausbruch",
      description: "Märkte konsolidieren 70% der Zeit in flachen Bereichen. Lernen Sie, den Boden der Range zu kaufen, die Decke der Range zu verkaufen und den Ausbruch mit hohem Volumen zu reiten, sobald die Käufer die Konsolidierungsbarriere durchbrechen.",
      strategyName: "Unterstützung & Widerstand Range Trading",
      strategyDescription: "Kaufen Sie Unterstützungs-Bounces, wenn der Preis die Unterseite der Range berührt (nahe 100$) und der RSI überverkauft ist (<30). Nehmen Sie Gewinne am Widerstand der Range mit (nahe 112$). Beobachten Sie dann den Ausbruch mit hohem Volumen für den Einstieg in Long.",
      learningObjectives: [
        "Erkennen Sie saubere horizontale Unterstützungs- und Widerstandsgrenzen",
        "Nutzen Sie RSI Überkauft/Überverkauft Schwellenwerte für Seitwärtskanäle",
        "Identifizieren Sie echte Ausbruchsbestätigungen mit hohem Volumen"
      ]
    },
    "gamestop-momentum": {
      name: "Der GameStop Short Squeeze 2021",
      description: "Navigieren Sie durch extreme Volatilität und Hyper-Dynamik. Werden Sie Zeuge eines historischen Short Squeezes, bei dem Privatanleger riesige Wall-Street-Institutionen überwältigten. Lernen Sie den Handel mit strengen MACD-Kreuzungen und RSI-Indikatoren.",
      strategyName: "MACD Momentum & Divergenz",
      strategyDescription: "Verfolgen Sie MACD-Kreuzungen zur Bestätigung der Dynamik bei hypervolatilen Vermögenswerten und suchen Sie nach bärischen RSI-Divergenzen, um Ausstiegsziele vor dem Platzen der Blase zu timen.",
      learningObjectives: [
        "Lernen Sie, die Beschleunigung des MACD-Histogramms zu interpretieren",
        "Erkennen Sie extreme RSI-Werte und strukturelle Trendmüdigkeit",
        "Reduzieren Sie die Positionsgrößen, um in hochvolatilen Werten zu überleben"
      ]
    },
    "dotcom-bubble": {
      name: "Die Dotcom-Blasenspitze im Jahr 2000",
      description: "Erkennen Sie eine große Makro-Spitze, bevor der Markt implodiert. Lernen Sie, bärische Divergenzen zu erkennen: wenn der Preis neue Höchststände erreicht, der RSI jedoch eine schwächere Kaufdynamik anzeigt. Handeln Sie die ultimative Umkehr.",
      strategyName: "RSI Bärische Divergenz Reversals",
      strategyDescription: "Beobachten Sie, wie der Preis ein Doppel-Top bildet, während der RSI ein deutlich niedrigeres Hoch markiert. Verkaufen Sie den Durchbruch unter die wichtige Nackenlinienunterstützung leer, um die Trendumkehr zu erfassen.",
      learningObjectives: [
        "Erkennen Sie bärische und bullische Divergenzen zwischen Preis und Oszillatoren",
        "Identifizieren Sie Doppel-Top-Muster und handeln Sie Nackenlinien-Ausbrüche",
        "Verwalten Sie das Risiko beim Handel gegen den Trend in Makroblasen"
      ]
    }
  },
  ar: {
    "bitcoin-trend": {
      name: "الصعود البارابولي للبيتكوين 2020",
      description: "اختبر نظامًا أسطوريًا لتتبع الاتجاه. تعلم كيفية تحديد الارتدادات عالية الاحتمالية على المتوسطات المتحركة قصيرة المدى (20 EMA) وإدارة أوامر وقف الخسارة المتحركة أثناء زخم السوق المتسارع.",
      strategyName: "ارتدادات وتقاطعات المتوسطات المتحركة",
      strategyDescription: "استخدم تقاطع EMA 20 و SMA 50 للبقاء في الجانب الصحيح من الاتجاه العام، مع الدخول في صفقات الشراء حصريًا أثناء الارتدادات إلى خطوط دعم المتوسطات المتحركة.",
      learningObjectives: [
        "فهم المتوسطات المتحركة البسيطة مقابل الأسية",
        "تحديد مناطق الارتداد عالية الاحتمالية",
        "إعداد أوامر وقف الخسارة المتحركة للاستفادة من الاتجاهات الطويلة دون الخروج المبكر"
      ]
    },
    "crash-2008": {
      name: "الأزمة المالية العالمية لعام 2008",
      description: "ضع مهاراتك الدفاعية على المحك خلال واحد من أعمق الأسواق الهابطة للأسهم في التاريخ. أتقن فن البيع على المكشوف، وحدد الارتدادات التصحيحية الفاشلة، وأدرك القيمة الحيوية للانضباط الصارم بوقف الخسارة.",
      strategyName: "البيع على المكشوف عند إعادة اختبار المقاومة والحماية الصارمة",
      strategyDescription: "ابحث عن الارتدادات التصحيحية في السوق الهابطة التي تفشل عند مستويات الدعم الأفقي السابقة (التي تحولت الآن إلى مقاومة) أو بالقرب من متوسط SMA 50 الهابط، ونفذ صفقات البيع على المكشوف مع وقف خسارة ضيق.",
      learningObjectives: [
        "فهم آليات وملفات مخاطر البيع على المكشوف",
        "التعرف على ارتدادات الأسواق الهابطة الفاشلة والزخم الضعيف",
        "فهم تراجعات الحساب ورياضيات البقاء في السوق"
      ]
    },
    "apple-range": {
      name: "القناة العرضية لآبل والاختراق",
      description: "تتحرك الأسواق في نطاقات عرضية مسطحة 70% من الوقت. تعلم الشراء من قاع النطاق، والبيع عند سقف النطاق، وركوب موجة الاختراق بحجم تداول كبير بمجرد أن يكسر المشترون حاجز التذبذب.",
      strategyName: "تداول النطاق بين الدعم والمقاومة",
      strategyDescription: "اشترِ عند الارتداد من الدعم عندما يلامس السعر قاع النطاق (قرب 100 دولار) ويكون مؤشر RSI في منطقة تشبع بيعي (<30). خذ الأرباح عند مقاومة النطاق (قرب 112 دولار). ثم راقب الاختراق بحجم تداول كبير للدخول في صفقة شراء طويلة.",
      learningObjectives: [
        "تحديد حدود الدعم والمقاومة الأفقية الواضحة",
        "استخدام مستويات تشبع الشراء/البيع لمؤشر RSI لتداول القنوات العرضية",
        "تحديد تأكيدات الاختراق الحقيقية المدعومة بأحجام تداول مرتفعة"
      ]
    },
    "gamestop-momentum": {
      name: "شورت سكويز جيم ستوب 2021",
      description: "تداول في ظل تقلبات شديدة وزخم فائق. اشهد عصر المراكز القصيرة التاريخي حيث تغلب صغار المتداولين على مؤسسات وول ستريت الضخمة. تعلم التداول باستخدام تقاطعات MACD الصارمة ومؤشرات RSI.",
      strategyName: "زخم وانحراف مؤشر MACD",
      strategyDescription: "تتبع تقاطعات MACD لتأكيد الزخم على الأصول شديدة التقلب، وابحث عن انحرافات RSI الهبوطية لتحديد أهداف الخروج قبل انفجار الفقاعة.",
      learningObjectives: [
        "تعلم تفسير تسارع أعمدة مؤشر MACD",
        "رصد القراءات القصوى لمؤشر RSI وتحديد التعب الهيكلي للاتجاه",
        "تقليص أحجام الصفقات للنجاة عند تداول الأصول عالية التقلب"
      ]
    },
    "dotcom-bubble": {
      name: "قمة فقاعة دوت كوم عام 2000",
      description: "حدد قمة الاتجاه العام الكبرى قبل انهيار السوق. تعلم كيفية التعرف على الانحراف الهبوطي: حيث يسجل السعر قممًا صاعدة جديدة بينما يظهر مؤشر RSI زخم شراء أضعف. تداول الانعكاس الأكبر.",
      strategyName: "انعكاسات الانحراف الهبوطي لمؤشر RSI",
      strategyDescription: "راقب السعر وهو يشكل قمة مزدوجة بينما يشكل مؤشر RSI قمة هابطة واضحة. بع على المكشوف عند كسر مستوى الدعم الرئيسي لخط العنق لالتقاط الانعكاس الكامل للاتجاه.",
      learningObjectives: [
        "التعرف على الانحرافات الهبوطية والصعودية بين السعر والمؤشرات",
        "تحديد نماذج القمة المزدوجة وتداول كسر مستويات 'خط العنق'",
        "إدارة المخاطر عند التداول عكس الاتجاه العام في الفقاعات الكبرى"
      ]
    }
  },
  ja: {
    "bitcoin-trend": {
      name: "2020年ビットコインの放物線状上昇",
      description: "伝説的なトレンドフォローを体験しましょう。短期移動平均線（20 EMA）での確率の高い押し目を特定し、加速する市場モメンタムの中でトレーリングストップを管理する方法を学びます。",
      strategyName: "移動平均線の押し目買い＆クロスオーバー",
      strategyDescription: "20 EMAと50 SMAのクロスオーバーを使用してマクロトレンドの正しい側に乗り、移動平均線のサポートラインへの押し目でのみ買い取引を実行します。",
      learningObjectives: [
        "単純移動平均線（SMA）と指数平滑移動平均線（EMA）の違いを理解する",
        "勝率の高い押し目買いゾーンを特定する",
        "早期決済を避け、長期トレンドに乗るためのトレーリングストップを設定する"
      ]
    },
    "crash-2008": {
      name: "2008年世界金融危機（リーマンショック）",
      description: "歴史上最も深い株式ベアマーケットで守備力を試しましょう。空売り（ショート）の技術を習得し、一時的な戻り高値の騙しを見極め、厳格な損切り規律の命を救う価値を実感してください。",
      strategyName: "レジスタンス再テストでの空売り＆厳格なプロテクション",
      strategyDescription: "以前の水平サポートレベル（レジスタンスに転換）や下降する50 SMA付近で失敗するベアマーケットの一時的な戻り高値を探し、タイトなストップを設定してショートを実行します。",
      learningObjectives: [
        "空売りの仕組みとリスクプロファイルを理解する",
        "ベアマーケットの戻り高値とモメンタムの衰退を認識する",
        "口座ドローダウンと生き残りのための数学的アプローチを学ぶ"
      ]
    },
    "apple-range": {
      name: "アップル横ばいチャンネル＆ブレイクアウト",
      description: "相場は70%の時間を横ばいのレンジ内で推移します。レンジの下限で買い、上限で売り、買い手が保ち合いの壁を突破した後は大商いを伴うブレイクアウトに乗る方法を学びます。",
      strategyName: "サポート＆レジスタンスのレンジ取引",
      strategyDescription: "価格がレンジ下限（100ドル付近）に達し、RSIが売られすぎ（<30）の時にサポートの反発を買います。レンジのレジスタンス（112ドル付近）で利益を確定します。その後、大商いを伴うロングのブレイクアウトを監視します。",
      learningObjectives: [
        "明確な水平サポートとレジスタンスの境界線を見つける",
        "RSIの買われすぎ・売られすぎ基準を使ってレンジ相場を取引する",
        "大商いを伴う本物のブレイクアウトの確認方法を理解する"
      ]
    },
    "gamestop-momentum": {
      name: "2021年GameStopのショートスクイーズ",
      description: "極限のボラティリティと超モメンタムを攻略しましょう。個人投資家がウォール街の巨大機関投資家を圧倒した歴史的なショートスクイーズを目撃してください。厳格なMACDクロスオーバーとRSIを取引に活かす方法を学びます。",
      strategyName: "MACDモメンタム＆ダイバージェンス",
      strategyDescription: "ボラティリティが非常に高い資産でモメンタムを確認するためにMACDクロスオーバーを追跡し、バブルが弾ける前にRSIの弱気ダイバージェンスを見つけて手仕舞いのタイミングを計ります。",
      learningObjectives: [
        "MACDヒストグラムの加速から勢いを解釈する",
        "極端なRSI数値を読み取り、構造的なトレンド疲労を特定する",
        "高ボラティリティ資産を生き抜くために取引サイズを適切に縮小する"
      ]
    },
    "dotcom-bubble": {
      name: "2000年ドットコムバブルの天井",
      description: "市場が崩壊する前にマクロな天井を捉えましょう。価格が新高値を更新する一方でRSIが買い圧力の低下を示す「弱気のダイバージェンス」の認識方法を習得し、究極の反転を取引します。",
      strategyName: "RSI弱気ダイバージェンス反転トレード",
      strategyDescription: "価格がダブルトップを形成し、RSIが明確に低いピークを形成する動きを監視します。主要なネックラインのサポート割れを空売りし、歴史的なトレンド転換を捉えます。",
      learningObjectives: [
        "価格とオシレーターの間の弱気・強気のダイバージェンスを認識する",
        "ダブルトップパターンを特定し、ネックライン割れを取引する",
        "マクロバブルの逆張り取引におけるリスク管理を徹底する"
      ]
    }
  },
  zh: {
    "bitcoin-trend": {
      name: "2020年比特币抛物线式飙升",
      description: "体验传奇般的趋势跟踪行情。学习如何在短期移动平均线（20 EMA）上识别高概率回调，并在市场加速上涨的动能中管理追踪止损。",
      strategyName: "移动平均线回调与交叉",
      strategyDescription: "利用20 EMA和50 SMA的交叉保持在宏观趋势的正确一侧，仅在价格回调至均线支撑位时买入建仓。",
      learningObjectives: [
        "理解简单与指数移动平均线的区别",
        "识别高概率的回调支撑区间",
        "配置追踪止损以持仓长趋势，避免过早平仓"
      ]
    },
    "crash-2008": {
      name: "2008年金融海啸大危机",
      description: "在历史上最深重的股票熊市中测试你的防御技巧。掌握做空艺术，识别失败 an 的反弹，并认识到严格止损纪律对保全账户资金的至关重要的价值。",
      strategyName: "阻力位回踩做空与严格风险保护",
      strategyDescription: "寻找在先前水平支撑位（现转为阻力位）或在下行50 SMA附近受阻失败的熊市反弹，并以紧凑止损执行做空交易。",
      learningObjectives: [
        "理解做空的运作机制与风险特征",
        "识别熊市中的反弹骗线与动能衰竭",
        "深刻体会账户最大回撤与生存数学的关系"
      ]
    },
    "apple-range": {
      name: "苹果横盘箱体震荡与突破",
      description: "市场有70%的时间处于横盘整理中。学习在箱体底部买入，箱体顶部卖出，并在多头突破盘整屏障后，顺应放量突破之势乘风破浪。",
      strategyName: "支撑与阻力区间交易",
      strategyDescription: "当价格触及区间底部（100美元附近）且RSI超卖（<30）时，买入支撑位反弹。在区间阻力位（112美元附近）止盈。随后，密切观察放量大阳线以顺势做多。",
      learningObjectives: [
        "寻找干净的水平支撑位和阻力位边界",
        "利用RSI超买超卖阈值交易侧向震荡通道",
        "识别伴随成交量放大的真实突破信号"
      ]
    },
    "gamestop-momentum": {
      name: "2021年GameStop散户逼空大战",
      description: "应对极端的波动率和超强动能。见证散户击败华尔街巨头的历史性空头挤压（逼空）。学习如何利用严格的MACD金叉死叉和RSI指标进行动能交易。",
      strategyName: "MACD动能与背离交易",
      strategyDescription: "在极高波动的资产中追踪MACD交叉以确认动能加速，并在泡沫破裂前寻找RSI看跌背离以锁定离场点。",
      learningObjectives: [
        "学习解读MACD柱状图的加速与减速",
        "捕捉极端的RSI读数并识别结构性趋势疲劳",
        "合理缩减仓位大小以在极高波动率资产中生存"
      ]
    },
    "dotcom-bubble": {
      name: "2000年科网泡沫历史大顶",
      description: "在市场崩溃前捕捉宏观历史大顶。学习识别看跌背离：即价格创出新高但RSI却呈现更弱的买盘动能。交易终极反转趋势。",
      strategyName: "RSI看跌背离反转策略",
      strategyDescription: "观察价格形成双顶结构，而RSI形成明显的更低波峰。在跌破关键颈线支撑位时果断做空，捕捉宏观趋势大反转。",
      learningObjectives: [
        "识别价格与振荡指标之间的看跌与看涨背离",
        "识别双顶形态并交易关键“颈线”破位",
        "在逆势交易宏观泡沫时实施严密的风险管理"
      ]
    }
  },
  pt: {
    "bitcoin-trend": {
      name: "A Ascensão Parabólica do Bitcoin em 2020",
      description: "Experimente um regime lendário de acompanhamento de tendências. Aprenda a identificar recuos de alta probabilidade em médias móveis de curto prazo (20 EMA) e a gerenciar stops móveis durante o momento de aceleração do mercado.",
      strategyName: "Recuos e Cruzamentos de Médias Móveis",
      strategyDescription: "Use o cruzamento da EMA de 20 e da SMA de 50 para permanecer no lado correto da tendência macro, entrando em operações de compra exclusivamente durante recuos nas linhas de suporte das médias móveis.",
      learningObjectives: [
        "Compreender Médias Móveis Simples vs Exponenciais",
        "Identificar zonas de recuo de alta probabilidade",
        "Configurar stops móveis para seguir longas tendências sem fechar antes da hora"
      ]
    },
    "crash-2008": {
      name: "A Grande Crise Financeira de 2008",
      description: "Coloque suas habilidades defensivas à prova durante um dos mercados de baixa mais profundos da história. Domine a arte das vendas a descoberto, identifique ralis de alívio que falham e perceba o valor vital de disciplinas estritas de Stop Loss.",
      strategyName: "Vendas a Descoberto em Retestes de Resistência & Proteção Estrita",
      strategyDescription: "Procure por ralis de alívio no mercado de baixa que falham em níveis de suporte horizontal anteriores (agora transformados em resistência) ou perto da SMA descendente de 50, e execute vendas a descoberto com stops curtos.",
      learningObjectives: [
        "Compreender a mecânica e os perfis de risco das Vendas a Descoberto",
        "Reconhecer ralis de alívio no mercado de baixa e impulso enfraquecido",
        "Compreender rebaixamentos de conta e matemática de sobrevivência"
      ]
    },
    "apple-range": {
      name: "Canal Lateral da Apple e Breakout",
      description: "Os mercados se consolidam em faixas planas 70% do tempo. Aprenda a comprar no fundo da faixa, vender no topo da faixa e aproveitar o rompimento de alto volume assim que os compradores quebrarem a barreira de consolidação.",
      strategyName: "Operação em Faixas de Suporte e Resistência",
      strategyDescription: "Compre repiques de suporte quando o preço tocar a parte inferior da faixa (perto de $100) e o RSI estiver sobrevendido (<30). Realize lucros na resistência da faixa (perto de $112). Em seguida, observe um rompimento de alto volume para entrar em comprado.",
      learningObjectives: [
        "Detectar limites limpos de Suporte e Resistência horizontais",
        "Usar limites de RSI sobrecomprado/sobrevendido para operar canais horizontais",
        "Identificar confirmações genuínas de rompimento com alto volume"
      ]
    },
    "gamestop-momentum": {
      name: "O Short Squeeze da GameStop 2021",
      description: "Navegue pela volatilidade extrema e pelo hiperimpulso. Testemunhe um estrangulamento de posições vendidas histórico onde traders de varejo esmagaram grandes instituições de Wall Street. Aprenda a operar usando cruzamentos estritos de MACD e indicadores RSI.",
      strategyName: "Impulso e Divergência do MACD",
      strategyDescription: "Acompanhe os cruzamentos do MACD para confirmação de impulso em ativos altamente voláteis e procure por divergências bajistas do RSI para cronometrar metas de saída antes que a bolha estoure.",
      learningObjectives: [
        "Aprender a interpretar a aceleração do histograma MACD",
        "Detectar leituras extremas de RSI e identificar fadiga estrutural da tendência",
        "Reduzir o tamanho das posições para sobreviver a ativos de alta volatilidade"
      ]
    },
    "dotcom-bubble": {
      name: "O Topo da Bolha das Pontocom em 2000",
      description: "Detecte um grande topo macro antes que o mercado imploda. Aprenda a reconhecer a divergência de baixa: onde o preço atinge novos máximos, mas o RSI mostra um impulso de compra mais fraco. Opere a reversão definitiva.",
      strategyName: "Reversões por Divergência de Baixa do RSI",
      strategyDescription: "Observe o preço formando um topo duplo enquanto o RSI faz um pico claramente mais baixo. Venda a descoberto o rompimento abaixo do suporte da linha de pescoço chave para capturar a reversão da tendência.",
      learningObjectives: [
        "Reconhecer divergências de baixa e alta entre preço e osciladores",
        "Identificar padrões de Topo Duplo e operar rompimentos de linha de pescoço",
        "Gerenciar riscos ao operar contra a tendência em bolhas macro"
      ]
    }
  },
  it: {
    "bitcoin-trend": {
      name: "La Salita Parabolica di Bitcoin del 2020",
      description: "Sperimenta un leggendario regime di trend-following. Impara a identificare rintracciamenti ad alta probabilità sulle medie mobili a breve termine (20 EMA) e a gestire i trailing stop durante l'accelerazione del momentum del mercato.",
      strategyName: "Rintracciamenti e Incroci di Medie Mobili",
      strategyDescription: "Utilizza l'incrocio tra l'EMA a 20 e la SMA a 50 per rimanere dalla parte corretta del macro-trend, entrando in acquisto esclusivamente durante i rintracciamenti sulle linee di supporto delle medie mobili.",
      learningObjectives: [
        "Comprendere le Medie Mobili Semplici rispetto a quelle Esponenziali",
        "Identificare zone di rintracciamento ad alta probabilità",
        "Configurare trailing stop per seguire lunghi trend senza chiudere in anticipo"
      ]
    },
    "crash-2008": {
      name: "La Grande Crisi Finanziaria del 2008",
      description: "Metti alla prova le tue abilità difensive durante uno dei mercati ribassisti azionari più profondi della storia. Padroneggia l'arte delle vendite allo scoperto, identifica i rimbalzi tecnici falliti e comprendi il valore vitale di una rigorosa disciplina di Stop Loss.",
      strategyName: "Vendite allo Scoperto su Test di Resistenza & Protezione Rigida",
      strategyDescription: "Cerca rimbalzi tecnici che falliscono sui precedenti livelli di supporto orizzontale (ora diventati resistenza) o vicino alla SMA a 50 discendente, ed esegui vendite allo scoperto con stop stretti.",
      learningObjectives: [
        "Comprendere i meccanismi e i profili di rischio delle Vendite allo Scoperto",
        "Riconoscere rimbalzi tecnici ribassisti e l'indebolimento del momentum",
        "Valutare i drawdown del conto e la matematica della sopravvivenza"
      ]
    },
    "apple-range": {
      name: "Canale Laterale Apple e Breakout",
      description: "I mercati si consolidano in canali piatti il 70% del tempo. Impara a comprare sul fondo del canale, vendere sul soffitto del canale e seguire il breakout ad alto volume una volta che gli acquirenti superano la barriera di consolidamento.",
      strategyName: "Trading di Canale su Supporti e Resistenze",
      strategyDescription: "Compra i rimbalzi sul supporto quando il prezzo tocca la parte inferiore del canale (vicino a 100$) e il RSI è in ipervenduto (<30). Prendi profitto sulla resistenza del canale (vicino a 112$). Poi, osserva un breakout ad alto volume per entrare in lungo.",
      learningObjectives: [
        "Individuare confini orizzontali netti di Supporto e Resistenza",
        "Utilizzare le soglie di ipercomprato/ipervenduto del RSI per fare trading sui canali laterali",
        "Identificare autentiche conferme di breakout con volumi elevati"
      ]
    },
    "gamestop-momentum": {
      name: "Lo Short Squeeze di GameStop 2021",
      description: "Naviga tra estrema volatilità e iper-momentum. Assisti a uno short squeeze storico in cui i trader al dettaglio hanno travolto le grandi istituzioni di Wall Street. Impara a fare trading usando incroci rigidi del MACD e indicatori RSI.",
      strategyName: "Momentum MACD & Divergenza",
      strategyDescription: "Monitora gli incroci del MACD per la conferma dell'accelerazione del momentum su asset altamente volatili e cerca divergenze ribassiste del RSI per stabilire i target di uscita prima che la bolla scoppi.",
      learningObjectives: [
        "Imparare a interpretare l'accelerazione dell'istogramma MACD",
        "Rilevare letture estreme del RSI e identificare la fatica strutturale del trend",
        "Ridurre le dimensioni delle posizioni per sopravvivere ad asset ad alta volatilità"
      ]
    },
    "dotcom-bubble": {
      name: "Il Massimo della Bolla Dot-Com del 2000",
      description: "Individua un importante massimo macro prima dell'implosione del mercato. Impara a riconoscere la divergenza ribassista: quando il prezzo tocca nuovi massimi crescenti ma il RSI mostra un indebolimento della forza d'acquisto. Fai trading sull'inversione finale.",
      strategyName: "Inversioni da Divergenza Ribassista del RSI",
      strategyDescription: "Osserva il prezzo che forma un doppio massimo mentre il RSI fa un picco chiaramente inferiore. Vendi allo scoperto la rottura al di sotto del supporto chiave della neckline per catturare l'inversione di tendenza.",
      learningObjectives: [
        "Riconoscere divergenze ribassiste e rialziste tra prezzo e oscillatori",
        "Identificare modelli a Doppio Massimo e fare trading sulle rotture di neckline",
        "Gestire il rischio quando si fa trading controcorrente su bolle macro"
      ]
    }
  },
  ru: {
    "bitcoin-trend": {
      name: "Параболический взлет Биткоина в 2020 году",
      description: "Испытайте легендарный режим следования за трендом. Научитесь определять высоковероятные откаты на краткосрочных скользящих средних (20 EMA) и управлять трейлинг-стопами во время ускорения рыночного импульса.",
      strategyName: "Откаты и пересечения скользящих средних",
      strategyDescription: "Используйте пересечение 20 EMA и 50 SMA, чтобы оставаться на правильной стороне макротренда, открывая сделки на покупку исключительно во время откатов к линиям поддержки скользящих средних.",
      learningObjectives: [
        "Понимание простых и экспоненциальных скользящих средних",
        "Определение зон отката с высокой вероятностью",
        "Настройка трейлинг-стопов для сопровождения длинных трендов без преждевременного закрытия"
      ]
    },
    "crash-2008": {
      name: "Великий финансовый кризис 2008 года",
      description: "Проверьте свои оборонительные навыки во время одного из самых глубоких медвежьих рынков акций в истории. Освойте искусство коротких продаж, выявляйте ложные отскоки и осознайте жизненно важную ценность строгого соблюдения дисциплины Stop Loss.",
      strategyName: "Короткие продажи на ретестах сопротивления и строгая защита",
      strategyDescription: "Ищите отскоки на медвежьем рынке, которые терпят неудачу на прежних горизонтальных уровнях поддержки (теперь превратившихся в сопротивление) или вблизи нисходящей 50 SMA, и совершайте сделки на продажу (Short) с жесткими стопами.",
      learningObjectives: [
        "Понимание механики и профилей риска коротких продаж (Short Selling)",
        "Распознавание ложных отскоков медвежьего рынка и угасающего импульса",
        "Оценка просадок счета и математика выживания на рынке"
      ]
    },
    "apple-range": {
      name: "Боковой канал Apple и прорыв",
      description: "Рынки консолидируются в плоских диапазонах 70% времени. Научитесь покупать у нижней границы диапазона, продавать у верхней и зарабатывать на прорыве с высоким объемом, как только покупатели преодолеют барьер консолидации.",
      strategyName: "Торговля в диапазоне поддержки и сопротивления",
      strategyDescription: "Покупайте отскоки от поддержки, когда цена касается нижней границы диапазона (около $100) и RSI перепродан (<30). Фиксируйте прибыль у сопротивления диапазона (около $112). Затем следите за прорывом с высоким объемом, чтобы открыть длинную позицию.",
      learningObjectives: [
        "Поиск четких горизонтальных границ поддержки и сопротивления",
        "Использование порогов перепроданности/перекупленности RSI для торговли в боковых каналах",
        "Идентификация истинных подтверждений прорыва на повышенных объемах"
      ]
    },
    "gamestop-momentum": {
      name: "Шорт-сквиз GameStop в 2021 году",
      description: "Навигируйте в условиях экстремальной волатильности и гиперимпульса. Станьте свидетелем исторического шорт-сквиза, когда розничные трейдеры сокрушили гигантские институты Уолл-стрит. Научитесь торговать, используя строгие пересечения MACD и индикаторы RSI.",
      strategyName: "Импульс и дивергенция MACD",
      strategyDescription: "Отслеживайте пересечения MACD для подтверждения импульса на сверхволатильных активах и ищите медвежьи дивергенции RSI, чтобы вовремя выходить из позиций до того, как лопнет пузырь.",
      learningObjectives: [
        "Изучение интерпретации ускорения гистограммы MACD",
        "Распознавание экстремальных значений RSI и определение структурной усталости тренда",
        "Сокращение размеров позиций для выживания при торговле высоковырожденными активами"
      ]
    },
    "dotcom-bubble": {
      name: "Вершина пузыря доткомов в 2000 году",
      description: "Определите крупную макроэкономическую вершину до того, как рынок рухнет. Научитесь распознавать медвежью дивергенцию: когда цена достигает новых более высоких максимумов, но RSI показывает более слабый импульс покупок. Торгуйте на развороте.",
      strategyName: "Развороты по медвежьей дивергенции RSI",
      strategyDescription: "Наблюдайте за формированием ценой двойной вершины, в то время как RSI совершает явно более низкий пик. Продавайте в шорт прорыв ниже ключевой поддержки линии шеи, чтобы зафиксировать разворот тренда.",
      learningObjectives: [
        "Распознавание медвежьих и бычьих дивергенций между ценой и осцилляторами",
        "Идентификация паттернов 'Двойная вершина' и торговля на прорывах линии шеи",
        "Управление рисками при контртрендовой торговле на глобальных макропузырях"
      ]
    }
  }
};

export function getLocalizedScenario(s: any, lang: LanguageCode): any {
  if (lang === "en") return s;
  const trans = scenarioTranslations[lang as Exclude<LanguageCode, "en">]?.[s.id];
  if (!trans) return s;
  return {
    ...s,
    name: trans.name || s.name,
    description: trans.description || s.description,
    strategyName: trans.strategyName || s.strategyName,
    strategyDescription: trans.strategyDescription || s.strategyDescription,
    learningObjectives: trans.learningObjectives || s.learningObjectives,
  };
}
