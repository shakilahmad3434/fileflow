const UserModel = require("../models/user.model");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signup = async (req, res) => {
  try {
    await UserModel.create(req.body)

    res.status(201).json({success: true,message: "User created successfully"})

  } catch (err) {
    res.status(500).json({success: false, message: err.message})
  }
}

// Login User

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'User not exits!' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Password not match!' });
    }

    user.lastLogin = new Date();
    await user.save();

    const payload = {
      fullname: user.fullname,
      email: user.email,
      plan: user.plan,
      id: user._id
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET)

    res.status(201).json({ success: true, message: 'Login successful', token });

  } catch (err) {
    res.status(500).json({success: false, message: err.message})
  }
}

module.exports = {
  signup,
  login
}