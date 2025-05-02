"use client";

import Image from "next/image";
import "./MoodCard.scss";
import logo from "@/public/images/logo.png";
import Emotion from "@/public/emotion.svg";
import MoodIntensity from "@/public/intensity.svg";
import Time from "@/public/time.svg";
import { useStore } from "@/app/store/store";

export function MoodCard() {
  const mood = useStore((state) => state.mood);
  if (!mood) return null;

  return (
    <div className="mood-card">
      <div className="mood-card-header">
        <Image src={logo} alt="logo" width={24} height={24} />
        <span className="mood-card-title">Your Mood Analysis</span>
        <span className="mood-card-subtitle">
          Based on your expressions, we detect the following:
        </span>
      </div>
      <div className="mood-card-content">
        <div className="mood-card-emotion">
          <Emotion alt="emotion" />
          <h4>Primary Emotion</h4>
          <p>{mood.primary_emotion}</p>
        </div>
        <div className="mood-card-emotion">
          <MoodIntensity alt="intensity" />
          <h4>Mood Intensity</h4>
          <p>{mood.mood_intensity}</p>
        </div>
        <div className="mood-card-emotion">
          <Time alt="time-context" />
          <h4>Time Context</h4>
          <p>{mood.time_context}</p>
        </div>
      </div>
      <div className="mood-card-notes">
        <h4>Detailed Analysis</h4>
        <p>{mood.insight}</p>
      </div>
    </div>
  );
}
