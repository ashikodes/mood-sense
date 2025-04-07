import { Input } from "@/app/components/Input/Input";
import "./ThoughtCard.scss";

export function ThoughtCard() {
  return (
    <div className="card-container">
      <h2 className="card-title">Share Your Thoughts</h2>
      <p className="card-subtitle">
        Type three sentences that come to your mind right now. We'll analyze
        your mood based on your expressions.
      </p>
      <Input label="first thought" />
      <Input label="second thought" />
      <Input label="third thought" />
      <button className="card-button">Analyze My Mood</button>
    </div>
  );
}
