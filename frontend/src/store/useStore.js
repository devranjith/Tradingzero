import { create } from 'zustand';

const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  
  activeTrades: [],
  setActiveTrades: (trades) => set({ activeTrades: trades }),
  
  tradeHistory: [],
  setTradeHistory: (history) => set({ tradeHistory: history }),
  
  agentStatus: 'idle',
  setAgentStatus: (status) => set({ agentStatus: status }),
}));

export default useStore;
