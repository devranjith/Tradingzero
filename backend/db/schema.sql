-- Users table (extends Supabase auth)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  total_profit NUMERIC DEFAULT 0,
  win_rate NUMERIC DEFAULT 0,
  active_trades_count INTEGER DEFAULT 0
);

-- Paper Trades table
CREATE TABLE IF NOT EXISTS public.paper_trades (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) NOT NULL,
  symbol TEXT NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('BUY', 'SELL')),
  entry_price NUMERIC NOT NULL,
  exit_price NUMERIC,
  quantity NUMERIC NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'CLOSED')),
  profit_loss NUMERIC DEFAULT 0,
  stop_loss NUMERIC,
  take_profit NUMERIC,
  ai_confidence NUMERIC,
  ai_reason TEXT,
  opened_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  closed_at TIMESTAMP WITH TIME ZONE
);

-- AI Logs table
CREATE TABLE IF NOT EXISTS public.ai_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  symbol TEXT NOT NULL,
  prompt TEXT NOT NULL,
  response TEXT NOT NULL,
  action_recommended TEXT,
  confidence NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Market Snapshots table (for historical testing/viewing)
CREATE TABLE IF NOT EXISTS public.market_snapshots (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  symbol TEXT NOT NULL,
  price NUMERIC NOT NULL,
  rsi_14 NUMERIC,
  macd_line NUMERIC,
  macd_signal NUMERIC,
  macd_hist NUMERIC,
  ema_20 NUMERIC,
  ema_50 NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security (RLS) setup

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.paper_trades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_snapshots ENABLE ROW LEVEL SECURITY;

-- Policies for users
CREATE POLICY "Users can view their own profile."
  ON public.users FOR SELECT
  USING ( auth.uid() = id );

CREATE POLICY "Users can update their own profile."
  ON public.users FOR UPDATE
  USING ( auth.uid() = id );

-- Policies for paper_trades
CREATE POLICY "Users can view their own trades."
  ON public.paper_trades FOR SELECT
  USING ( auth.uid() = user_id );

CREATE POLICY "Users can insert their own trades."
  ON public.paper_trades FOR INSERT
  WITH CHECK ( auth.uid() = user_id );

CREATE POLICY "Users can update their own trades."
  ON public.paper_trades FOR UPDATE
  USING ( auth.uid() = user_id );

-- Public read access for AI logs and market snapshots (optional, can be restricted to authenticated users)
CREATE POLICY "Anyone can view AI logs."
  ON public.ai_logs FOR SELECT
  USING ( true );

CREATE POLICY "Anyone can view market snapshots."
  ON public.market_snapshots FOR SELECT
  USING ( true );
