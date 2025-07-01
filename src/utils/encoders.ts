import * as he from 'he';
import { Base64 } from 'js-base64';

export interface EncodeResult {
  success: boolean;
  data?: string;
  error?: string;
}

// URL Encoding/Decoding
export const urlEncode = (input: string): EncodeResult => {
  try {
    const encoded = encodeURIComponent(input);
    return { success: true, data: encoded };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'URL encoding failed'
    };
  }
};

export const urlDecode = (input: string): EncodeResult => {
  try {
    const decoded = decodeURIComponent(input);
    return { success: true, data: decoded };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'URL decoding failed'
    };
  }
};

// Base64 Encoding/Decoding
export const base64Encode = (input: string): EncodeResult => {
  try {
    const encoded = Base64.encode(input);
    return { success: true, data: encoded };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Base64 encoding failed'
    };
  }
};

export const base64Decode = (input: string): EncodeResult => {
  try {
    const decoded = Base64.decode(input);
    return { success: true, data: decoded };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Base64 decoding failed'
    };
  }
};

// HTML Escape/Unescape
export const htmlEscape = (input: string): EncodeResult => {
  try {
    const escaped = he.encode(input);
    return { success: true, data: escaped };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'HTML escaping failed'
    };
  }
};

export const htmlUnescape = (input: string): EncodeResult => {
  try {
    const unescaped = he.decode(input);
    return { success: true, data: unescaped };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'HTML unescaping failed'
    };
  }
};

// XML Escape/Unescape
export const xmlEscape = (input: string): EncodeResult => {
  try {
    const escaped = input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
    return { success: true, data: escaped };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'XML escaping failed'
    };
  }
};

export const xmlUnescape = (input: string): EncodeResult => {
  try {
    const unescaped = input
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'");
    return { success: true, data: unescaped };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'XML unescaping failed'
    };
  }
};

// JavaScript Escape/Unescape
export const jsEscape = (input: string): EncodeResult => {
  try {
    const escaped = JSON.stringify(input).slice(1, -1); // Remove surrounding quotes
    return { success: true, data: escaped };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'JavaScript escaping failed'
    };
  }
};

export const jsUnescape = (input: string): EncodeResult => {
  try {
    const unescaped = JSON.parse(`"${input}"`);
    return { success: true, data: unescaped };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'JavaScript unescaping failed'
    };
  }
};

// SQL Escape (basic)
export const sqlEscape = (input: string): EncodeResult => {
  try {
    const escaped = input.replace(/'/g, "''");
    return { success: true, data: escaped };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'SQL escaping failed'
    };
  }
};

export const sqlUnescape = (input: string): EncodeResult => {
  try {
    const unescaped = input.replace(/''/g, "'");
    return { success: true, data: unescaped };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'SQL unescaping failed'
    };
  }
};
