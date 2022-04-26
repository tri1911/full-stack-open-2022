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
      const shouldReplace = window.confirm(
        `${newPerson.name} is already added to the phone book, replace the old number with a new one?`
      );
      shouldReplace &&
        personService
          .update({ ...existPerson, number: newPerson.number })
          .then((updatedPerson) => {
            updateNotification("success", `Updated ${updatedPerson.name}`);
            setPersons(
              persons.map((person) =>
                person.id !== updatedPerson.id ? person : updatedPerson
              )
            );
          })
          .catch((error) => {
            console.log(error);
            updateNotification(
              "failure",
              `Information of ${existPerson.name} has already been removed from server`
            );
            setPersons(
              persons.filter((person) => person.id !== existPerson.id)
            );
          });
    } else {
      personService
        .create(newPerson)
        .then((returnedPerson) => {
          updateNotification("success", `Added ${returnedPerson.name}`);
          setPersons(persons.concat(returnedPerson));
        })
        .catch((error) => {
          updateNotification("failure", error.response.data.error);
        });
    }
  };

  const deletePerson = (personToRemove) => {
    personService.remove(personToRemove.id).then((responseStatus) => {
      const isValidRemoval = responseStatus === 204;
      updateNotification(
        isValidRemoval ? "success" : "failure",
        isValidRemoval
          ? `Deleted ${personToRemove.name}`
          : `Information of ${personToRemove.name} has already been removed from server`
      );
      setPersons(persons.filter((person) => person.id !== personToRemove.id));
    });
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
