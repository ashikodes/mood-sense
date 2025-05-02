import { create } from "zustand";
import { produce } from "immer";

export type Mood = {
  primary_emotion: string;
  mood_intensity: number;
  time_context: string;
  insight: string;
};

type State = {
  thoughts: string[];
  mood: Mood | null;
};

type Actions = {
  addThought: (thought: string) => void;
  removeAllThoughts: () => void;
  setThoughts: (thoughts: string[]) => void;

  setMood: (mood: Mood) => void;
  removeMood: () => void;
};

export const useStore = create<State & Actions>((set) => ({
  thoughts: [],
  addThought: (thought: string) => {
    set(produce((draft) => {
      draft.thoughts.push(thought);
    }));
  },
  removeAllThoughts: () => set({ thoughts: [] }),
  setThoughts: (thoughts: string[]) => set({ thoughts }),

  mood: null,
  setMood: (mood: Mood) => set({ mood }),
  removeMood: () => set({ mood: null }),
}));
