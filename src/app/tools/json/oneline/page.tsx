"use client";
import { CodeEditor } from "@/components/ui/code-editor";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { minifyJSON } from "@/utils/json-tools";

export default function JsonOneLinePage() {
  const [input, setInput] = useState<string>(`{\n  "foo": "bar",\n  "count": 42\n}`);
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");

  function handleConvert() {
    setError("");
    try {
      const result = minifyJSON(input);
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
      <h1 className="text-2xl md:text-3xl font-bold mb-2">JSON to One Line</h1>
      <p className="text-muted-foreground mb-6 max-w-2xl">
        Convert pretty-printed or multiline JSON to a single line. Paste your JSON below and click <b>Convert</b>.
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
      <Button onClick={handleConvert} className="mb-4">
        Convert
      </Button>
      {error && <div className="text-destructive mb-2">{error}</div>}
      <div>
        <label className="block font-medium mb-1">One Line JSON Output:</label>
        <CodeEditor
          title="One Line JSON Output"
          value={output}
          onChange={() => {}}
          language="json"
          minHeight="min-h-[80px]"
          readOnly
        />
      </div>
    </div>
  );
}
