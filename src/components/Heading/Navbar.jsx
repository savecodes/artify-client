import { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, Settings, LogOut, Sun, Moon } from "lucide-react";
import Logo from "../../assets/logo.png";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const isActive = (path) =>
    location.pathname === path
      ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg"
      : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 px-4 py-2 rounded-lg transition-colors";

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-2">
        <div className="w-10/12 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img src={Logo} alt="Logo" className="h-8 w-auto" />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              <Link to="/" className={isActive("/")}>
                Home
              </Link>
              <Link to="/explore" className={isActive("/explore")}>
                Explore Artworks
              </Link>
              <Link to="/add-artwork" className={isActive("/add-artwork")}>
                Add Artwork
              </Link>
              <Link to="/my-gallery" className={isActive("/my-gallery")}>
                My Gallery
              </Link>
              <Link to="/favorites" className={isActive("/favorites")}>
                My Favorites
              </Link>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-3">
              {/* Theme Toggle */}
              <button
                onClick={handleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Moon
                    size={20}
                    className="text-gray-700 dark:text-gray-300"
                  />
                ) : (
                  <Sun size={20} className="text-gray-700 dark:text-gray-300" />
                )}
              </button>

              {/* User Profile - Desktop */}
              {user && (
                <div className="hidden lg:block relative group">
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-9 h-9 rounded-full border-2 border-pink-500 cursor-pointer"
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {user.displayName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      to="/settings"
                      className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Settings size={16} className="mr-2" /> Settings
                    </Link>
                    <button className="flex items-center w-full px-3 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <LogOut size={16} className="mr-2" /> Logout
                    </button>
                  </div>
                </div>
              )}

              {/* Auth Buttons - Desktop */}
              {!user && (
                <div className="hidden lg:flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-pink-500 border border-pink-500 rounded-lg hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-medium text-white bg-linear-to-r from-pink-500 to-purple-600 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-colors"
                  >
                    Register
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Menu size={24} className="text-gray-700 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Menu
          </h2>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X size={24} className="text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        {/* User Profile Section - Mobile */}
        {user && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center space-x-3">
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-12 h-12 rounded-full border-2 border-pink-500"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {user.displayName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Menu Items */}
        <div className="flex flex-col p-4 space-y-2">
          <Link
            to="/"
            className={`${isActive("/")} block text-sm font-medium`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/explore"
            className={`${isActive("/explore")} block text-sm font-medium`}
            onClick={() => setIsMenuOpen(false)}
          >
            Explore Artworks
          </Link>
          <Link
            to="/add-artwork"
            className={`${isActive("/add-artwork")} block text-sm font-medium`}
            onClick={() => setIsMenuOpen(false)}
          >
            Add Artwork
          </Link>
          <Link
            to="/my-gallery"
            className={`${isActive("/my-gallery")} block text-sm font-medium`}
            onClick={() => setIsMenuOpen(false)}
          >
            My Gallery
          </Link>
          <Link
            to="/favorites"
            className={`${isActive("/favorites")} block text-sm font-medium`}
            onClick={() => setIsMenuOpen(false)}
          >
            My Favorites
          </Link>

          <div className="border-t border-gray-200 dark:border-gray-800 my-4"></div>

          {user ? (
            <>
              <Link
                to="/settings"
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Settings size={18} className="mr-3" /> Settings
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <LogOut size={18} className="mr-3" /> Logout
              </button>
            </>
          ) : (
            <div className="space-y-2">
              <Link
                to="/login"
                className="block w-full px-4 py-2 text-center text-sm font-medium text-pink-500 border border-pink-500 rounded-lg hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block w-full px-4 py-2 text-center text-sm font-medium text-white bg-linear-to-r from-pink-500 to-purple-600 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
