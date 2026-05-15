import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''; // Use service role for backend admin tasks

export const supabase = createClient(supabaseUrl, supabaseKey);

export const logPaperTrade = async (tradeData) => {
  const { data, error } = await supabase
    .from('paper_trades')
    .insert([tradeData])
    .select();
    
  if (error) {
    console.error('Error logging paper trade:', error);
    throw error;
  }
  return data[0];
};

export const logAIResponse = async (logData) => {
  const { error } = await supabase
    .from('ai_logs')
    .insert([logData]);
    
  if (error) {
    console.error('Error logging AI response:', error);
  }
};
