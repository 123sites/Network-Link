const { User, Thought } = require("../models");

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a new user
  async createUser(req, res) {
    //localhost:3001/api/users
    try {
      const { error, value } = validateUser(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      let user = await User.create(req.body);
      res.send(user).status(200);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // async createUser(req, res) {
  //   try {
  //     const user = await User.create(req.body);
  //     res.json(user);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // },

  // Update user by id
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true }
      );
      if (!user) {
        res.status(404).json({ message: "No user with this id!" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // updateUser({ params, body }, res) {
  //   User.findOneAndUpdate({ _id: params.id }, body, {
  //     new: true,
  //     runValidators: true,
  //   })
  //     then((dbUserData) => {
  //       if (!dbUserData) {
  //         res.status(404).json({ message: "No user found with this id!" });
  //         return;
  //       }
  //       res.json(dbUserData);
  //     })
  //     catch((err) => res.json(err));
  // },

  // Delete a user and associated apps
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: "User and associated apps deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add friend
  async addFriend(req, res) {
    // /users/:id/friends/:friendId"
    try {
      const friend = await User.findOne({ _id: req.params.friendId });
      if (!friend)
        return res
          .status(404)
          .send("The friend with this ID was not found.");

      let user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!user)
        return res
          .status(404)
          .send("The friend with this ID was not found.");

      user = await User.findOne({ _id: req.params.id });
      res.send(user).status(200);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete Friend
  async deleteFriend(req, res) {
    // /users/:id/friends/:friendId"
    try {
      const friend = await User.findOne({ _id: req.params.friendId });
      if (!friend)
        return res
          .status(404)
          .send("The friend with this user ID was not found.");

      let user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!user)
        return res
          .status(404)
          .send("The friend with this ID was not found.");

      user = await User.findOne({ _id: req.params.id });
      res.send(user).status(200);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

//   addFriend({ params }, res) {
//     User.findOneAndUpdate(
//       { _id: params.userId },
//       { $addToSet: { friends: params.friendId } },
//       { new: true, runValidators: true }
//     )
//       .then((dbUserData) => {
//         if (!dbUserData) {
//           res.status(404).json({ message: "No user with this id" });
//           return;
//         }
//         res.json(dbUserData);
//       })
//       .catch((err) => res.json(err));
//   },

//   // Delete friend
//   deleteFriend({ params }, res) {
//     User.findOneAndUpdate(
//       { _id: params.userId },
//       { $pull: { friends: params.friendId } },
//       { new: true }
//     )
//       .then((dbUserData) => {
//         if (!dbUserData) {
//           return res.status(404).json({ message: "No user with this id!" });
//         }
//         res.json(dbUserData);
//       })
//       .catch((err) => res.json(err));
//   },
// };
