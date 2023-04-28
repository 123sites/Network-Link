const users = [
  'Joe',
  'Bob',
  'Sue',
];

const thoughts = [
  'It is a great day for a hike!',
  'I am ready to start my day!',
  'I am ready for the weekend!',
];

const reactions = [
 'Wow!',
 'Amazing!',
 'Incredible!',
];

const genRandomIndex = (arr) => Math.floor(Math.random() * arr.length);

const getRandomWord = () => `${reactions[genRandomIndex(reactions)]}`;

const getRandomThought = (words) => {
  let thought = '';
  for (let i = 0; i < words; i++) {
    thought += ` ${getRandomWord()}`;
  }
  return thought;
};

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomName = () =>
  `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

// Function to generate random thoughts given a number (ex. 10 ractions === getRandomReactions(10))
const getRandomReactions = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      text: getRandomArrItem(reactions),
      username: getRandomName().split(' ')[0],
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = {
  getRandomName,
  getRandomReactions,
  getRandomThought,
  genRandomIndex,
};
