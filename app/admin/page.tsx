'use client';
import { useState, useEffect } from 'react';
import { Plus, Trash2, Save, RefreshCw, Image as ImageIcon, Lock } from 'lucide-react';
import Link from 'next/link';

export default function AdminEditor() {
  // --- AUTHENTICATION STATE ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // --- EDITOR STATE ---
  const [data, setData] = useState<any>(null);
  const [status, setStatus] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Only fetch the data if they are authenticated
    if (isAuthenticated) {
      fetch('/api/content')
        .then((res) => res.json())
        .then((json) => setData(json));
    }
  }, [isAuthenticated]);

  // --- LOGIN HANDLER ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 🔒 Password matches your custom update
    if (passwordInput === 'lifeistender') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect password');
      setPasswordInput('');
    }
  };

  // --- EDITOR HANDLERS ---
  const handleSave = async () => {
    setIsSaving(true);
    setStatus('Saving changes...');
    
    const res = await fetch('/api/content', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (res.ok) setStatus('Changes published successfully!');
    else setStatus('Error saving changes.');
    
    setIsSaving(false);
    setTimeout(() => setStatus(''), 3000);
  };

  const handleDocChange = (index: number, field: string, value: string) => {
    const newDocs = [...data.docs];
    newDocs[index][field] = value;
    setData({ ...data, docs: newDocs });
  };

  const addNewDoc = () => {
    const newDoc = {
      id: `new-doc-${Date.now()}`,
      title: "New Document",
      type: "Project Docs",
      readTime: "5 min read",
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      coverImage: "", 
      content: ["Start typing your content here..."]
    };
    setData({ ...data, docs: [newDoc, ...data.docs] });
  };

  const deleteDoc = (index: number) => {
    if(confirm("Are you sure you want to delete this document?")) {
      const newDocs = data.docs.filter((_: any, i: number) => i !== index);
      setData({ ...data, docs: newDocs });
    }
  };

  // --- UI: LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      // 🚀 Changed "absolute" to "fixed" so it covers the entire browser window
      <div className="min-h-screen flex items-center justify-center font-light text-zinc-900 px-6 bg-white fixed inset-0 z-[100]">
        <form onSubmit={handleLogin} className="w-full max-w-xs flex flex-col items-center animate-in fade-in zoom-in-95 duration-500">
          <Lock size={24} className="text-zinc-300 mb-8" strokeWidth={1} />
          <h1 className="text-2xl tracking-tight mb-8">Admin Access</h1>
          
          <input
            type="password"
            placeholder="Enter password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="w-full p-3 mb-4 bg-zinc-50 border border-zinc-100 text-center text-sm focus:outline-none focus:border-zinc-300 transition-colors placeholder:font-light tracking-widest"
            autoFocus
          />
          
          {authError && <p className="text-xs text-red-500 mb-4 tracking-widest uppercase">{authError}</p>}
          
          <button
            type="submit"
            className="w-full bg-zinc-900 text-white p-3 text-xs tracking-[0.2em] uppercase hover:bg-zinc-800 transition-colors"
          >
            Unlock Editor
          </button>

          <Link href="/" className="mt-12 text-[10px] text-zinc-400 uppercase tracking-[0.2em] hover:text-zinc-900 transition-colors">
            Return to Portfolio
          </Link>
        </form>
      </div>
    );
  }

  // --- UI: LOADING STATE ---
  if (!data) return (
    <div className="min-h-screen flex items-center justify-center text-zinc-400 font-light">
      <RefreshCw className="animate-spin mr-3" size={18} /> Loading Data Engine...
    </div>
  );

  // --- UI: MAIN EDITOR ---
  return (
    <div className="max-w-4xl mx-auto py-32 px-6 font-light text-zinc-900 min-h-screen animate-in fade-in duration-700">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 pb-8 border-b border-zinc-100 sticky top-20 bg-white/80 backdrop-blur-md z-40 py-4">
        <div>
          <h1 className="text-3xl tracking-tight mb-2">Content Editor</h1>
          <p className="text-sm text-zinc-400">Manage your portfolio data directly.</p>
        </div>
        <div className="flex items-center gap-4 mt-6 md:mt-0">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">{status}</span>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-zinc-900 text-white px-6 py-3 text-sm tracking-wide hover:bg-zinc-700 transition-colors disabled:opacity-50"
          >
            <Save size={16} />
            {isSaving ? 'Publishing...' : 'Publish to Site'}
          </button>
        </div>
      </div>

      <div className="space-y-20">
        
        {/* HERO SECTION */}
        <section>
          <h2 className="text-xs uppercase tracking-[0.2em] text-zinc-400 mb-8 border-b border-zinc-100 pb-2">Hero Section</h2>
          <div className="grid gap-6">
            <div>
              <label className="block text-xs text-zinc-500 mb-2 uppercase tracking-widest">Headline</label>
              <input 
                className="w-full p-4 bg-zinc-50 border border-zinc-100 text-lg focus:outline-none focus:border-zinc-300 transition-colors"
                value={data.hero.title}
                onChange={(e) => setData({...data, hero: {...data.hero, title: e.target.value}})}
              />
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-2 uppercase tracking-widest">Description</label>
              <textarea 
                className="w-full p-4 bg-zinc-50 border border-zinc-100 h-32 focus:outline-none focus:border-zinc-300 transition-colors resize-none leading-relaxed"
                value={data.hero.description}
                onChange={(e) => setData({...data, hero: {...data.hero, description: e.target.value}})}
              />
            </div>
          </div>
        </section>

        {/* DOCUMENT MANAGER */}
        <section>
          <div className="flex items-center justify-between mb-8 border-b border-zinc-100 pb-2">
            <h2 className="text-xs uppercase tracking-[0.2em] text-zinc-400">Data Room Documents</h2>
            <button onClick={addNewDoc} className="text-xs flex items-center gap-1 uppercase tracking-widest text-zinc-900 hover:text-zinc-500 transition-colors">
              <Plus size={14} /> Add Document
            </button>
          </div>
          
          <div className="space-y-8">
            {data.docs.map((doc: any, index: number) => (
              <div key={index} className="bg-zinc-50 p-6 border border-zinc-100 relative group">
                <button 
                  onClick={() => deleteDoc(index)}
                  className="absolute top-6 right-6 text-zinc-300 hover:text-red-500 transition-colors"
                  title="Delete Document"
                >
                  <Trash2 size={18} />
                </button>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6 pr-8">
                  <div>
                    <label className="block text-[10px] text-zinc-400 mb-2 uppercase tracking-widest">URL Slug (ID)</label>
                    <input className="w-full p-3 bg-white border border-zinc-100 text-sm focus:outline-none" value={doc.id} onChange={(e) => handleDocChange(index, 'id', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-[10px] text-zinc-400 mb-2 uppercase tracking-widest">Title</label>
                    <input className="w-full p-3 bg-white border border-zinc-100 text-sm focus:outline-none" value={doc.title} onChange={(e) => handleDocChange(index, 'title', e.target.value)} />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2 text-[10px] text-zinc-400 mb-2 uppercase tracking-widest">
                      <ImageIcon size={12} /> Cover Image URL
                    </label>
                    <input 
                      className="w-full p-3 bg-white border border-zinc-100 text-sm focus:outline-none placeholder-zinc-300" 
                      placeholder="e.g., https://example.com/image.jpg OR /images/my-app.jpg"
                      value={doc.coverImage || ''} 
                      onChange={(e) => handleDocChange(index, 'coverImage', e.target.value)} 
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-zinc-400 mb-2 uppercase tracking-widest">Category</label>
                    <select 
                      className="w-full p-3 bg-white border border-zinc-100 text-sm focus:outline-none"
                      value={doc.type}
                      onChange={(e) => handleDocChange(index, 'type', e.target.value)}
                    >
                      {/* THIS IS WHERE THE DROP DOWN CATEGORIES LIVE */}
                      <option value="Project Docs">Project Docs</option>
                      <option value="Case Studies">Case Studies</option>
                      <option value="Legal">Legal</option>
                      
                      {/* 🚀 New Category Added Here! */}
                      <option value="New App Docs">New App Docs</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-zinc-400 mb-2 uppercase tracking-widest">Read Time</label>
                      <input className="w-full p-3 bg-white border border-zinc-100 text-sm focus:outline-none" value={doc.readTime} onChange={(e) => handleDocChange(index, 'readTime', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-[10px] text-zinc-400 mb-2 uppercase tracking-widest">Date</label>
                      <input className="w-full p-3 bg-white border border-zinc-100 text-sm focus:outline-none" value={doc.date} onChange={(e) => handleDocChange(index, 'date', e.target.value)} />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-zinc-400 mb-2 uppercase tracking-widest">
                    Content (Paragraphs separated by line breaks)
                  </label>
                  <textarea 
                    className="w-full p-4 bg-white border border-zinc-100 h-64 focus:outline-none text-sm leading-relaxed"
                    value={doc.content.join('\n\n')}
                    onChange={(e) => {
                      const newContent = e.target.value.split('\n\n');
                      handleDocChange(index, 'content', newContent as any);
                    }}
                    placeholder="Write your documentation here..."
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}