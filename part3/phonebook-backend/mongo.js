const mongoose = require("mongoose");

const argv_len = process.argv.length;

if (argv_len !== 3 && argv_len !== 5) {
  console.log(
    "Please provide the password as a argument (+ person infos as optional): node mongo.js <password> [<person-name> <phone-number>]"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://elliot_fullstack:${password}@cluster0.njg4l.mongodb.net/phonebook-test?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = new mongoose.model("Person", personSchema);

const closeConnection = () => mongoose.connection.close();

if (argv_len === 5) {
  const person = new Person({ name: process.argv[3], number: process.argv[4] });

  person.save().then(({ name, number }) => {
    console.log(`added ${name} ${number} to phonebook`);
    closeConnection();
  });
} else {
  Person.find({}).then((people) => {
    console.log("phone-book:");
    people.forEach(({ name, number }) => console.log(name, number));
    closeConnection();
  });
}
