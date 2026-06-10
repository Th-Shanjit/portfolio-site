'use client';

import Field, { inputClass } from './Field';
import TextAreaField from './TextAreaField';
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

export default function HeroEditor({ state }: Props) {
  const { data, actions, uploadingState } = state;
  const hero = data.hero || {};

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="font-[family-name:var(--font-heading)] text-[24px] font-medium text-[#161616] m-0 mb-1">
          Hero
        </h2>
        <p className="font-sans text-[15px] text-[#6F6A61] m-0">
          Homepage positioning and primary copy.
        </p>
      </div>

      <Card title="Availability & role">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Availability tag" htmlFor="hero-tag">
            <input
              id="hero-tag"
              className={inputClass}
              value={hero.tag || ''}
              onChange={(e) => actions.updateHero({ tag: e.target.value })}
            />
          </Field>
          <Field label="Eyebrow" htmlFor="hero-eyebrow">
            <input
              id="hero-eyebrow"
              className={inputClass}
              value={hero.eyebrow || ''}
              onChange={(e) => actions.updateHero({ eyebrow: e.target.value })}
            />
          </Field>
        </div>
        <Field label="Headline" htmlFor="hero-headline">
          <input
            id="hero-headline"
            className={inputClass}
            value={hero.headline || ''}
            onChange={(e) => actions.updateHero({ headline: e.target.value })}
          />
        </Field>
        <TextAreaField
          label="Subhead"
          value={hero.subhead || ''}
          onChange={(v) => actions.updateHero({ subhead: v })}
          rows={2}
        />
        <TextAreaField
          label="Role description"
          hint="Shown as the primary role line on the homepage."
          value={hero.description || ''}
          onChange={(v) => actions.updateHero({ description: v })}
          rows={3}
        />
      </Card>

      <Card title="CTA (legacy fields)">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="CTA link" htmlFor="hero-link">
            <input
              id="hero-link"
              className={inputClass}
              value={hero.link || ''}
              onChange={(e) => actions.updateHero({ link: e.target.value })}
            />
          </Field>
          <Field label="CTA text" htmlFor="hero-link-text">
            <input
              id="hero-link-text"
              className={inputClass}
              value={hero.linkText || ''}
              onChange={(e) => actions.updateHero({ linkText: e.target.value })}
            />
          </Field>
        </div>
      </Card>

      <Card title="Hero image">
        <UploadField
          label="Cover image"
          value={hero.coverImage}
          accept="image/*"
          fieldPath="hero.coverImage"
          kind="image"
          uploading={uploadingState['hero.coverImage']}
          onUpload={actions.handleFileUpload}
          onRemove={() => actions.updateHero({ coverImage: '' })}
        />
      </Card>
    </div>
  );
}
