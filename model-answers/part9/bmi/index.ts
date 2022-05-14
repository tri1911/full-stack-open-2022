/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
const app = express();

import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const PORT = 3003;

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { weigth, height } = req.query;

  if (isNaN(Number(weigth)) || isNaN(Number(height))) {
    return res.send({ error: "malformatted parameters" }).status(400);
  }

  const bmi = calculateBmi(Number(height), Number(weigth));

  return res.send({
    weigth,
    height,
    bmi,
  });
});

app.post("/exercises", (req, res) => {
  const daily_exercises: Array<any> = req.body.daily_exercises;
  const target: any = req.body.target;

  if (!daily_exercises || !target) {
    return res
      .send({
        error: "parameters missing",
      })
      .status(400);
  }

  if (isNaN(Number(target)) || daily_exercises.find((e) => isNaN(Number(e)))) {
    return res
      .send({
        error: "malformatted parameters",
      })
      .status(400);
  }

  return res.send(
    calculateExercises(
      daily_exercises.map((e) => Number(e)),
      Number(target)
    )
  );
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
