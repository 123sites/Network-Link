const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "Please type a valid email address",
      ],
      },
      
    thoughts: [
      // text: String,
      // username: String,
      // comments: [{ type: Schema.Types.ObjectId, ref: 'thought' }],{
      // },
      // applications: 
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
  
  friends: [
  // text: String,
  // username: String,
  // comments: [{ type: Schema.Types.ObjectId, ref: 'friend' }],{
  // },
  // applications: 
  {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
],
},

  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `fullName` that gets and sets the user's full name
userSchema
  .virtual('fullName')
  // Getter
  .get(function () {
    return `${this.first} ${this.last}`;
  })
  // Setter to set the first and last name
  .set(function (v) {
    const first = v.split(' ')[0];
    const last = v.split(' ')[1];
    this.set({ first, last });
  });

// Creates a virtual property `friendCount` that gets and sets the user's friend count.
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
