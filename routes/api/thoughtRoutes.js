const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  updateThought,
  deleteThought,
  createThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtController.js");

// Gets thoughts & creates a thought.
// localhost:3001/api/thoughts
router.route("/").get(getThoughts).post(createThought);

// Retrieves, deletes, and updates a thought.
// localhost:3001/api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// Retrieves, deletes, and updates a thought.
// localhost:3001/api/thoughts/thoughtId/reactions
router
  .route("/:thoughtId/reactions")
  .post(createReaction)
router
  .route("/:thoughtId/reactions/:reactionId")
  .delete(deleteReaction);

module.exports = router;
