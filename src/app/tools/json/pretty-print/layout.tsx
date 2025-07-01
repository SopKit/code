import { generateToolMetadata } from "@/constants/tools";

export function generateMetadata() {
  return generateToolMetadata("json", "pretty-print");
}

interface LayoutProps {
  children: React.ReactNode;
}

export default function JSONPrettyPrintLayout({ children }: LayoutProps) {
  return children;
}
