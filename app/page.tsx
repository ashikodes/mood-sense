import { Header } from "@/app/components/Header/Header";
import { ThoughtCard } from "@/app/components/ThoughtCard/ThoughtCard";

function Summarizer() {
  return (
    <>
      <Header />
      <div className="content-container">
        <ThoughtCard />
      </div>
    </>
  );
}

export default Summarizer;
