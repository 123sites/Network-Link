const users = [
  'joe',
  'bob',
  'sue',
  'mae',
  'lou',
  'matt',
];

const email = [
  'joe@gmail.com',
  'bob@gmail.com',
  'sue@gmail.com',  
  'mae@gmail.com',
  'lou@gmail.com',
  'matt@gmail.com',
]

const thoughts = [
  'It is a great day for a hike!',
  'I am ready to start my day!',
  'I am ready for the weekend!',
  'Have you heard the story...',
  'Yesterday at work...',

];

const reactions = [
 'Wow!',
 'Amazing!',
 'Incredible!',
 'That is crazy!',
 'No way!',
 'I do not believe it!',
 'Really?!?!',
 'What?',
 'I cannot believe it!',
];

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomFriends = (friends, user) => {
    let results = new Set();
    for (let i = 0; i < friends; i++) {
        const retrievedFriend = getRandomArrItem(users);
        if (!(retrievedFriend === user)) results.add(retrievedFriend);
    }
    results = Array.from(results);
    return results;
}

const getRandomReactions = (numReactions) => {
    const results = [];
    for (let i = 0; i < numReactions; i++) {
        results.push({
            reactionBody: getRandomArrItem(reactions),
            username: getRandomArrItem(users)
        });
    }
    return results;
};

const getRandomThoughts = (numThoughts, numReactions, user) => {
    const results = [];
    for (let i = 0; i < numThoughts; i++) {
        results.push({
            thoughtText: getRandomArrItem(thoughts),
            username: user,
            reactions: getRandomReactions(numReactions)
        });
    }
    return results;
};

module.exports = {
    email,
    users,
    thoughts,
    reactions,
    getRandomFriends,
    getRandomThoughts,
    getRandomArrItem 
}


// const genRandomIndex = (arr) => Math.floor(Math.random() * arr.length);

// const getRandomWord = () => `${reactions[genRandomIndex(reactions)]}`;

// const getRandomThought = (words) => {
//   let thought = '';
//   for (let i = 0; i < words; i++) {
//     thought += ` ${getRandomWord()}`;
//   }
//   return thought;
// };

// // Get a random item given an array
// const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// // Gets a random username
// const getRandomUsername = () =>
//   `${getRandomArrItem(usernames)} ${getRandomArrItem(usernames)}`;

// // Function to generate random thoughts given a number (ex. 10 ractions === getRandomReactions(10))
// const getRandomReactions = (int) => {
//   const results = [];
//   for (let i = 0; i < int; i++) {
//     results.push({
//       text: getRandomArrItem(reactions),
//       username: getRandomUsername().split(' ')[0],
//     });
//   }
//   return results;
// };

// // Export the functions for use in seed.js
// module.exports = {
//   getRandomUsername,
//   getRandomReactions,
//   getRandomThought,
//   genRandomIndex,
// };
