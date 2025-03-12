"use client";

import { useState } from "react";

function Summarizer() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");

  const handleSummarize = async () => {
    const response = await fetch("http://localhost:8000/analyze-mood/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    setSummary(data.summary);
  };

  return (
    <div>
      <textarea
        placeholder="Paste text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      /><br />
      <button onClick={handleSummarize}>Summarize</button>
      <div>{summary}</div>
    </div>
  );
}

export default Summarizer;