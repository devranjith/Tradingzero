import { getKlines, getCurrentPrice } from '../services/binanceService.js';
import { calculateIndicators } from '../utils/indicators.js';
import { buildMarketPrompt } from '../utils/promptBuilder.js';
import { analyzeMarketWithGemini } from '../services/geminiService.js';
import { logPaperTrade, logAIResponse, supabase } from '../services/supabaseService.js';

const SYMBOL = 'BTCUSDT';
const SYSTEM_USER_ID = '00000000-0000-0000-0000-000000000000'; // Replace with a real user ID or handle per-user logic

export const runTradingCycle = async () => {
  try {
    console.log(`[${new Date().toISOString()}] Starting trading cycle for ${SYMBOL}...`);
    
    // 1. Fetch Market Data
    const klines = await getKlines(SYMBOL, '1m', 100);
    const currentPrice = await getCurrentPrice(SYMBOL);
    
    const closes = klines.map(k => k.close);

    // 2. Calculate Indicators
    const indicators = calculateIndicators(closes);
    
    // 3. Build Prompt
    const prompt = buildMarketPrompt(SYMBOL, currentPrice, indicators);
    
    // 4. Get AI Recommendation
    const aiResponse = await analyzeMarketWithGemini(prompt);
    console.log(`AI Recommendation: ${aiResponse.action} (Confidence: ${aiResponse.confidence}%)`);

    // 5. Log AI reasoning
    await logAIResponse({
      symbol: SYMBOL,
      prompt: prompt,
      response: JSON.stringify(aiResponse),
      action_recommended: aiResponse.action,
      confidence: aiResponse.confidence
    });

    // 6. Validate Trading Rules before Execution
    let shouldTrade = false;
    
    if (aiResponse.confidence >= 70) {
      if (aiResponse.action === 'BUY' && indicators.currentRsi < 35) {
        shouldTrade = true;
      } else if (aiResponse.action === 'SELL' && indicators.currentRsi > 70) {
        shouldTrade = true;
      }
    }

    // Since it's a mock paper trading app and we might want to see action, 
    // we can temporarily relax the rules for demonstration purposes if desired.
    // For now, strict rules apply.

    if (shouldTrade) {
      console.log(`Executing ${aiResponse.action} trade!`);
      // Get all users who have active strategy (in a real app)
      // Here, we just log a trade for a system user or handle it
      
      /* 
        Uncomment to actually log trades into Supabase if you have a valid user ID
        
        await logPaperTrade({
          user_id: SYSTEM_USER_ID,
          symbol: SYMBOL,
          action: aiResponse.action,
          entry_price: currentPrice,
          quantity: 0.1, // Fixed quantity for now
          stop_loss: aiResponse.stop_loss,
          take_profit: aiResponse.take_profit,
          ai_confidence: aiResponse.confidence,
          ai_reason: aiResponse.reason
        });
      */
    } else {
      console.log('No trade executed (conditions not met or action is HOLD).');
    }

    return aiResponse;

  } catch (error) {
    console.error('Error in trading cycle:', error);
    throw error;
  }
};
