import { getUSDToUSDTRate, getUSDTToVESRate } from './binance.js';
import type { CalculationResult } from '../types/index.js';

/**
 * Calcula el precio de cambio USD → VES pasando por USDT
 * usando datos de P2P de Binance
 */
export async function calculateExchangeRate(): Promise<CalculationResult> {
  try {
    // Obtener ambos rates en paralelo
    const [usdToUsdt, usdtToVes] = await Promise.all([
      getUSDToUSDTRate(),
      getUSDTToVESRate(),
    ]);

    // Calcular el rate final: USD → VES
    // Si 1 USD = X USDT y 1 USDT = Y VES, entonces 1 USD = (1/X) * Y VES
    // Ejemplo: 1 USD = 1.02 USDT, 1 USDT = 52 VES
    // Entonces: 1 USD = (1/1.02) * 52 = 50.98 VES
    const finalRate = (1 / usdToUsdt.rate) * usdtToVes.rate;

    return {
      usdToUsdtRate: usdToUsdt.rate,
      usdToUsdtOffers: usdToUsdt.offerCount,
      usdtToVesRate: usdtToVes.rate,
      usdtToVesOffers: usdtToVes.offerCount,
      finalRate,
      timestamp: new Date(),
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error calculating exchange rate: ${error.message}`);
    }
    throw error;
  }
}
