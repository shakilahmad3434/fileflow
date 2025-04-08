const UserModel = require("../models/user.model");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const nodemailer = require('nodemailer')

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

// forgot password
const forgotPassword = async (req, res) => {
  try {
    const {email} = req.body
    if(!email)
      return res.status(404).json({success: false, message: "Email is required."})

    const user = await UserModel.findOne({email})

    if(!user)
      return res.status(404).json({success: false, message: "User not found"})

    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Email sending (configure with your SMTP)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Gmail address
        pass: process.env.EMAIL_PASS  // Gmail App Password
      }
    });

    const resetURL = `${process.env.DOMAIN}/reset-password/${token}`;
    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: 'Password Reset Link',
      html: `<p>You requested a password reset</p>
             <p><a href="${resetURL}">Click to reset</a></p>`
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Reset link sent to your email" });


  } catch (err) {
    res.status(500).json({success: false, message: err.message})
  }
}

// reset password
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await UserModel.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() }
    });

    if (!user)
      return res.status(400).json({ success: false, message: "Token invalid or expired" });

    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    res.status(201).json({success: true, message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({success: false, message: err.message });
  }
}

module.exports = {
  signup,
  login,
  forgotPassword,
  resetPassword
}