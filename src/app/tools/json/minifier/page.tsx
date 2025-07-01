"use client";

import { useState } from "react";
import { LayoutWrapper } from "@/wrappers";
import { CodeEditor } from "@/components/ui/code-editor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { minifyJSON } from "@/utils/json-tools";
import { 
  CheckCircle, 
  AlertCircle, 
  Copy, 
  Download, 
  Upload, 
  RotateCcw, 
  Minimize2,
  FileJson,
  TrendingDown
} from "lucide-react";

export default function JSONMinifierPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [stats, setStats] = useState({ originalSize: 0, minifiedSize: 0, compressionRatio: 0 });
  const { toast } = useToast();

  const handleMinify = () => {
    if (!input.trim()) {
      setError("Please enter some JSON to minify");
      setOutput("");
      setIsValid(false);
      setStats({ originalSize: 0, minifiedSize: 0, compressionRatio: 0 });
      return;
    }

    try {
      const result = minifyJSON(input);
      if (result.success && result.data) {
        setOutput(result.data);
        setError("");
        setIsValid(true);
        
        // Calculate compression statistics
        const originalSize = new Blob([input]).size;
        const minifiedSize = new Blob([result.data]).size;
        const compressionRatio = ((originalSize - minifiedSize) / originalSize * 100);
        
        setStats({
          originalSize,
          minifiedSize,
          compressionRatio
        });

        toast({
          title: "JSON Minified",
          description: `Reduced size by ${compressionRatio.toFixed(1)}% (${originalSize} → ${minifiedSize} bytes)`,
        });
      } else {
        setError(result.error || "Invalid JSON format");
        setOutput("");
        setIsValid(false);
        setStats({ originalSize: 0, minifiedSize: 0, compressionRatio: 0 });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to minify JSON";
      setError(errorMessage);
      setOutput("");
      setIsValid(false);
      setStats({ originalSize: 0, minifiedSize: 0, compressionRatio: 0 });
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
    setIsValid(false);
    setStats({ originalSize: 0, minifiedSize: 0, compressionRatio: 0 });
    toast({
      title: "Cleared",
      description: "Input and output have been cleared.",
    });
  };

  const handleLoadSample = () => {
    const sampleJSON = `{
  "user": {
    "id": 12345,
    "profile": {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "preferences": {
        "theme": "dark",
        "notifications": {
          "email": true,
          "push": false
        }
      }
    },
    "posts": [
      {
        "id": 1,
        "title": "Hello World",
        "content": "This is my first post with some content"
      }
    ]
  }
}`;
    setInput(sampleJSON);
    toast({
      title: "Sample Loaded",
      description: "Sample JSON has been loaded for minification.",
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
        description: "Please minify some JSON first.",
        variant: "destructive",
      });
      return;
    }

    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "minified.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download Started",
      description: "Your minified JSON file download has started.",
    });
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  return (
    <LayoutWrapper>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Minimize2 className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">JSON Minifier</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Compress JSON data by removing whitespace, line breaks, and unnecessary formatting to reduce file size.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          <Button onClick={handleLoadSample} variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Load Sample
          </Button>
          <Button onClick={handleMinify} variant="default" size="sm" disabled={!input.trim()}>
            <Minimize2 className="h-4 w-4 mr-2" />
            Minify JSON
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
              ✓ JSON minified successfully! Reduced by {stats.compressionRatio.toFixed(1)}% ({formatBytes(stats.originalSize)} → {formatBytes(stats.minifiedSize)})
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
                Paste your formatted JSON data to compress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeEditor
                title="JSON Input"
                value={input}
                onChange={setInput}
                language="json"
                placeholder="Paste your JSON here... Example: { &quot;name&quot;: &quot;John&quot;, &quot;age&quot;: 30 }"
              />
            </CardContent>
          </Card>

          {/* Output */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Minimize2 className="h-5 w-5" />
                Minified JSON
                {output && <Badge variant="secondary">Compressed</Badge>}
              </CardTitle>
              <CardDescription>
                Compressed JSON with removed whitespace and formatting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeEditor
                title="Minified Output"
                value={output}
                onChange={() => {}}
                language="json"
                placeholder="Minified JSON will appear here..."
                readOnly
              />
            </CardContent>
          </Card>
        </div>

        {/* Statistics */}
        {isValid && stats.originalSize > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5" />
                Compression Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{formatBytes(stats.originalSize)}</div>
                  <div className="text-sm text-muted-foreground">Original Size</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{formatBytes(stats.minifiedSize)}</div>
                  <div className="text-sm text-muted-foreground">Minified Size</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{stats.compressionRatio.toFixed(1)}%</div>
                  <div className="text-sm text-muted-foreground">Size Reduction</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{formatBytes(stats.originalSize - stats.minifiedSize)}</div>
                  <div className="text-sm text-muted-foreground">Bytes Saved</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Features */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-center mb-8">Why Minify JSON?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="h-5 w-5 text-blue-500" />
                    Reduce File Size
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Remove unnecessary whitespace, line breaks, and formatting to significantly reduce JSON file size.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Faster Loading
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Smaller files mean faster network transfers and improved application performance.
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
                    Copy to clipboard or download your minified JSON with detailed compression statistics.
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
                <h4 className="font-medium mb-2">🚀 API Optimization</h4>
                <p className="text-sm text-muted-foreground">
                  Reduce API response sizes for faster data transfer and improved user experience.
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">📦 Storage Efficiency</h4>
                <p className="text-sm text-muted-foreground">
                  Minimize storage space requirements for JSON configuration files and data exports.
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">🌐 Web Performance</h4>
                <p className="text-sm text-muted-foreground">
                  Optimize JSON assets for web applications to reduce bandwidth usage and loading times.
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">📊 Data Processing</h4>
                <p className="text-sm text-muted-foreground">
                  Prepare JSON data for production environments where file size optimization is critical.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
