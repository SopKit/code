import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to One Line – Convert Multiline JSON to Single Line",
  description: "Convert pretty-printed or multiline JSON to a single line. Fast, privacy-friendly, and works in your browser.",
  keywords: [
    "json one line",
    "json minify",
    "json single line",
    "json tools",
    "online json converter"
  ],
  openGraph: {
    title: "JSON to One Line – Convert Multiline JSON to Single Line",
    description: "Convert pretty-printed or multiline JSON to a single line. Fast, privacy-friendly, and works in your browser.",
    url: "/tools/json/oneline"
  }
};

export default function OneLineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
