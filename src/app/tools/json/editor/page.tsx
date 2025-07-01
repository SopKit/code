"use client";

import { useState, useEffect, useCallback } from "react";
import { LayoutWrapper } from "@/wrappers";
import { CodeEditor } from "@/components/ui/code-editor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { formatJSON, minifyJSON } from "@/utils/json-tools";
import { 
  AlertCircle, 
  CheckCircle, 
  Copy, 
  Download, 
  Upload, 
  RotateCcw, 
  Zap,
  FileJson,
  Settings,
  Eye,
  Code,
  TreePine
} from "lucide-react";

interface JSONNode {
  key?: string;
  value: unknown;
  type: string;
  path: string;
  parent?: JSONNode;
  children?: JSONNode[];
}

interface ValidationResult {
  isValid: boolean;
  data?: unknown;
  error?: string;
}

export default function JSONEditorPage() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [parsedData, setParsedData] = useState<unknown>(null);
  const [treeView, setTreeView] = useState<JSONNode[]>([]);
  const [activeTab, setActiveTab] = useState("editor");
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
    "isActive": true,
    "metadata": {
      "createdAt": "2024-01-15T10:30:00Z",
      "lastLogin": null,
      "preferences": {
        "theme": "dark",
        "notifications": true
      }
    }
  };

  const validateJSONInput = (input: string): ValidationResult => {
    try {
      const parsed = JSON.parse(input);
      return { isValid: true, data: parsed };
    } catch (error) {
      return { 
        isValid: false, 
        error: error instanceof Error ? error.message : 'Invalid JSON' 
      };
    }
  };

  const buildTreeView = useCallback((data: unknown, path = "", parent?: JSONNode): JSONNode[] => {
    const nodes: JSONNode[] = [];

    if (Array.isArray(data)) {
      data.forEach((item, index) => {
        const currentPath = path ? `${path}[${index}]` : `[${index}]`;
        const node: JSONNode = {
          key: index.toString(),
          value: item,
          type: typeof item === "object" && item !== null ? (Array.isArray(item) ? "array" : "object") : typeof item,
          path: currentPath,
          parent
        };

        if (typeof item === "object" && item !== null) {
          node.children = buildTreeView(item, currentPath, node);
        }

        nodes.push(node);
      });
    } else if (typeof data === "object" && data !== null) {
      Object.entries(data).forEach(([key, value]) => {
        const currentPath = path ? `${path}.${key}` : key;
        const node: JSONNode = {
          key,
          value,
          type: typeof value === "object" && value !== null ? (Array.isArray(value) ? "array" : "object") : typeof value,
          path: currentPath,
          parent
        };

        if (typeof value === "object" && value !== null) {
          node.children = buildTreeView(value, currentPath, node);
        }

        nodes.push(node);
      });
    }

    return nodes;
  }, []);

  const handleValidation = useCallback(() => {
    if (!input.trim()) {
      setError("");
      setIsValid(false);
      setParsedData(null);
      setTreeView([]);
      return;
    }

    const validation = validateJSONInput(input);
    setIsValid(validation.isValid);
    setError(validation.error || "");

    if (validation.isValid && validation.data) {
      setParsedData(validation.data);
      setTreeView(buildTreeView(validation.data));
    } else {
      setParsedData(null);
      setTreeView([]);
    }
  }, [input, buildTreeView]);

  useEffect(() => {
    if (input) {
      handleValidation();
    }
  }, [input, handleValidation]);

  const handleFormat = () => {
    if (!isValid) {
      toast({
        title: "Invalid JSON",
        description: "Please fix the JSON syntax errors before formatting.",
        variant: "destructive",
      });
      return;
    }

    try {
      const formatted = formatJSON(input);
      setInput(formatted.data || "");
      toast({
        title: "JSON Formatted",
        description: "Your JSON has been formatted successfully.",
      });
    } catch {
      toast({
        title: "Format Error",
        description: "Failed to format JSON. Please check your input.",
        variant: "destructive",
      });
    }
  };

  const handleMinify = () => {
    if (!isValid) {
      toast({
        title: "Invalid JSON",
        description: "Please fix the JSON syntax errors before minifying.",
        variant: "destructive",
      });
      return;
    }

    try {
      const minified = minifyJSON(input);
      setInput(minified.data || "");
      toast({
        title: "JSON Minified",
        description: "Your JSON has been minified successfully.",
      });
    } catch {
      toast({
        title: "Minify Error",
        description: "Failed to minify JSON. Please check your input.",
        variant: "destructive",
      });
    }
  };

  const handleLoadSample = () => {
    const formattedSample = JSON.stringify(sampleJSON, null, 2);
    setInput(formattedSample);
    toast({
      title: "Sample Loaded",
      description: "Sample JSON data has been loaded into the editor.",
    });
  };

  const handleClearAll = () => {
    setInput("");
    setError("");
    setIsValid(false);
    setParsedData(null);
    setTreeView([]);
    toast({
      title: "Editor Cleared",
      description: "All content has been cleared from the editor.",
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
    if (!input.trim()) {
      toast({
        title: "No Content",
        description: "Please enter some JSON content to download.",
        variant: "destructive",
      });
      return;
    }

    const blob = new Blob([input], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "edited.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download Started",
      description: "Your JSON file download has started.",
    });
  };

  const renderTreeNode = (node: JSONNode, level = 0): React.ReactNode => {
    const indent = level * 20;
    
    return (
      <div key={node.path} className="font-mono text-sm">
        <div 
          className="flex items-center gap-2 py-1 hover:bg-muted/50 rounded px-2"
          style={{ paddingLeft: `${indent + 8}px` }}
        >
          <span className="text-blue-600 dark:text-blue-400">
            {node.key && `"${node.key}"`}
          </span>
          {node.key && <span className="text-muted-foreground">:</span>}
          <Badge variant="outline" className="text-xs">
            {node.type}
          </Badge>
          <span className="text-muted-foreground text-xs">
            {node.path}
          </span>
        </div>
        
        {node.children && node.children.length > 0 && (
          <div>
            {node.children.map(child => renderTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <LayoutWrapper>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <FileJson className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">JSON Editor</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advanced online JSON editor with syntax highlighting, real-time validation, 
            tree view, and powerful editing features.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          <Button onClick={handleLoadSample} variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Load Sample
          </Button>
          <Button onClick={handleFormat} variant="outline" size="sm" disabled={!isValid}>
            <Zap className="h-4 w-4 mr-2" />
            Format
          </Button>
          <Button onClick={handleMinify} variant="outline" size="sm" disabled={!isValid}>
            <Settings className="h-4 w-4 mr-2" />
            Minify
          </Button>
          <Button onClick={() => copyToClipboard(input)} variant="outline" size="sm" disabled={!input}>
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          <Button onClick={downloadJSON} variant="outline" size="sm" disabled={!input}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button onClick={handleClearAll} variant="outline" size="sm">
            <RotateCcw className="h-4 w-4 mr-2" />
            Clear
          </Button>
        </div>

        {/* Status */}
        {input && (
          <div className="mb-6">
            {isValid ? (
              <Alert className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800 dark:text-green-200">
                  ✓ Valid JSON - Ready for editing
                </AlertDescription>
              </Alert>
            ) : error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>JSON Error:</strong> {error}
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {/* Main Editor */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="editor" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              Editor
            </TabsTrigger>
            <TabsTrigger value="tree" className="flex items-center gap-2" disabled={!isValid}>
              <TreePine className="h-4 w-4" />
              Tree View
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2" disabled={!isValid}>
              <Eye className="h-4 w-4" />
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  JSON Editor
                </CardTitle>
                <CardDescription>
                  Edit your JSON data with syntax highlighting and real-time validation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CodeEditor
                  value={input}
                  onChange={setInput}
                  language="json"
                  placeholder="Enter your JSON data here or load a sample..."
                  error={error}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tree" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TreePine className="h-5 w-5" />
                  Tree View
                </CardTitle>
                <CardDescription>
                  Navigate your JSON structure in a hierarchical tree view
                </CardDescription>
              </CardHeader>
              <CardContent>
                {treeView.length > 0 ? (
                  <div className="max-h-96 overflow-auto border rounded-lg p-4">
                    {treeView.map(node => renderTreeNode(node))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Enter valid JSON to see the tree structure
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  JSON Preview
                </CardTitle>
                <CardDescription>
                  Preview your formatted JSON data
                </CardDescription>
              </CardHeader>
              <CardContent>
                {parsedData ? (
                  <CodeEditor
                    value={JSON.stringify(parsedData, null, 2)}
                    onChange={() => {}}
                    language="json"
                    readOnly
                  />
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Enter valid JSON to see the preview
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Features */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">Editor Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-500" />
                  Real-time Validation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get instant feedback on JSON syntax errors with detailed error messages and line numbers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TreePine className="h-5 w-5 text-green-500" />
                  Tree Navigation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Navigate complex JSON structures with an intuitive tree view showing hierarchy and data types.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-purple-500" />
                  Format & Minify
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Format JSON for readability or minify for production with one-click operations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
