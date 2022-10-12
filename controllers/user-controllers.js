const { User } = require("../models");
//user controller starts here 

const userController = {

  //gets all the users
  getUsers(req, res) {
    User.find({})
      .then((userData) => res.json(userData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //gets a single user by id
  getUserByID({ params }, res) {
    User.findOne({ _id: params.id })
      .then((userData) => res.json(userData))
      .catch((err) => res.status(400).json(err));
  },
  //for adding users
  addUser({ body }, res) {
    User.create(body)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(400).json(err));
  },

  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user found with this ID!" });
          return;
        }

        res.json(userData);
      })
      .catch((err) => res.status(400).json(err));
  },
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user found with this ID!" });
          return;
        }

        res.json(userData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController;
