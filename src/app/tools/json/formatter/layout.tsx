import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JSON Formatter - Free Online JSON Pretty Print Tool',
  description: 'Format and prettify JSON data online. Free JSON formatter with syntax validation, error highlighting, and pretty print. Works offline, no registration required.',
  keywords: [
    'JSON formatter',
    'JSON pretty print',
    'JSON beautifier',
    'JSON validator',
    'online JSON tool',
    'format JSON',
    'prettify JSON',
    'JSON syntax checker'
  ],
  openGraph: {
    title: 'JSON Formatter - Free Online JSON Pretty Print Tool',
    description: 'Format and prettify JSON data online. Free JSON formatter with syntax validation and error highlighting.',
    type: 'website',
    url: 'https://sopkit.github.io/code/tools/json/formatter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Formatter - Free Online JSON Pretty Print Tool',
    description: 'Format and prettify JSON data online. Free JSON formatter with syntax validation and error highlighting.',
  },
  alternates: {
    canonical: 'https://sopkit.github.io/code/tools/json/formatter',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function JSONFormatterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
