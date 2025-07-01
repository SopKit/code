export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  path: string;
  keywords: string[];
  featured?: boolean;
}

export interface ToolCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  tools: Tool[];
}

export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    id: 'json',
    name: 'JSON Tools',
    description: 'Format, validate, convert and manipulate JSON data',
    icon: 'FileJson',
    tools: [
      {
        id: 'json-formatter',
        name: 'JSON Formatter',
        description: 'Format and prettify JSON data with proper indentation',
        category: 'json',
        path: '/tools/json/formatter',
        keywords: ['json', 'format', 'prettify', 'beautify', 'pretty print'],
        featured: true
      },
      {
        id: 'json-validator',
        name: 'JSON Validator',
        description: 'Validate JSON syntax and structure',
        category: 'json',
        path: '/tools/json/validator',
        keywords: ['json', 'validate', 'check', 'syntax', 'verify'],
        featured: true
      },
      {
        id: 'json-editor',
        name: 'JSON Editor',
        description: 'Advanced JSON editor with syntax highlighting',
        category: 'json',
        path: '/tools/json/editor',
        keywords: ['json', 'edit', 'editor', 'syntax', 'highlighting']
      },
      {
        id: 'json-minifier',
        name: 'JSON Minifier',
        description: 'Compress JSON by removing whitespace and formatting',
        category: 'json',
        path: '/tools/json/minifier',
        keywords: ['json', 'minify', 'compress', 'reduce', 'minimize']
      },
      {
        id: 'json-viewer',
        name: 'JSON Viewer',
        description: 'View JSON data in a tree structure',
        category: 'json',
        path: '/tools/json/viewer',
        keywords: ['json', 'view', 'tree', 'structure', 'visualize']
      },
      {
        id: 'json-parser',
        name: 'JSON Parser',
        description: 'Parse and analyze JSON structure',
        category: 'json',
        path: '/tools/json/parser',
        keywords: ['json', 'parse', 'analyze', 'structure']
      },
      {
        id: 'json-stringify',
        name: 'JSON Stringify',
        description: 'Convert JavaScript objects to JSON strings',
        category: 'json',
        path: '/tools/json/stringify',
        keywords: ['json', 'stringify', 'convert', 'object', 'string']
      },
      {
        id: 'json-oneline',
        name: 'JSON to One Line',
        description: 'Convert multiline JSON to single line',
        category: 'json',
        path: '/tools/json/oneline',
        keywords: ['json', 'oneline', 'single', 'line', 'compress']
      },
      {
        id: 'json-compare',
        name: 'JSON Compare',
        description: 'Compare two JSON files or objects',
        category: 'json',
        path: '/tools/json/compare',
        keywords: ['json', 'compare', 'diff', 'difference', 'merge']
      },
      {
        id: 'json-sorter',
        name: 'JSON Sorter',
        description: 'Sort JSON keys alphabetically',
        category: 'json',
        path: '/tools/json/sorter',
        keywords: ['json', 'sort', 'alphabetical', 'keys', 'order']
      }
    ]
  },
  {
    id: 'converters',
    name: 'Converters',
    description: 'Convert between different data formats',
    icon: 'ArrowLeftRight',
    tools: [
      {
        id: 'json-to-xml',
        name: 'JSON to XML',
        description: 'Convert JSON data to XML format',
        category: 'converters',
        path: '/tools/converters/json-to-xml',
        keywords: ['json', 'xml', 'convert', 'transform'],
        featured: true
      },
      {
        id: 'json-to-csv',
        name: 'JSON to CSV',
        description: 'Convert JSON data to CSV format',
        category: 'converters',
        path: '/tools/converters/json-to-csv',
        keywords: ['json', 'csv', 'convert', 'spreadsheet']
      },
      {
        id: 'json-to-yaml',
        name: 'JSON to YAML',
        description: 'Convert JSON data to YAML format',
        category: 'converters',
        path: '/tools/converters/json-to-yaml',
        keywords: ['json', 'yaml', 'convert', 'configuration']
      },
      {
        id: 'xml-to-json',
        name: 'XML to JSON',
        description: 'Convert XML data to JSON format',
        category: 'converters',
        path: '/tools/converters/xml-to-json',
        keywords: ['xml', 'json', 'convert', 'transform']
      },
      {
        id: 'yaml-to-json',
        name: 'YAML to JSON',
        description: 'Convert YAML data to JSON format',
        category: 'converters',
        path: '/tools/converters/yaml-to-json',
        keywords: ['yaml', 'json', 'convert', 'configuration']
      },
      {
        id: 'csv-to-json',
        name: 'CSV to JSON',
        description: 'Convert CSV data to JSON format',
        category: 'converters',
        path: '/tools/converters/csv-to-json',
        keywords: ['csv', 'json', 'convert', 'spreadsheet']
      }
    ]
  },
  {
    id: 'xml',
    name: 'XML Tools',
    description: 'Format, validate and manipulate XML data',
    icon: 'FileCode',
    tools: [
      {
        id: 'xml-formatter',
        name: 'XML Formatter',
        description: 'Format and prettify XML data',
        category: 'xml',
        path: '/tools/xml/formatter',
        keywords: ['xml', 'format', 'prettify', 'beautify']
      },
      {
        id: 'xml-validator',
        name: 'XML Validator',
        description: 'Validate XML syntax and structure',
        category: 'xml',
        path: '/tools/xml/validator',
        keywords: ['xml', 'validate', 'check', 'syntax']
      },
      {
        id: 'xml-minifier',
        name: 'XML Minifier',
        description: 'Compress XML by removing whitespace',
        category: 'xml',
        path: '/tools/xml/minifier',
        keywords: ['xml', 'minify', 'compress', 'reduce']
      },
      {
        id: 'xml-viewer',
        name: 'XML Viewer',
        description: 'View XML data in a tree structure',
        category: 'xml',
        path: '/tools/xml/viewer',
        keywords: ['xml', 'view', 'tree', 'structure']
      }
    ]
  },
  {
    id: 'yaml',
    name: 'YAML Tools',
    description: 'Format, validate and manipulate YAML data',
    icon: 'FileText',
    tools: [
      {
        id: 'yaml-formatter',
        name: 'YAML Formatter',
        description: 'Format and prettify YAML data',
        category: 'yaml',
        path: '/tools/yaml/formatter',
        keywords: ['yaml', 'format', 'prettify', 'beautify']
      },
      {
        id: 'yaml-validator',
        name: 'YAML Validator',
        description: 'Validate YAML syntax and structure',
        category: 'yaml',
        path: '/tools/yaml/validator',
        keywords: ['yaml', 'validate', 'check', 'syntax']
      }
    ]
  },
  {
    id: 'html',
    name: 'HTML Tools',
    description: 'Format, validate and manipulate HTML data',
    icon: 'Code',
    tools: [
      {
        id: 'html-formatter',
        name: 'HTML Formatter',
        description: 'Format and prettify HTML code',
        category: 'html',
        path: '/tools/html/formatter',
        keywords: ['html', 'format', 'prettify', 'beautify']
      },
      {
        id: 'html-validator',
        name: 'HTML Validator',
        description: 'Validate HTML syntax and structure',
        category: 'html',
        path: '/tools/html/validator',
        keywords: ['html', 'validate', 'check', 'syntax']
      },
      {
        id: 'html-minifier',
        name: 'HTML Minifier',
        description: 'Compress HTML by removing whitespace',
        category: 'html',
        path: '/tools/html/minifier',
        keywords: ['html', 'minify', 'compress', 'reduce']
      }
    ]
  },
  {
    id: 'encoders',
    name: 'Encoders/Decoders',
    description: 'Encode and decode various data formats',
    icon: 'Lock',
    tools: [
      {
        id: 'url-encoder',
        name: 'URL Encoder/Decoder',
        description: 'Encode and decode URL strings',
        category: 'encoders',
        path: '/tools/encoders/url',
        keywords: ['url', 'encode', 'decode', 'uri', 'percent']
      },
      {
        id: 'base64-encoder',
        name: 'Base64 Encoder/Decoder',
        description: 'Encode and decode Base64 strings',
        category: 'encoders',
        path: '/tools/encoders/base64',
        keywords: ['base64', 'encode', 'decode', 'binary']
      },
      {
        id: 'html-escape',
        name: 'HTML Escape/Unescape',
        description: 'Escape and unescape HTML entities',
        category: 'encoders',
        path: '/tools/encoders/html-escape',
        keywords: ['html', 'escape', 'unescape', 'entities']
      }
    ]
  }
];

export const ALL_TOOLS = TOOL_CATEGORIES.flatMap(category => category.tools);
export const FEATURED_TOOLS = ALL_TOOLS.filter(tool => tool.featured);
