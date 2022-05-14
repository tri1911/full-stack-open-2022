interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  days: Array<number>,
  target: number
): Result => {
  const descriptions = {
    1: "room for improvement",
    2: "not too bad but could be better",
    3: "good job!",
  };

  const trainingDays = days.filter((d) => d > 0).length;
  const average = days.reduce((s, v) => s + v, 0) / days.length;
  const rating = average < target * 0.75 ? 1 : average < target * 1.25 ? 2 : 3;

  const result: Result = {
    periodLength: days.length,
    trainingDays,
    success: trainingDays >= target,
    rating,
    ratingDescription: descriptions[rating],
    target,
    average,
  };

  return result;
};

interface Params {
  dates: Array<number>;
  target: number;
}

const parseArguments = (args: Array<string>): Params => {
  if (args.length < 4) throw new Error("Not enough arguments");

  if (isNaN(Number(args[2]))) {
    throw new Error("Provided values were not numbers!");
  }

  const value = args[args.length - 1];
  const values = args.splice(2, args.length - 2);

  if (isNaN(Number(value)) || values.find((v) => isNaN(Number(v)))) {
    throw new Error("Provided values were not numbers!");
  }

  return {
    dates: values.map((v) => Number(v)),
    target: Number(value),
  };
};

try {
  const { dates, target } = parseArguments(process.argv);
  const result = calculateExercises(dates, target);
  console.log(result);
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
