'use client';

import Field, { inputClass } from './Field';
import TextAreaField from './TextAreaField';
import type { AdminState } from './types';

type Props = { state: AdminState };

export default function ContactEditor({ state }: Props) {
  const { data, actions } = state;
  const contact = data.contact || {};

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="font-[family-name:var(--font-heading)] text-[24px] font-medium text-[#161616] m-0 mb-1">
          Contact
        </h2>
        <p className="font-sans text-[15px] text-[#6F6A61] m-0">
          Homepage contact section copy and email.
        </p>
      </div>

      <section className="rounded-xl border border-[rgba(22,22,22,0.10)] bg-white p-5 md:p-6 space-y-4">
        <TextAreaField
          label="Heading"
          value={contact.heading || ''}
          onChange={(v) => actions.updateContact({ heading: v })}
          rows={3}
        />
        <TextAreaField
          label="Subheading"
          value={contact.subheading || ''}
          onChange={(v) => actions.updateContact({ subheading: v })}
          rows={2}
        />
        <Field label="Contact email" htmlFor="contact-email">
          <input
            id="contact-email"
            type="email"
            className={inputClass}
            value={contact.email || ''}
            onChange={(e) => actions.updateContact({ email: e.target.value })}
          />
        </Field>
      </section>
    </div>
  );
}
