export const PROOF_STRIP = [
  'Built React Native AI app',
  'Tested with 5 teachers/tutors',
  '~15 handwritten papers tested',
  'Law → Product → AI systems',
] as const;

export const PAPERLOOP_TABS = [
  {
    id: 'problem',
    label: 'Problem',
    content:
      'Teachers write question drafts by hand, then retype and format them manually in Word.',
  },
  {
    id: 'testing',
    label: 'Testing',
    content:
      'Input from 5 teachers/tutors and roughly 15 handwritten papers, including chemistry-heavy and mixed-format question papers.',
  },
  {
    id: 'decisions',
    label: 'Product Decisions',
    content:
      'No-login MVP, review-before-export, fair scan credits, simpler editor/PDF themes, chemistry-specific handling.',
  },
  {
    id: 'outcome',
    label: 'Outcome',
    content:
      'Closed beta direction shaped through real teacher workflow testing and public demo.',
  },
] as const;

export type SideQuest = {
  title: string;
  description: string;
  tags: string[];
  whatItIs: string;
  whyBuilt: string;
  learned: string;
  status: string;
  href?: string;
  external?: boolean;
};

export const SIDE_QUESTS: SideQuest[] = [
  {
    title: 'Since When',
    description: 'A lightweight time-awareness tool for tracking how long things have been in motion.',
    tags: ['AI workflows', 'Time', 'Experiment'],
    whatItIs: 'A small tool that surfaces how long tasks, goals, or open loops have been running — without turning into a full project manager.',
    whyBuilt: 'I kept losing track of how long side projects and follow-ups had been sitting. Wanted something calmer than a task app.',
    learned: 'Time-awareness UX works best when it nudges rather than nags. Defaults and copy matter more than features.',
    status: 'Experiment · in progress',
  },
  {
    title: 'Agentix',
    description: 'Exploring agentic task flows — small automations that stay human-in-the-loop.',
    tags: ['Agentic AI', 'Automation', 'Prototype'],
    whatItIs: 'A prototype playground for chaining small agent steps — draft, review, approve — without handing full control to the model.',
    whyBuilt: 'Most agent demos skip the review step. I wanted to test flows where the human still owns the decision.',
    learned: 'Human-in-the-loop isn\'t a checkbox — it needs clear checkpoints, undo paths, and honest failure states.',
    status: 'Prototype · exploratory',
  },
  {
    title: 'More experiments',
    description: 'Product notes, case studies, and in-progress thinking on messy user problems.',
    tags: ['Writing', 'Archive'],
    whatItIs: 'A running collection of product notes, case studies, and half-formed ideas from building in public.',
    whyBuilt: 'Writing forces clearer thinking. Publishing rough notes helps me test ideas before they become features.',
    learned: 'Short, honest write-ups beat polished decks for showing how I think through product decisions.',
    status: 'Ongoing',
    href: '/docs',
  },
];

export const ABOUT_TIMELINE = [
  { label: 'Law background', detail: 'Documents, decisions, edge cases' },
  { label: 'Content / theatre / operations', detail: 'Coordination and narrative' },
  { label: 'Healthcare / customer workflows', detail: 'Messy human systems' },
  { label: 'Product + Agentic AI', detail: 'Shipping practical tools' },
  { label: 'PaperLoop', detail: 'Handwritten exams → print-ready PDFs' },
] as const;

export const ABOUT_PREVIEW_COPY =
  'I came into product from law, content, theatre operations, and healthcare workflows. That background made me comfortable with messy human systems: documents, decisions, coordination, edge cases, and trust. Now I\'m applying that to AI products — especially tools where the user still needs control.';

export const ABOUT_HOW_I_WORK =
  'I start with real workflows, talk to users early, and ship scrappy MVPs before polishing. I care about review steps, honest constraints, and whether a tool actually saves time in practice.';

export const ABOUT_CURRENT_FOCUS =
  'Product roles at the intersection of AI workflows and practical tools — especially agentic systems where humans stay in control. Currently building and testing PaperLoop with teachers and tutors.';

export const PRODUCT_NOTES_FRAMING =
  'Selected product notes and case studies from building in public.';
