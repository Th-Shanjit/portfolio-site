import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PaperLoop | Scanner for Educators",
  description: "Handwritten to print-ready in seconds. Powered by Gemini Vision AI.",
  openGraph: {
    title: "PaperLoop | Scanner for Educators",
    description: "Handwritten to print-ready in seconds. Powered by Gemini Vision AI.",
    images: ["/public/icon.png"], // <-- Update this to match your uploaded image filename
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PaperLoop | Scanner for Educators",
    description: "Handwritten to print-ready in seconds. Powered by Gemini Vision AI.",
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
