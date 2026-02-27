'use client';

import { useState, useEffect } from 'react';

export default function AdminEditor() {
  const [data, setData] = useState<any>(null);
  const [status, setStatus] = useState('');

  // Load current content from API (reads from data/portfolio.json on the server)
  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  const handleSave = async () => {
    setStatus('Saving...');
    const res = await fetch('/api/content', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (res.ok) setStatus('Saved successfully!');
    else setStatus('Error saving.');
    
    setTimeout(() => setStatus(''), 3000);
  };

  if (!data) return <div className="p-20 text-zinc-400">Loading editor...</div>;

  return (
    <div className="max-w-3xl mx-auto py-20 px-6 font-mono text-sm">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-xl">Internal Content Editor</h1>
        <button 
          onClick={handleSave}
          className="bg-zinc-900 text-white px-6 py-2 hover:bg-zinc-800 transition-colors"
        >
          Publish Changes
        </button>
      </div>

      {status && <div className="mb-8 text-green-600">{status}</div>}

      <div className="space-y-12">
        {/* HERO EDITOR */}
        <section className="bg-zinc-50 p-8 border border-zinc-100">
          <h2 className="mb-6 uppercase tracking-widest text-zinc-400">Hero Section</h2>
          <div className="flex flex-col gap-4">
            <input 
              className="p-3 border border-zinc-200 bg-white"
              value={data.hero.title}
              onChange={(e) => setData({...data, hero: {...data.hero, title: e.target.value}})}
            />
            <textarea 
              className="p-3 border border-zinc-200 bg-white h-32"
              value={data.hero.description}
              onChange={(e) => setData({...data, hero: {...data.hero, description: e.target.value}})}
            />
          </div>
        </section>
        
        {/* You can expand this to map through highlightedProjects and map them to inputs */}
      </div>
    </div>
  );
}