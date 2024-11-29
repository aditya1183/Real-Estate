import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import Listing from "../models/listing.model.js";
import { sendEmail } from "../utils/sendEmail.js";
import { passwordUpdated } from "../mailtemplates/passwordUpdate.js";
import DeleteUser from "../models/Deleteuser.model.js";

export const test = (req, res) => {
  res.json({
    message: "Api route is working!",
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only update your own account!"));
  }

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

    const user = await User.findById(req.params.id);

    const { password, ...rest } = updatedUser._doc;
    await sendEmail({
      to: updatedUser.email,
      subject: "Account Updated Successfully",
      html: passwordUpdated(user.email, user.username),
    });
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

//   try {
//     // Log the request body and user object

//     const { password } = req.body;

//     if (!password) {
//       return next(errorHandler(400, "Password is required to delete account"));
//     }

//     // // Fetch the user using their ID
//     const finduser = await User.findById(req.params.id);

//     if (!finduser) {
//       console.log("User not found for ID:", req.params.id);
//       return next(errorHandler(404, "User not found"));
//     }
//     console.log("Found User:", finduser);

//     // // Check if the user is authorized

//     if (req.params.id !== finduser._id.toString()) {
//       return next(errorHandler(401, "You can only delete your own account!"));
//     }

//     // Validate the provided password
//     const validPassword = bcryptjs.compareSync(password, finduser.password);
//     if (!validPassword) {
//       return next(errorHandler(401, "Invalid password"));
//     }

//     // // Delete the user
//     await User.findByIdAndDelete(req.params.id);
//     await sendEmail({
//       to: User.email,
//       subject: "Account Deleted",
//       text: `Hello ${user.username},\n\nYour account has been successfully deleted. We hope to see you again!`,
//     });
//     res.clearCookie("access_token");
//     res.status(200).json({ success: true, message: "User has been deleted!" });
//   } catch (error) {
//     console.log("Error during user deletion:", error);
//     next(error);
//   }
// };

// export const deleteUser = async (req, res, next) => {
//   try {
//     const { password } = req.body;

//     if (!password) {
//       return next(
//         errorHandler(400, "Password is required to delete the account")
//       );
//     }

//     // Fetch the user using their ID
//     const finduser = await User.findById(req.params.id);

//     if (!finduser) {
//       return next(errorHandler(404, "User not found"));
//     }

//     // Check if the user is authorized
//     if (req.params.id !== finduser._id.toString()) {
//       return next(errorHandler(401, "You can only delete your own account!"));
//     }

//     // Validate the provided password
//     const validPassword = bcryptjs.compareSync(password, finduser.password);
//     if (!validPassword) {
//       return next(errorHandler(401, "Invalid password"));
//     }

//     // Move user data to DeletedUser model
//     const deletedUserData = new DeleteUser({
//       username: finduser.username,
//       email: finduser.email,
//       avatar: finduser.avatar,
//       deletionDate: new Date(), // Adding deletion timestamp
//     });
//     await deletedUserData.save();

//     // Delete the user from User collection
//     await User.findByIdAndDelete(req.params.id);

//     // Send email notification
//     await sendEmail({
//       to: finduser.email,
//       subject: "Account Deleted",
//       html: `Hello ${finduser.username},\n\nYour account has been successfully deleted. We hope to see you again!`,
//     });

//     // Clear cookies and send response
//     res.clearCookie("access_token");
//     res
//       .status(200)
//       .json({ success: true, message: "Sucessfull Deleted your Account !" });
//   } catch (error) {
//     console.error("Error during user deletion:", error);
//     next(error);
//   }
// };

export const deleteUser = async (req, res, next) => {
  try {
    const { password } = req.body;

    if (!password) {
      return next(
        errorHandler(400, "Password is required to delete the account")
      );
    }

    const finduser = await User.findById(req.params.id);
    if (!finduser) {
      return next(errorHandler(404, "User not found"));
    }

    if (req.params.id !== finduser._id.toString()) {
      return next(errorHandler(401, "You can only delete your own account!"));
    }

    const validPassword = bcryptjs.compareSync(password, finduser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Invalid password"));
    }

    // Archive and delete user logic
    const deletedUserData = new DeleteUser({
      username: finduser.username,
      email: finduser.email,
      avatar: finduser.avatar,
      deletionDate: new Date(),
    });
    await deletedUserData.save();

    await User.findByIdAndDelete(req.params.id);

    await sendEmail({
      to: finduser.email,
      subject: "Account Deleted",
      html: `Hello ${finduser.username},<br><br>Your account has been successfully deleted. We hope to see you again!`,
    });

    res.clearCookie("access_token");
    res
      .status(200)
      .json({ success: true, message: "User has been deleted and archived!" });
  } catch (error) {
    console.error("Error during user deletion:", error);
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
