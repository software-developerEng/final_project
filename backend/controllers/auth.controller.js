const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users.model");
const Organization = require("../models/organizations.model");

// ------------------- USER LOGIN
const login = async (req, res) => {
  const { emailOrPhone, password } = req.body;

  if (!emailOrPhone || !password) {
    return res
      .status(400)
      .send({ message: "Email/Phone and Password are required" });
  }

  let user;

  if (emailOrPhone.includes("@")) {
    user = await User.findOne({ email: emailOrPhone });
  } else {
    user = await User.findOne({ phone_number: emailOrPhone });
  }

  if (!user) {
    user = await Organization.findOne({ email: emailOrPhone });
  }

  if (!user) {
    return res
      .status(404)
      .send({ message: "Email/Phone or Password is incorrect" });
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return res
      .status(404)
      .send({ message: "Email/Phone or Password is incorrect" });
  }

  const { password: hashedPassword, email, _id, ...userInfo } = user.toJSON();
  const token = jwt.sign({ email, _id }, process.env.SECRET_KEY, {
    expiresIn: "100d",
  });

  res.send({
    token,
    user: { ...userInfo, _id },
  });
};

// ------------------- USER REGISTRATION
const register = async (req, res) => {
  try {
    const { password, ...userData } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      ...userData,
      password: hashedPassword,
    });

    await user.save();

    const { password: hashingpassword, _id, ...userInfo } = user.toJSON();

    res.send(userInfo);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

// ------------------- ORGANIZATION REGISTRATION
const orgregister = async (req, res) => {
  const { password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const org = new Organization({
    ...req.body,
    password: hashedPassword,
  });

  if (org.users.length === 0) {
    org.users.push({
      user: org._id,
      isAdmin: true,
    });
  }

  await org.save();

  const { password: hashingpassword, _id, ...orgInfo } = org.toJSON();

  res.send(orgInfo);
};

// ------------ FORGOT PASSWORD
const testingget = async (req, res) => {
  try {
    const users = await User.find();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { login, orgregister, register, testingget };
