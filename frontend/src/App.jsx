import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0a0a0f] text-gray-100 flex">
        <Sidebar />
        <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
          <div className="max-w-7xl mx-auto">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Overview</h1>
              <p className="text-gray-400">Welcome back! Here's how your AI agent is performing.</p>
            </header>
            
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/history" element={<div className="p-4 glass rounded-2xl text-center text-gray-400">Full trade history coming soon...</div>} />
              <Route path="/logs" element={<div className="p-4 glass rounded-2xl text-center text-gray-400">AI reasoning logs coming soon...</div>} />
              <Route path="/settings" element={<div className="p-4 glass rounded-2xl text-center text-gray-400">Strategy settings coming soon...</div>} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
