# 🚀 Guía Rápida de Inicio

## ⚡ Configuración en 5 minutos

### 1️⃣ Crear tu bot en Telegram

1. Abre Telegram y busca **@BotFather**
2. Envía: `/newbot`
3. Escoge un nombre: ej. `USD VES Exchange Bot`
4. Escoge un username: ej. `usdves_exchange_bot`
5. **Copia el token** que te da (algo como `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`)

### 2️⃣ Configurar el proyecto

```bash
# Crear archivo .env
cp .env.example .env
```

Edita `.env` y pega tu token:
```env
BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
NODE_ENV=development
```

### 3️⃣ Ejecutar localmente

```bash
npm run dev
```

✅ Ahora abre Telegram y busca tu bot. Envía `/start` para probarlo!

---

## 🌐 Deploy en Vercel (GRATIS)

### 1️⃣ Crear cuenta en Vercel

Ve a [vercel.com](https://vercel.com) y crea una cuenta gratis (puedes usar GitHub).

### 2️⃣ Instalar Vercel CLI

```bash
npm install -g vercel
```

### 3️⃣ Hacer login

```bash
vercel login
```

### 4️⃣ Deploy

```bash
vercel
```

Responde las preguntas:
- **Set up and deploy?** → Yes
- **Which scope?** → Tu cuenta
- **Link to existing project?** → No
- **What's your project's name?** → exchange-usdt-bot (o el que quieras)
- **In which directory is your code located?** → ./ (presiona Enter)

Vercel te dará una URL como: `https://exchange-usdt-bot-xxx.vercel.app`

### 5️⃣ Agregar variable de entorno en Vercel

```bash
vercel env add BOT_TOKEN
```

Cuando te pregunte:
- **What's the value?** → Pega tu token
- **Expose variable to?** → Production, Preview, Development (selecciona todos)

### 6️⃣ Deploy producción

```bash
vercel --prod
```

### 7️⃣ Configurar webhook

Reemplaza `YOUR_TOKEN` y `YOUR_VERCEL_URL` con tus valores reales:

```bash
curl -X POST "https://api.telegram.org/botYOUR_TOKEN/setWebhook?url=https://YOUR_VERCEL_URL/api/webhook"
```

**Ejemplo:**
```bash
curl -X POST "https://api.telegram.org/bot1234567890:ABCdefGHIjklMNOpqrsTUVwxyz/setWebhook?url=https://exchange-usdt-bot-xxx.vercel.app/api/webhook"
```

### 8️⃣ Verificar

```bash
curl "https://api.telegram.org/botYOUR_TOKEN/getWebhookInfo"
```

Deberías ver:
```json
{
  "ok": true,
  "result": {
    "url": "https://exchange-usdt-bot-xxx.vercel.app/api/webhook",
    "has_custom_certificate": false,
    "pending_update_count": 0
  }
}
```

---

## ✅ ¡Listo!

Tu bot ahora está funcionando 24/7 en Vercel de forma **completamente gratuita**.

### 📱 Prueba tu bot

1. Abre Telegram
2. Busca tu bot por el username que elegiste
3. Envía `/start` o `/precio`

---

## 🆘 Problemas Comunes

### El bot no responde en Vercel

1. Verifica que el webhook esté configurado:
   ```bash
   curl "https://api.telegram.org/botYOUR_TOKEN/getWebhookInfo"
   ```

2. Revisa los logs en Vercel:
   ```bash
   vercel logs
   ```

### Error "BOT_TOKEN no está definido"

1. Asegúrate de haber agregado la variable en Vercel:
   ```bash
   vercel env add BOT_TOKEN
   ```

2. Vuelve a hacer deploy:
   ```bash
   vercel --prod
   ```

### El bot funciona local pero no en Vercel

1. Asegúrate de que el webhook apunte a `/api/webhook`:
   ```
   https://tu-proyecto.vercel.app/api/webhook
   ```

2. No debe haber un webhook configurado localmente al mismo tiempo

---

## 📞 Comandos del Bot

- `/start` - Mensaje de bienvenida
- `/help` - Ayuda
- `/precio` o `/rate` - Consultar precio USD → VES

---

¡Disfruta tu bot! 🎉
