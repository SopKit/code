import beautify from 'js-beautify';
import formatXml from 'xml-formatter';
import * as yaml from 'js-yaml';
import cssbeautify from 'cssbeautify';

export interface FormatterResult {
  success: boolean;
  data?: string;
  error?: string;
}

// HTML Formatting
export const formatHTML = (input: string): FormatterResult => {
  try {
    const formatted = beautify.html(input, {
      indent_size: 2,
      preserve_newlines: true,
      max_preserve_newlines: 2,
      wrap_line_length: 120,
      end_with_newline: true
    });
    return { success: true, data: formatted };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'HTML formatting failed'
    };
  }
};

export const minifyHTML = (input: string): FormatterResult => {
  try {
    // Simple client-side HTML minification
    const minified = input
      .replace(/>\s+</g, '><') // Remove whitespace between tags
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
      .trim();
    return { success: true, data: minified };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'HTML minification failed'
    };
  }
};

// XML Formatting
export const formatXML = (input: string): FormatterResult => {
  try {
    const formatted = formatXml(input, {
      indentation: '  ',
      collapseContent: true
    });
    return { success: true, data: formatted };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'XML formatting failed'
    };
  }
};

export const minifyXML = (input: string): FormatterResult => {
  try {
    const minified = input
      .replace(/>\s+</g, '><')
      .replace(/\s+/g, ' ')
      .trim();
    return { success: true, data: minified };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'XML minification failed'
    };
  }
};

// YAML Formatting
export const formatYAML = (input: string): FormatterResult => {
  try {
    const parsed = yaml.load(input);
    const formatted = yaml.dump(parsed, {
      indent: 2,
      lineWidth: 120,
      noRefs: true
    });
    return { success: true, data: formatted };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'YAML formatting failed'
    };
  }
};

export const validateYAML = (input: string): FormatterResult => {
  try {
    yaml.load(input);
    return { success: true, data: 'Valid YAML' };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Invalid YAML'
    };
  }
};

// CSS Formatting
export const formatCSS = (input: string): FormatterResult => {
  try {
    const formatted = cssbeautify(input, {
      indent: '  ',
      autosemicolon: true
    });
    return { success: true, data: formatted };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'CSS formatting failed'
    };
  }
};

export const minifyCSS = (input: string): FormatterResult => {
  try {
    const minified = input
      .replace(/\s+/g, ' ')
      .replace(/;\s*}/g, '}')
      .replace(/{\s*/g, '{')
      .replace(/;\s*/g, ';')
      .replace(/:\s*/g, ':')
      .replace(/,\s*/g, ',')
      .trim();
    return { success: true, data: minified };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'CSS minification failed'
    };
  }
};

// JavaScript Formatting
export const formatJS = (input: string): FormatterResult => {
  try {
    const formatted = beautify.js(input, {
      indent_size: 2,
      preserve_newlines: true,
      max_preserve_newlines: 2,
      space_in_empty_paren: false,
      jslint_happy: false,
      end_with_newline: true
    });
    return { success: true, data: formatted };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'JavaScript formatting failed'
    };
  }
};

// TypeScript Formatting (same as JS)
export const formatTS = (input: string): FormatterResult => {
  return formatJS(input);
};
