import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  FileJson, 
  ArrowLeftRight, 
  FileCode, 
  FileText, 
  Code, 
  Lock,
  Search,
  Star,
  Zap,
  Shield,
  Download
} from 'lucide-react';
import { TOOL_CATEGORIES, FEATURED_TOOLS } from '@/constants';
import { LayoutWrapper } from '@/wrappers';

export default function HomePage() {
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
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Free Online <span className="text-primary">Developer Tools</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Format, validate, convert, and manipulate JSON, XML, YAML, HTML, and more. 
            No registration required. Fast, secure, and works offline.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                type="text" 
                placeholder="Search tools..." 
                className="pl-10 py-3 text-lg"
              />
            </div>
          </div>

          {/* Featured Tools */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {FEATURED_TOOLS.slice(0, 4).map((tool) => (
              <Link key={tool.id} href={tool.path}>
                <Badge variant="secondary" className="px-3 py-1 hover:bg-primary hover:text-primary-foreground transition-colors">
                  {tool.name}
                </Badge>
              </Link>
            ))}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <Zap className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">Instant processing with no delays</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Shield className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold">100% Secure</h3>
              <p className="text-sm text-muted-foreground">All processing happens locally</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Download className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold">Works Offline</h3>
              <p className="text-sm text-muted-foreground">Install as PWA for offline use</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Star className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold">Always Free</h3>
              <p className="text-sm text-muted-foreground">No limits, no registration required</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive Developer Toolkit
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to work with data formats, from JSON and XML to encoding and formatting tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOOL_CATEGORIES.map((category) => {
              const IconComponent = categoryIcons[category.icon as keyof typeof categoryIcons];
              return (
                <Link key={category.id} href={`/tools/${category.id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
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
                      <div className="flex flex-wrap gap-1 mb-4">
                        {category.tools.slice(0, 3).map((tool) => (
                          <Badge key={tool.id} variant="outline" className="text-xs">
                            {tool.name}
                          </Badge>
                        ))}
                        {category.tools.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{category.tools.length - 3} more
                          </Badge>
                        )}
                      </div>
                      <Button variant="ghost" className="w-full">
                        View All Tools
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Tools */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Most Popular Tools
            </h2>
            <p className="text-lg text-muted-foreground">
              The tools developers use most for their daily tasks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURED_TOOLS.map((tool) => (
              <Link key={tool.id} href={tool.path}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{tool.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {tool.description}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      {tool.category.toUpperCase()}
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/tools">
              <Button size="lg">
                View All Tools
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start Using Our Tools Today
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of developers who trust our tools for their daily data processing needs.
              No account required, completely free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tools/json/formatter">
                <Button size="lg">
                  Try JSON Formatter
                </Button>
              </Link>
              <Link href="/tools">
                <Button variant="outline" size="lg">
                  Browse All Tools
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </LayoutWrapper>
  );
}
