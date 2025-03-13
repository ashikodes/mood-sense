function Summarizer() {
  const handleSummarize = async () => {
    const response = await fetch("http://localhost:8000/analyze-mood/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({  }),
    });
    const data = await response.json();
  };

  return (
    <div>
      
    </div>
  );
}

export default Summarizer;