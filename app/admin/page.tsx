'use client';

import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, ChevronDown, ChevronUp, ImageIcon, FileText, Settings, LayoutTemplate } from 'lucide-react';

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [openSection, setOpenSection] = useState<string>('docs'); // 'site', 'hero', 'docs'
  const [openDocIndex, setOpenDocIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/content') // <--- MUST BE '/api/content'
      .then(res => res.json())
      .then(json => setData(json));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/content', { // <--- MUST BE '/api/content'
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setTimeout(() => setSaving(false), 800);
    } catch (error) {
      console.error('Failed to save', error);
      setSaving(false);
    }
  };

  const addDoc = () => {
    const newDoc = {
      id: `new-doc-${Date.now()}`,
      title: "New Case Study",
      type: "Product Management",
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      readTime: "5 min read",
      coverImage: "",
      content: ["Start writing your architecture breakdown here..."]
    };
    setData({ ...data, docs: [newDoc, ...data.docs] });
    setOpenDocIndex(0); // Open the newly created doc automatically
  };

  const deleteDoc = (index: number) => {
    if (confirm("Are you sure you want to delete this document?")) {
      const newDocs = [...data.docs];
      newDocs.splice(index, 1);
      setData({ ...data, docs: newDocs });
      setOpenDocIndex(null);
    }
  };

  const updateDoc = (index: number, field: string, value: any) => {
    const newDocs = [...data.docs];
    if (field === 'content') {
      // Split textarea by double line breaks to maintain the JSON array structure
      newDocs[index][field] = value.split('\n\n');
    } else {
      newDocs[index][field] = value;
    }
    setData({ ...data, docs: newDocs });
  };

  if (!data) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7] text-zinc-400 uppercase tracking-widest text-xs">
      Loading Command Center...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f5f5f7] pb-32 font-sans selection:bg-zinc-300">
      
      {/* 1. STICKY PUBLISH HEADER */}
      <div className="sticky top-0 z-50 bg-white/70 backdrop-blur-2xl border-b border-zinc-200 shadow-sm px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-zinc-900 text-white rounded-lg flex items-center justify-center shadow-md">
            <Settings size={16} />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-zinc-900 tracking-tight">Command Center</h1>
            <p className="text-[10px] uppercase tracking-widest text-zinc-400">System Architecture</p>
          </div>
        </div>
        
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-zinc-900 text-white px-6 py-2.5 rounded-full text-xs font-medium tracking-wide hover:bg-zinc-700 transition-all shadow-md disabled:opacity-50"
        >
          <Save size={14} />
          {saving ? 'Publishing...' : 'Publish to Site'}
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-12 space-y-6">

        {/* 2. SITE SETTINGS ACCORDION */}
        <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
          <button 
            onClick={() => setOpenSection(openSection === 'site' ? '' : 'site')}
            className="w-full flex justify-between items-center p-6 bg-zinc-50/50 hover:bg-zinc-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Settings size={18} className="text-zinc-400" />
              <h2 className="text-sm font-semibold tracking-wide text-zinc-900 uppercase">Global Settings & Contact</h2>
            </div>
            {openSection === 'site' ? <ChevronUp size={18} className="text-zinc-400"/> : <ChevronDown size={18} className="text-zinc-400"/>}
          </button>
          
          {openSection === 'site' && (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-zinc-100">
              <div>
                <label className="block text-[10px] text-zinc-500 mb-2 uppercase tracking-widest">Site Name</label>
                <input className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-zinc-400" value={data.site.name} onChange={e => setData({...data, site: {...data.site, name: e.target.value}})} />
              </div>
              <div>
                <label className="block text-[10px] text-zinc-500 mb-2 uppercase tracking-widest">Global Role</label>
                <input className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-zinc-400" value={data.site.role} onChange={e => setData({...data, site: {...data.site, role: e.target.value}})} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] text-zinc-500 mb-2 uppercase tracking-widest">Contact Email</label>
                <input className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-zinc-400" value={data.contact.email} onChange={e => setData({...data, contact: {...data.contact, email: e.target.value}})} />
              </div>
            </div>
          )}
        </div>

        {/* 3. HERO SECTION ACCORDION */}
        <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
          <button 
            onClick={() => setOpenSection(openSection === 'hero' ? '' : 'hero')}
            className="w-full flex justify-between items-center p-6 bg-zinc-50/50 hover:bg-zinc-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <LayoutTemplate size={18} className="text-zinc-400" />
              <h2 className="text-sm font-semibold tracking-wide text-zinc-900 uppercase">Hero Laptop Setup</h2>
            </div>
            {openSection === 'hero' ? <ChevronUp size={18} className="text-zinc-400"/> : <ChevronDown size={18} className="text-zinc-400"/>}
          </button>
          
          {openSection === 'hero' && (
            <div className="p-6 grid gap-6 border-t border-zinc-100">
              <div>
                <label className="block text-[10px] text-zinc-500 mb-2 uppercase tracking-widest">Hottest Project Title</label>
                <input className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-zinc-400" value={data.hero.title} onChange={e => setData({...data, hero: {...data.hero, title: e.target.value}})} />
              </div>
              <div>
                <label className="block text-[10px] text-zinc-500 mb-2 uppercase tracking-widest">Short Description (Max 160 chars)</label>
                <textarea className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-sm h-24 resize-none focus:outline-none focus:border-zinc-400" value={data.hero.description} onChange={e => setData({...data, hero: {...data.hero, description: e.target.value}})} />
              </div>
              <div>
                <label className="flex items-center gap-2 text-[10px] text-zinc-500 mb-2 uppercase tracking-widest"><ImageIcon size={12}/> Laptop Wallpaper URL</label>
                <input className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-zinc-400" placeholder="https://..." value={data.hero.coverImage || ''} onChange={e => setData({...data, hero: {...data.hero, coverImage: e.target.value}})} />
              </div>
            </div>
          )}
        </div>

        {/* 4. DATA ROOM ACCORDION (LIST FIRST) */}
        <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
          <button 
            onClick={() => setOpenSection(openSection === 'docs' ? '' : 'docs')}
            className="w-full flex justify-between items-center p-6 bg-zinc-50/50 hover:bg-zinc-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <FileText size={18} className="text-zinc-400" />
              <h2 className="text-sm font-semibold tracking-wide text-zinc-900 uppercase">Data Room (Case Studies)</h2>
            </div>
            {openSection === 'docs' ? <ChevronUp size={18} className="text-zinc-400"/> : <ChevronDown size={18} className="text-zinc-400"/>}
          </button>
          
          {openSection === 'docs' && (
            <div className="border-t border-zinc-100">
              {/* Document List */}
              <div className="divide-y divide-zinc-100">
                {data.docs.map((doc: any, index: number) => (
                  <div key={doc.id} className="flex flex-col">
                    
                    {/* The Row */}
                    <button 
                      onClick={() => setOpenDocIndex(openDocIndex === index ? null : index)}
                      className="flex items-center justify-between p-4 px-6 hover:bg-zinc-50 transition-colors text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-2 h-2 rounded-full ${openDocIndex === index ? 'bg-zinc-900' : 'bg-zinc-300'}`}></div>
                        <div>
                          <p className="text-sm font-semibold text-zinc-900">{doc.title}</p>
                          <p className="text-[10px] tracking-widest uppercase text-zinc-400">{doc.type} • {doc.date}</p>
                        </div>
                      </div>
                      <ChevronDown size={16} className={`text-zinc-400 transition-transform ${openDocIndex === index ? 'rotate-180' : ''}`} />
                    </button>

                    {/* The Editor Suite */}
                    {openDocIndex === index && (
                      <div className="p-6 bg-zinc-50 border-t border-zinc-100 grid gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-[10px] text-zinc-500 mb-2 uppercase tracking-widest">Document Title</label>
                            <input className="w-full p-3 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-zinc-400" value={doc.title} onChange={e => updateDoc(index, 'title', e.target.value)} />
                          </div>
                          <div>
                            <label className="block text-[10px] text-zinc-500 mb-2 uppercase tracking-widest">URL Slug (ID)</label>
                            <input className="w-full p-3 bg-white border border-zinc-200 rounded-lg text-sm font-mono focus:outline-none focus:border-zinc-400" value={doc.id} onChange={e => updateDoc(index, 'id', e.target.value)} />
                          </div>
                          
                          {/* SMART CATEGORY TOGGLE */}
                          <div>
                            <label className="block text-[10px] text-zinc-500 mb-2 uppercase tracking-widest">Domain / Category</label>
                            <select 
                              className="w-full p-3 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-zinc-400 appearance-none"
                              value={doc.type}
                              onChange={e => updateDoc(index, 'type', e.target.value)}
                            >
                              <option value="EdTech">EdTech</option>
                              <option value="FinTech">FinTech</option>
                              <option value="AI/HR">AI/HR</option>
                              <option value="Legal Tech">Legal Tech</option>
                              <option value="Product Management">Product Management</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-[10px] text-zinc-500 mb-2 uppercase tracking-widest">Cover Image URL</label>
                            <input className="w-full p-3 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-zinc-400" placeholder="Optional" value={doc.coverImage || ''} onChange={e => updateDoc(index, 'coverImage', e.target.value)} />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] text-zinc-500 mb-2 uppercase tracking-widest flex justify-between">
                            <span>Document Body</span>
                            <span className="text-zinc-400 lowercase normal-case tracking-normal">Separate paragraphs with a double line break (Enter twice)</span>
                          </label>
                          <textarea 
                            className="w-full p-4 bg-white border border-zinc-200 rounded-lg text-sm h-64 focus:outline-none focus:border-zinc-400 resize-y leading-relaxed" 
                            value={Array.isArray(doc.content) ? doc.content.join('\n\n') : doc.content} 
                            onChange={e => updateDoc(index, 'content', e.target.value)} 
                          />
                        </div>

                        <div className="flex justify-end pt-4 border-t border-zinc-200 mt-2">
                          <button onClick={() => deleteDoc(index)} className="flex items-center gap-2 text-xs text-red-500 hover:text-red-700 font-medium tracking-wide uppercase">
                            <Trash2 size={14} /> Delete Document
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="p-4 bg-zinc-50 border-t border-zinc-200">
                <button onClick={addDoc} className="w-full py-3 flex items-center justify-center gap-2 text-xs tracking-widest uppercase text-zinc-500 hover:text-zinc-900 font-semibold border-2 border-dashed border-zinc-300 rounded-xl hover:border-zinc-400 transition-colors">
                  <Plus size={16} /> Create New Document
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}