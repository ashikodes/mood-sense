"use client";

import { Header } from "@/app/components/Header/Header";
import { ThoughtCard } from "@/app/components/ThoughtCard/ThoughtCard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MoodCard } from "./components/MoodCard/MoodCard";

const queryClient = new QueryClient();

function Summarizer() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <div className="content-container">
        <ThoughtCard />
        <MoodCard />
      </div>
    </QueryClientProvider>
  );
}

export default Summarizer;
