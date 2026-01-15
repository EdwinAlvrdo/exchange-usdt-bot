import { Telegraf } from 'telegraf';
import { calculateExchangeRate } from './services/calculator.js';
import { formatExchangeRate, formatError, getWelcomeMessage } from './utils/formatter.js';

export function createBot(token: string): Telegraf {
  const bot = new Telegraf(token);

  // Comando /start
  bot.command('start', async (ctx) => {
    await ctx.reply(getWelcomeMessage(), { parse_mode: 'Markdown' });
  });

  // Comando /help
  bot.command('help', async (ctx) => {
    await ctx.reply(getWelcomeMessage(), { parse_mode: 'Markdown' });
  });

  // Comando /precio o /rate
  const priceHandler = async (ctx: any) => {
    try {
      // Enviar mensaje de "cargando"
      const loadingMsg = await ctx.reply('⏳ Consultando precios en Binance P2P...');

      // Calcular el rate
      const result = await calculateExchangeRate();

      // Borrar mensaje de loading y enviar resultado
      await ctx.telegram.deleteMessage(ctx.chat.id, loadingMsg.message_id);
      await ctx.reply(formatExchangeRate(result), { parse_mode: 'Markdown' });
    } catch (error) {
      console.error('Error al consultar precio:', error);
      await ctx.reply(formatError(error), { parse_mode: 'Markdown' });
    }
  };

  bot.command('precio', priceHandler);
  bot.command('rate', priceHandler);

  // Manejo de errores
  bot.catch((err, ctx) => {
    console.error('Error en el bot:', err);
    ctx.reply('Ocurrió un error inesperado. Por favor, intenta nuevamente.');
  });

  return bot;
}
