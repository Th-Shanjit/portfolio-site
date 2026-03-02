'use client';

import { useState, useEffect } from 'react';
import { 
  Save, Plus, Trash2, ChevronDown, ChevronUp, ImageIcon, 
  FileText, Settings, LayoutTemplate, Bold, Italic, 
  Heading3, Quote, Code, Tag, Sparkles, Globe, Eye, EyeOff, 
  CheckCircle2, ExternalLink, ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false); // 🚀 NEW: Success Modal State
  const [openSection, setOpenSection] = useState<string>('docs'); 
  const [openDocIndex, setOpenDocIndex] = useState<number | null>(null);

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
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (res.ok) {
        // 🚀 Trigger the success modal after a short delay for better UX
        setTimeout(() => {
          setSaving(false);
          setShowModal(true);
        }, 800);
      }
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
      published: false,
      views: 0,
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldPath: string, docIndex?: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingState(prev => ({ ...prev, [fieldPath]: true }));
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const responseData = await res.json();
      
      if (responseData.url) {
        if (docIndex !== undefined) {
          updateDoc(docIndex, fieldPath, responseData.url);
        } else {
          const keys = fieldPath.split('.');
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

  const allCategories = Array.from(new Set(data.docs.map((doc: any) => doc.type))).filter(Boolean) as string[];

  return (
    <div className="min-h-screen bg-[#f5f5f7] pb-32 font-sans selection:bg-zinc-300 relative">
      
      {/* 🚀 SUCCESS MODAL OVERLAY */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-zinc-900/10">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-sm w-full shadow-2xl border border-zinc-200 text-center animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-xl font-semibold text-zinc-900 mb-2 tracking-tight">System Updated</h2>
            <p className="text-sm text-zinc-500 font-light mb-8">Your changes have been successfully published to the portfolio database.</p>
            
            <div className="space-y-3">
              <Link 
                href={openDocIndex !== null ? `/docs/${data.docs[openDocIndex].id}` : "/docs"}
                target="_blank"
                className="w-full flex items-center justify-center gap-2 bg-zinc-900 text-white py-4 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-zinc-700 transition-all shadow-md"
              >
                <ExternalLink size={14} /> View Live Content
              </Link>
              <button 
                onClick={() => setShowModal(false)}
                className="w-full py-4 rounded-2xl text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-all"
              >
                Stay in Editor
              </button>
            </div>
          </div>
        </div>
      )}

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
                <label className="block text-[10px] text-zinc-500 mb-2 uppercase tracking-widest">LinkedIn URL</label>
                <input 
                  className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-zinc-400" 
                  placeholder="https://linkedin.com/in/..."
                  value={data.site.linkedinUrl || ''} 
                  onChange={e => setData({...data, site: {...data.site, linkedinUrl: e.target.value}})} 
                />
              </div>
              
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

        {/* 3. INTERACTIVE ROADMAP ACCORDION */}
        <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
          <button 
            onClick={() => setOpenSection(openSection === 'roadmap' ? '' : 'roadmap')}
            className="w-full flex justify-between items-center p-6 bg-zinc-50/50 hover:bg-zinc-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Sparkles size={18} className="text-zinc-400" />
              <h2 className="text-sm font-semibold tracking-wide text-zinc-900 uppercase">Project Roadmap</h2>
            </div>
            {openSection === 'roadmap' ? <ChevronUp size={18} className="text-zinc-400"/> : <ChevronDown size={18} className="text-zinc-400"/>}
          </button>
          
          {openSection === 'roadmap' && (
            <div className="p-6 border-t border-zinc-100">
              <label className="block text-[10px] text-zinc-500 mb-2 uppercase tracking-widest">Roadmap Items (One per line)</label>
              <textarea 
                className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-lg text-sm h-48 font-mono focus:outline-none focus:border-zinc-400"
                placeholder="e.g. Beta testing PaperLoop&#10;Finalizing Recruit-AI logic"
                value={data.roadmap?.join('\n') || ''}
                onChange={(e) => setData({...data, roadmap: e.target.value.split('\n')})}
              />
            </div>
          )}
        </div>

        {/* 4. DATA ROOM ACCORDION */}
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
                        <div className={`w-2 h-2 rounded-full ${doc.published ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-zinc-300'}`}></div>
                        <div>
                          <p className="text-sm font-semibold text-zinc-900">{doc.title}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <p className="text-[10px] tracking-widest uppercase text-zinc-400">
                              {doc.type} • {doc.published ? 'Live' : 'Draft'}
                            </p>
                            <span className="flex items-center gap-1 text-[9px] bg-zinc-100 text-zinc-500 px-1.5 py-0.5 rounded-md font-mono border border-zinc-200" title="Total page views">
                              <Eye size={10} /> {doc.views || 0}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ChevronDown size={16} className={`text-zinc-400 transition-transform ${openDocIndex === index ? 'rotate-180' : ''}`} />
                    </button>

                    {openDocIndex === index && (
                      <div className="p-6 bg-zinc-50 border-t border-zinc-100 grid gap-6">
                        
                        <div className="flex items-center gap-3 p-4 bg-white border border-zinc-200 rounded-xl shadow-sm">
                          {doc.published ? <Eye size={16} className="text-emerald-500" /> : <EyeOff size={16} className="text-zinc-400" />}
                          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                            Visibility: {doc.published ? 'Public' : 'Hidden from Gallery'}
                          </span>
                          <button 
                            onClick={() => updateDoc(index, 'published', !doc.published)}
                            className={`ml-auto px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                              doc.published ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-500 border border-zinc-200 hover:bg-zinc-200'
                            }`}
                          >
                            {doc.published ? 'Unpublish' : 'Go Live'}
                          </button>
                        </div>

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

                        <div className="p-5 bg-white border border-zinc-200 rounded-xl shadow-sm">
                          <label className="flex items-center gap-2 text-[10px] text-zinc-500 mb-4 uppercase tracking-widest">
                            <Tag size={12} /> Category / Tag Builder
                          </label>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {allCategories.map((category: string) => (
                              <button
                                key={category}
                                type="button"
                                onClick={() => updateDoc(index, 'type', category)}
                                className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border transition-all ${
                                  doc.type === category 
                                    ? 'bg-zinc-900 text-white border-zinc-900 shadow-md' 
                                    : 'bg-zinc-50 text-zinc-500 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900'
                                }`}
                              >
                                {category}
                              </button>
                            ))}
                          </div>
                          <input 
                            className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-zinc-400 focus:bg-white transition-colors"
                            value={doc.type}
                            placeholder="Type a new tag..."
                            onChange={e => updateDoc(index, 'type', e.target.value)}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-[10px] text-zinc-500 mb-2 uppercase tracking-widest">Cover Image</label>
                            <div className="flex flex-col gap-3 p-3 bg-white border border-zinc-200 rounded-lg">
                              {doc.coverImage && <img src={doc.coverImage} className="w-full h-24 object-cover rounded-md border border-zinc-100" />}
                              <input type="file" accept="image/*" onChange={e => handleFileUpload(e, 'coverImage', index)} className="text-xs text-zinc-500 file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-semibold file:bg-zinc-200 file:text-zinc-700 hover:file:bg-zinc-300 cursor-pointer" />
                              {uploadingState['coverImage'] && <span className="text-xs text-zinc-400 animate-pulse">Uploading Image...</span>}
                            </div>
                          </div>
                          <div>
                            <label className="block text-[10px] text-zinc-500 mb-2 uppercase tracking-widest">Embed PDF</label>
                            <div className="flex flex-col gap-3 p-3 bg-white border border-zinc-200 rounded-lg h-full justify-center">
                              {doc.pdfUrl && <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-md border border-emerald-100 truncate w-full text-center">Attached: {doc.pdfUrl.split('/').pop()}</span>}
                              <input type="file" accept="application/pdf" onChange={e => handleFileUpload(e, 'pdfUrl', index)} className="text-xs text-zinc-500 file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-semibold file:bg-zinc-200 file:text-zinc-700 hover:file:bg-zinc-300 cursor-pointer" />
                              {uploadingState['pdfUrl'] && <span className="text-xs text-zinc-400 animate-pulse">Uploading PDF...</span>}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 mt-4">
                          <label className="block text-[10px] text-zinc-500 uppercase tracking-widest flex justify-between items-end">
                            <span>Document Body</span>
                            <span className="text-zinc-400 normal-case tracking-normal">Markdown supported.</span>
                          </label>
                          <div className="border border-zinc-200 rounded-xl overflow-hidden bg-white shadow-sm">
                            <div className="flex items-center gap-1 p-2 bg-zinc-50/80 border-b border-zinc-100">
                              <button type="button" onClick={() => updateDoc(index, 'content', (Array.isArray(doc.content) ? doc.content.join('\n\n') : doc.content) + '\n\n### ')} className="p-2 hover:bg-zinc-200 rounded-md text-zinc-500 hover:text-zinc-900"><Heading3 size={16}/></button>
                              <button type="button" onClick={() => updateDoc(index, 'content', (Array.isArray(doc.content) ? doc.content.join('\n\n') : doc.content) + '**Bold**')} className="p-2 hover:bg-zinc-200 rounded-md text-zinc-500 hover:text-zinc-900"><Bold size={16}/></button>
                              <button type="button" onClick={() => updateDoc(index, 'content', (Array.isArray(doc.content) ? doc.content.join('\n\n') : doc.content) + '*Italic*')} className="p-2 hover:bg-zinc-200 rounded-md text-zinc-500 hover:text-zinc-900"><Italic size={16}/></button>
                              <button type="button" onClick={() => updateDoc(index, 'content', (Array.isArray(doc.content) ? doc.content.join('\n\n') : doc.content) + '\n\n> ')} className="p-2 hover:bg-zinc-200 rounded-md text-zinc-500 hover:text-zinc-900"><Quote size={16}/></button>
                              <button type="button" onClick={() => updateDoc(index, 'content', (Array.isArray(doc.content) ? doc.content.join('\n\n') : doc.content) + ' `code` ')} className="p-2 hover:bg-zinc-200 rounded-md text-zinc-500 hover:text-zinc-900"><Code size={16}/></button>
                            </div>
                            <textarea 
                              className="w-full p-6 bg-transparent text-sm min-h-[300px] focus:outline-none resize-y leading-relaxed text-zinc-700 font-serif" 
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
                <button onClick={addDoc} className="w-full py-3 flex items-center justify-center gap-2 text-xs tracking-widest uppercase text-zinc-500 hover:text-zinc-900 font-semibold border-2 border-dashed border-zinc-300 rounded-xl transition-colors">
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