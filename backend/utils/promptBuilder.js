export const buildMarketPrompt = (symbol, price, indicators) => {
  return `
Analyze the following live market data for ${symbol}.
Current Price: $${price}

Technical Indicators:
- RSI (14): ${indicators.currentRsi.toFixed(2)}
- MACD Line: ${indicators.currentMacd.MACD.toFixed(2)}
- MACD Signal: ${indicators.currentMacd.signal.toFixed(2)}
- MACD Histogram: ${indicators.currentMacd.histogram.toFixed(2)}
- EMA 20: $${indicators.currentEma20.toFixed(2)}
- EMA 50: $${indicators.currentEma50.toFixed(2)}

Trading Rules:
1. Only recommend BUY if RSI < 35 (Oversold territory) OR if MACD shows a strong bullish crossover while price is above EMA 20.
2. Only recommend SELL if RSI > 70 (Overbought territory) OR if MACD shows a strong bearish crossover while price is below EMA 20.
3. If neither condition is strongly met, recommend HOLD.

Provide a JSON response with your recommendation.
  `;
};
