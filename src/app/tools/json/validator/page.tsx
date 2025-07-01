'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeEditor } from '@/components/ui/code-editor';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { validateJSON } from '@/utils';
import { LayoutWrapper } from '@/wrappers';
import { Shield, Check, AlertCircle, AlertTriangle } from 'lucide-react';

export default function JSONValidatorPage() {
  const [input, setInput] = useState('');
  const [validationResult, setValidationResult] = useState<{
    success: boolean;
    error?: string;
    message?: string;
  } | null>(null);

  const handleValidate = useCallback(() => {
    if (!input.trim()) {
      setValidationResult(null);
      return;
    }

    const result = validateJSON(input);
    setValidationResult(result);
  }, [input]);

  const handleInputChange = useCallback((value: string) => {
    setInput(value);
    // Auto-validate on input change with debouncing
    if (value.trim()) {
      const result = validateJSON(value);
      setValidationResult(result);
    } else {
      setValidationResult(null);
    }
  }, []);

  const handleExample = () => {
    const exampleJSON = `{
  "name": "Valid JSON Example",
  "type": "object",
  "properties": {
    "string": "Hello World",
    "number": 42,
    "boolean": true,
    "null_value": null,
    "array": [1, 2, 3],
    "nested_object": {
      "key": "value"
    }
  },
  "created_at": "2025-01-07T12:00:00Z"
}`;
    setInput(exampleJSON);
    const result = validateJSON(exampleJSON);
    setValidationResult(result);
  };

  const handleInvalidExample = () => {
    const invalidJSON = `{
  "name": "Invalid JSON Example",
  "missing_quote: "This will cause an error",
  "trailing_comma": true,
  "unclosed_object": {
    "nested": "value"
  // Missing closing bracket
}`;
    setInput(invalidJSON);
    const result = validateJSON(invalidJSON);
    setValidationResult(result);
  };

  return (
    <LayoutWrapper>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">JSON Validator</h1>
              <p className="text-muted-foreground">
                Validate JSON syntax and check for errors in your JSON data
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleValidate} disabled={!input.trim()}>
              <Shield className="h-4 w-4 mr-2" />
              Validate JSON
            </Button>
            <Button variant="outline" onClick={handleExample}>
              Load Valid Example
            </Button>
            <Button variant="outline" onClick={handleInvalidExample}>
              Load Invalid Example
            </Button>
          </div>

          {/* Validation Status */}
          {validationResult && (
            <div className="mt-4">
              {validationResult.success ? (
                <Alert className="border-green-200 bg-green-50">
                  <Check className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>Valid JSON!</strong> Your JSON syntax is correct and well-formed.
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Invalid JSON:</strong> {validationResult.error}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input */}
          <div className="lg:col-span-2">
            <CodeEditor
              title="JSON Input"
              placeholder="Paste your JSON here to validate..."
              value={input}
              onChange={handleInputChange}
              language="json"
              error={validationResult?.success === false ? validationResult.error : undefined}
              success={validationResult?.success === true}
              minHeight="min-h-[500px]"
            />
          </div>

          {/* Validation Info */}
          <div className="space-y-6">
            {/* Status Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {validationResult?.success ? (
                    <Check className="h-5 w-5 text-green-600" />
                  ) : validationResult?.success === false ? (
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-gray-400" />
                  )}
                  Validation Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!validationResult ? (
                  <p className="text-muted-foreground">Enter JSON to validate</p>
                ) : validationResult.success ? (
                  <div className="space-y-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      ✓ Valid JSON
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      Your JSON is syntactically correct and ready to use.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Badge variant="destructive">
                      ✗ Invalid JSON
                    </Badge>
                    <p className="text-sm text-red-600">
                      {validationResult.error}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* JSON Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">About JSON Validation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  JSON validation checks for:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Proper bracket/brace matching</li>
                  <li>• Correct comma placement</li>
                  <li>• Valid string escaping</li>
                  <li>• Proper key-value syntax</li>
                  <li>• No trailing commas</li>
                  <li>• Valid data types</li>
                </ul>
              </CardContent>
            </Card>

            {/* Common Errors */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Common JSON Errors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <p><strong>Missing quotes:</strong> Keys must be in double quotes</p>
                  <p><strong>Trailing commas:</strong> No comma after last element</p>
                  <p><strong>Single quotes:</strong> Use double quotes only</p>
                  <p><strong>Unescaped characters:</strong> Escape special characters</p>
                  <p><strong>Unclosed brackets:</strong> Every [ needs a ]</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Features & Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">✓ Real-time validation</p>
              <p className="text-sm text-muted-foreground">✓ Detailed error messages</p>
              <p className="text-sm text-muted-foreground">✓ Syntax highlighting</p>
              <p className="text-sm text-muted-foreground">✓ Example data loading</p>
              <p className="text-sm text-muted-foreground">✓ File upload support</p>
              <p className="text-sm text-muted-foreground">✓ No data stored</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Use Cases</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">• API response validation</p>
              <p className="text-sm text-muted-foreground">• Configuration file checking</p>
              <p className="text-sm text-muted-foreground">• Data structure verification</p>
              <p className="text-sm text-muted-foreground">• Debug JSON parsing errors</p>
              <p className="text-sm text-muted-foreground">• Pre-deployment validation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">JSON Standards</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This validator follows RFC 7159 and ECMA-404 JSON standards,
                ensuring compatibility with all major JSON parsers and APIs.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </LayoutWrapper>
  );
}
