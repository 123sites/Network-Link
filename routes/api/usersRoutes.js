const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/usersController');

// Gets & creates a newuser.
// localhost:3001/api/user
router.route('/').get(getUsers).post(createUser);

// Get, delete, and update a user.
// localhost:3001/api/user/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

// Create & delete a friend
// localhost:3001/api/user/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;