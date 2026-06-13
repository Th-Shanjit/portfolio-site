export interface ProjectItem {
  id: string;
  title: string;
  tag: string;
  description: string;
  link: string;
  borderColor?: string;
  backgroundColor?: string;
  comingSoon?: boolean;
}

export type HomeSectionId = 'work' | 'notes' | 'sideQuests' | 'about' | 'contact';

export const HERO_CONTENT = {
  avatarUrl: '/profile.jpg',
  title: 'Shanjit Thokchom',
  subtitle: 'Product builder focused on AI-assisted workflow tools',
  description:
    'Transitioning from law into product management. Building and testing practical product prototypes using AI agents, no-code tools, and lightweight engineering workflows.',
  resumeUrl: '/uploads/resume_shanjit.pdf',
  primaryCtaText: 'View Work',
  secondaryCtaText: "Let's Talk",
};

export const PROOF_POINTS: readonly string[] = [
  'PaperLoop closed beta',
  'Tested with 5 teachers/tutors',
  '~15 handwritten papers tested',
  'Built with AI-assisted workflows',
];

export const OVERVIEW_TEXT = {
  bio: 'I am transitioning from law into product management, with a focus on user research, workflow mapping, and AI-assisted prototyping. My current work explores how simple tools can reduce repetitive operational work for teachers, small teams, and service businesses. I like products that are practical, low-friction, and built around real behaviour rather than ideal user journeys.',
};

export const HIGHLIGHTS: { productNotes: ProjectItem[]; sideQuests: ProjectItem[] } = {
  productNotes: [],
  sideQuests: [],
};

export const CONTACT_LINKS = {
  email: 'mailto:th.shanjit@gmail.com',
  linkedin: 'https://www.linkedin.com/in/shanjit-thokchom-7101202b6',
};

export function isValidProjectLink(link: string): boolean {
  const trimmed = link.trim();
  return trimmed.length > 0 && trimmed !== '#';
}

export function getRealProductNotes(): ProjectItem[] {
  return HIGHLIGHTS.productNotes.filter(
    (item) => !item.comingSoon && isValidProjectLink(item.link)
  );
}

export function getRealSideQuests(): ProjectItem[] {
  return HIGHLIGHTS.sideQuests.filter((item) => isValidProjectLink(item.link));
}

export function getVisibleHomeSections(): HomeSectionId[] {
  const sections: HomeSectionId[] = ['work'];
  if (getRealProductNotes().length > 0) sections.push('notes');
  if (getRealSideQuests().length > 0) sections.push('sideQuests');
  sections.push('about', 'contact');
  return sections;
}

export function getSectionNumber(id: HomeSectionId): string {
  const index = getVisibleHomeSections().indexOf(id);
  return String(index + 1).padStart(2, '0');
}

export function getHomeNavSections(): { name: string; id: HomeSectionId }[] {
  return getVisibleHomeSections()
    .filter((id): id is Exclude<HomeSectionId, 'work'> => id !== 'work')
    .map((id) => {
      const labels: Record<Exclude<HomeSectionId, 'work'>, string> = {
        notes: 'Notes',
        sideQuests: 'Side Quests',
        about: 'About',
        contact: 'Contact',
      };
      return { name: labels[id], id };
    });
}

export function hasResume(): boolean {
  return Boolean(HERO_CONTENT.resumeUrl.trim());
}
