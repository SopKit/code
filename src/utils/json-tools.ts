export interface FormatResult {
  success: boolean;
  data?: string;
  error?: string;
}

export const formatJSON = (input: string): FormatResult => {
  try {
    const parsed = JSON.parse(input);
    const formatted = JSON.stringify(parsed, null, 2);
    return { success: true, data: formatted };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Invalid JSON' 
    };
  }
};

export const validateJSON = (input: string): FormatResult => {
  try {
    JSON.parse(input);
    return { success: true, data: 'Valid JSON' };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Invalid JSON' 
    };
  }
};

export const minifyJSON = (input: string): FormatResult => {
  try {
    const parsed = JSON.parse(input);
    const minified = JSON.stringify(parsed);
    return { success: true, data: minified };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Invalid JSON' 
    };
  }
};

export const sortJSONKeys = (input: string): FormatResult => {
  try {
    const parsed = JSON.parse(input);
    
    const sortObjectKeys = (obj: unknown): unknown => {
      if (Array.isArray(obj)) {
        return obj.map(sortObjectKeys);
      } else if (obj !== null && typeof obj === 'object') {
        const sortedObj: Record<string, unknown> = {};
        Object.keys(obj).sort().forEach(key => {
          sortedObj[key] = sortObjectKeys((obj as Record<string, unknown>)[key]);
        });
        return sortedObj;
      }
      return obj;
    };
    
    const sorted = sortObjectKeys(parsed);
    const formatted = JSON.stringify(sorted, null, 2);
    return { success: true, data: formatted };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Invalid JSON' 
    };
  }
};

export const jsonToOneLine = (input: string): FormatResult => {
  try {
    const parsed = JSON.parse(input);
    const oneLine = JSON.stringify(parsed);
    return { success: true, data: oneLine };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Invalid JSON' 
    };
  }
};

export const compareJSON = (input1: string, input2: string) => {
  try {
    const obj1 = JSON.parse(input1);
    const obj2 = JSON.parse(input2);
    
    const differences: string[] = [];
    
    const compare = (obj1: unknown, obj2: unknown, path = ''): void => {
      if (typeof obj1 !== typeof obj2) {
        differences.push(`Type mismatch at ${path || 'root'}: ${typeof obj1} vs ${typeof obj2}`);
        return;
      }
      
      if (Array.isArray(obj1) && Array.isArray(obj2)) {
        if (obj1.length !== obj2.length) {
          differences.push(`Array length mismatch at ${path}: ${obj1.length} vs ${obj2.length}`);
        }
        const maxLength = Math.max(obj1.length, obj2.length);
        for (let i = 0; i < maxLength; i++) {
          const newPath = `${path}[${i}]`;
          if (i >= obj1.length) {
            differences.push(`Missing item in first array at ${newPath}`);
          } else if (i >= obj2.length) {
            differences.push(`Extra item in first array at ${newPath}`);
          } else {
            compare(obj1[i], obj2[i], newPath);
          }
        }
      } else if (obj1 !== null && obj2 !== null && typeof obj1 === 'object' && typeof obj2 === 'object') {
        const keys1 = Object.keys(obj1 as Record<string, unknown>);
        const keys2 = Object.keys(obj2 as Record<string, unknown>);
        const allKeys = new Set([...keys1, ...keys2]);
        
        for (const key of allKeys) {
          const newPath = path ? `${path}.${key}` : key;
          if (!(key in (obj1 as Record<string, unknown>))) {
            differences.push(`Missing key in first object: ${newPath}`);
          } else if (!(key in (obj2 as Record<string, unknown>))) {
            differences.push(`Extra key in first object: ${newPath}`);
          } else {
            compare(
              (obj1 as Record<string, unknown>)[key], 
              (obj2 as Record<string, unknown>)[key], 
              newPath
            );
          }
        }
      } else if (obj1 !== obj2) {
        differences.push(`Value mismatch at ${path || 'root'}: ${JSON.stringify(obj1)} vs ${JSON.stringify(obj2)}`);
      }
    };
    
    compare(obj1, obj2);
    
    if (differences.length === 0) {
      return { success: true, data: 'Objects are identical' };
    } else {
      return { 
        success: true, 
        data: `Found ${differences.length} difference(s):\n\n${differences.join('\n')}` 
      };
    }
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Invalid JSON in one or both inputs' 
    };
  }
};
