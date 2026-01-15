import axios from 'axios';
import type { BinanceP2PResponse, BinanceP2POffer } from '../types/index.js';

const BINANCE_P2P_API = 'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search';

export interface P2PSearchParams {
  asset: string; // 'USDT', 'BTC', etc.
  fiat: string; // 'USD', 'VES', etc.
  tradeType: 'BUY' | 'SELL';
  payTypes?: string[]; // ['Zelle', 'PagoMovil', 'Mercantil']
  transAmount?: string; // Minimum transaction amount
  rows?: number; // Number of results
}

/**
 * Obtiene ofertas de P2P de Binance
 */
export async function fetchP2POffers(params: P2PSearchParams): Promise<BinanceP2POffer[]> {
  try {
    const payload = {
      asset: params.asset,
      fiat: params.fiat,
      merchantCheck: false,
      page: 1,
      payTypes: params.payTypes || [],
      publisherType: null,
      rows: params.rows || 10,
      tradeType: params.tradeType,
      transAmount: params.transAmount || '',
    };

    const response = await axios.post<BinanceP2PResponse>(BINANCE_P2P_API, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    throw new Error('Invalid response from Binance P2P API');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error fetching P2P offers: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Obtiene el precio promedio de compra USD → USDT usando Zelle
 * con un mínimo de 200 USD
 */
export async function getUSDToUSDTRate(): Promise<{ rate: number; offerCount: number }> {
  const offers = await fetchP2POffers({
    asset: 'USDT',
    fiat: 'USD',
    tradeType: 'BUY',
    payTypes: ['Zelle'],
    transAmount: '200',
    rows: 20,
  });

  if (offers.length === 0) {
    throw new Error('No offers found for USD to USDT');
  }

  // Filtramos ofertas que cumplan con el mínimo de 200 USD
  const validOffers = offers.filter((offer) => {
    const minAmount = parseFloat(offer.adv.minSingleTransAmount);
    return minAmount <= 200;
  });

  if (validOffers.length === 0) {
    throw new Error('No valid offers found for USD to USDT with minimum 200 USD');
  }

  // Calculamos el promedio de los mejores precios
  const prices = validOffers.map((offer) => parseFloat(offer.adv.price));
  const average = prices.reduce((a, b) => a + b, 0) / prices.length;

  return {
    rate: average,
    offerCount: validOffers.length,
  };
}

/**
 * Obtiene el precio promedio de venta USDT → VES usando Pago Móvil o Mercantil
 * con un mínimo de 30000 VES
 */
export async function getUSDTToVESRate(): Promise<{ rate: number; offerCount: number }> {
  const offers = await fetchP2POffers({
    asset: 'USDT',
    fiat: 'VES',
    tradeType: 'SELL',
    payTypes: ['PagoMovil', 'Mercantil'],
    transAmount: '30000',
    rows: 20,
  });

  if (offers.length === 0) {
    throw new Error('No offers found for USDT to VES');
  }

  // Filtramos ofertas que cumplan con el mínimo de 30000 VES
  const validOffers = offers.filter((offer) => {
    const minAmount = parseFloat(offer.adv.minSingleTransAmount);
    return minAmount <= 30000;
  });

  if (validOffers.length === 0) {
    throw new Error('No valid offers found for USDT to VES with minimum 30000 VES');
  }

  const prices = validOffers.map((offer) => parseFloat(offer.adv.price));
  const average = prices.reduce((a, b) => a + b, 0) / prices.length;

  return {
    rate: average,
    offerCount: validOffers.length,
  };
}
