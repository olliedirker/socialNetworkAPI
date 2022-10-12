const router = require("express").Router();

const {
  getComments,
  getCommentByID,
  addComment,
  updateComment,
  deleteComment,
  addReaction,
  deleteReaction,
} = require("../../controllers/comment-controller");
//gets all comments /port/api/comments/
router.route("/").get(getComments);

//  saves a comment port/api/comments/:userId
router.route("/:userId").post(addComment);

// //gets a comment by id, updates a comment, or deletes a comment  
// port/api/comments/:commentId
router
  .route("/:commentId")
  .get(getCommentByID).put(updateComment).delete(deleteComment);

// adds reaction port/api/comments/:commentId/reactions
router.route("/:commentId/reactions").post(addReaction);

// deletes a reaction /api/comments/:commentId/reactions/:reactionId

router.route("/:commentId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
