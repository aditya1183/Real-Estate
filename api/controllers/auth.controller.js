import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";
import { signuptemplate } from "../mailtemplates/signuptemplate.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import crypto from "crypto";

// export const signup = async (req, res, next) => {
//   const { username, email, password } = req.body;
//   console.log(req.body);
//   const otp = crypto.randomInt(100000, 999999).toString();
//   const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
//   const hashedPassword = bcryptjs.hashSync(password, 10);
//   const newUser = new User({
//     username,
//     email,
//     password: hashedPassword,
//     avatar: `https://api.dicebear.com/5.x/initials/svg?seed=${username}`,
//   });
//   try {
//     await newUser.save();
//     await sendEmail({
//       to: email,
//       subject: "Welcome to Our Service",
//       // text: `Hello ${username},\n\nThank you for signing up! We are excited to have you on board.`,
//       html: signuptemplate(newUser.email, newUser.username),
//     });
//     res.status(201).json("User created successfully!");
//   } catch (error) {
//     next(error);
//   }
// };

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const otp = crypto.randomInt(100000, 999999).toString(); // Generate 6-digit OTP
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    avatar: `https://api.dicebear.com/5.x/initials/svg?seed=${username}`,
    otp,
    otpExpires,
  });

  try {
    await newUser.save();

    // Send OTP via email
    await sendEmail({
      to: email,
      subject: "Your OTP for Account Verification",
      html: `
        <h1>Hello ${username},</h1>
        <p>Thank you for signing up! Please use the OTP below to verify your account:</p>
        <h2>${otp}</h2>
        <p>This OTP is valid for 10 minutes.</p>
      `,
    });

    res.status(201).json("User created successfully! OTP sent to email.");
  } catch (error) {
    next(error);
  }
};

export const verifyOtp = async (req, res, next) => {
  const { email, otp } = req.body;
  console.log(req.body);

  try {
    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log(user.otpExpires);
    // Check if the OTP matches and is not expired
    if (user.otp === otp && user.otpExpires > Date.now()) {
      user.otp = null; // Clear OTP
      user.otpExpires = null;
      await user.save();

      return res.status(200).json({ message: "OTP verified successfully!" });
    } else {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }
  } catch (error) {
    return next(error); // Pass error to the global error handler
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));

    const accessToken = generateAccessToken(validUser);
    const refreshToken = generateRefreshToken(validUser);

    validUser.refreshtoken = refreshToken;
    await validUser.save();
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", accessToken, {
        httpOnly: true,
        maxAge: 30 * 60 * 1000,
      }) // 15 minutes
      .cookie("refresh_token", refreshToken, {
        httpOnly: true,
        maxAge: 30 * 60 * 1000,
      }) // 7 days
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};
