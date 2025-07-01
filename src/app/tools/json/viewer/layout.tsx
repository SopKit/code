import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JSON Viewer - Interactive JSON Tree Visualizer Tool',
  description: 'View and explore JSON data in an interactive tree structure. Free JSON viewer with collapsible nodes, search, and navigation. Perfect for complex JSON analysis.',
  keywords: [
    'JSON viewer',
    'JSON tree',
    'JSON visualizer',
    'JSON explorer',
    'JSON navigator',
    'JSON structure',
    'JSON hierarchy',
    'JSON inspector',
    'view JSON online',
    'JSON tree view',
    'JSON data explorer',
    'JSON browser',
    'JSON tools',
    'JSON developer tools'
  ],
  authors: [{ name: 'JSON Tools' }],
  creator: 'JSON Tools',
  publisher: 'JSON Tools',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'JSON Viewer - Interactive JSON Tree Visualizer Tool',
    description: 'View and explore JSON data in an interactive tree structure with collapsible nodes and search functionality.',
    url: 'https://jsontools.dev/tools/json/viewer',
    siteName: 'JSON Tools',
    images: [
      {
        url: 'https://jsontools.dev/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Viewer - Interactive JSON Tree Visualizer Tool',
    description: 'View and explore JSON data in an interactive tree structure.',
    images: ['https://jsontools.dev/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://jsontools.dev/tools/json/viewer',
  },
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function JSONViewerLayout({ children }: LayoutProps) {
  return children;
}
