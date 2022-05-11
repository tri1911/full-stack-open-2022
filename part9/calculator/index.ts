import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";
import express from "express";
const app = express();

app.use(express.json());

app.get("/hello", (_request, response) => {
  response.send("Hello Full Stack!");
});

app.get("/bmi", (request, response) => {
  const query = request.query;
  const weight = Number(query.weight);
  const height = Number(query.height);

  if (isNaN(weight) || isNaN(height)) {
    return response.status(400).send({ error: "malformatted parameters" });
  }

  const bmi = calculateBmi(height, weight);

  return response.send({ weight, height, bmi });
});

app.post("/exercises", (request, response) => {
  const { daily_exercises, target } = request.body;

  if (!target) {
    return response.status(400).json({ error: "parameters missing" });
  }

  if (!isNaN(Number(target))) {
    return response.status(400).json({ error: "malformatted parameters" });
  }

  const result = calculateExercises(target, daily_exercises);
  return response.send(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
