import { useEffect, useState } from "react";

import Filter from "./components/Filter";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const updateNotification = (className, message) => {
    setNotification({ className, message });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const addPerson = (newPerson) => {
    const existPerson = persons.find(
      (person) => person.name === newPerson.name
    );
    if (existPerson) {
      // window.alert(`${newPerson.name} is already added to the phone book`);
      if (
        window.confirm(
          `${newPerson.name} is already added to the phone book, replace the old number with a new one?`
        )
      ) {
        personService
          .update({
            ...existPerson,
            number: newPerson.number,
          })
          .then((returnedPerson) => {
            updateNotification("success", `Updated ${returnedPerson.name}`);
            setPersons(
              persons.map((person) =>
                person.id !== returnedPerson.id ? person : returnedPerson
              )
            );
          })
          .catch((error) => {
            updateNotification(
              "failure",
              `Information of ${existPerson.name} has already been removed from server`
            );
            setPersons(
              persons.filter((person) => person.id !== existPerson.id)
            );
          });
      }
    } else {
      personService.create(newPerson).then((returnedPerson) => {
        updateNotification("success", `Added ${returnedPerson.name}`);
        setPersons(persons.concat(returnedPerson));
      });
    }
  };

  const deletePerson = (id) => {
    const personToRemove = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${personToRemove.name}`)) {
      personService.remove(id).then((_) => {
        updateNotification("success", `Deleted ${personToRemove.name}`);
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2>Phone Book</h2>
      <Notification {...notification} />
      <Filter
        query={searchQuery}
        handleQueryChange={(event) => setSearchQuery(event.target.value)}
      />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
