import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Editor Online - Advanced JSON Editor with Syntax Highlighting",
  description: "Professional online JSON editor with syntax highlighting, error detection, and real-time validation. Edit JSON data with advanced features and export options.",
  keywords: [
    "json editor",
    "online json editor",
    "json syntax highlighting",
    "json edit",
    "json modify",
    "json development tool",
    "web json editor",
    "json code editor"
  ],
  openGraph: {
    title: "JSON Editor Online - Advanced JSON Editor",
    description: "Professional online JSON editor with syntax highlighting, error detection, and real-time validation.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Editor Online - Advanced JSON Editor",
    description: "Professional online JSON editor with syntax highlighting, error detection, and real-time validation.",
  },
  alternates: {
    canonical: "/tools/json/editor",
  },
};

export default function JSONEditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
