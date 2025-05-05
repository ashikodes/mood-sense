"use client";

import Image from "next/image";
import "./MoodCard.scss";
import logo from "@/public/images/logo.png";
import Emotion from "@/public/emotion.svg";
import MoodIntensity from "@/public/intensity.svg";
import Time from "@/public/time.svg";
import { Mood, useStore } from "@/app/store/store";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import classNames from "classnames";

export function MoodCard() {
  const [displayedText, setDisplayedText] = useState("");
  const mood = useStore((state) => state.mood) || ({} as Mood);
  const text = mood.insight;
  useEffect(() => {
    if (!text) return;
    let index = 0;
    let cursorText = "";
    const interval = setInterval(() => {
      if (index < text.length) {
        cursorText += `${text.charAt(index)}`;
        index++;
        setDisplayedText(cursorText);
      } else {
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className={classNames("mood-card", { hidden: !text, flex: !!text })}>
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
          <p>{mood.mood_intensity}%</p>
        </div>
        <div className="mood-card-emotion">
          <Time alt="time-context" />
          <h4>Time Context</h4>
          <p>{mood.time_context}</p>
        </div>
      </div>
      <div className="mood-card-notes">
        <h4>Detailed Analysis</h4>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {displayedText}
        </motion.p>
      </div>
    </div>
  );
}
