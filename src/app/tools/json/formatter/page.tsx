'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeEditor } from '@/components/ui/code-editor';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { formatJSON, validateJSON } from '@/utils';
import { LayoutWrapper } from '@/wrappers';
import { FileJson, Check, AlertCircle, Sparkles } from 'lucide-react';

export default function JSONFormatterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleFormat = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      setError('');
      setIsValid(false);
      return;
    }

    const result = formatJSON(input);
    if (result.success && result.data) {
      setOutput(result.data);
      setError('');
      setIsValid(true);
    } else {
      setOutput('');
      setError(result.error || 'Invalid JSON');
      setIsValid(false);
    }
  }, [input]);

  const handleValidate = useCallback(() => {
    if (!input.trim()) {
      setError('');
      setIsValid(false);
      return;
    }

    const result = validateJSON(input);
    if (result.success) {
      setError('');
      setIsValid(true);
    } else {
      setError(result.error || 'Invalid JSON');
      setIsValid(false);
    }
  }, [input]);

  const handleInputChange = useCallback((value: string) => {
    setInput(value);
    // Auto-validate on input change
    if (value.trim()) {
      const result = validateJSON(value);
      if (result.success) {
        setError('');
        setIsValid(true);
      } else {
        setError(result.error || 'Invalid JSON');
        setIsValid(false);
      }
    } else {
      setError('');
      setIsValid(false);
    }
  }, []);

  const handleExample = () => {
    const exampleJSON = `{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "country": "USA"
  },
  "hobbies": ["reading", "swimming", "coding"],
  "isActive": true,
  "balance": 1250.75
}`;
    setInput(exampleJSON);
    const result = formatJSON(exampleJSON);
    if (result.success && result.data) {
      setOutput(result.data);
      setError('');
      setIsValid(true);
    }
  };

  return (
    <LayoutWrapper>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileJson className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">JSON Formatter</h1>
              <p className="text-muted-foreground">
                Format and prettify JSON data with proper indentation and syntax highlighting
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleFormat} disabled={!input.trim()}>
              <Sparkles className="h-4 w-4 mr-2" />
              Format JSON
            </Button>
            <Button variant="outline" onClick={handleValidate} disabled={!input.trim()}>
              <Check className="h-4 w-4 mr-2" />
              Validate Only
            </Button>
            <Button variant="outline" onClick={handleExample}>
              Load Example
            </Button>
          </div>

          {/* Status */}
          {input.trim() && (
            <div className="flex items-center gap-2 mt-4">
              {isValid ? (
                <>
                  <Check className="h-4 w-4 text-green-600" />
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Valid JSON
                  </Badge>
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <Badge variant="destructive">
                    Invalid JSON
                  </Badge>
                </>
              )}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <CodeEditor
            title="Input JSON"
            placeholder="Paste your JSON here..."
            value={input}
            onChange={handleInputChange}
            language="json"
            error={error}
            success={isValid && input.trim().length > 0}
            minHeight="min-h-[400px]"
          />

          {/* Output */}
          <CodeEditor
            title="Formatted JSON"
            placeholder="Formatted JSON will appear here..."
            value={output}
            onChange={() => {}} // Read-only
            language="json"
            readOnly
            success={output.length > 0}
            minHeight="min-h-[400px]"
          />
        </div>

        <Separator className="my-8" />

        {/* Features & Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">✓ Pretty print with proper indentation</p>
              <p className="text-sm text-muted-foreground">✓ Syntax validation</p>
              <p className="text-sm text-muted-foreground">✓ Error highlighting</p>
              <p className="text-sm text-muted-foreground">✓ Copy to clipboard</p>
              <p className="text-sm text-muted-foreground">✓ Download formatted JSON</p>
              <p className="text-sm text-muted-foreground">✓ Drag & drop file support</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">About JSON</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                JSON (JavaScript Object Notation) is a lightweight data-interchange format. 
                It is easy for humans to read and write, and easy for machines to parse and generate.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Use Cases</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">• API response formatting</p>
              <p className="text-sm text-muted-foreground">• Configuration file cleanup</p>
              <p className="text-sm text-muted-foreground">• Data structure visualization</p>
              <p className="text-sm text-muted-foreground">• JSON validation and debugging</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </LayoutWrapper>
  );
}
