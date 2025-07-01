import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Compare – Compare Two JSON Files or Objects",
  description: "Compare two JSON files or objects and highlight the differences. Fast, privacy-friendly, and works in your browser.",
  keywords: [
    "json compare",
    "json diff",
    "compare json files",
    "json tools",
    "online json compare"
  ],
  openGraph: {
    title: "JSON Compare – Compare Two JSON Files or Objects",
    description: "Compare two JSON files or objects and highlight the differences. Fast, privacy-friendly, and works in your browser.",
    url: "/tools/json/compare"
  }
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
