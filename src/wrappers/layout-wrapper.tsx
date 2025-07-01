import { ReactNode } from 'react';
import { SITE_CONFIG } from '@/constants';

interface LayoutWrapperProps {
  children: ReactNode;
  className?: string;
}

export function LayoutWrapper({ children, className = '' }: LayoutWrapperProps) {
  return (
    <div className={`min-h-screen bg-background ${className}`}>
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-primary">
                {SITE_CONFIG.name}
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="/tools" className="text-sm font-medium hover:text-primary">
                Tools
              </a>
              <a href="/about" className="text-sm font-medium hover:text-primary">
                About
              </a>
              <a href="/blog" className="text-sm font-medium hover:text-primary">
                Blog
              </a>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="border-t bg-muted/50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 {SITE_CONFIG.name}. All rights reserved.</p>
            <p className="mt-2">
              Free online tools for developers. Format, validate, and convert your data.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
