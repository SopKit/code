export interface ToolPageProps {
  params: {
    category?: string;
    tool?: string;
  };
}

export interface MetadataProps {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
}

export interface ToolResult {
  success: boolean;
  data?: string;
  error?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors?: string[];
  warnings?: string[];
}

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  path: string;
  relevance: number;
}

export interface RecentTool {
  id: string;
  name: string;
  path: string;
  timestamp: number;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large';
  autoFormat: boolean;
  showLineNumbers: boolean;
  wrapLines: boolean;
}
