import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import Listing from "../models/listing.model.js";

export const test = (req, res) => {
  res.json({
    message: "Api route is working!",
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only update your own account!"));
  }
  console.log(req.body);
  try {
    // Upload avatar to Cloudinary if provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "avatars", // Store images in a specific folder
        transformation: { width: 200, height: 200, crop: "fill" }, // Optional resizing
      });
      req.body.avatar = result.secure_url; // Use the uploaded image URL
    }

    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
// export const deleteUser = async (req, res, next) => {
//   console.log(req.body);
//   if (req.user.id !== req.params.id)
//     return next(errorHandler(401, "You can only delete your own account!"));

//   const { password } = req.body;
//   console.log(password);
//   try {
//     await User.findByIdAndDelete(req.params.id);
//     res.clearCookie("access_token");
//     res.status(200).json("User has been deleted!");
//   } catch (error) {
//     next(error);
//   }
// };

export const deleteUser = async (req, res, next) => {
  try {
    // Log the request body and user object
    console.log("Request Body:", req.body);
    console.log("Request User:", req.params.id);

    const { password } = req.body;

    if (!password) {
      return next(errorHandler(400, "Password is required to delete account"));
    }

    // // Fetch the user using their ID
    const finduser = await User.findById(req.params.id);

    if (!finduser) {
      console.log("User not found for ID:", req.params.id);
      return next(errorHandler(404, "User not found"));
    }
    console.log("Found User:", finduser);

    // // Check if the user is authorized
    console.log(finduser._id.toString());
    if (req.params.id !== finduser._id.toString()) {
      return next(errorHandler(401, "You can only delete your own account!"));
    }

    // Validate the provided password
    const validPassword = bcryptjs.compareSync(password, finduser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Invalid password"));
    }

    // // Delete the user
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json({ success: true, message: "User has been deleted!" });
  } catch (error) {
    console.log("Error during user deletion:", error);
    next(error);
  }
};

export const getUserListings = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You can only view your own listings!"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return next(errorHandler(404, "User not found!"));

    const { password: pass, ...rest } = user._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
