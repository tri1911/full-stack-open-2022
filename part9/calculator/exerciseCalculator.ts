interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseValues = (args: string[]): { target: number; data: number[] } => {
  if (args.length < 4) throw new Error("Not enough arguments");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_arg0, _arg1, target, ...stringData] = args;
  const data = stringData.map((i) => {
    if (isNaN(Number(i))) throw new Error("invalid data");
    return Number(i);
  });

  if (isNaN(Number(target))) throw new Error("invalid target");

  return {
    target: Number(target),
    data,
  };
};

const calculateExercises = (target: number, numericData: number[]): Result => {
  const periodLength = numericData.length;
  const trainingDays = numericData.filter((d) => d > 0).length;
  const average =
    numericData.reduce((result, current) => result + current, 0) / periodLength;

  const descriptions = [
    "it's bad",
    "not too bad but could be better",
    "it's perfect",
  ];

  let rating: number;
  const ratio = average / target;
  rating = ratio < 0.5 ? 1 : ratio < 0.75 ? 2 : 3;

  return {
    periodLength,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription: descriptions[rating - 1],
    target,
    average: average,
  };
};

try {
  const { target, data } = parseValues(process.argv);
  console.log(calculateExercises(target, data));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

export default calculateExercises;
