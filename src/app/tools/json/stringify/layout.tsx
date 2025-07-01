import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Stringify – Convert JS Object to JSON String",
  description: "Convert JavaScript objects to JSON strings online. Fast, privacy-friendly, and works in your browser.",
  keywords: [
    "json stringify",
    "js object to json",
    "json converter",
    "json tools",
    "online json stringify"
  ],
  openGraph: {
    title: "JSON Stringify – Convert JS Object to JSON String",
    description: "Convert JavaScript objects to JSON strings online. Fast, privacy-friendly, and works in your browser.",
    url: "/tools/json/stringify"
  }
};

export default function StringifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
