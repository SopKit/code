"use client";
import { CodeEditor } from "@/components/ui/code-editor";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { formatJSON } from "@/utils/json-tools";

export default function JsonStringifyPage() {
  const [input, setInput] = useState<string>("{\n  foo: 'bar',\n  count: 42\n}");
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");

  function handleStringify() {
    setError("");
    try {
      // eslint-disable-next-line no-eval
      const obj = eval('(' + input + ')');
      const result = formatJSON(JSON.stringify(obj));
      if (result.error) {
        setError(result.error);
        setOutput("");
      } else {
        setOutput(result.data ?? "");
      }
    } catch (e) {
      setError("Invalid JavaScript object");
      setOutput("");
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">JSON Stringify</h1>
      <p className="text-muted-foreground mb-6 max-w-2xl">
        Convert JavaScript objects to JSON strings. Paste your JS object below and click <b>Stringify</b>.
      </p>
      <div className="mb-4">
        <CodeEditor
          title="JS Object Input"
          value={input}
          onChange={setInput}
          language="javascript"
          minHeight="min-h-[180px]"
          placeholder="Paste your JS object here..."
        />
      </div>
      <Button onClick={handleStringify} className="mb-4">
        Stringify
      </Button>
      {error && <div className="text-destructive mb-2">{error}</div>}
      <div>
        <label className="block font-medium mb-1">JSON String Output:</label>
        <CodeEditor
          title="JSON String Output"
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
