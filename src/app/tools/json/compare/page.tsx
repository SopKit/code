"use client";
import { CodeEditor } from "@/components/ui/code-editor";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { compareJSON } from "@/utils/json-tools";

export default function JsonComparePage() {
  const [inputA, setInputA] = useState<string>(`{\n  "foo": "bar",\n  "count": 42\n}`);
  const [inputB, setInputB] = useState<string>(`{\n  "foo": "baz",\n  "count": 42\n}`);
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");

  function handleCompare() {
    setError("");
    try {
      const result = compareJSON(inputA, inputB);
      if (result.success) {
        setOutput(result.data ?? "");
        setError("");
      } else {
        setError(result.error ?? "Unknown error");
        setOutput("");
      }
    } catch {
      setError("Invalid JSON");
      setOutput("");
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">JSON Compare</h1>
      <p className="text-muted-foreground mb-6 max-w-2xl">
        Compare two JSON files or objects and highlight the differences. Paste your JSON below and click <b>Compare</b>.
      </p>
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">JSON A</label>
          <CodeEditor
            title="JSON A"
            value={inputA}
            onChange={setInputA}
            language="json"
            minHeight="min-h-[140px]"
            placeholder="Paste first JSON here..."
          />
        </div>
        <div>
          <label className="block font-medium mb-1">JSON B</label>
          <CodeEditor
            title="JSON B"
            value={inputB}
            onChange={setInputB}
            language="json"
            minHeight="min-h-[140px]"
            placeholder="Paste second JSON here..."
          />
        </div>
      </div>
      <Button onClick={handleCompare} className="mb-4">
        Compare
      </Button>
      {error && <div className="text-destructive mb-2">{error}</div>}
      <div>
        <label className="block font-medium mb-1">Comparison Result:</label>
        <CodeEditor
          title="Comparison Result"
          value={output}
          onChange={() => {}}
          language="json"
          minHeight="min-h-[120px]"
          readOnly
        />
      </div>
    </div>
  );
}
