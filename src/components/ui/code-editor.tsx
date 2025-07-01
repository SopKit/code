'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Download, Upload, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CodeEditorProps {
  title: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  language?: string;
  readOnly?: boolean;
  error?: string;
  success?: boolean;
  className?: string;
  minHeight?: string;
}

export function CodeEditor({
  title,
  placeholder = 'Enter your code here...',
  value,
  onChange,
  language = 'text',
  readOnly = false,
  error,
  success,
  className = '',
  minHeight = 'min-h-[200px]'
}: CodeEditorProps) {
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      toast({
        title: 'Copied!',
        description: 'Content copied to clipboard',
      });
    } catch {
      toast({
        title: 'Copy failed',
        description: 'Failed to copy content to clipboard',
        variant: 'destructive',
      });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}.${getFileExtension(language)}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onChange(content);
      };
      reader.readAsText(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onChange(content);
      };
      reader.readAsText(file);
    }
  };

  const handleClear = () => {
    onChange('');
  };

  const getFileExtension = (lang: string): string => {
    const extensions: Record<string, string> = {
      json: 'json',
      xml: 'xml',
      yaml: 'yaml',
      html: 'html',
      css: 'css',
      javascript: 'js',
      typescript: 'ts',
      text: 'txt'
    };
    return extensions[lang] || 'txt';
  };

  return (
    <Card className={`${className} ${isDragging ? 'border-primary border-dashed' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">{title}</CardTitle>
            {language !== 'text' && (
              <Badge variant="secondary" className="text-xs">
                {language.toUpperCase()}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              disabled={!value}
              className="h-8 w-8 p-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownload}
              disabled={!value}
              className="h-8 w-8 p-0"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              disabled={!value || readOnly}
              className="h-8 w-8 p-0"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            {!readOnly && (
              <label>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  asChild
                >
                  <span>
                    <Upload className="h-4 w-4" />
                    <input
                      type="file"
                      accept=".txt,.json,.xml,.yaml,.yml,.html,.css,.js,.ts"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </span>
                </Button>
              </label>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className="relative"
        >
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            readOnly={readOnly}
            className={`
              ${minHeight} 
              font-mono text-sm resize-none
              ${error ? 'border-destructive' : ''}
              ${success ? 'border-green-500' : ''}
              ${isDragging ? 'border-primary border-dashed bg-muted' : ''}
            `}
          />
          {isDragging && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/50 rounded">
              <p className="text-sm text-muted-foreground">Drop file here to load</p>
            </div>
          )}
        </div>
        {error && (
          <p className="text-sm text-destructive mt-2">{error}</p>
        )}
        {success && (
          <p className="text-sm text-green-600 mt-2">✓ Valid format</p>
        )}
      </CardContent>
    </Card>
  );
}
