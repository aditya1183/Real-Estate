// import axios from "axios";
// import React, { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import LoadingSpinner from "../Loading/Loadingspinner";
// import { useNavigate } from "react-router-dom";

// const ForgottenPassword = () => {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await axios.post(
//         "/api/auth/forgootenpassword",
//         { email },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (res.data.message === "OTP sent to email") {
//         toast.success(
//           "OTP has been sent to your email. Please check your inbox."
//         );
//         setTimeout(() => {
//           navigate("/otpverificationtopasswordreset");
//         }, 3000); // Delay navigation by 3 seconds
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong");
//       setTimeout(() => setError(null), 3000); // Clear error after 3 seconds
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-3 max-w-lg mx-auto">
//       <h1 className="text-3xl text-center font-semibold my-7">
//         Forgotten Password
//       </h1>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input
//           type="email"
//           placeholder="Enter your email"
//           className="border p-3 rounded-lg"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <button
//           disabled={loading}
//           className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
//         >
//           {loading ? "Loading..." : "Verify Gmail"}
//         </button>
//       </form>

//       {error && (
//         <div className="mt-3 text-red-600 text-sm font-medium">{error}</div>
//       )}

//       {/* Toast Container for showing success message */}
//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// };

// export default ForgottenPassword;

import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../Loading/Loadingspinner";

const ForgottenPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        "/api/auth/forgootenpassword",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.message === "OTP sent to email") {
        toast.success(
          "OTP has been sent to your email. Please check your inbox."
        );

        // Show loading spinner and delay navigation
        setRedirecting(true);
        setTimeout(() => {
          navigate("/otpverificationtopasswordreset", {
            state: {
              email: email,
            },
          });
        }, 2000); // 3-second delay
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      setTimeout(() => setError(null), 3000); // Clear error after 3 seconds
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto relative">
      {redirecting ? (
        <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-.5">
          <LoadingSpinner size="large" />
          <p className="mt-5 text-lg font-semibold text-gray-700">
            Please wait for 2 seconds. Redirecting to OTP verification page...
          </p>
        </div>
      ) : (
        <>
          <h1 className="text-3xl text-center font-semibold my-7">
            Forgotten Password
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="border p-3 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              disabled={loading}
              className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            >
              {loading ? "Loading..." : "Verify Gmail"}
            </button>
          </form>

          {error && (
            <div className="mt-3 text-red-600 text-sm font-medium">{error}</div>
          )}
        </>
      )}

      {/* Toast Container for showing success message */}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default ForgottenPassword;
