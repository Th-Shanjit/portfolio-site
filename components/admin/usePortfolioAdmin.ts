'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Doc, PortfolioData } from '@/lib/content';
import type { AdminActions, AdminSection, AdminState } from './types';

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function createNewDoc(): Doc {
  const id = `note-${Date.now()}`;
  return {
    id,
    title: 'Untitled note',
    type: 'note',
    tag: '',
    status: 'draft',
    published: false,
    description: '',
    thumbnail: '',
    coverImage: '',
    pdfUrl: '',
    date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    readTime: '5 min read',
    views: 0,
    content: ['<p>Start writing...</p>'],
  };
}

export function usePortfolioAdmin(): {
  loading: boolean;
  state: AdminState | null;
  handleSave: () => Promise<void>;
  showPublishedModal: boolean;
  setShowPublishedModal: (v: boolean) => void;
} {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState<AdminSection>('overview');
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastPublishedAt, setLastPublishedAt] = useState<Date | null>(null);
  const [uploadingState, setUploadingState] = useState<Record<string, boolean>>({});
  const [showPublishedModal, setShowPublishedModal] = useState(false);

  useEffect(() => {
    fetch('/api/content?t=' + Date.now(), { cache: 'no-store' })
      .then((res) => res.json())
      .then((json: PortfolioData) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch data:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [hasUnsavedChanges]);

  const markDirty = useCallback(() => setHasUnsavedChanges(true), []);

  const updateSite = useCallback(
    (patch: Partial<PortfolioData['site']>) => {
      setData((prev) => (prev ? { ...prev, site: { ...prev.site, ...patch } } : prev));
      markDirty();
    },
    [markDirty]
  );

  const updateHero = useCallback(
    (patch: Partial<NonNullable<PortfolioData['hero']>>) => {
      setData((prev) => (prev ? { ...prev, hero: { ...prev.hero, ...patch } } : prev));
      markDirty();
    },
    [markDirty]
  );

  const updateAbout = useCallback(
    (patch: Partial<NonNullable<PortfolioData['about']>>) => {
      setData((prev) => (prev ? { ...prev, about: { ...prev.about, ...patch } } : prev));
      markDirty();
    },
    [markDirty]
  );

  const updateContact = useCallback(
    (patch: Partial<NonNullable<PortfolioData['contact']>>) => {
      setData((prev) => (prev ? { ...prev, contact: { ...prev.contact, ...patch } } : prev));
      markDirty();
    },
    [markDirty]
  );

  const updateDocByIndex = useCallback(
    (index: number, field: keyof Doc | 'content', value: unknown) => {
      setData((prev) => {
        if (!prev || index < 0 || index >= prev.docs.length) return prev;
        const newDocs = [...prev.docs];
        const updated = { ...newDocs[index] };
        if (field === 'content') {
          updated.content = [value as string];
        } else if (field === 'published') {
          updated.published = value as boolean;
          updated.status = value ? 'published' : 'draft';
        } else {
          (updated as Record<string, unknown>)[field] = value;
        }
        newDocs[index] = updated;
        return { ...prev, docs: newDocs };
      });
      markDirty();
    },
    [markDirty]
  );

  const updateDocSlug = useCallback(
    (index: number, rawSlug: string): string | null => {
      const newSlug = slugify(rawSlug);
      if (!newSlug) return 'Slug cannot be empty';
      if (!data) return 'No data loaded';

      const duplicate = data.docs.some((d, i) => i !== index && d.id === newSlug);
      if (duplicate) return 'This slug is already used by another document';

      const oldId = data.docs[index]?.id;
      setData((prev) => {
        if (!prev || index < 0 || index >= prev.docs.length) return prev;
        const newDocs = [...prev.docs];
        newDocs[index] = { ...newDocs[index], id: newSlug };
        return { ...prev, docs: newDocs };
      });
      if (selectedDocId === oldId) setSelectedDocId(newSlug);
      markDirty();
      return null;
    },
    [data, markDirty, selectedDocId]
  );

  const addDoc = useCallback(() => {
    const doc = createNewDoc();
    setData((prev) => (prev ? { ...prev, docs: [doc, ...prev.docs] } : prev));
    setSelectedSection('docs');
    setSelectedDocId(doc.id);
    markDirty();
  }, [markDirty]);

  const deleteDoc = useCallback(
    (index: number) => {
      const id = data?.docs[index]?.id;
      setData((prev) => {
        if (!prev) return prev;
        return { ...prev, docs: prev.docs.filter((_, i) => i !== index) };
      });
      if (selectedDocId === id) setSelectedDocId(null);
      markDirty();
    },
    [data, markDirty, selectedDocId]
  );

  const handleFileUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>, fieldPath: string, docId?: string) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const stateKey = docId ? `doc-${docId}-${fieldPath}` : fieldPath;
      setUploadingState((prev) => ({ ...prev, [stateKey]: true }));

      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const responseData = await res.json();

        if (res.ok && responseData.url) {
          if (docId && data) {
            const index = data.docs.findIndex((d) => d.id === docId);
            if (index !== -1) {
              updateDocByIndex(index, fieldPath as keyof Doc, responseData.url);
            }
          } else {
            const keys = fieldPath.split('.');
            setData((prev) => {
              if (!prev) return prev;
              const section = keys[0] as keyof PortfolioData;
              const sectionData = { ...(prev[section] as object) } as Record<string, string>;
              sectionData[keys[1]] = responseData.url;
              return { ...prev, [section]: sectionData };
            });
            markDirty();
          }
        } else {
          alert(`Upload failed: ${responseData.error || 'Unknown error'}`);
        }
      } catch (err) {
        console.error('Upload failed', err);
        alert('Upload failed: network error');
      } finally {
        setUploadingState((prev) => ({ ...prev, [stateKey]: false }));
        e.target.value = '';
      }
    },
    [data, markDirty, updateDocByIndex]
  );

  const addHighlight = useCallback(() => {
    setData((prev) => ({
      ...prev!,
      highlightedProjects: [...(prev?.highlightedProjects || []), { id: '' }],
    }));
    markDirty();
  }, [markDirty]);

  const updateHighlight = useCallback(
    (index: number, docId: string) => {
      setData((prev) => {
        if (!prev) return prev;
        const list = [...(prev.highlightedProjects || [])];
        list[index] = { id: docId };
        return { ...prev, highlightedProjects: list };
      });
      markDirty();
    },
    [markDirty]
  );

  const removeHighlight = useCallback(
    (index: number) => {
      setData((prev) => {
        if (!prev) return prev;
        const list = [...(prev.highlightedProjects || [])];
        list.splice(index, 1);
        return { ...prev, highlightedProjects: list };
      });
      markDirty();
    },
    [markDirty]
  );

  const moveHighlight = useCallback(
    (index: number, direction: -1 | 1) => {
      setData((prev) => {
        if (!prev) return prev;
        const list = [...(prev.highlightedProjects || [])];
        const target = index + direction;
        if (target < 0 || target >= list.length) return prev;
        [list[index], list[target]] = [list[target], list[index]];
        return { ...prev, highlightedProjects: list };
      });
      markDirty();
    },
    [markDirty]
  );

  const actions: AdminActions = useMemo(
    () => ({
      setData,
      markDirty,
      updateSite,
      updateHero,
      updateAbout,
      updateContact,
      updateDocByIndex,
      updateDocSlug,
      addDoc,
      deleteDoc,
      handleFileUpload,
      addHighlight,
      updateHighlight,
      removeHighlight,
      moveHighlight,
    }),
    [
      markDirty,
      updateSite,
      updateHero,
      updateAbout,
      updateContact,
      updateDocByIndex,
      updateDocSlug,
      addDoc,
      deleteDoc,
      handleFileUpload,
      addHighlight,
      updateHighlight,
      removeHighlight,
      moveHighlight,
    ]
  );

  const selectedDocIndex = useMemo(() => {
    if (!data || !selectedDocId) return -1;
    return data.docs.findIndex((d) => d.id === selectedDocId);
  }, [data, selectedDocId]);

  const selectedDoc = selectedDocIndex >= 0 && data ? data.docs[selectedDocIndex] : null;
  const publishedDocs = data?.docs.filter((d) => d.published) ?? [];
  const draftDocs = data?.docs.filter((d) => !d.published) ?? [];
  const allDocTypes = Array.from(new Set(data?.docs.map((d) => d.type).filter(Boolean) ?? []));

  const handleSave = useCallback(async () => {
    if (!data) return;
    setSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setHasUnsavedChanges(false);
        setLastPublishedAt(new Date());
        setShowPublishedModal(true);
      } else {
        const errorData = await res.json();
        alert(`Failed to save: ${errorData.error || 'Unknown error'}`);
      }
    } catch {
      alert('Network error occurred.');
    } finally {
      setSaving(false);
    }
  }, [data]);

  const state: AdminState | null = data
    ? {
        data,
        selectedSection,
        setSelectedSection,
        selectedDocId,
        setSelectedDocId,
        saving,
        hasUnsavedChanges,
        lastPublishedAt,
        uploadingState,
        actions,
        selectedDoc,
        selectedDocIndex,
        publishedDocs,
        draftDocs,
        allDocTypes,
      }
    : null;

  return { loading, state, handleSave, showPublishedModal, setShowPublishedModal };
}
