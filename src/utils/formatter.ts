import type { CalculationResult } from '../types/index.js';

/**
 * Formatea el resultado del cálculo para mostrarlo en Telegram
 */
export function formatExchangeRate(result: CalculationResult): string {
  const date = result.timestamp.toLocaleString('es-VE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Caracas',
  });

  return `
💱 *PRECIO DE CAMBIO USD/VES*

📈 *Tasas individuales:*
💵 USD → USDT (Zelle): $${result.usdToUsdtRate.toFixed(4)}
   📊 Basado en ${result.usdToUsdtOffers} ofertas

💰 USDT → VES (PM/Mercantil): ${result.usdtToVesRate.toFixed(2)} Bs
   📊 Basado en ${result.usdtToVesOffers} ofertas

━━━━━━━━━━━━━━━━━━━

🎯 *RESULTADO FINAL:*
*1 USD = ${result.finalRate.toFixed(2)} Bs*

━━━━━━━━━━━━━━━━━━━

🕐 Actualizado: ${date}
📍 Fuente: Binance P2P

_Nota: Este es un precio referencial basado en el promedio de ofertas P2P de Binance._
  `.trim();
}

/**
 * Mensaje de bienvenida del bot
 */
export function getWelcomeMessage(): string {
  return `
¡Hola! 👋

Soy un bot que calcula el precio de cambio *USD → VES* usando datos reales de Binance P2P.

🔄 *Cómo funciono:*

1️⃣ Busco el promedio de compra de *USD → USDT* usando *Zelle*
2️⃣ Busco el promedio de venta de *USDT → VES* usando *Pago Móvil* o *Mercantil* (mín. 30,000 Bs)
3️⃣ Calculo el precio final de *USD → VES*

📱 *Comandos disponibles:*
/precio - Consultar el precio actual
/rate - Mismo que /precio
/help - Ver esta ayuda

_Los precios se actualizan en tiempo real desde Binance P2P._
  `.trim();
}

/**
 * Mensaje de error formateado
 */
export function formatError(error: unknown): string {
  const message = error instanceof Error ? error.message : 'Error desconocido';
  return `
❌ *Error al consultar el precio*

${message}

Por favor, intenta nuevamente en unos segundos.
  `.trim();
}
