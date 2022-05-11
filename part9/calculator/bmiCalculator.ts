interface InputValues {
  height: number;
  weight: number;
}

const parseInputs = (args: string[]): InputValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (!isNaN(height) && !isNaN(weight)) {
    return {
      height,
      weight,
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const bmi = (weight / (height * height)) * 10000;
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi <= 24.9) {
    return "Normal Weight";
  } else if (bmi <= 29.9) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

try {
  const { height, weight } = parseInputs(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

export default calculateBmi;
