import React, { useContext, useState } from "react";
import {
  Image,
  Palette,
  User,
  Tag,
  Layers,
  FileText,
  Ruler,
  DollarSign,
  Eye,
  Upload,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const AddArtwork = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [artworkData, setArtworkData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (loading) {
    return <LoadingSpinner />;
  }

  const categories = [
    "Digital Art",
    "Painting",
    "Concept Art",
    "Illustration",
    "Photography",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = {
      artwork_image: e.target.image_url.value,
      title: e.target.title.value,
      artist_name: user.displayName,
      artist_email: user.email,
      category: e.target.category.value,
      user_avatar: user.photoURL,
      medium_tools: e.target.medium_tools.value,
      description: e.target.description.value,
      dimensions: e.target.dimensions.value,
      price: e.target.price.value,
      visibility: e.target.visibility.value,
      likes_count: 0,
      create_date: new Date(),
    };

    fetch("https://artify-server-eight.vercel.app/add-artworks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${user.accessToken}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        setArtworkData(data); // Save fetch data to state
        toast.success("🎨 Artwork added successfully!", {
          position: "top-center",
        });
        setIsSubmitting(false);
        navigate("/explore");
      })
      .catch((error) => {
        toast.error(error.message, { position: "top-center" });
        setIsSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-6 px-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-linear-to-br from-pink-500 to-purple-600 rounded-full mb-3">
            <Palette size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-extrabold bg-linear-to-br from-pink-500 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Share Your Masterpiece
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
            Add your artwork to inspire the community
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Image URL */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              <Image size={16} className="mr-2 text-pink-500" />
              Artwork Image URL
            </label>
            <input
              type="url"
              name="image_url"
              placeholder="https://your-image-url.jpg"
              required
              className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Title */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              <FileText size={16} className="mr-2 text-purple-500" />
              Artwork Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Artwork title"
              required
              className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Artist Name */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              <User size={16} className="mr-2 text-blue-500" />
              Artist Name
            </label>
            <input
              type="text"
              name="artist_name"
              readOnly
              defaultValue={user.displayName}
              placeholder="Your name"
              required
              className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category + Medium */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                <Tag size={16} className="mr-2 text-pink-500" />
                Category
              </label>
              <select
                name="category"
                required
                className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                <Layers size={16} className="mr-2 text-purple-500" />
                Medium & Tools
              </label>
              <input
                type="text"
                name="medium_tools"
                placeholder="e.g. Oil on Canvas"
                required
                className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              <FileText size={16} className="mr-2 text-blue-500" />
              Description
            </label>
            <textarea
              name="description"
              rows="3"
              placeholder="Describe your artwork..."
              required
              className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Dimensions + Price + Visibility */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                <Ruler size={16} className="mr-2 text-pink-500" />
                Size
              </label>
              <input
                type="text"
                name="dimensions"
                placeholder="24x36 in or px"
                required
                className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                <DollarSign size={16} className="mr-2 text-green-500" />
                Price
              </label>
              <input
                type="number"
                name="price"
                placeholder="350"
                min="0"
                required
                className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                <Eye size={16} className="mr-2 text-purple-500" />
                Visibility
              </label>
              <select
                name="visibility"
                required
                className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3.5 mt-2 rounded-lg bg-linear-to-r from-pink-500 via-purple-600 to-blue-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all cursor-pointer ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Upload size={20} />
              <span>{isSubmitting ? "Adding..." : "Add Artwork"}</span>
            </div>
          </button>
        </form>

        {/* Optional: show artwork preview after adding */}
        {artworkData && (
          <div className="mt-6 border-t pt-4">
            <h2 className="text-lg font-bold text-gray-700 dark:text-gray-200">
              Your Added Artwork:
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {artworkData.title}
            </p>
            <img
              src={artworkData.artwork_image}
              alt={artworkData.title}
              className="mt-2 rounded-lg max-h-60 object-cover"
            />
          </div>
        )}

        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
          By submitting, you allow your artwork to appear in the public gallery.
        </p>
      </div>
    </div>
  );
};

export default AddArtwork;
