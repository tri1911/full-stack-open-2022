import React from "react";

const Person = ({ person, deletePerson }) => {
  const { name, number } = person;
  return (
    <div>
      {name} {number}{" "}
      <button onClick={() => deletePerson(person.id)}>delete</button>
    </div>
  );
};

const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person key={person.name} person={person} deletePerson={deletePerson} />
      ))}
    </div>
  );
};

export default Persons;
