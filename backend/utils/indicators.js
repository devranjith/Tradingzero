import { RSI, MACD, EMA } from 'technicalindicators';

export const calculateIndicators = (closes) => {
  const rsi = RSI.calculate({ period: 14, values: closes });
  
  const macd = MACD.calculate({
    values: closes,
    fastPeriod: 12,
    slowPeriod: 26,
    signalPeriod: 9,
    SimpleMAOscillator: false,
    SimpleMASignal: false
  });
  
  const ema20 = EMA.calculate({ period: 20, values: closes });
  const ema50 = EMA.calculate({ period: 50, values: closes });

  return {
    currentRsi: rsi[rsi.length - 1],
    currentMacd: macd[macd.length - 1],
    currentEma20: ema20[ema20.length - 1],
    currentEma50: ema50[ema50.length - 1],
  };
};
