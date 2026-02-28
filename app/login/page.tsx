'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // We send the password to a tiny API to set a secure cookie
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push('/admin');
      router.refresh(); // Clear the middleware cache
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f5f5f7] px-6">
      <div className="glass-panel w-full max-w-sm rounded-[2.5rem] p-10 text-center shadow-2xl border border-white/60 bg-white/30 backdrop-blur-xl">
        <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Lock size={20} className="text-white" />
        </div>
        
        <h1 className="text-xl font-semibold text-zinc-900 mb-2">Command Center</h1>
        <p className="text-xs text-zinc-400 uppercase tracking-widest mb-8">Authorization Required</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            placeholder="Enter Master Password"
            className={`w-full p-4 bg-white/60 border ${error ? 'border-red-300' : 'border-zinc-200'} rounded-2xl text-sm text-center focus:outline-none focus:border-zinc-400 transition-all shadow-sm`}
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
          />
          <button className="w-full bg-zinc-900 text-white py-4 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-zinc-700 transition-all shadow-md">
            Unlock System
          </button>
        </form>
      </div>
    </main>
  );
}