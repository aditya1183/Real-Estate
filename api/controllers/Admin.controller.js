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

// export const deletelisting = async (req, res, next) => {
//   try {
//     const id = req.listings._id;
//     console.log(id);
//     res.json("Aditya vashistha is good boy ");
//   } catch (error) {}
// };
// Adjust the path to your model file

export const deletelisting = async (req, res, next) => {
  try {
    // const id = req.params.id; // Assuming the ID is passed as a route parameter
    // console.log("Deleting listing with ID:", id);
    const { listingId } = req.body;
    console.log(listingId);
    // Check if the listing exists
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Delete the listing
    await Listing.findByIdAndDelete(listingId);

    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    console.error("Error deleting listing:", error);
    res.status(500).json({ message: "Server error while deleting listing" });
  }
};
