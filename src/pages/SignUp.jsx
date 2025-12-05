import { useContext, useState } from "react";
import {
  Mail,
  Lock,
  User,
  Image as ImageIcon,
  Eye,
  EyeOff,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const { signInWithGoogle, createUser, logOut } = useContext(AuthContext);

  const navigate = useNavigate();

  // Password Validation
  const handlePasswordChange = (e) => {
    const value = e.target.value;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasMinLength = value.length >= 6;

    if (!hasUpperCase || !hasLowerCase || !hasMinLength) {
      setPasswordValid(false);
      setPasswordMessage(
        "Password must be at least 6 chars, include uppercase & lowercase"
      );
    } else {
      setPasswordValid(true);
      setPasswordMessage("Strong password!");
    }
  };

  const handleGoogleSignUp = () => {
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

  const handleRegister = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const image = e.target.imageURL.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!passwordValid) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: passwordMessage,
      });
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;

        updateProfile(user, { displayName: name, photoURL: image })
          .then(() => {
            logOut()
            Swal.fire({
              icon: "success",
              title: "Account Created",
              text: "Your profile has been set up!",
              timer: 1500,
              showConfirmButton: false,
            });
            navigate("/login");
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Profile update failed",
              text: err.message,
            });
          });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Registration failed",
          text: error.message,
        });
      });
  };

  return (
    <div className="w-full flex items-center py-15">
      <div className="w-10/12 mx-auto flex justify-center">
        <div className="w-full max-w-md backdrop-blur-xl bg-white/40 dark:bg-gray-900/40 border border-white/30 dark:border-gray-700/40 rounded-2xl p-8 shadow-2xl">
          {/* Title */}
          <h2 className="text-4xl font-semibold text-gray-900 dark:text-white text-center">
            Sign Up
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
            Create an account to get started!
          </p>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="
              w-full mt-8 
              bg-gray-500/10 dark:bg-gray-700/30
              flex items-center justify-center 
              h-12 rounded-full 
              hover:bg-gray-500/20 active:scale-95 
              transition-all duration-200
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
              or sign up with email
            </p>
            <div className="w-full h-px bg-gray-300/70 dark:bg-gray-700/70"></div>
          </div>

          <form onSubmit={handleRegister}>
            {/* Name Field */}
            <div className="flex items-center w-full bg-white/40 dark:bg-gray-800/40 border border-gray-300 dark:border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2 mb-6">
              <User size={18} className="text-gray-500" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="bg-transparent text-gray-900 dark:text-gray-200 placeholder-gray-600 dark:placeholder-gray-400 outline-none text-sm w-full h-full"
                required
              />
            </div>

            {/* Image URL Field */}
            <div className="flex items-center w-full bg-white/40 dark:bg-gray-800/40 border border-gray-300 dark:border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2 mb-6">
              <ImageIcon size={18} className="text-gray-500" />
              <input
                type="text"
                name="imageURL"
                placeholder="Profile Image URL"
                className="bg-transparent text-gray-900 dark:text-gray-200 placeholder-gray-600 dark:placeholder-gray-400 outline-none text-sm w-full h-full"
                required
              />
            </div>

            {/* Email Field */}
            <div className="flex items-center w-full bg-white/40 dark:bg-gray-800/40 border border-gray-300 dark:border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2 mb-6">
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
            <div className="flex items-center w-full relative bg-white/40 dark:bg-gray-800/40 border border-gray-300 dark:border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <Lock size={18} className="text-gray-500" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handlePasswordChange}
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

            {/* Password validation message */}
            {passwordMessage && (
              <p
                className={`text-sm mt-1 ${
                  passwordValid ? "text-green-500" : "text-red-500"
                }`}
              >
                {passwordMessage}
              </p>
            )}

            {/* Terms and conditions */}
            <div className="w-full mt-6">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-400 text-indigo-600 focus:ring-indigo-500"
                  required
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="text-indigo-500 dark:text-indigo-400 hover:underline"
                  >
                    Terms & Conditions
                  </Link>
                </span>
              </label>
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
              Create Account
            </button>
          </form>

          {/* Bottom Link */}
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-4 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-500 dark:text-indigo-400 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
