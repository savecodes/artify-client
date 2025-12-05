import { useContext, useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signInWithGoogle, signInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Google Sign In
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged in with Google",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Google login failed",
          text: err.message,
        });
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Missing fields",
        text: "Please enter both email and password.",
      });
      return;
    }

    signInUser(email, password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: err.message,
        });
      });
  };

  return (
    <div className="w-full flex items-center py-15">
      <div className="w-10/12 mx-auto flex justify-center">
        <div className="w-full max-w-md backdrop-blur-xl bg-white/40 dark:bg-gray-900/40 border border-white/30 dark:border-gray-700/40 rounded-2xl p-8 shadow-2xl">
          {/* Title */}
          <h2 className="text-4xl font-semibold text-gray-900 dark:text-white text-center">
            Sign In
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
            Welcome back! Please sign in to continue
          </p>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="
              w-full mt-8 
              bg-gray-500/10 dark:bg-gray-700/30
              flex items-center justify-center 
              h-12 rounded-full 
              hover:bg-gray-500/20 active:scale-95 
              transition-all duration-200 cursor-pointer
            "
          >
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
              alt="googleLogo"
              className="h-5"
            />
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 w-full my-6">
            <div className="w-full h-px bg-gray-300/70 dark:bg-gray-700/70"></div>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-nowrap">
              or sign in with email
            </p>
            <div className="w-full h-px bg-gray-300/70 dark:bg-gray-700/70"></div>
          </div>

          <form onSubmit={handleLogin}>
            {/* Email Field */}
            <div className="flex items-center w-full bg-white/40 dark:bg-gray-800/40 border border-gray-300 dark:border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <Mail size={18} className="text-gray-500" />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="bg-transparent text-gray-900 dark:text-gray-200 placeholder-gray-600 dark:placeholder-gray-400 outline-none text-sm w-full h-full"
                required
              />
            </div>

            {/* Password Field */}
            <div className="flex items-center mt-6 w-full relative bg-white/40 dark:bg-gray-800/40 border border-gray-300 dark:border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <Lock size={18} className="text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="bg-transparent text-gray-900 dark:text-gray-200 placeholder-gray-600 dark:placeholder-gray-400 outline-none text-sm w-full h-full pr-10"
                required
              />

              {/* Eye Toggle */}
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Extras */}
            <div className="w-full flex items-center justify-between mt-6 text-gray-600 dark:text-gray-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input className="h-4 w-4" type="checkbox" />
                <span className="text-sm">Remember me</span>
              </label>

              <Link
                to="/forgot-password"
                className="text-sm underline hover:text-indigo-500 dark:hover:text-indigo-400"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="
              mt-8 w-full h-11 
              rounded-full text-white font-medium 
              bg-linear-to-r from-[#E94B8B] to-[#7C3AED] 
              hover:opacity-90 active:scale-95 
              transition-all duration-200
            "
            >
              Login
            </button>
          </form>

          {/* Bottom Link */}
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-4 text-center">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-500 dark:text-indigo-400 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;