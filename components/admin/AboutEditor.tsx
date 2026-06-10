'use client';

import { Plus, Trash2 } from 'lucide-react';
import Field, { inputClass } from './Field';
import TextAreaField from './TextAreaField';
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

export default function AboutEditor({ state }: Props) {
  const { data, actions } = state;
  const about = data.about || {};
  const experience = about.experience || [];
  const tools = about.tools || [];

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="font-[family-name:var(--font-heading)] text-[24px] font-medium text-[#161616] m-0 mb-1">
          About
        </h2>
        <p className="font-sans text-[15px] text-[#6F6A61] m-0">
          Background copy stored in portfolio data. Note: the live homepage About section also uses static content from code.
        </p>
      </div>

      <Card title="Headings">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Heading" htmlFor="about-heading">
            <input
              id="about-heading"
              className={inputClass}
              value={about.heading || ''}
              onChange={(e) => actions.updateAbout({ heading: e.target.value })}
            />
          </Field>
          <Field label="Subheading" htmlFor="about-subheading">
            <input
              id="about-subheading"
              className={inputClass}
              value={about.subheading || ''}
              onChange={(e) => actions.updateAbout({ subheading: e.target.value })}
            />
          </Field>
        </div>
      </Card>

      <Card title="Bio">
        <TextAreaField
          label="Bio paragraphs"
          hint="Separate paragraphs with a blank line."
          value={Array.isArray(about.bio) ? about.bio.join('\n\n') : ''}
          onChange={(v) => actions.updateAbout({ bio: v.split('\n\n').filter(Boolean) })}
          rows={6}
        />
      </Card>

      <Card title="Origin & focus">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Origin title" htmlFor="origin-title">
            <input
              id="origin-title"
              className={inputClass}
              value={about.originTitle || ''}
              onChange={(e) => actions.updateAbout({ originTitle: e.target.value })}
            />
          </Field>
          <Field label="Focus title" htmlFor="focus-title">
            <input
              id="focus-title"
              className={inputClass}
              value={about.focusTitle || ''}
              onChange={(e) => actions.updateAbout({ focusTitle: e.target.value })}
            />
          </Field>
        </div>
        <TextAreaField
          label="Origin text"
          value={about.originText || ''}
          onChange={(v) => actions.updateAbout({ originText: v })}
          rows={3}
        />
        <TextAreaField
          label="Focus text"
          value={about.focusText || ''}
          onChange={(v) => actions.updateAbout({ focusText: v })}
          rows={3}
        />
      </Card>

      <Card title="Location & education">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Location" htmlFor="about-location">
            <input
              id="about-location"
              className={inputClass}
              value={about.location || ''}
              onChange={(e) => actions.updateAbout({ location: e.target.value })}
            />
          </Field>
          <Field label="Education title" htmlFor="edu-title">
            <input
              id="edu-title"
              className={inputClass}
              value={about.educationTitle || ''}
              onChange={(e) => actions.updateAbout({ educationTitle: e.target.value })}
            />
          </Field>
        </div>
        <Field label="Education subtitle" htmlFor="edu-sub">
          <input
            id="edu-sub"
            className={inputClass}
            value={about.educationSubtitle || ''}
            onChange={(e) => actions.updateAbout({ educationSubtitle: e.target.value })}
          />
        </Field>
      </Card>

      <Card title="Experience timeline">
        <div className="space-y-3">
          {experience.map((exp, i) => (
            <div
              key={i}
              className="flex gap-2 items-start p-3 rounded-lg bg-[#F0EBE0] border border-[rgba(22,22,22,0.06)]"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1">
                <input
                  className={inputClass}
                  value={exp.role}
                  placeholder="Role"
                  onChange={(e) => {
                    const next = [...experience];
                    next[i] = { ...next[i], role: e.target.value };
                    actions.updateAbout({ experience: next });
                  }}
                />
                <input
                  className={inputClass}
                  value={exp.company}
                  placeholder="Company"
                  onChange={(e) => {
                    const next = [...experience];
                    next[i] = { ...next[i], company: e.target.value };
                    actions.updateAbout({ experience: next });
                  }}
                />
                <input
                  className={inputClass}
                  value={exp.year}
                  placeholder="Year"
                  onChange={(e) => {
                    const next = [...experience];
                    next[i] = { ...next[i], year: e.target.value };
                    actions.updateAbout({ experience: next });
                  }}
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  const next = [...experience];
                  next.splice(i, 1);
                  actions.updateAbout({ experience: next });
                }}
                className="p-2 rounded-md text-red-600 hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
                aria-label="Remove experience entry"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              actions.updateAbout({
                experience: [...experience, { role: '', company: '', year: '' }],
              })
            }
            className="inline-flex items-center gap-2 font-sans text-[14px] text-[#6F6A61] hover:text-[#161616]"
          >
            <Plus size={15} />
            Add experience
          </button>
        </div>
      </Card>

      <Card title="Tools">
        <TextAreaField
          label="Tools list"
          hint="One tool per line."
          value={tools.join('\n')}
          onChange={(v) =>
            actions.updateAbout({ tools: v.split('\n').map((s) => s.trim()).filter(Boolean) })
          }
          rows={4}
        />
      </Card>
    </div>
  );
}
