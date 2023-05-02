const { Schema, Types, model } = require('mongoose');
const dayjs = require('dayjs')


reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionText: {
      type: String,
      required: true,
      max_length: 300,
    },
    username: {
      type: String,
      required: true,
    },
    createdOn: {
      type: Date,
      // https://day.js.org/docs/en/display/format
      default: dayjs().format('DD-MM-YYYY THH:mm'),
      // get: (date => dayjs(date).format("MMM D, YYYY HH:mm A"),
    },
  },
    {
    toJSON: {
      virtuals: true,
    },
    id: false,
    }
);

// // Schema to create Thought model
thoughtSchema = new Schema(
{
  thoughtText: 
  {
    text: String,
    required: true,
    min_length: 1,
    max_length: 300,
  },

  createdOn: {
    type: Date,
    // https://day.js.org/docs/en/display/format
    default: dayjs().format('DD-MM-YYYY THH:mm'),
    // get: (date => dayjs(date).format("MMM D, YYYY HH:mm A"),
  },
  
  username: { type: String, required: true },
  reactions: [reactionSchema],
},

  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  },
);

// Create a virtual property `reactionCount` that gets the amount of thought's reactions.
thoughtSchema.virtual('reactionCount').get(function () {
  return this.thoughts.length;
});

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;

