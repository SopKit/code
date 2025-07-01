import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Sorter – Sort JSON Keys Alphabetically",
  description: "Sort JSON object keys alphabetically online. Fast, privacy-friendly, and works in your browser.",
  keywords: [
    "json sorter",
    "sort json keys",
    "alphabetical json",
    "json tools",
    "online json sorter"
  ],
  openGraph: {
    title: "JSON Sorter – Sort JSON Keys Alphabetically",
    description: "Sort JSON object keys alphabetically online. Fast, privacy-friendly, and works in your browser.",
    url: "/tools/json/sorter"
  }
};

export default function SorterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
