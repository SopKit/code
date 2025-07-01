export const SITE_CONFIG = {
  name: 'JSONTools.dev',
  description: 'Free online JSON, XML, YAML, HTML tools and converters. Format, validate, convert, and manipulate data with our comprehensive collection of developer tools.',
  url: 'https://jsontools.dev',
  ogImage: 'https://jsontools.dev/og.jpg',
  author: {
    name: 'JSONTools.dev',
    url: 'https://jsontools.dev',
  },
  creator: '@jsontools',
  keywords: [
    'JSON formatter',
    'JSON validator',
    'JSON tools',
    'XML formatter',
    'YAML formatter',
    'HTML formatter',
    'data converter',
    'developer tools',
    'online tools',
    'free tools'
  ],
  social: {
    twitter: '@jsontools',
    github: 'https://github.com/jsontools/jsontools',
  }
} as const;

export const NAVIGATION_ITEMS = [
  {
    title: 'JSON Tools',
    href: '/tools/json',
    description: 'Format, validate and manipulate JSON data'
  },
  {
    title: 'Converters',
    href: '/tools/converters',
    description: 'Convert between different data formats'
  },
  {
    title: 'XML Tools',
    href: '/tools/xml',
    description: 'Work with XML data'
  },
  {
    title: 'YAML Tools',
    href: '/tools/yaml',
    description: 'Format and validate YAML'
  },
  {
    title: 'HTML Tools',
    href: '/tools/html',
    description: 'HTML formatting and validation'
  },
  {
    title: 'Encoders',
    href: '/tools/encoders',
    description: 'Encode and decode data'
  }
] as const;

export const FOOTER_LINKS = {
  tools: {
    title: 'Popular Tools',
    items: [
      { title: 'JSON Formatter', href: '/tools/json/formatter' },
      { title: 'JSON Validator', href: '/tools/json/validator' },
      { title: 'JSON to XML', href: '/tools/converters/json-to-xml' },
      { title: 'XML to JSON', href: '/tools/converters/xml-to-json' },
      { title: 'Base64 Encoder', href: '/tools/encoders/base64' },
    ]
  },
  categories: {
    title: 'Categories',
    items: [
      { title: 'JSON Tools', href: '/tools/json' },
      { title: 'Converters', href: '/tools/converters' },
      { title: 'XML Tools', href: '/tools/xml' },
      { title: 'YAML Tools', href: '/tools/yaml' },
      { title: 'HTML Tools', href: '/tools/html' },
    ]
  },
  company: {
    title: 'Company',
    items: [
      { title: 'About', href: '/about' },
      { title: 'Privacy Policy', href: '/privacy' },
      { title: 'Terms of Service', href: '/terms' },
      { title: 'Contact', href: '/contact' },
    ]
  },
  resources: {
    title: 'Resources',
    items: [
      { title: 'Documentation', href: '/docs' },
      { title: 'API Reference', href: '/api' },
      { title: 'Blog', href: '/blog' },
      { title: 'FAQ', href: '/faq' },
    ]
  }
} as const;
