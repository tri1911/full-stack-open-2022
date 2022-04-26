import React from "react";

const Person = ({ person, deletePerson }) => {
  return (
    <div>
      {person.name} {person.number}{" "}
      <button
        onClick={() => {
          window.confirm(`Delete ${person.name}`) && deletePerson(person);
        }}
      >
        delete
      </button>
    </div>
  );
};

const Persons = ({ persons, deletePerson }) => {
  console.log(persons);
  return (
    <div>
      {persons.map((person) => (
        <Person key={person.name} person={person} deletePerson={deletePerson} />
      ))}
    </div>
  );
};

export default Persons;
