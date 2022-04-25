const Header = ({ course }) => <h2>{course.name}</h2>;

const Total = ({ sum }) => (
  <p>
    <strong>total of {sum} exercises</strong>
  </p>
);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.name} part={part} />
    ))}
  </>
);

const Course = ({ course }) => {
  const reducer = (sum, part) => sum + part.exercises;
  const total = course.parts.reduce(reducer, 0);
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total sum={total} />
    </div>
  );
};

export default Course;
