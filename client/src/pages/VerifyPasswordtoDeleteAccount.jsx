// import React from "react";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   deleteUserFailure,
//   deleteUserStart,
//   deleteUserSuccess,
// } from "../redux/user/userSlice";
// import axios from "axios";

// const VerifyPasswordtoDeleteAccount = () => {
//   const [password, setpassword] = useState("");
//   const [loading, setloading] = useState(false);
//   const [username, setusername] = useState("");
//   const dispatch = useDispatch();

//   const { currentUser, error } = useSelector((state) => state.user);
//   console.log(currentUser);
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch(deleteUserStart());
//       setloading(true);
//       const res = await axios.post(
//         `/api/user/delete/${currentUser._id}`,
//         { password },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       const data = res.data;
//       if (data.success === false) {
//         dispatch(deleteUserFailure(data.message));
//         return;
//       }

//       dispatch(deleteUserSuccess(data));
//       setloading(false);
//       return navigate("/");
//     } catch (error) {
//       dispatch(deleteUserFailure(error.message));
//     }
//   };
//   return (
//     <div className="p-3 max-w-lg mx-auto">
//       <h1 className="text-3xl text-center font-semibold my-7">
//         Delete Account
//       </h1>
//       <form className="flex flex-col gap-4">
//         <img
//           src={currentUser.avatar}
//           alt="profile"
//           className="rounded-full  h-24 w-24 object-cover cursor-pointer self-center mt-2"
//         />
//         <h1>UserName : {currentUser.username}</h1>
//         <input
//           type="text"
//           placeholder="Enter UserName"
//           className="border p-3 rounded-lg"
//           id="password"
//           value={username}
//           onChange={(e) => {
//             return setusername(e.target.value);
//           }}
//         />
//         {username !== currentUser.username && (
//           <p className="text-red-500 mt-1">Username is Incorrect</p>
//         )}
//         <input
//           type="password"
//           placeholder="Enter Password"
//           className="border p-3 rounded-lg"
//           id="password"
//           value={password}
//           onChange={(e) => {
//             return setpassword(e.target.value);
//           }}
//         />

//         <button
//           disabled={
//             loading ||
//             !(username === currentUser.username && password.length > 5)
//           }
//           className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
//           onClick={handleSubmit}
//         >
//           {loading ? "Loading..." : " Delete Account"}
//         </button>
//         {error && <p>{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default VerifyPasswordtoDeleteAccount;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
} from "../redux/user/userSlice";
import axios from "axios";

const VerifyPasswordtoDeleteAccount = () => {
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [username, setusername] = useState("");
  const [localError, setLocalError] = useState(null); // Local error state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser, error } = useSelector((state) => state.user);
  console.log(currentUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null); // Reset local error
    try {
      dispatch(deleteUserStart());
      setloading(true);

      const res = await axios.post(
        `/api/user/delete/${currentUser._id}`,
        { password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = res.data;
      console.log(data);

      if (!data.success) {
        dispatch(deleteUserFailure(data.message));
        setLocalError(data.message);

        setloading(false); // Stop loading on failure
        return;
      }

      dispatch(deleteUserSuccess(data));
      setloading(false);
      navigate("/");
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      setLocalError(error.message); // Show error message
      setloading(false); // Stop loading on failure
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">
        Delete Account
      </h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <h1 className="font-medium">Username: {currentUser.username}</h1>
        <input
          type="text"
          placeholder="Enter Username"
          className="border p-3 rounded-lg"
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
        {username !== currentUser.username && (
          <p className="text-red-500 text-sm mt-1">
            Username is incorrect. Please enter the correct username.
          </p>
        )}
        <input
          type="password"
          placeholder="Enter Password"
          className="border p-3 rounded-lg"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />

        <button
          disabled={
            loading ||
            !(username === currentUser.username && password.length > 5)
          }
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          onClick={handleSubmit}
        >
          {loading ? "Deleting..." : "Delete Account"}
        </button>

        {/* Display error message */}
        {(localError || error) && (
          <p className="text-red-500 text-center mt-3">{localError || error}</p>
        )}
      </form>
    </div>
  );
};

export default VerifyPasswordtoDeleteAccount;
