import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function OtpVerification() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/verifyotp", {
        email: location.state.email,
        otp,
      });

      const data = res.data;
      console.log(data);

      if (data.message === "OTP verified successfully!") {
        setError(null);
        navigate("/sign-in");
      } else {
        setError(data.message || "OTP verification failed.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Verify OTP</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter OTP"
          className="border p-3 rounded-lg"
          value={otp}
          onChange={handleChange}
          required
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
