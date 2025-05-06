"use client";

import { Input } from "@/app/components/Input/Input";
import "./ThoughtCard.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { Mood, useStore } from "@/app/store/store";
import { AnimatePresence, motion } from "motion/react";
import classNames from "classnames";

export type FormValues = {
  firstThought: string;
  secondThought: string;
  thirdThought: string;
};

const schema = yup
  .object({
    firstThought: yup.string().required("What comes to your mind?").trim(),
    secondThought: yup
      .string()
      .required("What else comes to your mind?")
      .trim(),
    thirdThought: yup.string().required("One last thought?").trim(),
  })
  .required();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export function ThoughtCard() {
  const mood = useStore((state) => state.mood);
  const setMood = useStore((state) => state.setMood);
  const setThoughts = useStore((state) => state.setThoughts);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstThought: "",
      secondThought: "",
      thirdThought: "",
    },
  });

  const addMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await fetch(`${apiUrl}/analyze-mood`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          thoughts: [data.firstThought, data.secondThought, data.thirdThought],
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setThoughts([data.firstThought, data.secondThought, data.thirdThought]);
    addMutation.mutate(data, {
      onSuccess: (response: Mood) => {
        setMood(response);
      },
    });
  };
  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        {!mood ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={classNames("card-container", {
              pending: !addMutation.isPending,
            })}
            exit={{ scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="card-title">Share Your Thoughts</h2>
            <p className="card-subtitle">
              Type three sentences that come to your mind right now. We&#39;ll
              analyze your mood based on your expressions.
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                error={errors.firstThought}
                label="first thought"
                {...register("firstThought", { required: true })}
                disabled={addMutation.isPending}
              />
              <Input
                error={!errors.firstThought ? errors.secondThought : undefined}
                label="second thought"
                {...register("secondThought", { required: true })}
                disabled={addMutation.isPending}
              />
              <Input
                error={!errors.secondThought ? errors.thirdThought : undefined}
                label="third thought"
                {...register("thirdThought", { required: true })}
                disabled={addMutation.isPending}
              />
              <motion.button
                whileHover={{ scale: 1 }}
                whileTap={{ scale: 0.9 }}
                type="submit"
                className="card-button"
                disabled={addMutation.isPending}
              >
                Analyze My Mood
              </motion.button>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>
      {addMutation.isPending && (
        <motion.div
          initial={{ "--rotate": "0deg" }}
          animate={{ rotate: 360, "--rotate": "360deg" }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mood-loader"
        ></motion.div>
      )}
    </>
  );
}
