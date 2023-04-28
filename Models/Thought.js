const { Schema, model } = require('mongoose');

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    text: String,
    username: String,
    comments: [{ type: Schema.Types.ObjectId, ref: 'thought' }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `thoughtCount` that gets the amount of thoughts per thought
thoughtSchema.virtual('thoughtCount').get(function () {
  return this.thoughts.length;
});

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;

