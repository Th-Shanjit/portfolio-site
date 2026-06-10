'use client';

import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import Field, { inputClass } from './Field';
import UploadField from './UploadField';
import StatusBadge from './StatusBadge';
import ConfirmModal from './ConfirmModal';
import type { AdminState } from './types';

type Props = {
  state: AdminState;
  onClose?: () => void;
};

export default function DocInspectorContent({ state, onClose }: Props) {
  const { selectedDoc, selectedDocIndex, actions, uploadingState, allDocTypes } = state;
  const [slugInput, setSlugInput] = useState('');
  const [slugError, setSlugError] = useState<string | null>(null);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    setSlugInput('');
    setSlugError(null);
  }, [selectedDoc?.id]);

  if (!selectedDoc || selectedDocIndex < 0) {
    return (
      <p className="p-4 font-sans text-[14px] text-[#9A9489] m-0">
        Select a document to edit its settings.
      </p>
    );
  }

  const docId = selectedDoc.id;

  const commitSlug = () => {
    const slugValue = slugInput || docId;
    if (slugValue === docId) {
      setSlugError(null);
      return;
    }
    const err = actions.updateDocSlug(selectedDocIndex, slugValue);
    setSlugError(err);
    if (!err) setSlugInput('');
  };

  return (
    <div className="p-4 space-y-5 min-w-0">
      <div>
        <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-[#F0EBE0] border border-[rgba(22,22,22,0.06)]">
          <div className="flex items-center gap-2 min-w-0">
            <StatusBadge published={selectedDoc.published} />
            <span className="font-sans text-[13px] text-[#6F6A61] truncate">
              {selectedDoc.published ? 'Visible on site' : 'Hidden from site'}
            </span>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={!!selectedDoc.published}
            onClick={() =>
              actions.updateDocByIndex(selectedDocIndex, 'published', !selectedDoc.published)
            }
            className={`shrink-0 px-3 py-1.5 rounded-lg font-sans text-[13px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B35] ${
              selectedDoc.published
                ? 'bg-[#161616] text-white'
                : 'bg-white text-[#6F6A61] border border-[rgba(22,22,22,0.10)]'
            }`}
          >
            {selectedDoc.published ? 'Unpublish' : 'Publish'}
          </button>
        </div>
      </div>

      <Field label="Slug / ID" htmlFor="doc-slug" error={slugError || undefined}>
        <input
          id="doc-slug"
          className={inputClass}
          value={slugInput || docId}
          onChange={(e) => {
            setSlugInput(e.target.value);
            setSlugError(null);
          }}
          onBlur={commitSlug}
        />
      </Field>

      <Field label="Type" htmlFor="doc-type">
        <input
          id="doc-type"
          className={inputClass}
          value={selectedDoc.type || ''}
          onChange={(e) => actions.updateDocByIndex(selectedDocIndex, 'type', e.target.value)}
        />
      </Field>

      {allDocTypes.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {allDocTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => actions.updateDocByIndex(selectedDocIndex, 'type', type)}
              className={`px-2 py-1 rounded-md font-sans text-[12px] border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B35] ${
                selectedDoc.type === type
                  ? 'bg-[#161616] text-white border-[#161616]'
                  : 'bg-[#F0EBE0] text-[#6F6A61] border-[rgba(22,22,22,0.08)]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      )}

      <Field label="Tag" htmlFor="doc-tag">
        <input
          id="doc-tag"
          className={inputClass}
          value={selectedDoc.tag || ''}
          onChange={(e) => actions.updateDocByIndex(selectedDocIndex, 'tag', e.target.value)}
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Date" htmlFor="doc-date">
          <input
            id="doc-date"
            className={inputClass}
            value={selectedDoc.date || ''}
            onChange={(e) => actions.updateDocByIndex(selectedDocIndex, 'date', e.target.value)}
          />
        </Field>
        <Field label="Read time" htmlFor="doc-read">
          <input
            id="doc-read"
            className={inputClass}
            value={selectedDoc.readTime || ''}
            onChange={(e) => actions.updateDocByIndex(selectedDocIndex, 'readTime', e.target.value)}
          />
        </Field>
      </div>

      <Field label="External link" htmlFor="doc-link" hint="Optional. Overrides /docs/[slug] when set.">
        <input
          id="doc-link"
          className={inputClass}
          value={selectedDoc.link || ''}
          placeholder="https://…"
          onChange={(e) => actions.updateDocByIndex(selectedDocIndex, 'link', e.target.value)}
        />
      </Field>

      <UploadField
        label="Cover image"
        value={selectedDoc.coverImage}
        accept="image/*"
        fieldPath="coverImage"
        docId={docId}
        kind="image"
        uploading={uploadingState[`doc-${docId}-coverImage`]}
        onUpload={actions.handleFileUpload}
        onRemove={() => actions.updateDocByIndex(selectedDocIndex, 'coverImage', '')}
      />

      <UploadField
        label="Thumbnail"
        description="Used in filmstrip / card previews."
        value={selectedDoc.thumbnail}
        accept="image/*"
        fieldPath="thumbnail"
        docId={docId}
        kind="image"
        uploading={uploadingState[`doc-${docId}-thumbnail`]}
        onUpload={actions.handleFileUpload}
        onRemove={() => actions.updateDocByIndex(selectedDocIndex, 'thumbnail', '')}
      />

      <UploadField
        label="PDF attachment"
        value={selectedDoc.pdfUrl}
        accept=".pdf,application/pdf"
        fieldPath="pdfUrl"
        docId={docId}
        kind="pdf"
        uploading={uploadingState[`doc-${docId}-pdfUrl`]}
        onUpload={actions.handleFileUpload}
        onRemove={() => actions.updateDocByIndex(selectedDocIndex, 'pdfUrl', '')}
      />

      <Field label="Views">
        <p className="font-sans text-[14px] text-[#6F6A61] m-0">{selectedDoc.views ?? 0} total views</p>
      </Field>

      <div className="pt-4 border-t border-[rgba(22,22,22,0.08)]">
        <button
          type="button"
          onClick={() => setShowDelete(true)}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 bg-red-50 hover:bg-red-100 font-sans text-[14px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
        >
          <Trash2 size={15} />
          Delete document
        </button>
        <p className="font-sans text-[12px] text-[#9A9489] mt-2 m-0">
          Deletion applies after you publish changes.
        </p>
      </div>

      <ConfirmModal
        open={showDelete}
        title="Delete document?"
        message={`“${selectedDoc.title}” will be removed from your portfolio data. Publish changes to make this permanent.`}
        confirmLabel="Delete"
        danger
        onCancel={() => setShowDelete(false)}
        onConfirm={() => {
          actions.deleteDoc(selectedDocIndex);
          setShowDelete(false);
          onClose?.();
        }}
      />
    </div>
  );
}
