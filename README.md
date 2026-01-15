# 🤖 Exchange USDT Bot

Bot de Telegram que calcula el precio de cambio **USD → VES** usando datos en tiempo real de Binance P2P.

## 📋 Características

- ✅ Consulta precios en tiempo real desde Binance P2P
- 💵 Calcula USD → USDT usando **Zelle** como método de pago
- 💰 Calcula USDT → VES usando **Pago Móvil** o **Mercantil** (mín. 30,000 Bs)
- 📊 Muestra promedios basados en múltiples ofertas
- 🚀 Deploy gratuito en Vercel (serverless)
- ⚡ Respuestas rápidas y formato claro

## 🏗️ Arquitectura

```
USD → USDT (Zelle) → USDT → VES (Pago Móvil/Mercantil)
```

**Ejemplo de cálculo:**
- 1 USD = 1.02 USDT (comprando USDT con USD vía Zelle)
- 1 USDT = 52.50 VES (vendiendo USDT por VES vía Pago Móvil)
- **Resultado:** 1 USD = 51.47 VES

## 🛠️ Stack Tecnológico

- **Runtime:** Node.js 20+
- **Lenguaje:** TypeScript
- **Framework:** Telegraf (bot de Telegram)
- **HTTP Client:** Axios
- **Hosting:** Vercel (Serverless Functions)
- **API:** Binance P2P (pública, sin autenticación)

## 📦 Instalación

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd exchange-usdt-bot
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

Edita el archivo `.env` y agrega tu token de bot:

```env
BOT_TOKEN=your_telegram_bot_token_here
NODE_ENV=development
```

### 4. Obtener un token de bot de Telegram

1. Abre Telegram y busca [@BotFather](https://t.me/BotFather)
2. Envía el comando `/newbot`
3. Sigue las instrucciones para crear tu bot
4. Copia el token que te proporciona BotFather
5. Pégalo en tu archivo `.env`

## 🚀 Uso Local

### Modo desarrollo (con hot reload)

```bash
npm run dev
```

### Compilar y ejecutar

```bash
npm run build
npm start
```

## 📱 Comandos del Bot

| Comando | Descripción |
|---------|-------------|
| `/start` | Mensaje de bienvenida y ayuda |
| `/help` | Muestra información de ayuda |
| `/precio` | Consulta el precio actual USD → VES |
| `/rate` | Alias de `/precio` |

## 🌐 Deploy en Vercel (Gratis)

### 1. Instalar Vercel CLI

```bash
npm install -g vercel
```

### 2. Deploy

```bash
vercel
```

Sigue las instrucciones en pantalla. En el primer deploy, Vercel te pedirá:
- Nombre del proyecto
- Configuración (acepta los valores por defecto)

### 3. Configurar variables de entorno en Vercel

```bash
vercel env add BOT_TOKEN
```

Pega tu token cuando te lo pida.

### 4. Configurar el webhook de Telegram

Una vez deployado, obtendrás una URL como `https://your-project.vercel.app`

Configura el webhook ejecutando:

```bash
curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=https://your-project.vercel.app/api/webhook"
```

Reemplaza:
- `<YOUR_BOT_TOKEN>` con tu token real
- `your-project.vercel.app` con tu URL de Vercel

### 5. Verificar el webhook

```bash
curl "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getWebhookInfo"
```

## 📁 Estructura del Proyecto

```
exchange-usdt-bot/
├── api/
│   └── webhook.ts          # Endpoint de Vercel para webhook
├── src/
│   ├── services/
│   │   ├── binance.ts      # Cliente de Binance P2P API
│   │   └── calculator.ts   # Lógica de cálculo de tasas
│   ├── types/
│   │   └── index.ts        # Tipos TypeScript
│   ├── utils/
│   │   └── formatter.ts    # Formateo de mensajes
│   ├── bot.ts              # Configuración del bot
│   └── index.ts            # Punto de entrada (desarrollo)
├── .env.example            # Ejemplo de variables de entorno
├── .gitignore
├── package.json
├── tsconfig.json
├── vercel.json             # Configuración de Vercel
└── README.md
```

## 🔧 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el bot en modo desarrollo con hot reload |
| `npm run build` | Compila TypeScript a JavaScript |
| `npm start` | Ejecuta el bot compilado |
| `npm run type-check` | Verifica tipos sin compilar |

## 🔍 API de Binance P2P

El bot utiliza la API pública de Binance P2P para obtener precios:

**Endpoint:** `https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search`

**Parámetros de búsqueda:**
- **USD → USDT:**
  - `asset`: "USDT"
  - `fiat`: "USD"
  - `tradeType`: "BUY"
  - `payTypes`: ["Zelle"]

- **USDT → VES:**
  - `asset`: "USDT"
  - `fiat`: "VES"
  - `tradeType`: "SELL"
  - `payTypes`: ["PagoMovil", "Mercantil"]
  - `transAmount`: "30000" (mínimo)

## 💡 Cómo Funciona

1. **Consulta USD → USDT:** Busca las mejores 20 ofertas de compra de USDT con USD usando Zelle
2. **Consulta USDT → VES:** Busca las mejores 20 ofertas de venta de USDT por VES usando Pago Móvil o Mercantil con un mínimo de 30,000 Bs
3. **Calcula el promedio:** Toma el precio promedio de todas las ofertas válidas
4. **Calcula la tasa final:** `1 USD = (1 / usdToUsdt) × usdtToVes VES`
5. **Formatea y envía:** Presenta el resultado de forma clara y legible

## 📝 Notas

- Los precios son referenciales y se basan en promedios de ofertas P2P
- La consulta se realiza en tiempo real cada vez que ejecutas `/precio`
- No requiere autenticación con Binance (API pública)
- Vercel ofrece 100GB de ancho de banda gratis al mes (más que suficiente)
- El bot funciona 24/7 sin necesidad de mantener un servidor

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📄 Licencia

MIT

## 👨‍💻 Autor

Desarrollado con ❤️ usando Claude Code
