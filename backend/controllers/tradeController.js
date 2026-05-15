import { supabase } from '../services/supabaseService.js';

export const getTradeHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const { data, error } = await supabase
      .from('paper_trades')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'CLOSED')
      .order('closed_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getActiveTrades = async (req, res) => {
  try {
    const { userId } = req.params;
    const { data, error } = await supabase
      .from('paper_trades')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'OPEN')
      .order('opened_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const closeTrade = async (req, res) => {
  try {
    const { tradeId } = req.params;
    const { exitPrice } = req.body;
    
    // In a real app, fetch the current price if exitPrice isn't provided.
    // Also, verify the user owns this trade.

    const { data: trade, error: fetchError } = await supabase
      .from('paper_trades')
      .select('*')
      .eq('id', tradeId)
      .single();

    if (fetchError) throw fetchError;

    const profitLoss = trade.action === 'BUY' 
      ? (exitPrice - trade.entry_price) * trade.quantity
      : (trade.entry_price - exitPrice) * trade.quantity;

    const { data, error } = await supabase
      .from('paper_trades')
      .update({
        status: 'CLOSED',
        exit_price: exitPrice,
        profit_loss: profitLoss,
        closed_at: new Date().toISOString()
      })
      .eq('id', tradeId)
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
