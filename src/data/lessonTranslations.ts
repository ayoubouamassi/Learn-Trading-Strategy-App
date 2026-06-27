/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LanguageCode } from "./translations";

export const lessonContentTranslations: Record<Exclude<LanguageCode, "en">, Record<string, string>> = {
  es: {
    "basics-candlesticks": `### El Lenguaje del Mercado: Acción del Precio

Antes de los indicadores, existe la **Acción del Precio**. Cada barra de precios cuenta una historia de la batalla entre **Compradores (Toros)** y **Vendedores (Osos)**. Una sola vela condensa el movimiento del precio en un marco de tiempo específico en cuatro puntos de datos simples:
- **Apertura (Open)**: El precio inicial del período.
- **Máximo (High)**: El pico absoluto alcanzado.
- **Mínimo (Low)**: El nivel más bajo alcanzado.
- **Cierre (Close)**: El precio final del período.

---

### Patrones clave de velas de reversión

#### 1. El Martillo (Reversión Alcista)
*   **Aspecto**: Un cuerpo diminuto en la parte superior de la vela con una sombra inferior muy larga (al menos el doble de la longitud del cuerpo) y casi ninguna sombra superior.
*   **La Historia**: Los vendedores empujaron el precio fuertemente a la baja, pero los compradores rechazaron por completo los mínimos, elevando el precio hasta cerrar cerca de la apertura. Señala una fuerte demanda a precios bajos.
*   **Estrategia**: Cuando un Martillo se forma en un **Nivel de Soporte** importante tras una tendencia bajista, indica una excelente oportunidad de compra con bajo riesgo. Coloque su Stop Loss justo por debajo del mínimo del Martillo.

#### 2. La Estrella Fugaz (Reversión Bajista)
*   **Aspecto**: Un cuerpo diminuto en la parte inferior de la vela con una sombra superior muy larga y casi ninguna sombra inferior.
*   **La Historia**: Los compradores empujaron el precio al alza, pero los vendedores los superaron por completo, devolviendo el precio cerca del nivel de apertura.
*   **Estrategia**: Cuando una Estrella Fugaz se forma en un **Nivel de Resistencia** clave tras una tendencia alcista, señala una excelente oportunidad de venta corta. Coloque su Stop Loss por encima del máximo de la mecha.

#### 3. Patrones Envolventes (Alcistas y Bajistas)
*   **Envolvente Alcista**: Una vela roja pequeña (bajista) seguida de una enorme vela verde (alcista) que "envuelve" por completo el cuerpo de la vela anterior. Indica un fuerte cambio de impulso al alza.
*   **Envolvente Bajista**: Una vela verde pequeña seguida de una gran vela roja que la envuelve por completo. Indica que los vendedores han tomado el control absoluto del mercado.

---

### Identificación de Soporte y Resistencia

*   **Soporte**: Una zona de precios donde históricamente han entrado compradores, creando un "suelo" que evita que el precio siga cayendo.
*   **Resistencia**: Una zona de precios donde históricamente los vendedores han liquidado posiciones, creando un "techo" que evita que el precio siga subiendo.

> **Consejo Profesional**: ¡Una vez que se rompe un nivel de resistencia, a menudo se convierte en un nuevo **nivel de soporte** en futuros retrocesos!`,

    "strategies-moving-averages": `### La Tendencia es su Amiga

En el trading, el **Seguimiento de Tendencias** es la estrategia más rentable a largo plazo. No intenta predecir máximos o mínimos; en cambio, busca capturar el 60-80% intermedio de un gran movimiento del mercado.

La herramienta principal para identificar tendencias es la **Media Móvil (MA)**. Suaviza las fluctuaciones de precios a corto plazo para revelar la verdadera tendencia subyacente.

---

### SMA vs. EMA

*   **Media Móvil Simple (SMA)**: El precio de cierre promedio de los últimos $N$ períodos. Trata todos los períodos por igual. Excelente para soporte y resistencia a largo plazo.
*   **Media Móvil Exponencial (EMA)**: Otorga mayor peso a los precios recientes. Responde mucho más rápido a los cambios de precios, permitiendo entradas más rápidas pero sufriendo más señales falsas.

---

### Estrategias clave con medias móviles

#### 1. Estrategia de Soporte Dinámico
En una tendencia alcista saludable, una media móvil popular (como la **EMA de 20** o la **SMA de 50**) actúa como una línea de soporte móvil.
*   **Entrada**: Espere a que se establezca una tendencia fuerte. Cuando el precio retroceda y rebote en la **EMA de 20** o **SMA de 50** con una vela alcista (como un Martillo), entre en largo.
*   **Salida**: Mantenga la posición mientras el cierre de la vela permanezca por encima de la media móvil.

#### 2. El Cruce de Oro y el Cruce de la Muerte
Usa dos medias móviles: una rápida (ej. de 9 o 50) y una lenta (ej. de 20 o 200).
*   **Cruce de Oro (Alcista)**: Cuando la rápida cruza **por encima** de la lenta. Indica que el impulso se está acelerando al alza.
*   **Cruce de la Muerte (Bajista)**: Cuando la rápida cruza **por debajo** de la lenta. Señala un cambio sistémico hacia un mercado bajista.

---

### ¡Evite el picadillo lateral!

Las medias móviles funcionan **solo en mercados con tendencia**. En un mercado plano o lateral, las medias móviles se cruzarán repetidamente, causando pequeñas pérdidas si opera a ciegas. Use osciladores como el RSI para confirmar si un mercado está en tendencia antes de operar.`,

    "strategies-oscillators": `### Medir la velocidad del precio: Momentum

Mientras que las medias móviles muestran la *dirección* de la tendencia, los **Indicadores de Momentum (Osciladores)** miden la *velocidad* de los cambios de precios. Están limitados a un rango específico (ej. 0 a 100 para el RSI) y ayudan a identificar cuándo una tendencia se está agotando.

---

### Índice de Fuerza Relativa (RSI)

El RSI mide la relación entre los movimientos alcistas y bajistas durante 14 períodos.
*   **Sobrecompra (RSI > 70)**: El activo ha subido demasiado rápido y está históricamente sobreextendido. No significa vender en corto de inmediato, pero advierte que comprar ahora es de alto riesgo.
*   **Sobreventa (RSI < 30)**: El activo ha caído demasiado rápido y está sobreextendido a la baja. Advierte que es probable un rebote de alivio.

#### Operar rangos con RSI
En un mercado lateral (acotado por Soporte y Resistencia):
-   Compre cuando el precio toque el Soporte **Y** el RSI esté por debajo de 30.
-   Venda cuando el precio toque la Resistencia **Y** el RSI esté por encima de 70.

---

### El Santo Grial: La Divergencia

Una **Divergencia** ocurre cuando el precio hace un nuevo máximo/mínimo, pero el indicador no lo confirma. Es la advertencia más potente de una reversión inminente del mercado.

#### 1. Divergencia Alcista (Señal de Compra)
*   **Precio**: Hace un **Mínimo más Bajo**.
*   **RSI**: Hace un **Mínimo más Alto**.
*   **Significado**: Aunque el precio bajó más, la velocidad de venta es menor. Los vendedores están exhaustos; se aproxima un fuerte rebote.

#### 2. Divergencia Bajista (Señal de Venta Corta)
*   **Precio**: Hace un **Máximo más Alto**.
*   **RSI**: Hace un **Máximo más Bajo**.
*   **Significado**: La subida ha perdido velocidad. Los compradores se quedan sin capital y una corrección es inminente.

---

### MACD (Convergencia/Divergencia de Medias Móviles)

El MACD consta de:
1.  **Línea MACD**: (EMA de 12 - EMA de 26). Muestra la velocidad del impulso.
2.  **Línea de Señal**: EMA de 9 de la Línea MACD.
3.  **Histograma**: Visualiza la distancia entre la Línea MACD y la Línea de Señal.
*   **Regla de Entrada**: Compre cuando la Línea MACD cruce **por encima** de la Línea de Señal (impulso alcista). Venda/abra cortos cuando cruce **por debajo** (impulso bajista).`,

    "risk-management": `### El secreto dorado del trading profesional

Los traders principiantes se obsesionan con *qué acción comprar* y con la *tasa de acierto*.
**Los traders profesionales se obsesionan con la Gestión de Riesgos, Stop Losses y Tamaño de Posición.**

Puede tener una baja **tasa de acierto del 40%** y aun así hacerse inmensamente rico si su beneficio promedio es de $3.00 por cada $1.00 de pérdida. Por el contrario, una **tasa de acierto del 90%** le llevará a la quiebra si sus pérdidas del 10% son 20 veces mayores que su beneficio promedio.

---

### La regla del 1% para la protección de la cuenta

Nunca, bajo ninguna circunstancia, arriesgue más del **1% al 2%** de su capital total en una sola operación.
*   **Arriesgar el 10% por operación**: Bastan 5 pérdidas consecutivas para destruir el **50%** de su cuenta. ¡Para recuperarse, necesita una **ganancia del 100%** solo para volver al punto de partida!
*   **Arriesgar el 1% por operación**: Tras 5 pérdidas consecutivas, habrá perdido solo el **5%** de su capital, y requerirá solo una **ganancia del 5.2%** para recuperarse.

---

### Cálculo matemático del tamaño de su posición

El tamaño de la posición no es arbitrario. Es una fórmula matemática precisa basada en su distancia al Stop Loss:

$$\\text{Tamaño de Posición (Unidades)} = \\frac{\\text{Capital de la Cuenta} \\times \\text{Riesgo de la Cuenta \\%}}{\\text{Precio de Entrada} - \\text{Precio de Stop Loss}}$$

#### Ejemplo:
*   **Saldo de Cuenta**: $10,000
*   **Límite de Riesgo**: 1% ($100 de riesgo)
*   **Precio de Acción**: $100
*   **Su Stop Loss**: $95 (distancia de $5 por acción)
*   **Cálculo**: $$\\text{Unidades} = \\frac{10000 \\times 1\\%}{100 - 95} = \\frac{100}{5} = 20\\text{ acciones}$$
*   *Si la acción cae a su stop loss de $95, perderá exactamente $100 (1% de su cuenta). ¡Ha protegido el 99% de su capital!*

---

### El poder de la relación Riesgo-Recompensa (R:R)

Busque siempre operaciones con una **relación Riesgo-Recompensa mínima de 1:2**.
*   **Riesgo**: $1.00 (la distancia a su Stop Loss)
*   **Recompensa**: $2.00 (la distancia a su nivel de Resistencia objetivo)

Si mantiene una relación R:R de 1:2, solo necesita acertar el **34% de las veces** para no perder. Si mantiene una relación de 1:3, ¡solo necesita acertar el **26% de las veces** para ganar dinero!

---

### Los tres pilares sagrados de una operación
Antes de entrar en cualquier operación, DEBE conocer:
1.  **Precio de Entrada**: Dónde compra o vende.
2.  **Stop Loss**: El precio donde admite que se equivocó y sale inmediatamente para proteger su capital.
3.  **Take Profit**: El objetivo lógico de resistencia donde sale para asegurar sus ganancias.`,

    "math-expected-value-kelly": `### Cuantificar su ventaja: Valor Esperado (EV)

En el trading, tener una "ventaja" (edge) significa que si ejecuta su estrategia en una muestra grande, el resultado neto será positivo. Lo calculamos matemáticamente usando el **Valor Esperado (EV)**:

$$EV = (P_{win} \\times \\text{Avg Win}) - (P_{loss} \\times \\text{Avg Loss})$$

Donde:
- $P_{win}$ es la probabilidad de ganar (Tasa de Acierto).
- $P_{loss}$ es la probabilidad de perder ($1 - P_{win}$).
- $\\text{Avg Win}$ es la ganancia promedio de las operaciones ganadoras.
- $\\text{Avg Loss}$ es la pérdida promedio de las operaciones perdedoras.

Si $EV > 0$, la estrategia es matemáticamente sólida y acumulará riqueza con el tiempo. Si $EV < 0$, está jugando a un juego perdedor (como la ruleta de un casino) y eventualmente quebrará, sin importar las rachas a corto plazo.

---

### Asignación óptima de capital: El Criterio de Kelly

Si tiene un Valor Esperado positivo, ¿cuánto capital debería arriesgar en cada operación?
Si arriesga muy poco, su cuenta crecerá despacio. Si arriesga demasiado, una mala racha puede arruinarle por completo.

La solución matemática es el **Criterio de Kelly**:

$$f^* = \\frac{p \\times (b + 1) - 1}{b}$$

Donde:
- $f^*$ es la fracción de su capital total a asignar a la operación.
- $p$ es su probabilidad de ganar ($P_{win}$).
- $b$ es su relación de ganancias, calculada como:
$$\\text{Relación (b)} = \\frac{\\text{Avg Win}}{\\text{Avg Loss}}$$

#### Reglas críticas de Kelly:
1. **Fraccionamiento de Kelly (Half-Kelly)**: Como las condiciones del mercado cambian, los profesionales rara vez usan la fracción de Kelly completa. En su lugar, usan un modelo de **Medio Kelly** ($f^* / 2$) para reducir drásticamente la volatilidad y el riesgo de drawdown, reteniendo más del 75% de la velocidad de crecimiento.
2. **Kelly Negativo**: Si la fórmula arroja un valor negativo, significa que no tiene ventaja ($EV < 0$). En este caso, la acción óptima es **no operar** ($0\\%$ de asignación).`,

    "math-ruin-drawdowns": `### La trampa exponencial: Recuperación de un Drawdown

Los traders novatos a menudo creen que una pérdida del 50% se soluciona con una ganancia del 50%. Este es un error matemático fatal.
Cuando pierde capital, le quedan menos dólares para operar. El porcentaje de recuperación necesario escala de manera asimétrica:

$$\\text{Recovery Gain \\%} = \\frac{D}{100 - D} \\times 100$$

Donde $D$ es el porcentaje de pérdida del drawdown.

| Pérdida por Drawdown | Ganancia de Recuperación Requerida |
|---|---|
| **10%** | **11.1%** |
| **20%** | **25.0%** |
| **30%** | **42.9%** |
| **50%** | **100.0%** |
| **75%** | **300.0%** |
| **90%** | **900.0%** |

Una vez que su drawdown supera el **50%**, la dificultad para salir del hoyo crece de manera exponencial. Por eso preservar el capital es infinitamente más importante que buscar ganancias gigantescas.

---

### La probabilidad de ruina

Su "Riesgo de Ruina" es la probabilidad de que su cuenta llegue a cero (o a un punto de no retorno).
Si su estrategia tiene ventaja, el riesgo de ruina está determinado únicamente por su **tamaño de posición** (el porcentaje de capital que arriesga por operación).

La fórmula simplificada para el Riesgo de Ruina es:

$$\\text{Riesgo de Ruina} = \\left(\\frac{1 - A}{1 + A}\\right)^N$$

Donde:
- $A$ es su ventaja o edge ($P_{win} - P_{loss}$).
- $N$ es el número de unidades de pérdida (ej. operaciones perdedoras) necesarias para quebrar la cuenta.

Si arriesga un **10%** por operación, solo puede tolerar $N = 10$ pérdidas consecutivas. Si arriesga el **1%** por operación, puede tolerar $N = 100$ pérdidas consecutivas.
Como las rachas de mala suerte están estadísticamente garantizadas a lo largo de cientos de operaciones, ¡elevar el riesgo del 1% al 10% multiplica su Riesgo de Ruina de forma exponencial!`
  },
  fr: {
    "basics-candlesticks": `### Le Langage du Marché: Action des Prix

Avant les indicateurs, il y a l'**Action des Prix** (Price Action). Chaque bougie raconte la bataille entre **Acheteurs (Taureaux)** et **Vendeurs (Ours)**. Une seule bougie résume l'évolution des prix sur une période donnée en quatre points de données simples :
- **Ouverture (Open)**: Le prix initial.
- **Haut (High)**: Le sommet absolu.
- **Bas (Low)**: Le plus bas absolu.
- **Clôture (Close)**: Le prix final.

---

### Modèles de retournement clés

#### 1. Le Marteau (Retournement Haussier)
*   **Forme**: Un tout petit corps en haut avec une très longue mèche inférieure (au moins 2x le corps) et peu ou pas de mèche supérieure.
*   **L'Histoire**: Les vendeurs ont poussé les prix bas, mais les acheteurs ont vigoureusement rejeté ces niveaux pour clôturer près de l'ouverture.
*   **Stratégie**: Utile sur un **Support** après une baisse. Placez le Stop Loss sous le marteau.

#### 2. L'Étoile Filante (Retournement Baissier)
*   **Forme**: Un tout petit corps en bas avec une très longue mèche supérieure.
*   **L'Histoire**: Les acheteurs ont poussé haut, mais les vendeurs ont repris le dessus pour clôturer près de l'ouverture.
*   **Stratégie**: Utile sur une **Résistance** après une hausse.

#### 3. Englobantes (Bullish & Bearish)
*   **Avalement Haussier**: Une bougie rouge engloutie par une grande bougie verte. Indique un fort retour de la force acheteuse.
*   **Avalement Baissier**: Une bougie verte engloutie par une grande bougie rouge. Indique une prise de contrôle par les vendeurs.`,

    "strategies-moving-averages": `### La Tendance est votre Amie

Le **Suivi de Tendance** est le moyen le plus sûr de gagner à long terme. La **Moyenne Mobile (MA)** est l'outil principal de suivi :

-   **Moyenne Mobile Simple (SMA)**: Moyenne arithmétique simple sur $N$ périodes. Idéale pour les supports et résistances de fond.
-   **Moyenne Mobile Exponentielle (EMA)**: Donne plus de poids aux prix récents, réagissant plus vite aux retournements mais générant plus de faux signaux.

---

### Stratégies clés

#### 1. Le Support Dynamique
En tendance haussière, une MA majeure (ex: **EMA de 20** ou **SMA de 50**) sert de support dynamique. Achetez le rebond.

#### 2. Croisements (Crossovers)
-   **Golden Cross**: MA rapide croise **au-dessus** de la lente. Signal haussier.
-   **Death Cross**: MA rapide croise **en dessous** de la lente. Signal baissier.`,

    "strategies-oscillators": `### Mesurer la vitesse : Le Momentum

Les **Oscillateurs** mesurent la vitesse des prix sur une échelle fixe (ex: 0 à 100 pour le RSI) et aident à repérer l'essoufflement d'une tendance.

---

### Relative Strength Index (RSI)

*   **Surachat (RSI > 70)**: Le cours a monté trop vite. Acheter devient très risqué.
*   **Survente (RSI < 30)**: Le cours a chuté trop vite. Un rebond de soulagement est proche.

---

### Le Saint Graal : La Divergence

*   **Divergence Haussière**: Le prix fait un **Bas plus Bas** mais le RSI fait un **Bas plus Haut**. Signal d'achat fort.
*   **Divergence Baissière**: Le prix fait un **Haut plus Haut** mais le RSI fait un **Haut plus Bas**. Signal de vente imminent.

---

### MACD (Moving Average Convergence Divergence)

*   **Achat**: La ligne MACD croise **au-dessus** de sa ligne de signal.
*   **Vente**: La ligne MACD croise **en dessous** de sa ligne de signal.`,

    "risk-management": `### Le Secret des Pros : La Gestion des Risques

Les débutants cherchent quoi acheter, **les pros se concentrent sur la gestion des risques et la taille des positions**.
Vous pouvez avoir 40% de réussite et devenir riche si vos gains moyens sont de 3$ pour 1$ perdu.

---

### La règle des 1%
Ne risquez jamais plus de **1% à 2%** de votre capital total sur une seule transaction.
*   Risquer 10% par trade : 5 pertes consécutives détruisent **50%** de votre compte, exigeant ensuite un **gain de 100%** pour revenir à l'équilibre !
*   Risquer 1% : 5 pertes consécutives ne détruisent que **5%** du capital.

---

### Formule mathématique du Dimensionnement

$$\\text{Position (Unités)} = \\frac{\\text{Capital} \\times \\text{Risque \\%}}{\\text{Entrée} - \\text{Stop Loss}}$$`,

    "math-expected-value-kelly": `### L'Espérance Mathématique (EV)

Modélisez votre avantage statistique sur un grand nombre de transactions :

$$EV = (P_{win} \\times \\text{Gain Moyen}) - (P_{loss} \\times \\text{Perte Moyenne})$$

Si $EV > 0$, votre stratégie accumulera de la valeur. Si $EV < 0$, vous êtes mathématiquement condamné à la faillite.

---

### Le Critère de Kelly : Allocation Optimale

$$\\text{Fraction Kelly } f^* = \\frac{p \\times (b + 1) - 1}{b}$$

Où $p$ est la probabilité de gain et $b$ le ratio gain/perte.
*   **Half-Kelly**: Risquer la moitié de $f^*$ est le standard professionnel pour réduire le drawdown tout en conservant 75% du potentiel de croissance.`,

    "math-ruin-drawdowns": `### Le Piège Exponentiel du Drawdown

La récupération après une perte n'est pas linéaire, elle est asymétrique :

$$\\text{Gain de Récupération} = \\frac{D}{100 - D} \\times 100$$

Une perte de 50% nécessite **100%** de hausse pour récupérer votre capital initial. Au-delà de 50%, la pente devient exponentielle.

---

### Risque de Ruine
La probabilité de vider votre compte est fonction directe de la fraction risquée par trade :

$$\\text{Risque de Ruine} = \\left(\\frac{1 - A}{1 + A}\\right)^N$$

Où $A$ est votre avantage (edge) et $N$ le nombre de transactions perdantes nécessaires pour tout perdre. Risquer 1% plutôt que 10% augmente $N$ par 10, réduisant le risque de ruine de façon exponentielle.`
  },
  de: {
    "basics-candlesticks": `### Price Action & Marktverständnis

Vor den Indikatoren kommt die **Price Action**. Jede Kerze erzählt die Geschichte des Kampfes zwischen **Käufern (Bullen)** und **Verkäufern (Bären)**.
- **Open (Eröffnung)**: Startpreis.
- **High (Höchstwert)**: Maximaler Preis.
- **Low (Tiefstwert)**: Minimaler Preis.
- **Close (Schluss)**: Endpreis.

---

### Wichtige Umkehrmuster

#### 1. Der Hammer (Bullische Umkehr)
*   **Form**: Kleiner Körper am oberen Ende, sehr langer unterer Schatten (mind. 2x Körperlänge).
*   **Bedeutung**: Verkäufer trieben den Preis tief, wurden aber von Käufern massiv zurückgedrängt. Starkes Kaufsignal bei Support.

#### 2. Shooting Star (Bärische Umkehr)
*   **Form**: Kleiner Körper am unteren Ende, sehr langer oberer Schatten.
*   **Bedeutung**: Käufer trieben den Preis hoch, wurden aber von Verkäufern komplett überwältigt.

#### 3. Engulfing-Muster (Umfassende Kerzen)
*   **Bullish Engulfing**: Eine grüne Kerze umschließt die vorherige rote Kerze komplett. Zeigt schnellen bullischen Dynamikwechsel.
*   **Bearish Engulfing**: Eine rote Kerze umschließt die grüne komplett. Verkäufer übernehmen die volle Kontrolle.`,

    "strategies-moving-averages": `### Der Trend ist Ihr Freund

**Trendfolge** ist langfristig die profitabelste Handelsstrategie. Der wichtigste Indikator ist der **Gleitende Durchschnitt (MA)**.

*   **Simple Moving Average (SMA)**: Einfacher Durchschnitt der letzten $N$ Perioden. Perfekt für langfristige Supports.
*   **Exponential Moving Average (EMA)**: Gewichtung jüngerer Kurse. Reagiert schneller, birgt aber mehr Fehlsignale.

---

### Strategien

#### 1. Dynamischer Support
In starken Aufwärtstrends fungieren MAs (z.B. **20 EMA** oder **50 SMA**) als dynamische Unterstützungen.

#### 2. MAs Kreuzungen (Crossovers)
*   **Golden Cross**: Schneller MA kreuzt **über** den langsamen. Bullisches Signal.
*   **Death Cross**: Schneller MA kreuzt **unter** den langsamen. Bärisches Signal.`,

    "strategies-oscillators": `### Momentum & Oszillatoren

Oszillatoren messen die Geschwindigkeit von Preisbewegungen auf einer festen Skala (z.B. 0 bis 100 beim RSI).

---

### Relative Strength Index (RSI)

*   **Überkauft (RSI > 70)**: Zu schneller Kursanstieg, Einstiege sind nun extrem riskant.
*   **Überverkauft (RSI < 30)**: Zu schneller Kursabfall, eine Gegenreaktion ist wahrscheinlich.

---

### Divergenzen (Der heilige Gral)

*   **Bullische Divergenz**: Kurs macht ein **tiefes Tief**, aber der RSI macht ein **höheres Tief**. Starkes Kaufsignal.
*   **Bärische Divergenz**: Kurs macht ein **höheres Hoch**, aber der RSI macht ein **tieferes Hoch**. Trendwende droht.`,

    "risk-management": `### Risikomanagement: Das Profi-Geheimnis

Anfänger suchen den perfekten Einstieg, **Profis fokussieren sich auf Risikomanagement und Positionsgrößen**.
Eine Trefferquote von nur 40% kann reich machen, wenn Gewinne im Schnitt doppelt so groß wie Verluste sind.

---

### Die 1%-Regel
Riskieren Sie niemals mehr als **1% bis 2%** Ihres Gesamtkapitals pro Trade.
*   Wer 10% pro Trade riskiert, halbiert sein Konto nach nur 5 Fehltrades und benötigt danach **100% Gewinn**, um wieder auf null zu kommen!
*   Wer 1% riskiert, verliert nach 5 Fehltrades nur **5%** und braucht nur **5,2%** zur Erholung.

---

### Positionsgrößen-Berechnung

$$\\text{Einheiten} = \\frac{\\text{Kapital} \\times \\text{Risiko \\%}}{\\text{Einstieg} - \\text{Stop-Loss}}$$`,

    "math-expected-value-kelly": `### Erwartungswert (EV)

Berechnen Sie Ihren statistischen Vorteil:

$$EV = (P_{\\text{win}} \\times \\text{Schnitt Gewinn}) - (P_{\\text{loss}} \\times \\text{Schnitt Verlust})$$

Ist der $EV > 0$, wächst Ihr Vermögen mathematisch über Zeit. Ist er $< 0$, verlieren Sie langfristig alles.

---

### Kelly-Formel: Optimale Allokation

$$f^* = \\frac{p \\times (b + 1) - 1}{b}$$

*   **Half-Kelly**: Standard der Profis. Es halbiert den Kelly-Wert $f^*$, um Drawdowns drastisch zu senken, behält aber 75% der Renditedynamik bei.`,

    "math-ruin-drawdowns": `### Die asymmetrische Erholungs-Falle

Der Verlustausgleich verhält sich nicht linear, sondern asymmetrisch:

$$\\text{Erholungs-Gewinn} = \\frac{D}{100 - D} \\times 100$$

Ein Verlust von 50% erfordert stolze **100%** Gewinn, um das Ausgangskapital wiederherzustellen. Über 50% steigt der Erholungsbedarf exponentiell.

---

### Ruinrisiko
Das Risiko, Ihr Konto komplett zu verlieren, hängt primär vom Trade-Risiko ab:

$$\\text{Ruinrisiko} = \\left(\\frac{1 - A}{1 + A}\\right)^N$$

Bei 1% Risiko hält Ihr Konto 100 Fehltrades stand ($N=100$), bei 10% Risiko nur 10. Das Ruinrisiko sinkt durch kleinere Positionen exponentiell.`
  },
  ar: {
    "basics-candlesticks": `### لغة السوق: حركة السعر (Price Action)

قبل المؤشرات الفنية، هناك **حركة السعر**. تروي كل شمعة قصة المعركة بين **المشترين (الثيران)** و**البائعين (الدببة)**. تلخص الشمعة الواحدة حركة السعر خلال فترة زمنية محددة في أربع نقاط رئيسية:
- **الافتتاح (Open)**: السعر في بداية الفترة.
- **الأعلى (High)**: أعلى سعر تم الوصول إليه.
- **الأدنى (Low)**: أدنى سعر تم الوصول إليه.
- **الإغلاق (Close)**: السعر في نهاية الفترة.

---

### نماذج الشموع الانعكاسية الرئيسية

#### 1. نموذج المطرقة (Hammer - انعكاس صعودي)
*   **الشكل**: جسم صغير جداً في الأعلى مع ظل سفلي طويل جداً (على الأقل ضعف طول الجسم) وظل علوي شبه معدوم.
*   **القصة**: دفع البائعون السعر للأسفل بقوة، لكن المشترين رفضوا هذه الأسعار المتدنية تماماً، ودفعوا السعر للإغلاق قرب الافتتاح.
*   **الاستراتيجية**: عندما تظهر المطرقة عند **مستوى دعم** رئيسي بعد اتجاه هابط، فإنها تشير إلى فرصة شراء ممتازة منخفضة المخاطر. ضع وقف الخسارة أسفل المطرقة مباشرة.

#### 2. نموذج الشهاب (Shooting Star - انعكاس هبوطي)
*   **الشكل**: جسم صغير في الأسفل وظل علوي طويل جداً مع ظل سفلي شبه معدوم.
*   **القصة**: دفع المشترون السعر للأعلى، لكن البائعين سيطروا ودفعوا الأسعار للأسفل لتغلق قرب الافتتاح.
*   **الاستراتيجية**: عندما يظهر الشهاب عند **مستوى مقاومة** بعد اتجاه صاعد، فإنه يشير لفرصة بيع على المكشوف (Short).

#### 3. النماذج الابتلاعية (Engulfing)
*   **الابتلاع الصعودي**: شمعة حمراء صغيرة تليها شمعة خضراء ضخمة تبتلع جسم الشمعة السابقة بالكامل، مما يشير إلى تحول قوي للزخم نحو الصعود.
*   **الابتلاع الهبوطي**: شمعة خضراء صغيرة تليها شمعة حمراء ضخمة تبتلعها بالكامل، مما يشير إلى سيطرة البائعين.`,

    "strategies-moving-averages": `### الاتجاه هو صديقك (Trend is Your Friend)

تتبع الاتجاه هو الاستراتيجية الأكثر ربحية على المدى الطويل. الأداة الأساسية لتحديد الاتجاه هي **المتوسط المتحرك (Moving Average)**:

-   **المتوسط المتحرك البسيط (SMA)**: متوسط أسعار الإغلاق لـ $N$ من الفترات بالتساوي. ممتاز للدعم والمقاومة طويلة المدى.
-   **المتوسط المتحرك الأسي (EMA)**: يعطي وزناً أكبر للأسعار الأخيرة، مما يجعله يستجيب أسرع للتغيرات، لكنه يعطي إشارات خاطئة أكثر.

---

### الاستراتيجيات الأساسية

#### 1. الدعم الديناميكي
في الاتجاه الصاعد القوي، يعمل المتوسط المتحرك (مثل **EMA 20** أو **SMA 50**) كخط دعم متحرك. اشترِ عند الارتداد منه.

#### 2. تقاطع المتوسطات
*   **التقاطع الذهبي (صعودي)**: عندما يتقاطع المتوسط السريع **فوق** المتوسط البطيء.
*   **تقاطع الموت (هبوطي)**: عندما يتقاطع المتوسط السريع **تحت** المتوسط البطيء.`,

    "strategies-oscillators": `### قياس سرعة السعر: الزخم (Momentum)

تقيس **مؤشرات الزخم (المذبذبات)** سرعة تغيرات الأسعار وتتراوح ضمن نطاق محدد (مثل 0 إلى 100 لمؤشر RSI).

---

### مؤشر القوة النسبية (RSI)

*   **تشبع شرائي (RSI > 70)**: ارتفع السعر بسرعة مفرطة وأصبح متضخماً صعودياً. الشراء هنا عالي المخاطر.
*   **تشبع بيعي (RSI < 30)**: انخفض السعر بسرعة مفرطة وأصبح متضخماً هبوطياً، مما يشير إلى قرب حدوث ارتداد صعودي.

---

### الانحراف (Divergence): أقوى الإشارات

*   **انحراف صعودي**: السعر يشكل **قاعاً أدنى من قاع** بينما مؤشر RSI يشكل **قاعاً أعلى من قاع**. إشارة شراء قوية.
*   **انحراف هبوطي**: السعر يشكل **قمة أعلى من قمة** بينما مؤشر RSI يشكل **قمة أدنى من قمة**. إشارة هبوط قريبة.`,

    "risk-management": `### السر الذهبي للتداول الاحترافي: إدارة المخاطر

يهتم المتداول المبتدئ بالسهم الذي سيشتريه ونسبة الفوز، بينما **يهتم المحترف بإدارة المخاطر، ووقف الخسارة، وحجم الصفقة**.
يمكنك النجاح بنسبة فوز 40% فقط إذا كان متوسط ربحك يعادل 3 أضعاف متوسط خسارتك.

---

### قاعدة الـ 1% لحماية الحساب
لا تخاطر بأكثر من **1% إلى 2%** من إجمالي رأس مال حسابك في صفقة واحدة أبداً.
*   إذا خاطرت بنسبة 10% لكل صفقة: تكفي 5 خسائر متتالية لتدمير **50%** من حسابك، وستحتاج بعدها إلى **ربح 100%** فقط للعودة لنقطة التعادل!
*   إذا خاطرت بنسبة 1% لكل صفقة: بعد 5 خسائر متتالية ستفقد **5%** فقط من رأس مالك.

---

### حساب حجم الصفقة رياضياً

$$\\text{حجم المركز (وحدات)} = \\frac{\\text{رأس المال} \\times \\text{نسبة المخاطرة}}{\\text{سعر الدخول} - \\text{سعر وقف الخسارة}}$$`,

    "math-expected-value-kelly": `### قياس ميزتك: القيمة المتوقعة (Expected Value)

احسب القيمة المتوقعة للتأكد من ربحية استراتيجيتك على المدى الطويل:

$$EV = (P_{win} \\times \\text{متوسط الربح}) - (P_{loss} \\times \\text{متوسط الخسارة})$$

إذا كان $EV > 0$ فالاستراتيجية رابحة وستحقق ثروة مع الوقت. إذا كانت سالبة فستؤدي للإفلاس حتماً.

---

### معيار كيلي (Kelly Criterion): التخصيص الأمثل

$$f^* = \\frac{p \\times (b + 1) - 1}{b}$$

حيث $p$ هو احتمال الفوز و $b$ نسبة العائد/المخاطرة.
*   **نصف كيلي (Half-Kelly)**: يوصي المحترفون باستخدام نصف النسبة المقترحة $f^* / 2$ لتقليل تذبذب الحساب مع الاحتفاظ بـ 75% من سرعة النمو.`,

    "math-ruin-drawdowns": `### الفخ الأسي: التعافي من التراجع (Drawdown)

التعافي من الخسائر ليس خطياً بل هو غير متماثل وأسي:

$$\\text{نسبة التعافي المطلوبة} = \\frac{D}{100 - D} \\times 100$$

خسارة 50% من رأس المال تتطلب **تحقيق ربح بنسبة 100%** على رأس المال المتبقي لمجرد العودة لنقطة التعادل.

---

### احتمال الإفلاس (Probability of Ruin)
يرتبط خطر الإفلاس تماماً بحجم مخاطرتك لكل صفقة:

$$\\text{خطر الإفلاس} = \\left(\\frac{1 - A}{1 + A}\\right)^N$$

حيث $A$ هي ميزتك التنافسية و $N$ عدد الصفقات الخاسرة المتتالية لتصفير الحساب. المخاطرة بـ 1% بدلاً من 10% تزيد $N$ بمقدار 10 أضعاف، مما يقلل خطر الإفلاس بشكل أسي.`
  },
  ja: {
    "basics-candlesticks": `### 市場の言語：プライスアクション

インジケーターを使う前に、最も重要なのが**プライスアクション（値動き）**です。ローソク足は**買い手（強気派）**と**売り手（弱気派）**の攻防の歴史を物語っています。
- **始値 (Open)**: 期間の開始価格。
- **高値 (High)**: 期間中の最高価格。
- **安値 (Low)**: 期間中の最低価格。
- **終値 (Close)**: 期間の終了価格。

---

### 主要なローソク足反転パターン

#### 1. ハンマー（下影ピンバー・強気反転）
*   **形状**: 実体が上部にあり、下ひげが実体の2倍以上長く、上ひげがほとんどない。
*   **心理**: 一時売り手が大きく押し下げたものの、買い手が安値を強力に拒否し、始値付近まで押し戻したことを示します。サポートライン上で有効です。

#### 2. シューティングスター（上影ピンバー・弱気反転）
*   **形状**: 実体が下部にあり、上ひげが非常に長い。
*   **心理**: 買い手が一時大きく押し上げたものの、売り手がそれを完全に圧倒し、安値付近まで引き戻したことを示します。レジスタンスライン上で有効です。

#### 3. 包み足（エンガルフィング・パターン）
*   **陽の包み足**: 前期の陰線を当期の陽線が完全に包み込む（アウトサイドバー）。強力な上昇モメンタムへの転換。
*   **陰の包み足**: 前期の陽線を当期の陰線が完全に包み込む。売り手が主導権を握ったサイン。`,

    "strategies-moving-averages": `### トレンドは友達（Trend is Your Friend）

取引において**トレンドフォロー（順張り）**は長期的に最も稼げる戦略です。トレンドを識別する基本ツールが**移動平均線 (MA)**です。

-   **単純移動平均線 (SMA)**: 過去 $N$ 期間の終値の単純平均。長期のサポート・レジスタンスとして機能しやすい。
-   **指数平滑移動平均線 (EMA)**: 直近の価格に重みを置いた平均。値動きに素早く反応するが、ダマシが多くなる傾向があります。

---

### 基本戦略

#### 1. 動的サポート
強い上昇トレンドでは、**20 EMA**や**50 SMA**などの主要な移動平均線がサポートラインとして機能します。

#### 2. ゴールデンクロス & デッドクロス
*   **ゴールデンクロス**: 短期MAが長期MAを**上抜ける**。買いシグナル。
*   **デッドクロス**: 短期MAが長期MAを**下抜ける**。売りシグナル。`,

    "strategies-oscillators": `### モメンタムとオシレーター

オシレーターは、価格の変化速度（勢い）を特定の範囲（RSIの場合は0〜100）で測定します。

---

### RSI（相対力指数）

*   **買われすぎ (RSI > 70)**: 上昇の勢いが強すぎ、新規買いは極めてリスクが高い状態。
*   **売られすぎ (RSI < 30)**: 下落の勢いが強すぎ、自律反発が近い状態。

---

### 最強のシグナル：ダイバージェンス

逆行現象（ダイバージェンス）は、価格とインジケーターの動きが矛盾する現象で、強力な反転の予兆です。

*   **強気のダイバージェンス**: 価格は**安値を更新**しているが、RSIは**安値を切り上げ**ている。強力な買いシグナル。
*   **弱気のダイバージェンス**: 価格は**高値を更新**しているが、RSIは**高値を切り下げ**ている。下落間近の警告。`,

    "risk-management": `### リスク管理：プロの絶対的秘密

初心者は「何を買うか」に執着し、**プロは「リスク管理、損切り、ポジションサイズ」に執着します**。
勝率が40%しかなくても、平均利益が平均損失の2倍以上あれば、資産は爆発的に増えます。

---

### 口座を守る「1%ルール」
1回の取引でリスクにさらす資金は、**総資金の1%〜2%**までに抑えてください。
*   **10%のリスクを取る場合**: 5連敗するだけで口座資金は**50%減少**します。元の水準（ブレイクイーブン）に戻すには**100%の利益**が必要になります！
*   **1%のリスクを取る場合**: 5連敗しても損失はわずか**5%**で、元の状態に戻すには**5.2%の利益**で足ります。

---

### ポジションサイズの数学的計算

$$\\text{購入数量 (単位)} = \\frac{\\text{口座資金} \\times \\text{許容リスク \\%}}{\\text{エントリー価格} - \\text{損切り価格}}$$`,

    "math-expected-value-kelly": `### エッジの定量化：期待値 (EV)

期待値を計算して、あなたの取引システムが長期的に利益を生み出すか確認します。

$$EV = (P_{\\text{win}} \\times \\text{平均利益}) - (P_{\\text{loss}} \\times \\text{平均損失})$$

期待値がプラス ($EV > 0$) であれば、取引を繰り返すことで資産が増えます。マイナスの場合は長期的には必ず破産します。

---

### 資金管理の最適化：ケリー基準

$$f^* = \\frac{p \\times (b + 1) - 1}{b}$$

*   $p$ は勝率、$b$ はペイオフ比率（平均利益 / 平均損失）。
*   **ハーフケリー（Half-Kelly）**: 市場の変化に備え、ケリー公式の推奨値の半分（$f^* / 2$）をリスクにさらす手法。ドローダウンを劇的に抑えつつ、成長率の75%以上を維持できます。`,

    "math-ruin-drawdowns": `### ドローダウン回復の非対称性（非線形の罠）

資金を失った後の回復に必要なパフォーマンスは、非対称に跳ね上がります。

$$\\text{必要な回復率} = \\frac{D}{100 - D} \\times 100$$

50%の損失を出した場合、元本に戻すには**100%の利益**が必要になります。損失が膨らむほど、必要な利益率は指数関数的に上昇します。

---

### 破産確率 (Risk of Ruin)
破産確率は、1トレードあたりの許容リスクによって決定されます。

$$\\text{破産確率} = \\left(\\frac{1 - A}{1 + A}\\right)^N$$

1トレードのリスクを1%から10%に増やすと、許容できる連敗数 $N$ が100から10に激減し、破産確率は指数関数的に跳ね上がります。`
  },
  zh: {
    "basics-candlesticks": `### 市场的语言：价格行为 (Price Action)

在任何技术指标出现之前，**价格行为**是最根本的数据。每一根K线都诉说着**买方（多头）**与**卖方（空头）**之间的战争故事。单根K线将特定时间内的价格变动浓缩为四个数据点：
- **开盘价 (Open)**: 周期的起点价格。
- **最高价 (High)**: 周期内的最高峰价格。
- **最低价 (Low)**: 周期内的最底部价格。
- **收盘价 (Close)**: 周期的终点价格。

---

### 核心K线反转形态

#### 1. 锤子线 (看涨反转)
*   **形态**: 实体极小且位于K线上方，下影线极长（至少是实体长度的2倍），几乎没有上影线。
*   **心理**: 空头曾猛烈打压价格，但多头在低位强力反扑，将价格推升至开盘价附近收盘。这表明低位有强烈的买盘支撑。
*   **策略**: 当锤子线出现在下跌趋势后的重要**支撑位**时，是一个极佳的低风险买入信号。将止损点设在锤子线最低点下方。

#### 2. 流星线 (看跌反转)
*   **形态**: 实体极小且位于K线下方，上影线极长。
*   **心理**: 多头曾试图大幅推高价格，但空头随后全面爆发，将价格重新砸回开盘价附近。
*   **策略**: 当流星线出现在上涨趋势后的重要**阻力位**时，是一个绝佳的做空机会。

#### 3. 吞没形态 (看涨与看跌)
*   **看涨吞没**: 一根小阴线随后紧跟一根巨大的阳线，阳线实体完全“吞没”前一根阴线的实体，表明多头夺回绝对控制权。
*   **看跌吞没**: 一根小阳线随后被一根巨大的阴线完全吞没，表明空头动能暴发。`,

    "strategies-moving-averages": `### 趋势是你的朋友 (Trend is Your Friend)

在交易中，**趋势跟踪**是长期来看最稳健、最暴利的策略。识别趋势最基本的工具就是**移动平均线 (MA)**。

-   **简单移动平均线 (SMA)**: 过去 $N$ 个周期收盘价的算术平均值。非常适合作为长线的支撑与阻力参考。
-   **指数移动平均线 (EMA)**: 给予近期价格更高的权重。对价格变动反应更灵敏，能更早发出信号，但由于波动剧烈，虚假信号（洗盘）也更多。

---

### 核心均线策略

#### 1. 动态支撑/阻力策略
在健康的趋势中，均线（如 **20 EMA** 或 **50 SMA**）通常扮演着动态支撑线的角色。在均线附近寻找反转K线（如锤子线）进行顺势建仓。

#### 2. 均线交叉 (Crossovers)
*   **黄金交叉**: 快速均线**向上突破**慢速均线，表明多头动能正加速爆发。
*   **死亡交叉**: 快速均线**向下突破**慢速均线，表明市场步入长期熊市。`,

    "strategies-oscillators": `### 衡量价格的速度：动量 (Momentum)

移动平均线显示的是趋势的*方向*，而**动量指标（振荡器）**则测量价格波动的*速度*。它们通常被限制在一个特定的区间内（例如 RSI 为 0 到 100）。

---

### 相对强弱指数 (RSI)

*   **超买 (RSI > 70)**: 价格上涨过快，市场出现超买，此时追高买入风险极高。
*   **超卖 (RSI < 30)**: 价格下跌过快，市场严重超卖，通常预示着超跌反弹即将来临。

---

### 终极武器：背离 (Divergence)

当价格走势与指标走势出现不一致时，即为背离。这是趋势即将发生反转的最强烈警告。

*   **看涨背离**: 价格创出**新低**，但 RSI 却形成一个**更高的低点**。这表明下跌动能枯竭，多头即将反扑。
*   **看跌背离**: 价格创出**新高**，但 RSI 却形成一个**更低的高点**。这表明上涨动能减弱，暴跌在即。`,

    "risk-management": `### 操盘手的黄金秘密：风险管理

业余交易者沉迷于“买哪只股票”和“胜率”，**专业交易者则死死盯着“风险管理、止损和仓位控制”**。
即使你的胜率只有 **40%**，如果你的平均盈利是平均亏损的 3 倍，你依然能赚取惊人的财富。

---

### 账户保护的 1% 法则
在任何单笔交易中，绝对不要让你的损失超过总账户资金的 **1% 到 2%**。
*   **每笔交易承担 10% 的风险**: 只要连续遭遇 5 次亏损，你的账户就会腰斩（**亏损 50%**）。而回本需要 **100% 的盈利**！
*   **每笔交易承担 1% 的风险**: 连续亏损 5 次后，你仅损失了 **5%** 的本金，只需 **5.2% 的盈利**即可回本。

---

### 仓位大小的精确数学计算

止损距离决定了你的仓位大小：

$$\\text{仓位大小 (股数)} = \\frac{\\text{账户资金} \\times \\text{单笔风险 \\%}}{\\text{买入价格} - \\text{止损价格}}$$`,

    "math-expected-value-kelly": `### 优势量化：数学期望值 (EV)

通过计算期望值，来验证你的交易策略在长期内是否具有数学优势：

$$EV = (P_{\\text{win}} \\times \\text{平均盈利}) - (P_{\\text{loss}} \\times \\text{平均亏损})$$

只有当 $EV > 0$ 时，你的交易系统才具备数学优势。如果 $EV < 0$，长期交易必将导致破产。

---

### 凯利公式 (The Kelly Criterion)：仓位最优化

$$\\text{最优仓位比例 } f^* = \\frac{p \\times (b + 1) - 1}{b}$$

其中 $p$ 为胜率，$b$ 为盈亏比（平均盈利 / 平均亏损）。
*   **半凯利法 (Half-Kelly)**: 为了应对市场变化并降低净值波动，专业量化机构通常使用半凯利仓位（$f^* / 2$）。这能在保留 75% 增长速度的同时，极大地降低账户回撤风险。`,

    "math-ruin-drawdowns": `### 账户回撤的非对称陷阱

亏损后的回本并不是线性的，而是呈现极端的非对称性：

$$\\text{回本所需涨幅} = \\frac{D}{100 - D} \\times 100$$

亏损 50% 需要 **100%** 的涨幅才能回本；亏损 75% 则需要 **300%** 的暴涨才能保本。

---

### 破产概率 (Probability of Ruin)
当你的交易系统具备正期望值时，破产概率完全取决于你的单笔风险比例：

$$\\text{破产概率} = \\left(\\frac{1 - A}{1 + A}\\right)^N$$

其中 $A$ 为你的优势 ($P_{\\text{win}} - P_{\\text{loss}}$)，$N$ 为触发账户破产所需的连续亏损次数。单笔风险从 10% 降到 1%，可以将承受连败的能力 $N$ 提高 10 倍，从而以指数级降低你的破产风险！`
  },
  pt: {
    "basics-candlesticks": `### O Idioma do Mercado: Price Action

Antes de qualquer indicador, existe o **Price Action** (Ação de Preço). Cada candle conta a história da batalha entre **Compradores (Touros)** e **Vendedores (Ursos)**.
- **Abertura (Open)**: Preço inicial do período.
- **Máximo (High)**: Pico absoluto atingido.
- **Mínimo (Low)**: Preço mais baixo registrado.
- **Fechamento (Close)**: Preço final do período.

---

### Principais Padrões de Reversão

#### 1. O Martelo (Reversão Altista)
*   **Aparência**: Corpo pequeno no topo, sombra inferior muito longa (pelo menos 2x o tamanho do corpo) e pouca ou nenhuma sombra superior.
*   **Significado**: Os vendedores empurraram o preço para baixo, mas os compradores rejeitaram essas mínimas com força, fechando perto da abertura. Indica forte suporte.

#### 2. Estrela Cadente (Reversão Baixista)
*   **Aparência**: Corpo pequeno na base e sombra superior muito longa.
*   **Significado**: Compradores tentaram empurrar o preço para cima, mas os vendedores retomaram o controle e jogaram o preço para baixo.

#### 3. Padrões de Engolfo (Engulfing)
*   **Engolfo de Alta**: Um candle verde gigante que engole completamente o corpo do candle vermelho anterior. Mostra força compradora dominante.
*   **Engolfo de Baixa**: Um candle vermelho gigante que engole o candle verde anterior. Vendedores assumem o controle absoluto.`,

    "strategies-moving-averages": `### A Tendência é sua Amiga

No trading, o **Seguimento de Tendência** é a estratégia mais lucrativa a longo prazo. A principal ferramenta é a **Média Móvel (MA)**.

-   **Média Móvel Simples (SMA)**: Média aritmética simples nos últimos $N$ períodos. Funciona muito bem como suporte de longo prazo.
-   **Média Móvel Exponencial (EMA)**: Dá mais peso aos preços recentes. Reage mais rápido, mas pode dar mais falsos sinais (violonadas).

---

### Estratégias Principais

#### 1. Suporte Dinâmico
Em tendências fortes, médias móveis importantes como a **EMA de 20** ou a **SMA de 50** servem como suporte móvel. Compre o rebote.

#### 2. Cruzamentos de Médias (Crossovers)
*   **Golden Cross (Cruz de Ouro)**: Média rápida cruza **acima** da média lenta. Sinal forte de alta.
*   **Death Cross (Cruz da Morte)**: Média rápida cruza **abaixo** da média lenta. Sinal de mercado em baixa.`,

    "strategies-oscillators": `### Medindo a velocidade: Momentum

Os **Osciladores** medem a velocidade e a força do movimento dos preços e operam dentro de uma escala fixa (ex: 0 a 100 no RSI).

---

### Índice de Força Relativa (RSI)

*   **Sobrecompra (RSI > 70)**: O ativo subiu rápido demais e está sobrecarregado. Comprar nestes níveis tem alto risco de correção.
*   **Sobrevenda (RSI < 30)**: O ativo caiu rápido demais. Uma recuperação técnica de curto prazo é provável.

---

### O Santo Graal: Divergência

A divergência ocorre quando o preço faz uma nova máxima/mínima, mas o indicador não confirma.

*   **Divergência de Alta**: Preço faz uma **Mínima mais Baixa**, mas o RSI faz uma **Mínima mais Alta**. Sinal de compra potente.
*   **Divergência de Baixa**: Preço faz uma **Máxima mais Alta**, mas o RSI faz uma **Máxima mais Baixa**. Alerta de reversão para queda.`,

    "risk-management": `### O Segredo de Ouro: Gestão de Risco

Iniciantes focam em qual ativo comprar, **profissionais focam em Stop Loss, Gestão de Risco e Dimensionamento de Posição**.
Você pode ter apenas 40% de acerto e enriquecer se suas vitórias médias forem de R$ 3,00 para cada R$ 1,00 perdido.

---

### A Regra de 1%
Nunca arrisque mais do que **1% a 2%** do seu capital total em uma única operação.
*   Se arriscar 10% por trade: Bastam 5 perdas seguidas para destruir **50%** da sua conta. Recuperar isso exige um **ganho de 100%**!
*   Se arriscar 1%: 5 perdas seguidas reduzem sua conta em apenas **5%**, precisando de apenas **5,2% de retorno** para recuperar.

---

### Dimensionamento Matemático

$$\\text{Tamanho (Unidades)} = \\frac{\\text{Capital} \\times \\text{Risco \\%}}{\\text{Preço de Entrada} - \\text{Preço de Stop Loss}}$$`,

    "math-expected-value-kelly": `### Quantificando sua Vantagem: Valor Esperado (EV)

Calcule seu retorno provável ao longo de uma série de operações:

$$EV = (P_{win} \\times \\text{Ganho Médio}) - (P_{loss} \\times \\text{Perda Média})$$

Se o $EV > 0$, o seu sistema acumulará patrimônio. Se for $< 0$, você quebrará no longo prazo.

---

### O Critério de Kelly: Alocação Ótima

$$f^* = \\frac{p \\times (b + 1) - 1}{b}$$

*   **Half-Kelly (Meio Kelly)**: O padrão da indústria. Reduz a recomendação da fórmula pela metade ($f^* / 2$) para suavizar drasticamente a volatilidade e as perdas, enquanto retém mais de 75% do crescimento do patrimônio.`,

    "math-ruin-drawdowns": `### A Armadilha Assimétrica do Drawdown

A recuperação de perdas não é linear, ela é exponencial:

$$\\text{Ganho de Recuperação} = \\frac{D}{100 - D} \\times 100$$

Uma perda de 50% exige **100%** de lucro subsequente apenas para recuperar o capital original.

---

### Risco de Ruína
A probabilidade de quebrar sua conta depende exclusivamente do percentual arriscado por operação:

$$\\text{Risco de Ruína} = \\left(\\frac{1 - A}{1 + A}\\right)^N$$

Riscar 1% por trade em vez de 10% eleva as perdas necessárias para a quebra ($N$) de 10 para 100, blindando sua conta contra sequências de perdas inevitáveis de forma exponencial.`
  },
  it: {
    "basics-candlesticks": `### Il Linguaggio del Mercato: Price Action

Prima di ogni indicatore c'è la **Price Action**. Ogni candela racconta la battaglia tra **Acquirenti (Tori)** e **Venditori (Orsi)**.
- **Apertura (Open)**: Prezzo di partenza del periodo.
- **Massimo (High)**: Prezzo massimo raggiunto.
- **Minimo (Low)**: Prezzo minimo registrato.
- **Chiusura (Close)**: Prezzo finale del periodo.

---

### Pattern di Inversione Chiave

#### 1. Il Martello (Hammer - Inversione Rialzista)
*   **Forma**: Piccolo corpo in alto, lunga mèche inferiore (almeno 2x il corpo) e quasi nessuna mèche superiore.
*   **Psicologia**: I venditori hanno spinto giù i prezzi, ma gli acquirenti hanno fortemente rifiutato i minimi rialzando il prezzo. Ottimo segnale d'acquisto sui Supporti.

#### 2. Shooting Star (Inversione Ribassista)
*   **Forma**: Piccolo corpo in basso e mèche superiore molto lunga.
*   **Psicologia**: Gli acquirenti hanno cercato di salire, ma i venditori hanno preso il controllo spingendo giù il prezzo.

#### 3. Pattern Engulfing (Avvolgenti)
*   **Engulfing Rialzista**: Candela verde gigante che avvolge interamente la rossa precedente. Segnala forte momentum di ripresa.
*   **Engulfing Ribassista**: Candela rossa gigante che avvolge la verde precedente. I venditori hanno il pieno controllo.`,

    "strategies-moving-averages": `### Il Trend è tuo Amico

Nel trading, il **Trend Following** è lo stile più profittevole a lungo termine. La **Media Mobile (MA)** è lo strumento principale.

-   **Media Mobile Semplice (SMA)**: Media aritmetica degli ultimi $N$ periodi. Ottimo supporto di lungo periodo.
-   **Media Mobile Exponenziale (EMA)**: Pesa maggiormente i prezzi recenti. Reagisce più rapidamente, ma genera più falsi segnali (whipsaws).

---

### Strategie Principali

#### 1. Supporto Dinamico
In trend stabili, medie importanti (es. **EMA a 20** o **SMA a 50**) agiscono come supporto inclinato. Compra i rimbalzi.

#### 2. Incroci (Crossovers)
*   **Golden Cross (Rialzista)**: Media veloce incrocia **sopra** la lenta.
*   **Death Cross (Ribassista)**: Media veloce incrocia **sotto** la lenta.`,

    "strategies-oscillators": `### Misurare la Velocità: Momentum

Gli **Oscillatori** misurano la velocità delle variazioni di prezzo e operano in una scala fissa (es: 0-100 per l'RSI).

---

### Relative Strength Index (RSI)

*   **Ipercomprato (RSI > 70)**: Il prezzo è salito troppo in fretta. Comprare ora è molto rischioso.
*   **Ipervenduto (RSI < 30)**: Il prezzo è crollato velocemente. Rimbalzo tecnico probabile.

---

### Il Santo Graal: Divergenza

*   **Divergenza Rialzista**: Il prezzo fa un **Minimo più Basso**, ma l'RSI fa un **Minimo più Alto**. Segnale d'acquisto potente.
*   **Divergenza Ribassista**: Il prezzo fa un **Massimo più Alto**, ma l'RSI fa un **Massimo più Basso**. Segnale di correzione in arrivo.`,

    "risk-management": `### Gestione del Rischio: Il Segreto dei Pro

I principianti cercano cosa comprare, **i professionisti si focalizzano su gestione del rischio, stop loss e taglia della posizione**.
Con una percentuale di vincita del 40% puoi arricchirti se i tuoi guadagni medi sono 3 volte superiori alle perdite.

---

### La Regola del 1%
Non rischiare mai più del **1% o 2%** del tuo capitale totale su un singolo trade.
*   Rischiare il 10%: Bastano 5 perdite consecutive per perdere il **50%** del capitale, richiedendo poi un **gain del 100%** per tornare in pareggio!
*   Rischiare il 1%: 5 perdite costano solo il **5%**, richiedendo solo il **5.2% di gain** per recuperare.

---

### Calcolo Scientifico della Posizione

$$\\text{Unità (Taglia)} = \\frac{\\text{Capitale} \\times \\text{Rischio \\%}}{\\text{Ingresso} - \\text{Stop Loss}}$$`,

    "math-expected-value-kelly": `### Quantificare il Vantaggio: Valore Atteso (EV)

Calcola la redditività del tuo trading system nel lungo termine:

$$EV = (P_{win} \\times \\text{Profitto Medio}) - (P_{loss} \\times \\text{Perdita Media})$$

Se il $EV > 0$, accumulerai ricchezza nel tempo. Se è negativo, la matematica ti condanna al fallimento.

---

### Criterio di Kelly: Allocazione Ottimale

$$f^* = \\frac{p \\times (b + 1) - 1}{b}$$

*   **Half-Kelly**: Lo standard dei professionisti ($f^* / 2$). Riduce drasticamente la volatilità del portafoglio pur catturando il 75% del potenziale tasso di crescita.`,

    "math-ruin-drawdowns": `### L'Asimmetria del Drawdown

Il recupero dalle perdite non è lineare ma asimmetrico:

$$\\text{Rimbalzo Necessario} = \\frac{D}{100 - D} \\times 100$$

Una perdita del 50% richiede un **guadagno del 100%** per ritornare al capitale originale.

---

### Rischio di Rovina
La probabilità di bruciare il conto è legata direttamente alla percentuale rischiata:

$$\\text{Rischio di Rovina} = \\left(\\frac{1 - A}{1 + A}\\right)^N$$

Rischiare l'1% invece del 10% incrementa la tolleranza ai trade perdenti ($N$) di dieci volte, diminuendo il rischio di rovina in modo esponenziale.`
  },
  ru: {
    "basics-candlesticks": `### Язык рынка: Прайс Экшн (Price Action)

До появления индикаторов существует **Прайс Экшн**. Каждая свеча рассказывает историю борьбы между **Покупателями (Быками)** и **Продавцами (Медведями)**.
- **Открытие (Open)**: Стартовая цена периода.
- **Максимум (High)**: Абсолютный пик цены за период.
- **Минимум (Low)**: Абсолютное дно цены за период.
- **Закрытие (Close)**: Финальная цена периода.

---

### Ключевые разворотные свечные паттерны

#### 1. Молот (Hammer — бычий разворот)
*   **Форма**: Крошечное тело в верхней части свечи с очень длинной нижней тенью (минимум в 2 раза длиннее тела) и почти полным отсутствием верхней тени.
*   **Психология**: Продавцы агрессивно гнали цену вниз, но покупатели полностью выкупили падение, закрыв свечу у открытия. Сигнализирует о сильном спросе у уровней Поддержки.

#### 2. Падающая звезда (Shooting Star — медвежий разворот)
*   **Форма**: Маленькое тело внизу и очень длинная верхняя тень.
*   **Психология**: Покупатели высоко подняли цену, но продавцы перехватили инициативу, вернув ее к открытию.

#### 3. Паттерны поглощения (Engulfing)
*   **Бычье поглощение**: Маленькая красная свеча полностью перекрывается телом крупной зеленой свечи. Означает мощный разворот вверх.
*   **Медвежье поглощение**: Зеленая свеча полностью поглощается крупной красной. Сигнал полного контроля продавцов.`,

    "strategies-moving-averages": `### Тренд — ваш друг

**Следование за трендом** — самая прибыльная стратегия на длинной дистанции. Главный инструмент — **Скользящая Средняя (MA)**.

-   **Простая скользящая (SMA)**: Средняя арифметическая цена закрытия за $N$ периодов. Надежный уровень долгосрочной поддержки.
-   **Экспоненциальная скользящая (EMA)**: Придает больший вес последним ценам. Реагирует быстрее, но дает больше ложных сигналов на флэте (ложных пробоев).

---

### Основные стратегии

#### 1. Динамическая поддержка
В сильном восходящем тренде важные MA (например, **20 EMA** или **50 SMA**) выступают плавающей поддержкой. Покупайте при отскоке.

#### 2. Пересечения (Crossovers)
*   **Золотой крест (бычий)**: Быстрая MA пересекает медленную **снизу вверх**.
*   **Смертельный крест (медвежий)**: Быстрая MA пересекает медленную **сверху вниз**.`,

    "strategies-oscillators": `### Измерение скорости цены: Импульс

**Осцилляторы** измеряют скорость изменения цен на фиксированной шкале (например, от 0 до 100 для RSI).

---

### Индекс относительной силы (RSI)

*   **Перекупленность (RSI > 70)**: Цена росла слишком быстро. Новые покупки сопряжены с огромным риском.
*   **Перепроданность (RSI < 30)**: Актив падал слишком быстро. Вероятен технический отскок вверх.

---

### Священный Грааль: Дивергенция

Дивергенция (расхождение) — это ситуация, когда цена ставит новый экстремум, а индикатор его не подтверждает.

*   **Бычья дивергенция**: Цена ставит **новый минимум**, а RSI показывает **более высокий минимум**. Мощный сигнал на покупку.
*   **Медвежья дивергенция**: Цена ставит **новый максимум**, а RSI показывает **более низкий максимум**. Предупреждение о падении.`,

    "risk-management": `### Золотой секрет профи: Управление рисками

Новички ищут, что купить, а **профессионалы сосредоточены на рисках, стоп-лоссах и объеме позиции**.
Вы можете иметь всего 40% прибыльных сделок и богатеть, если средняя прибыль в 3 раза превышает убыток.

---

### Правило 1% риска
Никогда не рискуйте более чем **1%–2%** от капитала вашего счета в одной сделке.
*   Если рисковать 10% на сделку: Всего 5 убытков подряд уничтожат **50%** вашего депозита. Чтобы вернуть счет в безубыток, вам понадобится **100% прибыли**!
*   Если рисковать 1%: 5 потерь подряд снизят баланс лишь на **5%**.

---

### Расчет размера позиции математически

$$\\text{Размер позиции (акций)} = \\frac{\\text{Баланс} \\times \\text{Риск \\%}}{\\text{Вход} - \\text{Стоп-Лосс}}$$`,

    "math-expected-value-kelly": `### Количественная оценка преимущества: Мат. ожидание (EV)

Рассчитайте прибыльность вашей торговой системы на долгой дистанции:

$$EV = (P_{win} \\times \\text{Ср. Выигрыш}) - (P_{loss} \\times \\text{Ср. Убыток})$$

Если $EV > 0$, ваша система будет приносить прибыль. Если меньше нуля — вы математически обречены на банкротство.

---

### Критерий Келли: Оптимальное распределение

$$f^* = \\frac{p \\times (b + 1) - 1}{b}$$

где $p$ — вероятность выигрыша, а $b$ — соотношение прибыль/убыток.
*   **Дробный Келли (Half-Kelly)**: Профи берут половину от расчетной доли ($f^* / 2$), чтобы защитить баланс от волатильности, сохраняя 75% скорости роста.`,

    "math-ruin-drawdowns": `### Асимметричная ловушка просадки

Восстановление счета после убытка нелинейно, а асимметрично:

$$\\text{Необходимый рост для восстановления} = \\frac{D}{100 - D} \\times 100$$

Просадка в 50% требует **100%** прибыли на оставшийся капитал только для возврата к безубыточности.

---

### Риск банкротства (Risk of Ruin)
Вероятность слить счет полностью зависит от процента риска на сделку:

$$\\text{Риск банкротства} = \\left(\\frac{1 - A}{1 + A}\\right)^N$$

Снижение риска с 10% до 1% увеличивает количество допустимых убыточных сделок ($N$) в 10 раз, снижая вероятность полного краха по экспоненте.`
  }
};
