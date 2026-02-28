'use client';

import { useState, useEffect } from 'react';
import { 
  Save, Plus, Trash2, ChevronDown, ChevronUp, ImageIcon, 
  FileText, Settings, LayoutTemplate, Bold, Italic, 
  Heading3, Quote, Code, Tag 
} from 'lucide-react';

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [openSection, setOpenSection] = useState<string>('docs'); 
  const [openDocIndex, setOpenDocIndex] = useState<number | null>(null);

  // 🚀 File Upload Engine State
  const [uploadingState, setUploadingState] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error("Failed to fetch data:", err));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/content', {
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
      type: "Drafts",
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      readTime: "5 min read",
      coverImage: "",
      pdfUrl: "",
      content: ["Start writing your architecture breakdown here..."]
    };
    setData({ ...data, docs: [newDoc, ...data.docs] });
    setOpenDocIndex(0); 
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
      newDocs[index][field] = value.split('\n\n');
    } else {
      newDocs[index][field] = value;
    }
    setData({ ...data, docs: newDocs });
  };

  // 🚀 The File Upload Engine
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldPath: string, docIndex?: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show loading state for this specific input
    setUploadingState(prev => ({ ...prev, [fieldPath]: true }));

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const responseData = await res.json();
      
      if (responseData.url) {
        // If it's a document update
        if (docIndex !== undefined) {
          updateDoc(docIndex, fieldPath, responseData.url);
        } 
        // If it's a global site update (DP, Hero Cover)
        else {
          const keys = fieldPath.split('.'); // e.g., 'site.dpUrl'
          setData({
            ...data,
            [keys[0]]: { ...data[keys[0]], [keys[1]]: responseData.url }
          });
        }
      }
    } catch (err) {
      console.error("Upload failed", err);
      alert("Failed to upload file.");
    } finally {
      setUploadingState(prev => ({ ...prev, [fieldPath]: false }));
    }
  };

  if (!data) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7] text-zinc-400 uppercase tracking-widest text-xs">
      Loading Command Center...
    </div>
  );

  if (data.error) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f5f7] text-red-500 font-mono text-sm px-6 text-center gap-4">
      <span className="font-bold text-lg uppercase tracking-widest">Database Error</span>
      {data.error}
    </div>
  );

  if (!data.docs) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7] text-red-500 font-mono text-sm">
      Data Room is missing from portfolio.json!
    </div>
  );

  // 🚀 MAGIC TAGS: Extract every unique category from your database
  const allCategories = Array.from(new Set(data.docs.map((doc: any) => doc.type))).filter(Boolean) as string[];

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
              <div>
                <label className="block text-[10px] text-zinc-500 mb-2 uppercase tracking-widest">Contact Email</label>
                <input className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-zinc-400" value={data.contact.email} onChange={e => setData({...data, contact: {...data.contact, email: e.target.value}})} />
              </div>
              
              {/* DP Uploader */}
              <div>
                <label className="flex items-center gap-2 text-[10px] text-zinc-500 mb-2 uppercase tracking-widest"><ImageIcon size={12}/> Display Picture</label>
                <div className="flex items-center gap-4 p-3 bg-zinc-50 border border-zinc-200 rounded-lg">
                  {data.site.dpUrl && <img src={data.site.dpUrl} alt="DP" className="w-8 h-8 rounded-full object-cover shadow-sm" />}
                  <input type="file" accept="image/*" onChange={e => handleFileUpload(e, 'site.dpUrl')} className="text-xs text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-zinc-200 file:text-zinc-700 hover:file:bg-zinc-300 transition-all cursor-pointer w-full" />
                  {uploadingState['site.dpUrl'] && <span className="text-xs text-zinc-400 animate-pulse whitespace-nowrap">Uploading...</span>}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. ABOUT PAGE ACCORDION */}
        <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
          <button 
            onClick={() => setOpenSection(openSection === 'about' ? '' : 'about')}
            className="w-full flex justify-between items-center p-6 bg-zinc-50/50 hover:bg-zinc-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <FileText size={18} className="text-zinc-400" />
              <h2 className="text-sm font-semibold tracking-wide text-zinc-900 uppercase">About Page Content</h2>
            </div>
            {openSection === 'about' ? <ChevronUp size={18} className="text-zinc-400"/> : <ChevronDown size={18} className="text-zinc-400"/>}
          </button>
          
          {openSection === 'about' && (
            <div className="p-6 grid gap-6 border-t border-zinc-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] text-zinc-500 mb-2 uppercase tracking-widest">Page Heading</label>
                  <input className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-zinc-400" value={data.about.heading} onChange={e => setData({...data, about: {...data.about, heading: e.target.value}})} />
                </div>
                <div>
                  <label className="block text-[10px] text-zinc-500 mb-2 uppercase tracking-widest">Location</label>
                  <input className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-zinc-400" value={data.about.location} onChange={e => setData({...data, about: {...data.about, location: e.target.value}})} />
                </div>
              </div>
              <div>
                <label className="block text-[10px] text-zinc-500 mb-2 uppercase tracking-widest">Origin Narrative</label>
                <textarea className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-sm h-32 resize-none focus:outline-none focus:border-zinc-400" value={data.about.originText} onChange={e => setData({...data, about: {...data.about, originText: e.target.value}})} />
              </div>
              <div>
                <label className="block text-[10px] text-zinc-500 mb-2 uppercase tracking-widest">Current Focus</label>
                <textarea className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-sm h-32 resize-none focus:outline-none focus:border-zinc-400" value={data.about.focusText} onChange={e => setData({...data, about: {...data.about, focusText: e.target.value}})} />
              </div>
            </div>
          )}
        </div>

        {/* 4. HERO SECTION ACCORDION */}
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
              
              {/* Hero Wallpaper Uploader */}
              <div>
                <label className="flex items-center gap-2 text-[10px] text-zinc-500 mb-2 uppercase tracking-widest"><ImageIcon size={12}/> Laptop Wallpaper</label>
                <div className="flex items-center gap-4 p-3 bg-zinc-50 border border-zinc-200 rounded-lg">
                  {data.hero.coverImage && <img src={data.hero.coverImage} alt="Hero Cover" className="w-16 h-10 rounded object-cover shadow-sm" />}
                  <input type="file" accept="image/*" onChange={e => handleFileUpload(e, 'hero.coverImage')} className="text-xs text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-zinc-200 file:text-zinc-700 hover:file:bg-zinc-300 transition-all cursor-pointer w-full" />
                  {uploadingState['hero.coverImage'] && <span className="text-xs text-zinc-400 animate-pulse whitespace-nowrap">Uploading...</span>}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 5. DATA ROOM ACCORDION */}
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
              <div className="divide-y divide-zinc-100">
                {data.docs.map((doc: any, index: number) => (
                  <div key={doc.id} className="flex flex-col">
                    
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

                    {openDocIndex === index && (
                      <div className="p-6 bg-zinc-50 border-t border-zinc-100 grid gap-6">
                        
                        {/* Title and ID Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-[10px] text-zinc-500 mb-2 uppercase tracking-widest">Document Title</label>
                            <input className="w-full p-3 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-zinc-400" value={doc.title} onChange={e => updateDoc(index, 'title', e.target.value)} />
                          </div>
                          <div>
                            <label className="block text-[10px] text-zinc-500 mb-2 uppercase tracking-widest">URL Slug (ID)</label>
                            <input className="w-full p-3 bg-white border border-zinc-200 rounded-lg text-sm font-mono focus:outline-none focus:border-zinc-400" value={doc.id} onChange={e => updateDoc(index, 'id', e.target.value)} />
                          </div>
                        </div>

                        {/* The Dynamic Tag Builder */}
                        <div className="p-5 bg-white border border-zinc-200 rounded-xl shadow-sm">
                          <label className="flex items-center gap-2 text-[10px] text-zinc-500 mb-4 uppercase tracking-widest">
                            <Tag size={12} /> Category / Tag Builder
                          </label>
                          
                          {/* 1. Quick Select Existing Tags */}
                          {allCategories.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-5">
                              {allCategories.map((category: string) => (
                                <button
                                  key={category}
                                  type="button"
                                  onClick={() => updateDoc(index, 'type', category)}
                                  className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border transition-all ${
                                    doc.type === category 
                                      ? 'bg-zinc-900 text-white border-zinc-900 shadow-md scale-105' 
                                      : 'bg-zinc-50 text-zinc-500 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900'
                                  }`}
                                >
                                  {category}
                                </button>
                              ))}
                            </div>
                          )}

                          {/* 2. Create Custom Tag Input */}
                          <div className="flex items-center gap-3">
                            <input 
                              className="flex-1 p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-zinc-400 focus:bg-white transition-colors"
                              value={doc.type}
                              placeholder="Type a new tag to instantly create and assign it..."
                              onChange={e => updateDoc(index, 'type', e.target.value)}
                            />
                          </div>
                        </div>
                        
                        {/* File Uploaders (Cover Image & PDF) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Image Upload */}
                          <div>
                            <label className="block text-[10px] text-zinc-500 mb-2 uppercase tracking-widest">Cover Image</label>
                            <div className="flex flex-col gap-3 p-3 bg-white border border-zinc-200 rounded-lg h-full justify-center">
                              {doc.coverImage && <img src={doc.coverImage} className="w-full h-24 object-cover rounded-md shadow-sm border border-zinc-100" />}
                              <input type="file" accept="image/*" onChange={e => handleFileUpload(e, 'coverImage', index)} className="text-xs text-zinc-500 file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-semibold file:bg-zinc-200 file:text-zinc-700 hover:file:bg-zinc-300 cursor-pointer" />
                              {uploadingState['coverImage'] && <span className="text-xs text-zinc-400 animate-pulse">Uploading Image...</span>}
                            </div>
                          </div>

                          {/* PDF Upload */}
                          <div>
                            <label className="block text-[10px] text-zinc-500 mb-2 uppercase tracking-widest">Embed PDF Document</label>
                            <div className="flex flex-col gap-3 p-3 bg-white border border-zinc-200 rounded-lg h-full justify-center">
                              {doc.pdfUrl && <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-md border border-emerald-100 truncate w-full text-center">PDF Attached: {doc.pdfUrl.split('/').pop()}</span>}
                              <input type="file" accept="application/pdf" onChange={e => handleFileUpload(e, 'pdfUrl', index)} className="text-xs text-zinc-500 file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-semibold file:bg-zinc-200 file:text-zinc-700 hover:file:bg-zinc-300 cursor-pointer" />
                              {uploadingState['pdfUrl'] && <span className="text-xs text-zinc-400 animate-pulse">Uploading PDF...</span>}
                            </div>
                          </div>
                        </div>

                        {/* THE ZEN EDITOR & TYPE TOOLKIT */}
                        <div className="flex flex-col gap-3 mt-4">
                          <label className="block text-[10px] text-zinc-500 uppercase tracking-widest flex justify-between items-end">
                            <span>Document Body</span>
                            <span className="text-zinc-400 normal-case tracking-normal">Markdown supported. Separate paragraphs with Enter.</span>
                          </label>
                          
                          <div className="border border-zinc-200 rounded-xl overflow-hidden bg-white focus-within:border-zinc-400 focus-within:ring-4 focus-within:ring-zinc-100 transition-all duration-300 shadow-sm">
                            
                            {/* The Glass Toolkit */}
                            <div className="flex items-center gap-1 p-2 bg-zinc-50/80 border-b border-zinc-100 backdrop-blur-md">
                              <button 
                                type="button"
                                title="Section Header"
                                onClick={() => updateDoc(index, 'content', (Array.isArray(doc.content) ? doc.content.join('\n\n') : doc.content) + '\n\n### ')} 
                                className="p-2 hover:bg-zinc-200 rounded-md text-zinc-500 hover:text-zinc-900 transition-all"
                              >
                                <Heading3 size={16}/>
                              </button>
                              <div className="w-px h-4 bg-zinc-200 mx-1"></div>
                              <button 
                                type="button"
                                title="Bold"
                                onClick={() => updateDoc(index, 'content', (Array.isArray(doc.content) ? doc.content.join('\n\n') : doc.content) + '**Bold Text**')} 
                                className="p-2 hover:bg-zinc-200 rounded-md text-zinc-500 hover:text-zinc-900 transition-all"
                              >
                                <Bold size={16}/>
                              </button>
                              <button 
                                type="button"
                                title="Italic"
                                onClick={() => updateDoc(index, 'content', (Array.isArray(doc.content) ? doc.content.join('\n\n') : doc.content) + '*Italic Text*')} 
                                className="p-2 hover:bg-zinc-200 rounded-md text-zinc-500 hover:text-zinc-900 transition-all"
                              >
                                <Italic size={16}/>
                              </button>
                              <div className="w-px h-4 bg-zinc-200 mx-1"></div>
                              <button 
                                type="button"
                                title="Blockquote"
                                onClick={() => updateDoc(index, 'content', (Array.isArray(doc.content) ? doc.content.join('\n\n') : doc.content) + '\n\n> ')} 
                                className="p-2 hover:bg-zinc-200 rounded-md text-zinc-500 hover:text-zinc-900 transition-all"
                              >
                                <Quote size={16}/>
                              </button>
                              <button 
                                type="button"
                                title="Code Snippet"
                                onClick={() => updateDoc(index, 'content', (Array.isArray(doc.content) ? doc.content.join('\n\n') : doc.content) + ' `code` ')} 
                                className="p-2 hover:bg-zinc-200 rounded-md text-zinc-500 hover:text-zinc-900 transition-all"
                              >
                                <Code size={16}/>
                              </button>
                            </div>

                            {/* The Auto-Expanding Canvas */}
                            <textarea 
                              className="w-full p-6 bg-transparent text-sm min-h-[300px] focus:outline-none resize-y leading-relaxed text-zinc-700 font-serif placeholder:font-sans placeholder:text-zinc-300 selection:bg-zinc-200" 
                              placeholder="Start writing your architectural breakdown..."
                              value={Array.isArray(doc.content) ? doc.content.join('\n\n') : doc.content} 
                              onChange={(e) => {
                                e.target.style.height = 'auto';
                                e.target.style.height = e.target.scrollHeight + 'px';
                                updateDoc(index, 'content', e.target.value);
                              }} 
                            />
                          </div>
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