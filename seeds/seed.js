const connection = require("../config/connection");
const { Thought, User } = require("../models");
const {
  getRandomName,
  getRandomThought,
  getRandomReactions,
  genRandomIndex,
} = require("./data");

const thoughts = require("./thoughts.json");
const users = require("./users.json");

// Start the seeding runtime timer
console.time("seeding");

// Creates a connection to mongodb
connection.once("open", async () => {
  // Delete the entries in the collection
  await Thought.deleteMany({});
  await User.deleteMany({});

  const userArray = await User.collection.insertMany(users);
  // Wait for the posts array to be inserted into the database
  const thoughtArray = await Thought.collection.insertMany(thoughts);

    const user = await User.collection.findOneAndUpdate(
      { _id: userArray.insertedIds["0"] },
      { $addToSet: { thoughts: thoughtArray.insertedIds["0"] } },
      { new: true }
    );
    console.log(user);
    const userA = await User.collection.findOneAndUpdate(
      { _id: userArray.insertedIds["1"] },
      { $addToSet: { thoughts: thoughtArray.insertedIds["1"] } },
      { new: true }
    );
    console.log(userA);
    const userB = await User.collection.findOneAndUpdate(
      { _id: userArray.insertedIds["2"] },
      { $addToSet: { thoughts: thoughtArray.insertedIds["2"] } },
      { new: true }
    );
    console.log(userB);


  // Log out a pretty table for reactions and thoughts
  console.log(userArray);
  console.log(thoughtArray);
  console.timeEnd("seeding complete 🌱");
  process.exit(0);
});
