import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Telegraf } from 'telegraf';
import { calculateExchangeRate } from '../src/services/calculator.js';
import { formatExchangeRate, formatError, getWelcomeMessage } from '../src/utils/formatter.js';

const BOT_TOKEN = process.env.BOT_TOKEN!;
const bot = new Telegraf(BOT_TOKEN);

// Configurar comandos del bot
bot.command('start', async (ctx) => {
  await ctx.reply(getWelcomeMessage(), { parse_mode: 'Markdown' });
});

bot.command('help', async (ctx) => {
  await ctx.reply(getWelcomeMessage(), { parse_mode: 'Markdown' });
});

const priceHandler = async (ctx: any) => {
  try {
    const loadingMsg = await ctx.reply('⏳ Consultando precios en Binance P2P...');
    const result = await calculateExchangeRate();
    await ctx.telegram.deleteMessage(ctx.chat.id, loadingMsg.message_id);
    await ctx.reply(formatExchangeRate(result), { parse_mode: 'Markdown' });
  } catch (error) {
    console.error('Error al consultar precio:', error);
    await ctx.reply(formatError(error), { parse_mode: 'Markdown' });
  }
};

bot.command('precio', priceHandler);
bot.command('rate', priceHandler);

bot.catch((err, ctx) => {
  console.error('Error en el bot:', err);
  ctx.reply('Ocurrió un error inesperado. Por favor, intenta nuevamente.');
});

// Manejador de webhook para Vercel
export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    if (req.method === 'POST') {
      await bot.handleUpdate(req.body);
      res.status(200).json({ ok: true });
    } else {
      res.status(200).json({ status: 'Bot is running!' });
    }
  } catch (error) {
    console.error('Error processing update:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
