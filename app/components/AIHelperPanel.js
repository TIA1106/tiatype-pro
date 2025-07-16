"use client";
import { useState } from "react";

export default function AIHelperPanel({ selectedText, onReplace, loading, onRequest }) {
  const [mode, setMode] = useState("grammar");
  const [output, setOutput] = useState("");

  const runAI = async () => {
    if (!selectedText) return;
    const res = await fetch("/api/assist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: selectedText, mode }),
    });
    const data = await res.json();
    setOutput(data.result);
  };
  return (
    <div className="fixed top-16 right-0 w-80 h-[90vh] bg-white dark:bg-gray-900 border-l p-4 shadow-lg overflow-y-auto">
      <h2 className="text-lg font-bold mb-2">AI Assistant ✨</h2>

      <div className="mb-3">
        <label className="block text-sm font-medium">Selected Text:</label>
        <p className="text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded min-h-[60px]">{selectedText || "Nothing selected."}</p>
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium">Mode:</label>
        <select
          className="w-full p-2 rounded border"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          <option value="grammar">Fix Grammar</option>
          <option value="rephrase">Rephrase</option>
          <option value="summarize">Summarize</option>
        </select>
      </div>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full mb-2"
        onClick={runAI}
        disabled={loading}
      >
        {loading ? "Working..." : "Run AI"}
      </button>

      {output && (
        <>
          <label className="block text-sm font-medium mt-3">AI Output:</label>
          <textarea
            value={output}
            className="w-full p-2 rounded border bg-gray-100 dark:bg-gray-800 text-sm"
            rows={6}
            readOnly
          />
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full mt-2"
            onClick={() => onReplace(output)}
          >
            Replace in Editor
          </button>
        </>
      )}
    </div>
  );
}
