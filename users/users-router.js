const router = require("express").Router();

const Users = require("./users-model.js");

// no need to bring in restricted middleware because it has been applied to user router in server.js

router.get("/", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/:id", verifyUserId, (req, res) => {
  const id = req.params.id;

  Users.findById(id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// UPDATE USER INFO
router.put("/:id", verifyUserId, (req, res) => {
  const user_id = req.params.id;
  const update = req.body;

  Users.updateItemCounts(user_id, update)
    .then((check) => {
      if (check.length !== 1) {
        res.status(400).json({ message: "Failed to update item counts" });
      } else {
        Users.updateItemCosts(user_id, update)
          .then((check) => {
            if (check.length !== 1) {
              res.status(400).json({ message: "Failed to update item counts" });
            } else {
              res.status(200).json({ message: "Info correctly updated!" });
            }
          })
          .catch((err) => {
            res.status(400).json({ error: err });
          });
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});

// ---------------------- Custom Middleware ---------------------- //

function verifyUserId(req, res, next) {
  const id = req.params.id;

  Users.findById(id)
    .then((item) => {
      if (item) {
        req.item = item;
        next();
      } else {
        res.status(404).json({ message: "User Not Found." });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}

module.exports = router;
