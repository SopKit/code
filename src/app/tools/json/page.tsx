import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TOOL_CATEGORIES } from "@/constants/tools";

export const metadata: Metadata = {
  title: "JSON Tools Suite",
  description: "All-in-one JSON tools: format, validate, minify, view, edit, and convert JSON online.",
  alternates: { canonical: "/tools/json" },
};

export default function JSONToolsPage() {
  const jsonCategory = TOOL_CATEGORIES.find((cat) => cat.id === "json");
  if (!jsonCategory) return null;

  return (
    <div className="container mx-auto max-w-5xl py-8 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">JSON Tools</h1>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        Format, validate, minify, view, edit, and convert JSON with our suite of developer tools. All tools are free, privacy-friendly, and run entirely in your browser.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jsonCategory.tools.map((tool) => (
          <Link key={tool.id} href={tool.path} className="hover:no-underline">
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{tool.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm min-h-[48px]">{tool.description}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {tool.keywords.slice(0, 4).map((kw) => (
                    <span key={kw} className="text-xs bg-muted px-2 py-0.5 rounded mr-1 text-muted-foreground">
                      {kw}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
