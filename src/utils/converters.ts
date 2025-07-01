import * as yaml from 'js-yaml';
import * as xml2js from 'xml2js';

export interface ConvertResult {
  success: boolean;
  data?: string;
  error?: string;
}

export const jsonToXml = async (input: string): Promise<ConvertResult> => {
  try {
    const jsonData = JSON.parse(input);
    const builder = new xml2js.Builder({
      rootName: 'root',
      renderOpts: { pretty: true, indent: '  ' }
    });
    const xml = builder.buildObject(jsonData);
    return { success: true, data: xml };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Conversion failed'
    };
  }
};

export const xmlToJson = async (input: string): Promise<ConvertResult> => {
  try {
    const parser = new xml2js.Parser({
      explicitArray: false,
      mergeAttrs: true
    });
    const result = await parser.parseStringPromise(input);
    const json = JSON.stringify(result, null, 2);
    return { success: true, data: json };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Invalid XML'
    };
  }
};

export const jsonToYaml = (input: string): ConvertResult => {
  try {
    const jsonData = JSON.parse(input);
    const yamlData = yaml.dump(jsonData, { indent: 2 });
    return { success: true, data: yamlData };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Invalid JSON'
    };
  }
};

export const yamlToJson = (input: string): ConvertResult => {
  try {
    const yamlData = yaml.load(input);
    const json = JSON.stringify(yamlData, null, 2);
    return { success: true, data: json };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Invalid YAML'
    };
  }
};

export const jsonToCsv = (input: string): ConvertResult => {
  try {
    const jsonData = JSON.parse(input);
    
    if (!Array.isArray(jsonData)) {
      return {
        success: false,
        error: 'JSON must be an array of objects for CSV conversion'
      };
    }
    
    if (jsonData.length === 0) {
      return { success: true, data: '' };
    }
    
    // Get all unique keys from all objects
    const allKeys = new Set<string>();
    jsonData.forEach(item => {
      if (typeof item === 'object' && item !== null) {
        Object.keys(item).forEach(key => allKeys.add(key));
      }
    });
    
    const headers = Array.from(allKeys);
    
    // Create CSV content
    const csvRows = [headers.join(',')];
    
    jsonData.forEach(item => {
      const row = headers.map(header => {
        const value = (item as Record<string, unknown>)[header];
        if (value === null || value === undefined) {
          return '';
        }
        const stringValue = String(value);
        // Escape quotes and wrap in quotes if contains comma or quote
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
      });
      csvRows.push(row.join(','));
    });
    
    return { success: true, data: csvRows.join('\n') };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Invalid JSON'
    };
  }
};

export const csvToJson = (input: string): ConvertResult => {
  try {
    const lines = input.trim().split('\n');
    if (lines.length === 0) {
      return { success: true, data: '[]' };
    }
    
    // Parse CSV manually to handle quoted values
    const parseCSVLine = (line: string): string[] => {
      const result: string[] = [];
      let current = '';
      let inQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
          if (inQuotes && line[i + 1] === '"') {
            // Escaped quote
            current += '"';
            i++; // Skip next quote
          } else {
            // Toggle quote state
            inQuotes = !inQuotes;
          }
        } else if (char === ',' && !inQuotes) {
          result.push(current);
          current = '';
        } else {
          current += char;
        }
      }
      
      result.push(current);
      return result;
    };
    
    const headers = parseCSVLine(lines[0]);
    const jsonArray: Record<string, string>[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim()) {
        const values = parseCSVLine(lines[i]);
        const obj: Record<string, string> = {};
        headers.forEach((header, index) => {
          obj[header] = values[index] || '';
        });
        jsonArray.push(obj);
      }
    }
    
    return { success: true, data: JSON.stringify(jsonArray, null, 2) };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Invalid CSV'
    };
  }
};
