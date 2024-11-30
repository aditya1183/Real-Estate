// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";
// import {
//   signInStart,
//   signInSuccess,
//   signInFailure,
// } from "../redux/user/userSlice";
// import OAuth from "../components/OAuth";
// import axios from "axios";
// import LoadingSpinner from "../Loading/Loadingspinner";
// export default function SignIn() {
//   const [formData, setFormData] = useState({});
//   const { loading, error } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from || "/";
//   const dispatch = useDispatch();
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     dispatch(signInStart());

//   //     const res = await axios.post("/api/auth/signin", formData, {
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //     });
//   //     const data = res.data;
//   //     console.log(data);
//   //     if (data.success === false) {
//   //       dispatch(signInFailure(data.message));
//   //       return;
//   //     }
//   //     dispatch(signInSuccess(data));
//   //     navigate(from);
//   //   } catch (error) {
//   //     dispatch(signInFailure(error.message));
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch(signInStart());

//       const res = await axios.post("/api/auth/signin", formData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const data = res.data;

//       if (data.success === false) {
//         dispatch(signInFailure(data.message));
//         return;
//       }

//       dispatch(signInSuccess(data));
//       navigate(from);
//     } catch (error) {
//       if (
//         error.response &&
//         error.response.data &&
//         error.response.data.message
//       ) {
//         // Display custom error message from backend
//         dispatch(signInFailure(error.response.data.message));
//       } else {
//         // Fallback to generic error message
//         dispatch(signInFailure("Something went wrong. Please try again."));
//       }
//     }
//   };
//   return (
//     <div className="p-3 max-w-lg mx-auto">
//       <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input
//           type="email"
//           placeholder="email"
//           className="border p-3 rounded-lg"
//           id="email"
//           onChange={handleChange}
//         />
//         <input
//           type="password"
//           placeholder="password"
//           className="border p-3 rounded-lg"
//           id="password"
//           onChange={handleChange}
//         />

//         <button
//           disabled={loading}
//           className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
//         >
//           {loading ? "Loading..." : "Sign In"}
//         </button>
//         <LoadingSpinner/>

//         <OAuth />
//       </form>
//       <div className="flex gap-2 mt-5 flex-row justify-between">
//         <div>
//           <p>Dont have an account?</p>
//           <Link to={"/sign-up"}>
//             <span className="text-blue-700">Sign up</span>
//           </Link>
//         </div>
//         <div>
//           <Link to="/forgottenpassword" className="text-blue-700 ">
//             Forgotten Password
//           </Link>
//         </div>
//       </div>

//       {error && (
//         <div className="mt-5 p-4 border border-red-500 rounded-lg bg-red-100 text-red-700 flex items-center gap-3">
//           <svg
//             className="w-6 h-6 text-red-500"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M18.364 5.636a9 9 0 11-12.728 0m12.728 0L12 12m0 0l-6.364-6.364m12.728 0a9 9 0 01-12.728 0M12 12v6"
//             />
//           </svg>
//           <p className="font-medium">{error}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";
// import {
//   signInStart,
//   signInSuccess,
//   signInFailure,
// } from "../redux/user/userSlice";
// import OAuth from "../components/OAuth";
// import axios from "axios";
// import LoadingSpinner from "../Loading/Loadingspinner"; // Import spinner

// export default function SignIn() {
//   const [formData, setFormData] = useState({});
//   const { loading, error } = useSelector((state) => state.user); // Select loading and error states
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from || "/";
//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch(signInStart());

//       const res = await axios.post("/api/auth/signin", formData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const data = res.data;

//       if (data.success === false) {
//         dispatch(signInFailure(data.message));
//         return;
//       }

//       dispatch(signInSuccess(data));
//       navigate(from);
//     } catch (error) {
//       if (
//         error.response &&
//         error.response.data &&
//         error.response.data.message
//       ) {
//         dispatch(signInFailure(error.response.data.message));
//       } else {
//         dispatch(signInFailure("Something went wrong. Please try again."));
//       }
//     }
//   };

//   return (
//     <div className="p-3 max-w-lg mx-auto">
//       <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>

//       {loading ? (
//         <LoadingSpinner /> // Show spinner when loading
//       ) : (
//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <input
//             type="email"
//             placeholder="email"
//             className="border p-3 rounded-lg"
//             id="email"
//             onChange={handleChange}
//           />
//           <input
//             type="password"
//             placeholder="password"
//             className="border p-3 rounded-lg"
//             id="password"
//             onChange={handleChange}
//           />
//           <button
//             disabled={loading}
//             className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
//           >
//             Sign In
//           </button>
//           <OAuth />
//         </form>
//       )}

//       <div className="flex gap-2 mt-5 flex-row justify-between">
//         <div>
//           <p>Don’t have an account?</p>
//           <Link to={"/sign-up"}>
//             <span className="text-blue-700">Sign up</span>
//           </Link>
//         </div>
//         <div>
//           <Link to="/forgottenpassword" className="text-blue-700">
//             Forgotten Password
//           </Link>
//         </div>
//       </div>

//       {error && (
//         <div className="mt-5 p-4 border border-red-500 rounded-lg bg-red-100 text-red-700 flex items-center gap-3">
//           <svg
//             className="w-6 h-6 text-red-500"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M18.364 5.636a9 9 0 11-12.728 0m12.728 0L12 12m0 0l-6.364-6.364m12.728 0a9 9 0 01-12.728 0M12 12v6"
//             />
//           </svg>
//           <p className="font-medium">{error}</p>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
import axios from "axios";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());

      const res = await axios.post("/api/auth/signin", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = res.data;

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigate(from);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        dispatch(signInFailure(error.response.data.message));
      } else {
        dispatch(signInFailure("Something went wrong. Please try again."));
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
      {loading && (
        //
        <div className="absolute inset-0 bg-white bg-opacity-80 z-10 flex items-center justify-center">
          <div className="loader border-t-4 border-blue-500 rounded-full w-24 h-24 animate-spin"></div>
        </div>
      )}

      <div
        className={`p-8 max-w-xl w-full bg-white shadow-md rounded-lg z-0 ${
          loading ? "opacity-20" : "opacity-100"
        }`}
      >
        <h1 className="text-4xl text-center font-semibold my-7">Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="email"
            placeholder="Email"
            className="border p-4 rounded-lg"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-4 rounded-lg"
            id="password"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-slate-700 text-white p-4 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            Sign In
          </button>
          <OAuth />
        </form>

        <div className="flex gap-2 mt-5 flex-row justify-between">
          <div>
            <p>Don’t have an account?</p>
            <Link to={"/sign-up"}>
              <span className="text-blue-700">Sign up</span>
            </Link>
          </div>
          <div>
            <Link to="/forgottenpassword" className="text-blue-700">
              Forgotten Password
            </Link>
          </div>
        </div>

        {error && (
          <div className="mt-5 p-4 border border-red-500 rounded-lg bg-red-100 text-red-700 flex items-center gap-3">
            <svg
              className="w-6 h-6 text-red-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.364 5.636a9 9 0 11-12.728 0m12.728 0L12 12m0 0l-6.364-6.364m12.728 0a9 9 0 01-12.728 0M12 12v6"
              />
            </svg>
            <p className="font-medium">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
