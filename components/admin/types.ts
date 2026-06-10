import type { Doc, PortfolioData } from '@/lib/content';

export type AdminSection =
  | 'overview'
  | 'site'
  | 'hero'
  | 'highlights'
  | 'docs'
  | 'about'
  | 'contact';

export type DocFilter = 'all' | 'published' | 'draft';

export type UploadHandler = (
  e: React.ChangeEvent<HTMLInputElement>,
  fieldPath: string,
  docId?: string
) => Promise<void>;

export type AdminActions = {
  setData: React.Dispatch<React.SetStateAction<PortfolioData | null>>;
  markDirty: () => void;
  updateSite: (patch: Partial<PortfolioData['site']>) => void;
  updateHero: (patch: Partial<NonNullable<PortfolioData['hero']>>) => void;
  updateAbout: (patch: Partial<NonNullable<PortfolioData['about']>>) => void;
  updateContact: (patch: Partial<NonNullable<PortfolioData['contact']>>) => void;
  updateDocByIndex: (index: number, field: keyof Doc | 'content', value: unknown) => void;
  updateDocSlug: (index: number, newSlug: string) => string | null;
  addDoc: () => void;
  deleteDoc: (index: number) => void;
  handleFileUpload: UploadHandler;
  addHighlight: () => void;
  updateHighlight: (index: number, docId: string) => void;
  removeHighlight: (index: number) => void;
  moveHighlight: (index: number, direction: -1 | 1) => void;
};

export type AdminState = {
  data: PortfolioData;
  selectedSection: AdminSection;
  setSelectedSection: (s: AdminSection) => void;
  selectedDocId: string | null;
  setSelectedDocId: (id: string | null) => void;
  saving: boolean;
  hasUnsavedChanges: boolean;
  lastPublishedAt: Date | null;
  uploadingState: Record<string, boolean>;
  actions: AdminActions;
  selectedDoc: Doc | null;
  selectedDocIndex: number;
  publishedDocs: Doc[];
  draftDocs: Doc[];
  allDocTypes: string[];
};
