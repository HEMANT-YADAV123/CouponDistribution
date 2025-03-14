import { useState, useEffect } from "react";
import axios from "axios";
import { Ticket, Clock, CheckCircle, XCircle } from "lucide-react";


export default function App() {
  // Load cooldown from localStorage (if available)
  const [cooldown, setCooldown] = useState(() => {
    const storedCooldown = localStorage.getItem("cooldown");
    return storedCooldown ? parseInt(storedCooldown, 10) : 0;
  });

  const [message, setMessage] = useState(""); // Stores API response
  const [couponCode, setCouponCode] = useState(""); // Stores claimed coupon code
  const [loading, setLoading] = useState(false); // Loading state
  const [isError, setIsError] = useState(false); // Error state

  // Function to claim a coupon
  const claimCoupon = async () => {
    setLoading(true);
    setIsError(false);

    try {
      const response = await axios.get(
        "http://localhost:4000/api/claim-coupon",
        { withCredentials: true }
      );

      if (response.data.success) {
        setCouponCode(response.data.couponCode || "");
        setMessage(response.data.message);

        // Set cooldown from API response
        if (response.data.cooldownTimeRemaining) {
          setCooldown(response.data.cooldownTimeRemaining);
          localStorage.setItem(
            "cooldown",
            response.data.cooldownTimeRemaining.toString()
          ); // Save cooldown to localStorage
        }
      } else {
        setIsError(true);
        setMessage(response.data.message);

        // Set cooldown if API provides it
        if (response.data.cooldownTimeRemaining) {
          setCooldown(response.data.cooldownTimeRemaining);
          localStorage.setItem(
            "cooldown",
            response.data.cooldownTimeRemaining.toString()
          );
        }
      }
    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.message || "Something went wrong!");
    }

    setLoading(false);
  };

  // Countdown Timer Effect
  useEffect(() => {
    if (cooldown > 0) {
      const interval = setInterval(() => {
        setCooldown((prev) => {
          if (prev > 0) {
            const newTime = prev - 1;
            localStorage.setItem("cooldown", newTime.toString()); // Update stored cooldown
            return newTime;
          } else {
            localStorage.removeItem("cooldown"); // Remove cooldown when it reaches zero
            return 0;
          }
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [cooldown]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-700 gap-8">
      <h1 className="text-3xl font-extrabold text-white capitalize"> Round-Robin Coupon Distribution with Abuse Prevention </h1>
      {/* Card Container */}
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-blue-600 mb-4 flex items-center justify-center gap-2">
          <Ticket className="w-6 h-6 text-blue-500" /> Claim Your Coupon
        </h1>

        <button
          onClick={claimCoupon}
          disabled={loading || cooldown > 0}
          className={`w-full bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 text-lg font-semibold text-white rounded-lg transition-all ${
            loading || cooldown > 0
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading
            ? "Processing..."
            : cooldown > 0
            ? `Wait ${Math.floor(cooldown / 60)}m ${cooldown % 60}s`
            : "Claim Coupon"}
        </button>

        {/* Cooldown Timer */}
        {cooldown > 0 && (
          <p className="flex items-center justify-center gap-2 mt-4 text-lg px-4 py-2 bg-yellow-100 text-yellow-600 rounded-lg">
            <Clock className="w-5 h-5" />
            Cooldown: {Math.floor(cooldown / 60)}m {cooldown % 60}s remaining
          </p>
        )}

        {/* Display Coupon Code */}
        {couponCode && (
          <p className="mt-4 text-lg px-4 py-2 bg-green-100 text-green-600 rounded-lg border border-green-500">
            Your Coupon: <strong>{couponCode}</strong>
          </p>
        )}

        {/* API Response Message */}
        {message && (
          <p
            className={`mt-4 text-lg px-4 py-2 rounded-lg ${
              isError
                ? "bg-red-100 text-red-600 border border-red-500"
                : "bg-green-100 text-green-600 border border-green-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
