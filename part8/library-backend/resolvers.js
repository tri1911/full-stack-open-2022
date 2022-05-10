require("dotenv").config();
const { UserInputError, AuthenticationError } = require("apollo-server");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");
const jwt = require("jsonwebtoken");

const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const resolvers = {
  Book: {
    id: (root) => root._id.toString(),
  },
  Author: {
    id: (root) => root._id.toString(),
    bookCount: async (root) => {
      // console.log("Book.find");
      // return Book.find({ author: root._id }).countDocuments();
      return root.books.length;
    },
  },
  User: {
    id: (root) => root._id.toString(),
  },
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (_root, args) => {
      const { author: authorName, genre } = args;
      if (authorName) {
        const author = await Author.findOne({ name: authorName });
        return Book.find({ author: author._id }).populate("author");
      }
      if (genre) {
        return Book.find({ genres: { $in: [genre] } }).populate("author");
      }
      return Book.find({}).populate("author");
    },
    allAuthors: async () => Author.find({}),
    me: (_root, _args, { currentUser }) => currentUser,
  },
  Mutation: {
    addBook: async (_root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const { title, author: authorName, published, genres } = args;

      let author = await Author.findOne({ name: authorName });

      if (!author) {
        author = new Author({ name: authorName });
      }

      const newBook = new Book({
        title,
        author: author._id,
        published,
        genres,
      });

      author.books = author.books.concat(newBook._id);

      try {
        await author.save();
        await newBook.save();
        await newBook.populate("author");
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }

      pubsub.publish("BOOK_ADDED", { bookAdded: newBook });

      return newBook;
    },
    editAuthor: async (_root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      try {
        return Author.findOneAndUpdate(
          { name: args.name },
          { born: args.setBornTo },
          { new: true }
        );
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }
    },
    createUser: async (_root, args) => {
      const newUser = new User({ ...args });
      return newUser.save().catch((error) => {
        throw new UserInputError(error.message, { invalidArgs: args });
      });
    },
    login: async (_root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        return new AuthenticationError("wrong credential");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};

module.exports = resolvers;
