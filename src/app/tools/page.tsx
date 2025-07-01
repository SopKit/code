import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, FileJson, ArrowLeftRight, FileCode, FileText, Code, Lock } from 'lucide-react';
import { TOOL_CATEGORIES, ALL_TOOLS } from '@/constants';
import { LayoutWrapper } from '@/wrappers';

export default function ToolsPage() {
  const categoryIcons = {
    FileJson,
    ArrowLeftRight,
    FileCode,
    FileText,
    Code,
    Lock
  };

  return (
    <LayoutWrapper>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Developer Tools
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Comprehensive collection of free online tools for developers. 
            Format, validate, convert, and manipulate your data.
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                type="text" 
                placeholder="Search tools..." 
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Tool Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {TOOL_CATEGORIES.map((category) => {
            const IconComponent = categoryIcons[category.icon as keyof typeof categoryIcons];
            return (
              <Card key={category.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{category.name}</CardTitle>
                  </div>
                  <p className="text-muted-foreground">{category.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {category.tools.slice(0, 5).map((tool) => (
                      <Link key={tool.id} href={tool.path}>
                        <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50 transition-colors">
                          <span className="text-sm font-medium">{tool.name}</span>
                          {tool.featured && (
                            <Badge variant="secondary" className="text-xs">Popular</Badge>
                          )}
                        </div>
                      </Link>
                    ))}
                    {category.tools.length > 5 && (
                      <p className="text-xs text-muted-foreground text-center py-2">
                        +{category.tools.length - 5} more tools
                      </p>
                    )}
                  </div>
                  <Link href={`/tools/${category.id}`}>
                    <Button variant="outline" className="w-full">
                      View All {category.name}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* All Tools List */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">All Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {ALL_TOOLS.map((tool) => (
              <Link key={tool.id} href={tool.path}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{tool.name}</h3>
                      {tool.featured && (
                        <Badge variant="secondary" className="text-xs">
                          Popular
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {tool.description}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {tool.category.toUpperCase()}
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
