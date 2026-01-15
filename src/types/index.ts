export interface BinanceP2POffer {
  adv: {
    price: string;
    tradableQuantity: string;
    minSingleTransAmount: string;
    maxSingleTransAmount: string;
  };
  advertiser: {
    nickName: string;
    monthOrderCount: number;
    monthFinishRate: number;
  };
}

export interface BinanceP2PResponse {
  code: string;
  message: string | null;
  messageDetail: string | null;
  data: BinanceP2POffer[];
  total: number;
  success: boolean;
}

export interface ExchangeRate {
  usdToUsdt: number;
  usdtToVes: number;
  usdToVes: number;
  timestamp: Date;
}

export interface CalculationResult {
  usdToUsdtRate: number;
  usdToUsdtOffers: number;
  usdtToVesRate: number;
  usdtToVesOffers: number;
  finalRate: number;
  timestamp: Date;
}
