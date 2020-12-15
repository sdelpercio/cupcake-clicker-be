const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/secrets.js");

const Users = require("./users-model.js");

// for endpoints beginning with /api/auth
router.post("/register", validateUserContent, (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then((saved) => {
      res
        .status(201)
        .json({ data: { id: saved.id, username: saved.username } });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.post("/login", validateUserContent, (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // generate token
        const token = generateToken(user);

        res.status(200).json({
          user: {
            username: user.username,
            id: user.id,
            total: user.total,
            cupcakes: user.cupcakes,
            toasters: user.toasters,
            ovens: user.ovens,
            industrialOvens: user.industrialOvens,
            friends: user.friends,
            chefs: user.chefs,
            cupcakeGods: user.cupcakeGods,
            toastersCost: user.toastersCost,
            ovensCost: user.ovensCost,
            industrialOvensCost: user.industrialOvensCost,
            friendsCost: user.friendsCost,
            chefsCost: user.chefsCost,
            cupcakeGodsCost: user.cupcakeGodsCost,
          },
          token: token, //return the token upon login
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error, msg: "login fail" });
    });
});

// ---------------------- Generate Token ---------------------- //

function generateToken(user) {
  const payload = {
    subject: user.id, // standard claim = sub
    username: user.username,
    // role: user.role || "user"  (optional: if there's role in db schema)
  };
  const options = {
    expiresIn: "8h",
  };
  return jwt.sign(payload, jwtSecret, options);
}

// ---------------------- Custom Middleware ---------------------- //

function validateUserContent(req, res, next) {
  if (!req.body.username || !req.body.password) {
    res
      .status(400)
      .json({ message: "Username & password fields are required." });
  } else {
    next();
  }
}

module.exports = router;
