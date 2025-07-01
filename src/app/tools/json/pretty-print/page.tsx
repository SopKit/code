"use client";

import { useState } from "react";
import { LayoutWrapper } from "@/wrappers";
import { CodeEditor } from "@/components/ui/code-editor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { formatJSON } from "@/utils/json-tools";
import { 
  CheckCircle, 
  AlertCircle, 
  Copy, 
  Download, 
  Upload, 
  RotateCcw, 
  Sparkles,
  FileJson 
} from "lucide-react";

export default function JSONPrettyPrintPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const { toast } = useToast();

  const handleFormat = () => {
    if (!input.trim()) {
      setError("Please enter some JSON to pretty print");
      setOutput("");
      setIsValid(false);
      return;
    }

    try {
      const result = formatJSON(input);
      if (result.success && result.data) {
        setOutput(result.data);
        setError("");
        setIsValid(true);
        toast({
          title: "JSON Pretty Printed",
          description: "Your JSON has been formatted successfully.",
        });
      } else {
        setError(result.error || "Invalid JSON format");
        setOutput("");
        setIsValid(false);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to format JSON";
      setError(errorMessage);
      setOutput("");
      setIsValid(false);
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
    setIsValid(false);
    toast({
      title: "Cleared",
      description: "Input and output have been cleared.",
    });
  };

  const handleLoadSample = () => {
    const sampleJSON = '{"name":"John Doe","age":30,"email":"john.doe@example.com","address":{"street":"123 Main St","city":"New York","zipCode":"10001"},"hobbies":["reading","swimming","coding"],"isActive":true}';
    setInput(sampleJSON);
    toast({
      title: "Sample Loaded",
      description: "Sample JSON has been loaded for formatting.",
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

  const downloadJSON = () => {
    if (!output) {
      toast({
        title: "No Output",
        description: "Please format some JSON first.",
        variant: "destructive",
      });
      return;
    }

    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pretty-printed.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download Started",
      description: "Your pretty-printed JSON file download has started.",
    });
  };

  return (
    <LayoutWrapper>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">JSON Pretty Print</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform compact JSON into beautifully formatted, human-readable code with proper indentation and spacing.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          <Button onClick={handleLoadSample} variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Load Sample
          </Button>
          <Button onClick={handleFormat} variant="default" size="sm" disabled={!input.trim()}>
            <Sparkles className="h-4 w-4 mr-2" />
            Pretty Print
          </Button>
          <Button onClick={() => copyToClipboard(output)} variant="outline" size="sm" disabled={!output}>
            <Copy className="h-4 w-4 mr-2" />
            Copy Result
          </Button>
          <Button onClick={downloadJSON} variant="outline" size="sm" disabled={!output}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button onClick={handleClear} variant="outline" size="sm">
            <RotateCcw className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>

        {/* Status */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Error:</strong> {error}
            </AlertDescription>
          </Alert>
        )}

        {isValid && output && (
          <Alert className="mb-6 border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              ✓ JSON pretty printed successfully!
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
                Input JSON
              </CardTitle>
              <CardDescription>
                Paste your compact or minified JSON data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeEditor
                title="JSON Input"
                value={input}
                onChange={setInput}
                language="json"
                placeholder="Paste your JSON here... Example: {&quot;name&quot;:&quot;John&quot;,&quot;age&quot;:30}"
              />
            </CardContent>
          </Card>

          {/* Output */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Pretty Printed JSON
                {output && <Badge variant="secondary">Formatted</Badge>}
              </CardTitle>
              <CardDescription>
                Beautifully formatted JSON with proper indentation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeEditor
                title="Formatted Output"
                value={output}
                onChange={() => {}}
                language="json"
                placeholder="Pretty printed JSON will appear here..."
                readOnly
              />
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-center mb-8">Why Use JSON Pretty Print?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-blue-500" />
                    Beautiful Formatting
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Transform compact JSON into clean, readable format with proper indentation and line breaks.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Instant Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Get immediately formatted output with syntax validation and error detection.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5 text-purple-500" />
                    Easy Export
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Copy to clipboard or download your pretty-printed JSON with one click.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Use Cases */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Common Use Cases</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">🔧 API Development</h4>
                <p className="text-sm text-muted-foreground">
                  Format API responses and payloads for better readability during development and debugging.
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">📄 Documentation</h4>
                <p className="text-sm text-muted-foreground">
                  Create clean, readable JSON examples for technical documentation and tutorials.
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">🐛 Debugging</h4>
                <p className="text-sm text-muted-foreground">
                  Make complex JSON structures easier to understand and debug in your applications.
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">📊 Data Analysis</h4>
                <p className="text-sm text-muted-foreground">
                  Format JSON data files for easier manual inspection and analysis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
