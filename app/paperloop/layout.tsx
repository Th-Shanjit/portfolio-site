import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PaperLoop | Scanner for Educators",
  description:
    "Turn handwritten question-paper drafts into editable, PDF-ready papers. Android closed beta on Google Play.",
  openGraph: {
    title: "PaperLoop | Scanner for Educators",
    description:
      "AI-assisted workflow for educators. Built and tested with real teacher papers.",
    images: ["/public/icon.jpeg"], // <-- Update this to match your uploaded image filename
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PaperLoop | Scanner for Educators",
    description:
      "Turn handwritten question-paper drafts into editable, PDF-ready papers. Closed beta on Google Play.",
    images: ["/paperloop-logo.png"], // <-- Update this to match your uploaded image filename
  },
};

export default function PaperLoopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
