import dotenv from 'dotenv';
import { createBot } from './bot.js';

// Cargar variables de entorno
dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
  throw new Error('BOT_TOKEN no está definido en las variables de entorno');
}

// Crear y lanzar el bot
const bot = createBot(BOT_TOKEN);

// Iniciar el bot
async function main() {
  try {
    console.log('🚀 Iniciando bot de Telegram...');

    // Usar polling en desarrollo
    if (process.env.NODE_ENV !== 'production') {
      bot.launch().then(() => {
        console.log('✅ Bot detenido');
      });
      console.log('✅ Bot iniciado en modo polling (desarrollo)');
      console.log(`📱 Busca @exchange_usdt_ves_bot en Telegram para probarlo`);
    } else {
      // En producción, Vercel manejará el webhook
      console.log('✅ Bot configurado para webhook (producción)');
    }

    // Manejo de señales de terminación
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
  } catch (error) {
    console.error('❌ Error al iniciar el bot:', error);
    process.exit(1);
  }
}

main();

export { bot };
