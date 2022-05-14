import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  const style = { marginTop: 10 };

  const partHeader = (
    <strong>
      {part.name} {part.exerciseCount}
    </strong>
  );

  switch (part.type) {
    case "normal":
      return (
        <div style={style}>
          {partHeader}
          <div>
            <i>{part.description}</i>
          </div>
        </div>
      );
    case "submission":
      return (
        <div style={style}>
          {partHeader}
          <div>
            <i>{part.description}</i>
          </div>
          <div>
            submit to{" "}
            <a href={part.exerciseSubmissionLink}>
              {part.exerciseSubmissionLink}
            </a>
          </div>
        </div>
      );
    case "groupProject":
      return (
        <div style={style}>
          {partHeader}
          project exercise <i>{part.groupProjectCount}</i>
        </div>
      );
    case "special":
      return (
        <div style={style}>
          {partHeader}
          <div>
            <i>{part.description}</i>
          </div>
          <div>required skills: {part.requirements.join(", ")}</div>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
