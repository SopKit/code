"use client";

import React, { useState } from "react";
import { LayoutWrapper } from "@/wrappers";
import { CodeEditor } from "@/components/ui/code-editor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { 
  CheckCircle, 
  AlertCircle, 
  Copy, 
  Upload, 
  RotateCcw, 
  Eye,
  FileJson
} from "lucide-react";

export default function JSONViewerPage() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const { toast } = useToast();

  // Sample JSON for demonstration
  const sampleJSON = {
    "name": "John Doe",
    "age": 30,
    "email": "john.doe@example.com",
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "zipCode": "10001"
    },
    "hobbies": ["reading", "swimming", "coding"],
    "isActive": true
  };

  const validateJSONInput = (input: string) => {
    try {
      JSON.parse(input);
      return { isValid: true };
    } catch (error) {
      return { 
        isValid: false, 
        error: error instanceof Error ? error.message : 'Invalid JSON' 
      };
    }
  };

  const handleValidation = () => {
    if (!input.trim()) {
      setError("");
      setIsValid(false);
      return;
    }

    const validation = validateJSONInput(input);
    setIsValid(validation.isValid);
    setError(validation.error || "");
  };

  const handleLoadSample = () => {
    const formattedSample = JSON.stringify(sampleJSON, null, 2);
    setInput(formattedSample);
    handleValidation();
    toast({
      title: "Sample Loaded",
      description: "Sample JSON data has been loaded into the viewer.",
    });
  };

  const handleClearAll = () => {
    setInput("");
    setError("");
    setIsValid(false);
    toast({
      title: "Viewer Cleared",
      description: "All content has been cleared from the viewer.",
    });
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied",
        description: "Content copied to clipboard successfully.",
      });
    } catch {
      toast({
        title: "Copy Failed",
        description: "Failed to copy content to clipboard.",
        variant: "destructive",
      });
    }
  };

  return (
    <LayoutWrapper>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Eye className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">JSON Viewer</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore and visualize JSON data in an interactive tree structure with search, navigation, and detailed insights.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          <Button onClick={handleLoadSample} variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Load Sample
          </Button>
          <Button onClick={() => copyToClipboard(input)} variant="outline" size="sm" disabled={!input}>
            <Copy className="h-4 w-4 mr-2" />
            Copy JSON
          </Button>
          <Button onClick={handleClearAll} variant="outline" size="sm">
            <RotateCcw className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>

        {/* Status */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>JSON Error:</strong> {error}
            </AlertDescription>
          </Alert>
        )}

        {isValid && (
          <Alert className="mb-6 border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              ✓ Valid JSON loaded and ready for viewing
            </AlertDescription>
          </Alert>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Input */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileJson className="h-5 w-5" />
                JSON Input
              </CardTitle>
              <CardDescription>
                Paste your JSON data to visualize in tree view
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeEditor
                title="JSON Input"
                value={input}
                onChange={setInput}
                language="json"
                placeholder="Paste your JSON here..."
                error={error}
              />
              <Button onClick={handleValidation} className="mt-4 w-full">
                Validate & View
              </Button>
            </CardContent>
          </Card>

          {/* Simple Tree Viewer */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                JSON Structure
              </CardTitle>
              <CardDescription>
                Visual representation of your JSON data
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isValid && input ? (
                <div className="max-h-96 overflow-auto border rounded-lg p-4 bg-muted/20">
                  <pre className="text-sm font-mono whitespace-pre-wrap">
                    {JSON.stringify(JSON.parse(input), null, 2)}
                  </pre>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Enter valid JSON to see the structure
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-center mb-8">Viewer Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-blue-500" />
                    Visual Structure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    View JSON data in a clean, organized format that&apos;s easy to read and understand.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Instant Validation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Validate JSON syntax and structure with detailed error reporting.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Copy className="h-5 w-5 text-purple-500" />
                    Easy Copy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Copy JSON data to clipboard with one click for use in other applications.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
