'use client';

import { useState, useEffect } from 'react';
import { 
  Save, Plus, Trash2, ChevronDown, ChevronUp, ImageIcon, 
  FileText, Settings, Tag, Eye, EyeOff, 
  CheckCircle2, ExternalLink, LayoutGrid
} from 'lucide-react';
import Link from 'next/link';
import { t } from '@/lib/design';
import RichTextEditor from '@/components/RichTextEditor';

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false); 
  const [openSection, setOpenSection] = useState<string>('docs'); 
  const [openDocIndex, setOpenDocIndex] = useState<number | null>(null);
  const [openProjectIndex, setOpenProjectIndex] = useState<number | null>(null);

  const [uploadingState, setUploadingState] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    fetch('/api/content?t=' + Date.now(), { cache: 'no-store' })
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
        setTimeout(() => {
          setSaving(false);
          setShowModal(true);
        }, 800);
      } else {
        const errorData = await res.json();
        const errorMessage = errorData.error || 'Vercel is Read-Only. Please run locally or set up a Cloud DB.';
        alert(`Failed to save: ${errorMessage}`);
        setSaving(false);
      }
    } catch (error) {
      console.error('Failed to save', error);
      alert('Network error occurred.');
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
    
    setData((prev: any) => ({ ...prev, docs: [newDoc, ...prev.docs] }));
    setOpenSection('docs');
    setOpenDocIndex(0); 
  };

  const deleteDoc = (index: number) => {
    if (confirm("Are you sure you want to delete this document?")) {
      setData((prev: any) => {
        const newDocs = [...prev.docs];
        newDocs.splice(index, 1);
        return { ...prev, docs: newDocs };
      });
      setOpenDocIndex(null);
    }
  };

  const updateDoc = (index: number, field: string, value: any) => {
    setData((prev: any) => {
      if (!prev) return prev;
      const newDocs = [...prev.docs];
      if (field === 'content') {
        newDocs[index][field] = [value];
      } else if (field === 'published') {
        newDocs[index][field] = value;
        newDocs[index]['status'] = value ? 'published' : 'draft';
      } else {
        newDocs[index][field] = value;
      }
      return { ...prev, docs: newDocs };
    });
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
          setData((prev: any) => ({
            ...prev,
            [keys[0]]: { ...prev[keys[0]], [keys[1]]: responseData.url }
          }));
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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: t.bg, color: t.inkMuted, textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: 11, fontFamily: t.mono }}>
      Loading Command Center...
    </div>
  );

  const allCategories = Array.from(new Set(data.docs.map((doc: any) => doc.type))).filter(Boolean) as string[];

  return (
    <div style={{ minHeight: '100vh', background: t.bg, paddingBottom: 128, fontFamily: t.sans, color: t.ink }}>
      
      {/* SUCCESS MODAL OVERLAY */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, backdropFilter: 'blur(8px)', background: 'rgba(28,25,22,0.1)' }}>
          <div style={{ background: t.bgSurface, borderRadius: 24, padding: 40, maxWidth: 380, width: '100%', border: `1px solid ${t.border}`, textAlign: 'center', boxShadow: '0 24px 48px rgba(28,25,22,0.1)' }}>
            <div style={{ width: 64, height: 64, background: '#f0fdf4', color: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <CheckCircle2 size={32} />
            </div>
            <h2 style={{ fontFamily: t.serif, fontSize: 24, fontWeight: 500, color: t.ink, marginBottom: 8 }}>System Updated</h2>
            <p style={{ fontFamily: t.sans, fontSize: 14, color: t.inkMuted, marginBottom: 32 }}>Your changes have been successfully published to the portfolio database.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Link 
                href={openDocIndex !== null ? `/docs/${data.docs[openDocIndex].id}` : "/docs"}
                target="_blank"
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: t.ink, color: t.bg, padding: 16, borderRadius: 12, fontSize: 11, fontFamily: t.mono, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none' }}
              >
                <ExternalLink size={14} /> View Live Content
              </Link>
              <button 
                onClick={() => setShowModal(false)}
                style={{ width: '100%', padding: 16, borderRadius: 12, fontSize: 11, fontFamily: t.mono, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: t.inkMuted, background: 'transparent', border: 'none', cursor: 'pointer' }}
              >
                Stay in Editor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STICKY PUBLISH HEADER */}
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(24px)', borderBottom: `1px solid ${t.borderFaint}`, padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 32, height: 32, background: t.ink, color: t.bg, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Settings size={16} />
          </div>
          <div>
            <h1 style={{ fontFamily: t.serif, fontSize: 16, fontWeight: 500, color: t.ink, margin: 0, lineHeight: 1.2 }}>Command Center</h1>
            <p style={{ fontFamily: t.mono, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: t.inkFaint, margin: '2px 0 0' }}>System Architecture</p>
          </div>
        </div>
        
        <button 
          onClick={handleSave}
          disabled={saving}
          style={{ display: 'flex', alignItems: 'center', gap: 8, background: t.ink, color: t.bg, padding: '10px 24px', borderRadius: 99, fontSize: 12, fontFamily: t.sans, fontWeight: 500, border: 'none', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.5 : 1 }}
        >
          <Save size={14} />
          {saving ? 'Publishing...' : 'Publish to Site'}
        </button>
      </div>

      <div style={{ maxWidth: 896, margin: '48px auto 0', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* SITE SETTINGS ACCORDION */}
        <div style={{ background: t.bgSurface, border: `1px solid ${t.border}`, borderRadius: 16, overflow: 'hidden' }}>
          <button 
            onClick={() => setOpenSection(openSection === 'site' ? '' : 'site')}
            style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 24, background: t.bgMuted, border: 'none', cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Settings size={18} color={t.inkMuted} />
              <h2 style={{ fontFamily: t.serif, fontSize: 16, fontWeight: 500, color: t.ink, margin: 0 }}>Global Settings & About</h2>
            </div>
            {openSection === 'site' ? <ChevronUp size={18} color={t.inkMuted} /> : <ChevronDown size={18} color={t.inkMuted} />}
          </button>
          
          {openSection === 'site' && (
            <div style={{ padding: 24, borderTop: `1px solid ${t.borderFaint}`, display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 10, fontFamily: t.mono, color: t.inkMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Site Name</label>
                  <input style={{ width: '100%', padding: 12, background: t.bgMuted, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 14, fontFamily: t.sans, color: t.ink, outline: 'none' }} value={data.site.name} onChange={e => setData({...data, site: {...data.site, name: e.target.value}})} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 10, fontFamily: t.mono, color: t.inkMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Global Role</label>
                  <input style={{ width: '100%', padding: 12, background: t.bgMuted, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 14, fontFamily: t.sans, color: t.ink, outline: 'none' }} value={data.site.role} onChange={e => setData({...data, site: {...data.site, role: e.target.value}})} />
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 10, fontFamily: t.mono, color: t.inkMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>LinkedIn URL</label>
                  <input 
                    style={{ width: '100%', padding: 12, background: t.bgMuted, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 14, fontFamily: t.sans, color: t.ink, outline: 'none' }}
                    placeholder="https://linkedin.com/in/..."
                    value={data.site.linkedinUrl || ''} 
                    onChange={e => setData({...data, site: {...data.site, linkedinUrl: e.target.value}})} 
                  />
                </div>
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 10, fontFamily: t.mono, color: t.inkMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}><ImageIcon size={12}/> Display Picture</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 12, background: t.bgMuted, border: `1px solid ${t.border}`, borderRadius: 8 }}>
                    {data.site.dpUrl && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <img src={data.site.dpUrl} alt="DP" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
                        <button onClick={() => setData({...data, site: {...data.site, dpUrl: ''}})} style={{ padding: 4, background: 'transparent', color: '#ef4444', border: 'none', cursor: 'pointer' }} title="Remove DP"><Trash2 size={12} /></button>
                      </div>
                    )}
                    <input type="file" accept="image/*" onChange={e => handleFileUpload(e, 'site.dpUrl')} style={{ fontSize: 12, fontFamily: t.sans, color: t.inkMuted }} />
                    {uploadingState['site.dpUrl'] && <span style={{ fontSize: 10, fontFamily: t.mono, color: t.inkMuted, textTransform: 'uppercase' }}>Uploading...</span>}
                  </div>
                </div>
              </div>

              {/* ABOUT SECTION */}
              <div style={{ marginTop: 16, paddingTop: 24, borderTop: `1px solid ${t.borderFaint}` }}>
                <h3 style={{ fontFamily: t.serif, fontSize: 18, color: t.ink, marginBottom: 16 }}>About Section</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 24 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 10, fontFamily: t.mono, color: t.inkMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Heading</label>
                    <input style={{ width: '100%', padding: 12, background: t.bgMuted, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 14, fontFamily: t.sans, color: t.ink, outline: 'none' }} value={data.about?.heading || ''} onChange={e => setData({...data, about: {...data.about, heading: e.target.value}})} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 10, fontFamily: t.mono, color: t.inkMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Subheading</label>
                    <input style={{ width: '100%', padding: 12, background: t.bgMuted, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 14, fontFamily: t.sans, color: t.ink, outline: 'none' }} value={data.about?.subheading || ''} onChange={e => setData({...data, about: {...data.about, subheading: e.target.value}})} />
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', fontSize: 10, fontFamily: t.mono, color: t.inkMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Bio Paragraphs</label>
                  <p style={{ fontSize: 12, fontFamily: t.sans, color: t.inkMuted, marginBottom: 12 }}>Separate paragraphs with double newlines (\n\n).</p>
                  <textarea 
                    style={{ width: '100%', padding: 12, background: t.bgMuted, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 14, fontFamily: t.sans, color: t.ink, outline: 'none', height: 120, resize: 'vertical' }} 
                    value={Array.isArray(data.about?.bio) ? data.about.bio.join('\n\n') : (data.about?.bio || '')} 
                    onChange={e => setData({...data, about: {...data.about, bio: e.target.value.split('\n\n')}})} 
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 24 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 10, fontFamily: t.mono, color: t.inkMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Origin Title</label>
                    <input style={{ width: '100%', padding: 12, background: t.bgMuted, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 14, fontFamily: t.sans, color: t.ink, outline: 'none' }} value={data.about?.originTitle || ''} onChange={e => setData({...data, about: {...data.about, originTitle: e.target.value}})} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 10, fontFamily: t.mono, color: t.inkMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Origin Text</label>
                    <textarea style={{ width: '100%', padding: 12, background: t.bgMuted, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 14, fontFamily: t.sans, color: t.ink, outline: 'none', height: 100, resize: 'vertical' }} value={data.about?.originText || ''} onChange={e => setData({...data, about: {...data.about, originText: e.target.value}})} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 24 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 10, fontFamily: t.mono, color: t.inkMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Focus Title</label>
                    <input style={{ width: '100%', padding: 12, background: t.bgMuted, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 14, fontFamily: t.sans, color: t.ink, outline: 'none' }} value={data.about?.focusTitle || ''} onChange={e => setData({...data, about: {...data.about, focusTitle: e.target.value}})} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 10, fontFamily: t.mono, color: t.inkMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Focus Text</label>
                    <textarea style={{ width: '100%', padding: 12, background: t.bgMuted, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 14, fontFamily: t.sans, color: t.ink, outline: 'none', height: 100, resize: 'vertical' }} value={data.about?.focusText || ''} onChange={e => setData({...data, about: {...data.about, focusText: e.target.value}})} />
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10, fontFamily: t.mono, color: t.inkMuted, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    <span>Experience Timeline</span>
                    <button onClick={() => {
                      const newExp = [...(data.about?.experience || []), { role: 'New Role', company: 'Company', year: 'Year' }];
                      setData({...data, about: {...data.about, experience: newExp}});
                    }} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'transparent', border: 'none', color: t.ink, cursor: 'pointer', fontFamily: t.mono }}>
                      <Plus size={12} /> Add
                    </button>
                  </label>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {data.about?.experience?.map((exp: any, i: number) => (
                      <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', background: t.bgMuted, padding: 12, borderRadius: 8, border: `1px solid ${t.borderFaint}` }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, flex: 1 }}>
                          <input style={{ padding: 8, background: t.bgSurface, border: `1px solid ${t.border}`, borderRadius: 4, fontSize: 13, fontFamily: t.sans }} value={exp.role} placeholder="Role" onChange={e => {
                            const newExp = [...data.about.experience];
                            newExp[i].role = e.target.value;
                            setData({...data, about: {...data.about, experience: newExp}});
                          }} />
                          <input style={{ padding: 8, background: t.bgSurface, border: `1px solid ${t.border}`, borderRadius: 4, fontSize: 13, fontFamily: t.sans }} value={exp.company} placeholder="Company" onChange={e => {
                            const newExp = [...data.about.experience];
                            newExp[i].company = e.target.value;
                            setData({...data, about: {...data.about, experience: newExp}});
                          }} />
                          <input style={{ padding: 8, background: t.bgSurface, border: `1px solid ${t.border}`, borderRadius: 4, fontSize: 13, fontFamily: t.mono }} value={exp.year} placeholder="Year (e.g. 2021 — Present)" onChange={e => {
                            const newExp = [...data.about.experience];
                            newExp[i].year = e.target.value;
                            setData({...data, about: {...data.about, experience: newExp}});
                          }} />
                        </div>
                        <button onClick={() => {
                          const newExp = [...data.about.experience];
                          newExp.splice(i, 1);
                          setData({...data, about: {...data.about, experience: newExp}});
                        }} style={{ padding: 8, background: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 24 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 10, fontFamily: t.mono, color: t.inkMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Location</label>
                    <input style={{ width: '100%', padding: 12, background: t.bgMuted, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 14, fontFamily: t.sans, color: t.ink, outline: 'none' }} value={data.about?.location || ''} onChange={e => setData({...data, about: {...data.about, location: e.target.value}})} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 10, fontFamily: t.mono, color: t.inkMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Education Title</label>
                    <input style={{ width: '100%', padding: 12, background: t.bgMuted, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 14, fontFamily: t.sans, color: t.ink, outline: 'none' }} value={data.about?.educationTitle || ''} onChange={e => setData({...data, about: {...data.about, educationTitle: e.target.value}})} />
                  </div>
                </div>

              </div>
              
              {/* CONTACT SECTION */}
              <div style={{ paddingTop: 24, borderTop: `1px solid ${t.borderFaint}` }}>
                <h3 style={{ fontFamily: t.serif, fontSize: 18, color: t.ink, marginBottom: 16 }}>Contact Section</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 10, fontFamily: t.mono, color: t.inkMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Contact Heading</label>
                    <input style={{ width: '100%', padding: 12, background: t.bgMuted, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 14, fontFamily: t.sans, color: t.ink, outline: 'none' }} value={data.contact?.heading || ''} onChange={e => setData({...data, contact: {...data.contact, heading: e.target.value}})} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 10, fontFamily: t.mono, color: t.inkMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Contact Email</label>
                    <input style={{ width: '100%', padding: 12, background: t.bgMuted, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 14, fontFamily: t.sans, color: t.ink, outline: 'none' }} value={data.contact?.email || ''} onChange={e => setData({...data, contact: {...data.contact, email: e.target.value}})} />
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* HERO SECTION ACCORDION */}
        <div style={{ background: t.bgSurface, border: `1px solid ${t.border}`, borderRadius: 16, overflow: 'hidden' }}>
          <button 
            onClick={() => setOpenSection(openSection === 'hero' ? '' : 'hero')}
            style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 24, background: t.bgMuted, border: 'none', cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <ImageIcon size={18} color={t.inkMuted} />
              <h2 style={{ fontFamily: t.serif, fontSize: 16, fontWeight: 500, color: t.ink, margin: 0 }}>Portfolio Hero Section</h2>
            </div>
            {openSection === 'hero' ? <ChevronUp size={18} color={t.inkMuted} /> : <ChevronDown size={18} color={t.inkMuted} />}
          </button>
          
          {openSection === 'hero' && (
            <div style={{ padding: 24, borderTop: `1px solid ${t.borderFaint}`, display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 10, fontFamily: t.mono, color: t.inkMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Hero Tag</label>
                  <input style={{ width: '100%', padding: 12, background: t.bgMuted, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 14, fontFamily: t.sans, color: t.ink, outline: 'none' }} value={data.hero?.tag || ''} onChange={e => setData({...data, hero: {...data.hero, tag: e.target.value}})} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 10, fontFamily: t.mono, color: t.inkMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Hero Title</label>
                  <input style={{ width: '100%', padding: 12, background: t.bgMuted, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 14, fontFamily: t.sans, color: t.ink, outline: 'none' }} value={data.hero?.title || ''} onChange={e => setData({...data, hero: {...data.hero, title: e.target.value}})} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 10, fontFamily: t.mono, color: t.inkMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Hero Description (Bio on Home)</label>
                <textarea style={{ width: '100%', padding: 12, background: t.bgMuted, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 14, fontFamily: t.sans, color: t.ink, outline: 'none', height: 100, resize: 'vertical' }} value={data.hero?.description || ''} onChange={e => setData({...data, hero: {...data.hero, description: e.target.value}})} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 10, fontFamily: t.mono, color: t.inkMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>CTA Link</label>
                  <input style={{ width: '100%', padding: 12, background: t.bgMuted, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 14, fontFamily: t.mono, color: t.ink, outline: 'none' }} value={data.hero?.link || ''} onChange={e => setData({...data, hero: {...data.hero, link: e.target.value}})} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 10, fontFamily: t.mono, color: t.inkMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>CTA Text</label>
                  <input style={{ width: '100%', padding: 12, background: t.bgMuted, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 14, fontFamily: t.sans, color: t.ink, outline: 'none' }} value={data.hero?.linkText || ''} onChange={e => setData({...data, hero: {...data.hero, linkText: e.target.value}})} />
                </div>
              </div>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 10, fontFamily: t.mono, color: t.inkMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}><ImageIcon size={12}/> Hero Image</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 12, background: t.bgMuted, border: `1px solid ${t.border}`, borderRadius: 8 }}>
                  {data.hero?.coverImage && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <img src={data.hero.coverImage} alt="Hero" style={{ width: 64, height: 40, borderRadius: 4, objectFit: 'cover' }} />
                      <button onClick={() => setData({...data, hero: {...data.hero, coverImage: ''}})} style={{ padding: 4, background: 'transparent', color: '#ef4444', border: 'none', cursor: 'pointer' }}><Trash2 size={14} /></button>
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={e => handleFileUpload(e, 'hero.coverImage')} style={{ fontSize: 12, fontFamily: t.sans, color: t.inkMuted }} />
                  {uploadingState['hero.coverImage'] && <span style={{ fontSize: 10, fontFamily: t.mono, color: t.inkMuted, textTransform: 'uppercase' }}>Uploading...</span>}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* HIGHLIGHTED PROJECTS ACCORDION */}
        <div style={{ background: t.bgSurface, border: `1px solid ${t.border}`, borderRadius: 16, overflow: 'hidden' }}>
          <button 
            onClick={() => setOpenSection(openSection === 'projects' ? '' : 'projects')}
            style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 24, background: t.bgMuted, border: 'none', cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <LayoutGrid size={18} color={t.inkMuted} />
              <h2 style={{ fontFamily: t.serif, fontSize: 16, fontWeight: 500, color: t.ink, margin: 0 }}>Highlighted Projects (Filmstrip)</h2>
            </div>
            {openSection === 'projects' ? <ChevronUp size={18} color={t.inkMuted} /> : <ChevronDown size={18} color={t.inkMuted} />}
          </button>
          
          {openSection === 'projects' && (
            <div style={{ padding: 24, borderTop: `1px solid ${t.borderFaint}`, display: 'flex', flexDirection: 'column', gap: 24 }}>
              <p style={{ fontSize: 12, fontFamily: t.sans, color: t.inkMuted, margin: 0 }}>These projects appear in the filmstrip on the home page. You must use the Document ID (Slug).</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {data.highlightedProjects?.map((proj: any, i: number) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', background: t.bgMuted, padding: 12, borderRadius: 8, border: `1px solid ${t.borderFaint}` }}>
                    <select 
                      style={{ flex: 1, padding: 8, background: t.bgSurface, border: `1px solid ${t.border}`, borderRadius: 4, fontSize: 13, fontFamily: t.sans, color: t.ink, outline: 'none' }}
                      value={proj.id}
                      onChange={e => {
                        const newProj = [...data.highlightedProjects];
                        newProj[i].id = e.target.value;
                        setData({...data, highlightedProjects: newProj});
                      }}
                    >
                      <option value="">Select a document...</option>
                      {data.docs.map((doc: any) => (
                        <option key={doc.id} value={doc.id}>{doc.title} ({doc.id})</option>
                      ))}
                    </select>
                    <button onClick={() => {
                      const newProj = [...data.highlightedProjects];
                      newProj.splice(i, 1);
                      setData({...data, highlightedProjects: newProj});
                    }} style={{ padding: 8, background: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => {
                  const newProj = [...(data.highlightedProjects || []), { id: '' }];
                  setData({...data, highlightedProjects: newProj});
                }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 12, background: t.bgMuted, color: t.inkMuted, border: `1px dashed ${t.border}`, borderRadius: 8, cursor: 'pointer', fontFamily: t.mono, fontSize: 11, textTransform: 'uppercase' }}
              >
                <Plus size={14} /> Add Project to Highlights
              </button>
            </div>
          )}
        </div>

        {/* DATA ROOM ACCORDION */}
        <div style={{ background: t.bgSurface, border: `1px solid ${t.border}`, borderRadius: 16, overflow: 'hidden' }}>
          <button 
            onClick={() => setOpenSection(openSection === 'docs' ? '' : 'docs')}
            style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 24, background: t.bgMuted, border: 'none', cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <FileText size={18} color={t.inkMuted} />
              <h2 style={{ fontFamily: t.serif, fontSize: 16, fontWeight: 500, color: t.ink, margin: 0 }}>Data Room (Case Studies)</h2>
            </div>
            {openSection === 'docs' ? <ChevronUp size={18} color={t.inkMuted} /> : <ChevronDown size={18} color={t.inkMuted} />}
          </button>
          
          {openSection === 'docs' && (
            <div style={{ borderTop: `1px solid ${t.borderFaint}` }}>
              <div>
                {data.docs.map((doc: any, index: number) => (
                <div key={index} style={{ borderBottom: `1px solid ${t.borderFaint}` }}>
                    
                    <button 
                      onClick={() => setOpenDocIndex(openDocIndex === index ? null : index)}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: doc.published ? '#10b981' : t.border }}></div>
                        <div>
                          <p style={{ fontFamily: t.sans, fontSize: 14, fontWeight: 500, color: t.ink, margin: '0 0 2px' }}>{doc.title}</p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <p style={{ fontFamily: t.mono, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: t.inkMuted, margin: 0 }}>
                              {doc.type} • {doc.published ? 'Live' : 'Draft'}
                            </p>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 9, fontFamily: t.mono, background: t.bgMuted, color: t.inkMuted, padding: '2px 6px', borderRadius: 4, border: `1px solid ${t.border}` }} title="Total page views">
                              <Eye size={10} /> {doc.views || 0}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ChevronDown size={16} color={t.inkMuted} style={{ transform: openDocIndex === index ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                    </button>

                    {openDocIndex === index && (
                      <div style={{ padding: 24, background: t.bgMuted, borderTop: `1px solid ${t.borderFaint}`, display: 'flex', flexDirection: 'column', gap: 24 }}>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 16, background: t.bgSurface, border: `1px solid ${t.border}`, borderRadius: 12 }}>
                          {doc.published ? <Eye size={16} color="#10b981" /> : <EyeOff size={16} color={t.inkMuted} />}
                          <span style={{ fontSize: 10, fontFamily: t.mono, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: t.inkMuted }}>
                            Visibility: {doc.published ? 'Public' : 'Hidden'}
                          </span>
                          <button 
                            onClick={() => updateDoc(index, 'published', !doc.published)}
                            style={{ marginLeft: 'auto', padding: '6px 16px', borderRadius: 99, fontSize: 10, fontFamily: t.mono, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', background: doc.published ? t.ink : t.bgMuted, color: doc.published ? t.bg : t.inkMuted, border: `1px solid ${doc.published ? t.ink : t.border}` }}
                          >
                            {doc.published ? 'Unpublish' : 'Go Live'}
                          </button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
                          <div>
                            <label style={{ display: 'block', fontSize: 10, fontFamily: t.mono, color: t.inkMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Document Title</label>
                            <input style={{ width: '100%', padding: 12, background: t.bgSurface, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 14, fontFamily: t.sans, color: t.ink, outline: 'none' }} value={doc.title} onChange={e => updateDoc(index, 'title', e.target.value)} />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: 10, fontFamily: t.mono, color: t.inkMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>URL Slug (ID)</label>
                            <input style={{ width: '100%', padding: 12, background: t.bgSurface, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 14, fontFamily: t.mono, color: t.ink, outline: 'none' }} value={doc.id} onChange={e => updateDoc(index, 'id', e.target.value)} />
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
                          <div>
                            <label style={{ display: 'block', fontSize: 10, fontFamily: t.mono, color: t.inkMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>External Link (optional)</label>
                            <input style={{ width: '100%', padding: 12, background: t.bgSurface, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 14, fontFamily: t.sans, color: t.ink, outline: 'none' }} value={doc.link || ''} placeholder="https://..." onChange={e => updateDoc(index, 'link', e.target.value)} />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: 10, fontFamily: t.mono, color: t.inkMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Short Description</label>
                            <input style={{ width: '100%', padding: 12, background: t.bgSurface, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 14, fontFamily: t.sans, color: t.ink, outline: 'none' }} value={doc.description || ''} placeholder="Brief description for cards..." onChange={e => updateDoc(index, 'description', e.target.value)} />
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
                          <div>
                            <label style={{ display: 'block', fontSize: 10, fontFamily: t.mono, color: t.inkMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Date</label>
                            <input style={{ width: '100%', padding: 12, background: t.bgSurface, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 14, fontFamily: t.sans, color: t.ink, outline: 'none' }} value={doc.date || ''} placeholder="e.g. Mar 2026" onChange={e => updateDoc(index, 'date', e.target.value)} />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: 10, fontFamily: t.mono, color: t.inkMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Read Time</label>
                            <input style={{ width: '100%', padding: 12, background: t.bgSurface, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 14, fontFamily: t.sans, color: t.ink, outline: 'none' }} value={doc.readTime || ''} placeholder="e.g. 5 min read" onChange={e => updateDoc(index, 'readTime', e.target.value)} />
                          </div>
                        </div>

                        <div style={{ padding: 20, background: t.bgSurface, border: `1px solid ${t.border}`, borderRadius: 12 }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 10, fontFamily: t.mono, color: t.inkMuted, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            <Tag size={12} /> Category / Tag Builder
                          </label>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                            {allCategories.map((category: string) => (
                              <button
                                key={category}
                                type="button"
                                onClick={() => updateDoc(index, 'type', category)}
                                style={{ padding: '6px 12px', borderRadius: 99, fontSize: 10, fontFamily: t.mono, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', background: doc.type === category ? t.ink : t.bgMuted, color: doc.type === category ? t.bg : t.inkMuted, border: `1px solid ${doc.type === category ? t.ink : t.border}` }}
                              >
                                {category}
                              </button>
                            ))}
                          </div>
                          <div style={{ display: 'flex', gap: 12 }}>
                            <input 
                              style={{ flex: 1, padding: 12, background: t.bgMuted, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 14, fontFamily: t.sans, color: t.ink, outline: 'none' }}
                              value={doc.type || ''}
                              placeholder="Type a new tag..."
                              onChange={e => updateDoc(index, 'type', e.target.value)}
                            />
                            <input 
                              style={{ flex: 1, padding: 12, background: t.bgMuted, border: `1px solid ${t.border}`, borderRadius: 8, fontSize: 14, fontFamily: t.sans, color: t.ink, outline: 'none' }}
                              value={doc.tag || ''}
                              placeholder="Sub-tag (e.g. Agentic AI)"
                              onChange={e => updateDoc(index, 'tag', e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
                          <div>
                            <label style={{ display: 'block', fontSize: 10, fontFamily: t.mono, color: t.inkMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Cover Image</label>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 12, background: t.bgSurface, border: `1px solid ${t.border}`, borderRadius: 8 }}>
                              {doc.coverImage && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                  <img src={doc.coverImage} style={{ width: '100%', height: 96, objectFit: 'cover', borderRadius: 6, border: `1px solid ${t.borderFaint}` }} />
                                  <button onClick={() => updateDoc(index, 'coverImage', '')} style={{ padding: 8, background: t.bgMuted, color: '#ef4444', border: 'none', borderRadius: 6, cursor: 'pointer' }} title="Remove cover image"><Trash2 size={14} /></button>
                                </div>
                              )}
                              <input type="file" accept="image/*" onChange={e => handleFileUpload(e, 'coverImage', index)} style={{ fontSize: 12, fontFamily: t.sans, color: t.inkMuted }} />
                              {uploadingState['coverImage'] && <span style={{ fontSize: 10, fontFamily: t.mono, color: t.inkMuted, textTransform: 'uppercase' }}>Uploading Image...</span>}
                            </div>
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: 10, fontFamily: t.mono, color: t.inkMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Thumbnail (Filmstrip)</label>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 12, background: t.bgSurface, border: `1px solid ${t.border}`, borderRadius: 8 }}>
                              {doc.thumbnail && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                  <img src={doc.thumbnail} style={{ width: '100%', height: 96, objectFit: 'cover', borderRadius: 6, border: `1px solid ${t.borderFaint}` }} />
                                  <button onClick={() => updateDoc(index, 'thumbnail', '')} style={{ padding: 8, background: t.bgMuted, color: '#ef4444', border: 'none', borderRadius: 6, cursor: 'pointer' }} title="Remove thumbnail"><Trash2 size={14} /></button>
                                </div>
                              )}
                              <input type="file" accept="image/*" onChange={e => handleFileUpload(e, 'thumbnail', index)} style={{ fontSize: 12, fontFamily: t.sans, color: t.inkMuted }} />
                              {uploadingState['thumbnail'] && <span style={{ fontSize: 10, fontFamily: t.mono, color: t.inkMuted, textTransform: 'uppercase' }}>Uploading Image...</span>}
                            </div>
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: 10, fontFamily: t.mono, color: t.inkMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Embed PDF</label>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 12, background: t.bgSurface, border: `1px solid ${t.border}`, borderRadius: 8, height: '100%', justifyContent: 'center' }}>
                              {doc.pdfUrl && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                  <span style={{ flex: 1, fontSize: 10, fontFamily: t.mono, color: '#10b981', background: '#f0fdf4', padding: '6px 12px', borderRadius: 6, border: '1px solid #d1fae5', textAlign: 'center', wordBreak: 'break-all' }}>Attached: {doc.pdfUrl.split('/').pop()}</span>
                                  <button onClick={() => updateDoc(index, 'pdfUrl', '')} style={{ padding: 8, background: t.bgMuted, color: '#ef4444', border: 'none', borderRadius: 6, cursor: 'pointer' }} title="Remove PDF"><Trash2 size={14} /></button>
                                </div>
                              )}
                              <input type="file" accept="application/pdf" onChange={e => handleFileUpload(e, 'pdfUrl', index)} style={{ fontSize: 12, fontFamily: t.sans, color: t.inkMuted }} />
                              {uploadingState['pdfUrl'] && <span style={{ fontSize: 10, fontFamily: t.mono, color: t.inkMuted, textTransform: 'uppercase' }}>Uploading PDF...</span>}
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
                          <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: 10, fontFamily: t.mono, color: t.inkMuted, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            <span>Document Body</span>
                            <span style={{ textTransform: 'none', letterSpacing: 'normal', color: t.inkFaint }}>Rich text supported (Paste from anywhere)</span>
                          </label>
                          <RichTextEditor 
                            content={Array.isArray(doc.content) ? doc.content.join('\n\n') : (doc.content || '')} 
                            onChange={(html) => updateDoc(index, 'content', html)} 
                          />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 16, borderTop: `1px solid ${t.borderFaint}` }}>
                          <button onClick={() => deleteDoc(index)} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#ef4444', background: '#fef2f2', padding: '8px 16px', borderRadius: 8, fontSize: 12, fontFamily: t.sans, fontWeight: 500, border: 'none', cursor: 'pointer' }}>
                            <Trash2 size={14} /> Delete Document
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <button 
                onClick={addDoc}
                style={{ width: '100%', padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: t.inkMuted, background: t.bgMuted, border: 'none', borderTop: `1px solid ${t.borderFaint}`, fontSize: 12, fontFamily: t.sans, fontWeight: 500, cursor: 'pointer' }}
              >
                <Plus size={16} /> Create New Document
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}