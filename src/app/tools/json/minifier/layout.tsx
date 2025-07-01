import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JSON Minifier - Compress JSON Online Tool',
  description: 'Compress and minify JSON data by removing whitespace, line breaks, and formatting. Free online JSON minifier tool for optimizing JSON size.',
  keywords: [
    'JSON minifier',
    'JSON compress',
    'JSON minify',
    'JSON optimizer',
    'reduce JSON size',
    'compress JSON',
    'minify JSON online',
    'JSON size reducer',
    'JSON whitespace remover',
    'JSON compression',
    'optimize JSON',
    'JSON tools',
    'JSON developer tools'
  ],
  authors: [{ name: 'SopKit Code Tools' }],
  creator: 'SopKit',
  publisher: 'SopKit Code Tools',
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
    title: 'JSON Minifier - Compress JSON Online Tool',
    description: 'Compress and minify JSON data by removing whitespace and formatting. Free online tool.',
    url: 'https://sopkit.github.io/code/tools/json/minifier',
    siteName: 'SopKit Code Tools',
    images: [
      {
        url: 'https://sopkit.github.io/code/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Minifier - Compress JSON Online Tool',
    description: 'Compress and minify JSON data by removing whitespace and formatting.',
    images: ['https://sopkit.github.io/code/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://sopkit.github.io/code/tools/json/minifier',
  },
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function JSONMinifierLayout({ children }: LayoutProps) {
  return children;
}
