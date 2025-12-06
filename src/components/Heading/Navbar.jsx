import { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, Settings, LogOut, Sun, Moon } from "lucide-react";
import Logo from "../../assets/logo.png";
import { AuthContext } from "../../context/AuthContext";
import LoadingSpinner from "../LoadingSpinner";

const Navbar = () => {
  const { user, loading, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const isActive = (path) =>
    location.pathname === path
      ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium"
      : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 px-4 py-2 rounded-lg transition-colors";

  const isMobileActive = (path) =>
    location.pathname === path
      ? "block w-full text-left bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-3 rounded-lg font-medium"
      : "block w-full text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-3 rounded-lg transition-colors";

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-2">
        <div className="w-11/12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
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
            <div className="flex items-center space-x-3 flex-shrink-0">
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

              {/* Desktop: Auth Area */}
              <div className="hidden lg:flex items-center space-x-3">
                {loading ? (
                  <LoadingSpinner />
                ) : user ? (
                  <div className="relative group">
                    <img
                      src={user.photoURL || "/default-avatar.png"}
                      alt={user.displayName || "User"}
                      className="w-9 h-9 rounded-full border-2 border-pink-500 cursor-pointer object-cover"
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                          {user.displayName || "User"}
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
                      <button
                        onClick={logOut}
                        className="flex items-center w-full px-3 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <LogOut size={16} className="mr-2" /> Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-4 py-2 text-sm font-medium text-pink-500 border border-pink-500 rounded-lg hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-colors shadow-md"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-80 bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 z-50 lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X size={24} className="text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        {/* Mobile User Info */}
        {user && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            {loading ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt={user.displayName}
                  className="w-12 h-12 rounded-full border-2 border-pink-500 object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                    {user.displayName || "User"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Mobile Links */}
        <div className="p-4 space-y-2 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          <Link
            to="/"
            className={isMobileActive("/")}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/explore"
            className={isMobileActive("/explore")}
            onClick={() => setIsMenuOpen(false)}
          >
            Explore Artworks
          </Link>
          <Link
            to="/add-artwork"
            className={isMobileActive("/add-artwork")}
            onClick={() => setIsMenuOpen(false)}
          >
            Add Artwork
          </Link>
          <Link
            to="/my-gallery"
            className={isMobileActive("/my-gallery")}
            onClick={() => setIsMenuOpen(false)}
          >
            My Gallery
          </Link>
          <Link
            to="/favorites"
            className={isMobileActive("/favorites")}
            onClick={() => setIsMenuOpen(false)}
          >
            My Favorites
          </Link>

          <div className="border-t border-gray-200 dark:border-gray-800 my-4"></div>

          {/* Mobile Auth Actions */}
          {loading ? (
            <div className="flex justify-center py-6">
              <LoadingSpinner />
            </div>
          ) : user ? (
            <>
              <Link
                to="/settings"
                className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <Settings size={18} className="mr-3" /> Settings
              </Link>
              <button
                onClick={() => {
                  logOut();
                  setIsMenuOpen(false);
                }}
                className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
              >
                <LogOut size={18} className="mr-3" /> Logout
              </button>
            </>
          ) : (
            <div className="space-y-3">
              <Link
                to="/login"
                className="block w-full text-center px-4 py-3 text-sm font-medium text-pink-500 border border-pink-500 rounded-lg hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block w-full text-center px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg hover:from-pink-600 hover:to-purple-700 shadow-md transition-colors"
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