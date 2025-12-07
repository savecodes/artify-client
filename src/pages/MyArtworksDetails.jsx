import React, { useState, useContext } from "react";
import { Link, useLoaderData, useNavigate } from "react-router";
import {
  Heart,
  Calendar,
  DollarSign,
  Ruler,
  Palette,
  Eye,
  Tag,
  Edit,
  Trash2,
  Share2,
} from "lucide-react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

const MyArtworksDetails = () => {
  const data = useLoaderData();
  const artDetails = data.result;
  const { loading, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const likesCount = artDetails.likes_count || 0;
  const [isDeleting, setIsDeleting] = useState(false);

  if (loading) {
    return (
        <LoadingSpinner />
    );
  }

  const handleDelete = () => {
    // Show confirmation dialog
    if (
      window.confirm(
        "Are you sure you want to delete this artwork? This action cannot be undone."
      )
    ) {
      setIsDeleting(true);

      // Add your DELETE API call here
      // Example:
      // fetch(`http://localhost:3000/artworks/${artDetails._id}`, {
      //   method: 'DELETE',
      // })
      // .then(res => res.json())
      // .then(data => {
      //   toast.success("🗑️ Artwork deleted successfully!");
      //   navigate('/my-gallery');
      // })
      // .catch(error => {
      //   toast.error("Failed to delete artwork");
      //   setIsDeleting(false);
      // });

      // Temporary simulation
      setTimeout(() => {
        toast.success("🗑️ Artwork deleted successfully!", {
          position: "top-center",
        });
        navigate("/my-gallery");
      }, 1000);
    }
  };

  const handleShare = () => {
    // Copy link to clipboard
    const link = window.location.href;
    navigator.clipboard.writeText(link);
    toast.success("🔗 Link copied to clipboard!", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString.$date || dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-10/12 mx-auto">
        {/* Back Button */}
        <Link
          to="/my-gallery"
          className="mb-6 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors flex items-center space-x-2 w-fit"
        >
          <span>←</span>
          <span>Back to My Gallery</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Image */}
          <div className="space-y-6">
            <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={artDetails.artwork_image || artDetails.image}
                alt={artDetails.title}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Visibility Badge */}
              <div className="absolute top-4 right-4 flex items-center space-x-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg">
                <Eye size={16} className="text-purple-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                  {artDetails.visibility}
                </span>
              </div>

              {/* Like Count Badge */}
              <div className="absolute bottom-4 left-4 flex items-center space-x-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg">
                <Heart
                  size={16}
                  className="text-pink-500"
                  fill="currentColor"
                />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {likesCount}
                </span>
              </div>
            </div>

            {/* Artist Info Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <img
                  src={
                    artDetails.user_avatar ||
                    user?.photoURL ||
                    "https://i.pravatar.cc/150"
                  }
                  alt={artDetails.artist_name}
                  className="w-16 h-16 rounded-full border-4 border-pink-500 object-cover"
                />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Created by
                  </p>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {artDetails.artist_name}
                  </h3>
                  {artDetails.artist_email && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {artDetails.artist_email}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="space-y-6">
            {/* Title Section */}
            <div>
              <div className="inline-flex items-center space-x-2 mb-3">
                <Tag size={20} className="text-pink-500" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  {artDetails.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-pink-500 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                {artDetails.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                {artDetails.description}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Medium */}
              <div className="bg-linear-to-br from-pink-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4 border border-pink-200 dark:border-gray-600">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                    <Palette size={20} className="text-pink-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                      Medium
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {artDetails.medium_tools}
                    </p>
                  </div>
                </div>
              </div>

              {/* Dimensions */}
              <div className="bg-linear-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4 border border-blue-200 dark:border-gray-600">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                    <Ruler size={20} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                      Dimensions
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {artDetails.dimensions}
                    </p>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="bg-linear-to-br from-green-100 to-emerald-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4 border border-green-200 dark:border-gray-600">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                    <DollarSign size={20} className="text-green-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                      Price
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      ${artDetails.price}
                    </p>
                  </div>
                </div>
              </div>

              {/* Created Date */}
              <div className="bg-linear-to-br from-purple-100 to-pink-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4 border border-purple-200 dark:border-gray-600">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                    <Calendar size={20} className="text-purple-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                      Created
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {formatDate(artDetails.create_date)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              {/* Edit Button */}
              <Link

              to={`/my-gallery/edit/${artDetails._id}`}
                disabled={isDeleting}
                className="w-full py-4 px-6 rounded-xl bg-linear-to-r from-blue-500 to-indigo-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-indigo-700 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <Edit size={24} />
                <span>Edit Artwork</span>
              </Link>

              {/* Delete Button */}
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="w-full py-4 px-6 rounded-xl bg-linear-to-r from-red-500 to-pink-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl hover:from-red-600 hover:to-pink-700 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <Trash2 size={24} />
                <span>{isDeleting ? "Deleting..." : "Delete Artwork"}</span>
              </button>

              {/* Share Button */}
              <button
                onClick={handleShare}
                disabled={isDeleting}
                className="w-full py-4 px-6 rounded-xl bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-2 border-purple-500 dark:border-purple-400 font-semibold text-lg shadow-lg hover:shadow-xl hover:bg-purple-50 dark:hover:bg-gray-600 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <Share2 size={24} />
                <span>Share Artwork</span>
              </button>
            </div>

            {/* Management Info */}
            <div className="bg-linear-to-r from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border border-pink-200 dark:border-gray-600">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                <span className="text-pink-500">ℹ️</span>
                <span>Artwork Management</span>
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start space-x-2">
                  <span className="text-pink-500 mt-0.5">•</span>
                  <span>
                    You can edit your artwork details at any time to update
                    information
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-500 mt-0.5">•</span>
                  <span>
                    Deleting an artwork is permanent and cannot be undone
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>
                    Share your artwork with others using the share button
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyArtworksDetails;
