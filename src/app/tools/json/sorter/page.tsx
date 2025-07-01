"use client";
import { CodeEditor } from "@/components/ui/code-editor";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { sortJSONKeys } from "@/utils/json-tools";

export default function JsonSorterPage() {
  const [input, setInput] = useState<string>(`{\n  "b": 2,\n  "a": 1,\n  "c": 3\n}`);
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");

  function handleSort() {
    setError("");
    try {
      const result = sortJSONKeys(input);
      if (result.error) {
        setError(result.error);
        setOutput("");
      } else {
        setOutput(result.data ?? "");
      }
    } catch {
      setError("Invalid JSON");
      setOutput("");
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">JSON Sorter</h1>
      <p className="text-muted-foreground mb-6 max-w-2xl">
        Sort JSON object keys alphabetically. Paste your JSON below and click <b>Sort</b>.
      </p>
      <div className="mb-4">
        <CodeEditor
          title="JSON Input"
          value={input}
          onChange={setInput}
          language="json"
          minHeight="min-h-[180px]"
          placeholder="Paste your JSON here..."
        />
      </div>
      <Button onClick={handleSort} className="mb-4">
        Sort
      </Button>
      {error && <div className="text-destructive mb-2">{error}</div>}
      <div>
        <label className="block font-medium mb-1">Sorted JSON Output:</label>
        <CodeEditor
          title="Sorted JSON Output"
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
