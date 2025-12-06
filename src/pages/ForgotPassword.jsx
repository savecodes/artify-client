import { Mail } from "lucide-react";
import { Link } from "react-router";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/Firebase.config";
import Swal from "sweetalert2";

const handleForgot = (e) => {
  e.preventDefault();
  const email = e.target.email.value;

  sendPasswordResetEmail(auth, email)
    .then(() => {
      Swal.fire({
        icon: "success",
        title: "Reset Link Sent!",
        text: "Please check your email inbox.",
      });
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.message,
      });
    });
};

const ForgotPassword = () => {
  return (
    <div className="w-full flex items-center py-15">
      <div className="w-10/12 mx-auto flex justify-center">
        <form
          onSubmit={handleForgot}
          className="w-full max-w-md backdrop-blur-xl bg-white/40 dark:bg-gray-900/40 border border-white/30 dark:border-gray-700/40 rounded-2xl p-8 shadow-2xl"
        >
          {/* Title */}
          <h2 className="text-4xl font-semibold text-gray-900 dark:text-white text-center">
            Forgot Password
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
            Enter your email to reset your password
          </p>

          {/* Email Field */}
          <div className="flex items-center w-full mt-8 bg-white/40 dark:bg-gray-800/40 border border-gray-300 dark:border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <Mail size={18} className="text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="bg-transparent text-gray-900 dark:text-gray-200 placeholder-gray-600 dark:placeholder-gray-400 outline-none text-sm w-full h-full"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="
              mt-8 w-full h-11 
              rounded-full text-white font-medium 
              bg-linear-to-r from-[#E94B8B] to-[#7C3AED] 
              hover:opacity-90 active:scale-95 
              transition-all duration-200 cursor-pointer
            "
          >
            Send Reset Link
          </button>

          {/* Back to Login */}
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-4 text-center">
            Remember your password?{" "}
            <Link
              to="/login"
              className="text-indigo-500 dark:text-indigo-400 hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
