import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case "normal":
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <i>{part.description}</i>
        </div>
      );
    case "groupProject":
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      );
    case "submission":
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <i>{part.description}</i>
          <p>submit to {part.exerciseSubmissionLink}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <i>{part.description}</i>
          <p>required skills: {part.requirements.join(",")}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
