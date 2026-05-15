import axios from 'axios';

// Public endpoint for Binance klines (candlesticks)
const BINANCE_BASE_URL = 'https://api.binance.com/api/v3';

export const getKlines = async (symbol = 'BTCUSDT', interval = '1m', limit = 100) => {
  try {
    const response = await axios.get(`${BINANCE_BASE_URL}/klines`, {
      params: {
        symbol,
        interval,
        limit
      }
    });

    // Format: [Open time, Open, High, Low, Close, Volume, Close time, Quote asset volume, Number of trades, Taker buy base asset volume, Taker buy quote asset volume, Ignore]
    return response.data.map(kline => ({
      time: kline[0],
      open: parseFloat(kline[1]),
      high: parseFloat(kline[2]),
      low: parseFloat(kline[3]),
      close: parseFloat(kline[4]),
      volume: parseFloat(kline[5])
    }));
  } catch (error) {
    console.error('Error fetching Binance klines:', error.message);
    throw error;
  }
};

export const getCurrentPrice = async (symbol = 'BTCUSDT') => {
  try {
    const response = await axios.get(`${BINANCE_BASE_URL}/ticker/price`, {
      params: { symbol }
    });
    return parseFloat(response.data.price);
  } catch (error) {
    console.error('Error fetching Binance price:', error.message);
    throw error;
  }
};
