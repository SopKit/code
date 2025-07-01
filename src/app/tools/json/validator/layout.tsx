import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JSON Validator - Free Online JSON Syntax Checker',
  description: 'Validate JSON syntax online for free. Check for JSON errors, syntax issues, and formatting problems. Real-time validation with detailed error messages.',
  keywords: [
    'JSON validator',
    'JSON syntax checker',
    'validate JSON',
    'JSON error checker',
    'online JSON validator',
    'JSON verification',
    'JSON syntax validation',
    'check JSON format'
  ],
  openGraph: {
    title: 'JSON Validator - Free Online JSON Syntax Checker',
    description: 'Validate JSON syntax online for free. Check for JSON errors and syntax issues with real-time validation.',
    type: 'website',
    url: 'https://sopkit.github.io/code/tools/json/validator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Validator - Free Online JSON Syntax Checker',
    description: 'Validate JSON syntax online for free. Check for JSON errors and syntax issues with real-time validation.',
  },
  alternates: {
    canonical: 'https://sopkit.github.io/code/tools/json/validator',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function JSONValidatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
