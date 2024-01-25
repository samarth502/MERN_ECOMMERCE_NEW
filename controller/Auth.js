const { User } = require("../model/User");
const crypto = require("crypto");
const { sanitizeUser } = require("../services/common");
// const SECRET_KEY = 'SECRET_KEY';
const jwt = require('jsonwebtoken');



exports.createUser = async (req, res) => {
  try {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        const user = new User({ ...req.body, password: hashedPassword, salt });

        const doc = await user.save();
        req.login(sanitizeUser(doc), (err) => {
          if (err) {
            res.status(400).json(err);
          } else {
            const token = jwt.sign(sanitizeUser(doc),process.env.JWT_SECRET_KEY);
            res.cookie('jwt',token , { expires: new Date(Date.now() + 3600000), httpOnly: true }).status(201).json(token);
          }
        });
        // res.status(201).json();
      }
    );
    // console.log(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.loginUser = async (req, res) => {
  res.cookie('jwt',req.user.token , { expires: new Date(Date.now() + 3600000), httpOnly: true }).status(201).json(req.user.token);

};

exports.checkAuth = async (req, res) => {
  if(req.user){

    res.json(req.user);
  }else{
    res.sendStatus(401);
  }

};


