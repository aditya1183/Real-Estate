import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import Listing from "../models/listing.model.js";
import DeleteUsers from "../models/Deleteuser.model.js";

// Controller to fetch all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude passwords
    if (!users.length) {
      return res.status(404).json({ message: "No users found!" });
    }

    res.status(200).json(users);
  } catch (err) {
    next(errorHandler(500, "An error occurred while fetching users"));
  }
};

export const getalldeleteuser = async (req, res, next) => {
  try {
    const users = await DeleteUsers.find({});
    console.log("aditya delete user");
    console.log(users);
    if (!users.length) {
      return res.status(404).json({ message: "No users found!" });
    }
    res.status(200).json(users);
  } catch (error) {
    next(errorHandler(500, "An error occurred while fetching users"));
  }
};

export const getsingleuserinfo = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId); // Match the parameter name
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user details" });
  }
};

export const getalllistings = async (req, res, next) => {
  try {
    const listings = await Listing.find({});

    if (!listings.length) {
      return res.status(404).json({ message: "No listings found!" });
    }
    res.status(200).json(listings);
  } catch (error) {
    next(errorHandler(500, "An error occurred while fetching users"));
  }
};
