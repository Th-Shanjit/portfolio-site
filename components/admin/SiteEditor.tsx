'use client';

import Field, { inputClass } from './Field';
import UploadField from './UploadField';
import type { AdminState } from './types';

type Props = { state: AdminState };

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-[rgba(22,22,22,0.10)] bg-white p-5 md:p-6 space-y-4">
      <h3 className="font-[family-name:var(--font-heading)] text-[16px] font-medium text-[#161616] m-0">
        {title}
      </h3>
      {children}
    </section>
  );
}

export default function SiteEditor({ state }: Props) {
  const { data, actions, uploadingState } = state;
  const site = data.site;

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="font-[family-name:var(--font-heading)] text-[24px] font-medium text-[#161616] m-0 mb-1">
          Site
        </h2>
        <p className="font-sans text-[15px] text-[#6F6A61] m-0">
          Global identity and profile links.
        </p>
      </div>

      <Card title="Identity">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Site name" htmlFor="site-name">
            <input
              id="site-name"
              className={inputClass}
              value={site.name}
              onChange={(e) => actions.updateSite({ name: e.target.value })}
            />
          </Field>
          <Field label="Role / tagline" htmlFor="site-role">
            <input
              id="site-role"
              className={inputClass}
              value={site.role}
              onChange={(e) => actions.updateSite({ role: e.target.value })}
            />
          </Field>
        </div>
      </Card>

      <Card title="Links">
        <div className="space-y-4">
          <Field label="Email" htmlFor="site-email">
            <input
              id="site-email"
              type="email"
              className={inputClass}
              value={site.email}
              onChange={(e) => actions.updateSite({ email: e.target.value })}
            />
          </Field>
          <Field label="LinkedIn URL" htmlFor="site-linkedin">
            <input
              id="site-linkedin"
              className={inputClass}
              value={site.linkedinUrl || ''}
              placeholder="https://linkedin.com/in/..."
              onChange={(e) => actions.updateSite({ linkedinUrl: e.target.value })}
            />
          </Field>
          <Field label="Resume URL" htmlFor="site-resume" hint="Path or full URL to resume PDF.">
            <input
              id="site-resume"
              className={inputClass}
              value={site.resumeUrl || ''}
              onChange={(e) => actions.updateSite({ resumeUrl: e.target.value })}
            />
          </Field>
        </div>
      </Card>

      <Card title="Images">
        <UploadField
          label="Display picture"
          description="Profile photo used on the homepage About section."
          value={site.dpUrl}
          accept="image/*"
          fieldPath="site.dpUrl"
          kind="image"
          uploading={uploadingState['site.dpUrl']}
          onUpload={actions.handleFileUpload}
          onRemove={() => actions.updateSite({ dpUrl: '' })}
        />
      </Card>
    </div>
  );
}
