import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JSON Pretty Print - Free Online JSON Beautifier Tool',
  description: 'Transform compact JSON into beautifully formatted, human-readable code with proper indentation and spacing. Free JSON pretty printer with syntax validation and error highlighting.',
  keywords: [
    'JSON pretty print',
    'JSON beautifier',
    'JSON formatter',
    'JSON indent',
    'JSON readable',
    'JSON format',
    'JSON spacing',
    'JSON structure',
    'pretty print JSON',
    'beautify JSON',
    'format JSON online',
    'JSON indentation',
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
    title: 'JSON Pretty Print - Free Online JSON Beautifier Tool',
    description: 'Transform compact JSON into beautifully formatted, human-readable code with proper indentation and spacing.',
    url: 'https://jsontools.dev/tools/json/pretty-print',
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
    title: 'JSON Pretty Print - Free Online JSON Beautifier Tool',
    description: 'Transform compact JSON into beautifully formatted, human-readable code.',
    images: ['https://jsontools.dev/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://jsontools.dev/tools/json/pretty-print',
  },
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function JSONPrettyPrintLayout({ children }: LayoutProps) {
  return children;
}
