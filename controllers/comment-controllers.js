const { Comment, User } = require("../models");
//more or less cut and paste this from module work 

//comment controller starts here
const commentController = {
  //gets all the comments
  getComments(req, res) {
    Comment.find({})
      .then((commentData) => res.json(commentData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //finds a comment by id 
  getCommentByID({ params }, res) {
    Comment.findOne({ _id: params.CommentId })
      .then((commentData) => res.json(commentData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //for adding comments

  addComment({ params, body }, res) {
    Comment.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { Comments: _id } },
          { new: true }
        );
      })
      .then((commentData) => {
        if (!commentData) {
          res.status(404).json({ message: "Incorrect comment data!" });
          return;
        }
        res.json(dbSocialData);
      })
      .catch((err) => res.json(err));
  },

  //updates the comment
  updateComment({ params, body }, res) {
    Comment.findByIdAndUpdate({ _id: params.CommentId }, body, {
      runValidators: true,
      new: true,
    })
      .then((commentData) => {
        if (!commentData) {
          res.status(404).json({ message: "No user found with this ID!" });
          return;
        }
        res.json(dbSocialData);
      })
      .catch((err) => res.json(err));
  },

  //deletes comment
  deleteComment({ params }, res) {
    Comment.findByIdAndDelete(
      { _id: params.CommentId },
      { runValidators: true, new: true }
    )
      .then((commentData) => {
        if (!commentData) {
          res.status(404).json({ message: "No user found with this ID!" });
          return;
        }
        res.json(dbSocialData);
      })
      .catch((err) => res.json(err));
  },

  //adds reaction
  addReaction({ params, body }, res) {
    Comment.findOneAndUpdate(
      { _id: params.CommentId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((commentData) => {
        if (!commentData) {
          res.status(404).json({ message: "Incorrect reaction data!" });
          return;
        }
        res.json(dbSocialData);
      })
      .catch((err) => res.json(err));
  },
//delete reaction, i didnt use delete 
  deleteReaction({ params }, res) {
    Comment.findOneAndUpdate(
      { _id: params.CommentId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true, runValidators: true }
    )
      .then((commentData) => {
        if (!commentData) {
          res.status(404).json({ message: "Incorrect reaction data!" });
          return;
        }
        res.json(dbSocialData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = commentController;
