'use client';

import { Trash2 } from 'lucide-react';
import Field from './Field';
import type { UploadHandler } from './types';

type Props = {
  label: string;
  description?: string;
  value?: string;
  accept: string;
  fieldPath: string;
  docId?: string;
  uploading?: boolean;
  onUpload: UploadHandler;
  onRemove: () => void;
  kind?: 'image' | 'pdf' | 'file';
};

export default function UploadField({
  label,
  description,
  value,
  accept,
  fieldPath,
  docId,
  uploading,
  onUpload,
  onRemove,
  kind = 'file',
}: Props) {
  const inputId = `upload-${fieldPath}-${docId || 'global'}`;

  return (
    <Field label={label} htmlFor={inputId} hint={description}>
      <div className="rounded-lg border border-[rgba(22,22,22,0.10)] bg-[#F0EBE0] p-3 space-y-3">
        {value && kind === 'image' && (
          <img
            src={value}
            alt=""
            className="w-full max-h-32 object-cover rounded-md border border-[rgba(22,22,22,0.08)]"
          />
        )}
        {value && kind === 'pdf' && (
          <p className="font-sans text-[12px] text-[#6F6A61] m-0 break-all bg-white rounded-md px-3 py-2 border border-[rgba(22,22,22,0.08)]">
            {value.split('/').pop()}
          </p>
        )}
        {value && kind === 'file' && (
          <p className="font-sans text-[12px] text-[#6F6A61] m-0 break-all">{value}</p>
        )}
        <div className="flex flex-wrap items-center gap-2">
          <input
            id={inputId}
            type="file"
            accept={accept}
            onChange={(e) => onUpload(e, fieldPath, docId)}
            className="font-sans text-[13px] text-[#6F6A61] file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-white file:text-[#161616] file:text-[13px] file:font-medium"
          />
          {value && (
            <button
              type="button"
              onClick={onRemove}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-red-600 bg-red-50 hover:bg-red-100 text-[13px] font-sans transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
              aria-label={`Remove ${label}`}
            >
              <Trash2 size={14} />
              Remove
            </button>
          )}
        </div>
        {uploading && (
          <p className="font-sans text-[12px] text-[#9A9489] m-0" role="status">
            Uploading…
          </p>
        )}
      </div>
    </Field>
  );
}
