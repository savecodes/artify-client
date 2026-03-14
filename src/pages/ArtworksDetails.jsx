import { useState, useEffect, useContext, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  Heart,
  Calendar,
  DollarSign,
  Ruler,
  Palette,
  Eye,
  Tag,
} from "lucide-react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { artworkService } from "../services/artworkService";
import { favoriteService } from "../services/favoriteService";

const ArtworksDetails = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [artDetails, setArtDetails] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isCheckingFavorite, setIsCheckingFavorite] = useState(true);
  const [loadingData, setLoadingData] = useState(true);

  const fetchArtDetails = useCallback(async () => {
    if (!id || !user?.accessToken) return;
    try {
      const data = await artworkService.getArtworkById(id, user.accessToken);
      setArtDetails(data.result);
      setLikesCount(data.result.likes_count || 0);
    } catch (err) {
      toast.error("Failed to load artwork details.");
      console.error(err);
    } finally {
      setLoadingData(false);
    }
  }, [id, user?.accessToken]);

  const checkFavoriteStatus = useCallback(async () => {
    if (!user?.email || !id) {
      setIsCheckingFavorite(false);
      return;
    }
    try {
      const data = await favoriteService.checkFavorite(user.email, id, user.accessToken);
      if (data.success) {
        setIsFavorite(data.isFavorite);
      }
    } catch (error) {
      console.error("Error checking favorite status:", error);
    } finally {
      setIsCheckingFavorite(false);
    }
  }, [user?.email, id, user?.accessToken]);

  useEffect(() => {
    fetchArtDetails();
    checkFavoriteStatus();
  }, [fetchArtDetails, checkFavoriteStatus]);

  if (loading || isCheckingFavorite || loadingData || !artDetails) {
    return <LoadingSpinner />;
  }

  const handlePurchase = () => {
    toast.info("🛒 Feature coming soon! Stay tuned.");
  };

  const handleToggleFavorite = async () => {
    if (!user?.email) {
      toast.error("Please login to add favorites!");
      return;
    }

    const previousState = isFavorite;
    const previousCount = likesCount;

    // Optimistic update
    setIsFavorite(!isFavorite);
    setLikesCount((prev) => (!isFavorite ? prev + 1 : prev - 1));

    try {
      if (!isFavorite) {
        const payload = { artwork_id: artDetails._id, likes_by: user.email };
        const data = await favoriteService.addToFavorites(payload, user.accessToken);
        if (data.success) {
          toast.success("Added to favorites ❤");
        } else if (data.message === "Already in favorites") {
          setIsFavorite(true);
          toast.info("Already in favorites!");
        } else {
          throw new Error("Failed to add");
        }
      } else {
        const data = await favoriteService.removeFromFavorites(user.email, artDetails._id, user.accessToken);
        if (data.success) {
          toast.success("Removed from favorites 💔");
        } else {
          throw new Error("Failed to remove");
        }
      }
    } catch (error) {
      setIsFavorite(previousState);
      setLikesCount(previousCount);
      toast.error("Something went wrong!");
      console.error(error);
    }
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
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors flex items-center space-x-2 cursor-pointer"
        >
          <span>←</span>
          <span>Back to Gallery</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-6">
            <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={artDetails.artwork_image || artDetails.image}
                alt={artDetails.title}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute top-4 right-4 flex items-center space-x-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg">
                <Eye size={16} className="text-purple-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                  {artDetails.visibility}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 flex items-center space-x-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg">
                <Heart size={16} className="text-pink-500" fill="currentColor" />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {likesCount}
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <img
                  src={artDetails.user_avatar || "https://i.pravatar.cc/150"}
                  alt={artDetails.artist_name}
                  className="w-16 h-16 rounded-full border-4 border-gradient-to-r from-pink-500 to-purple-600 object-cover"
                />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Created by</p>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {artDetails.artist_name}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-linear-to-br from-pink-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4 border border-pink-200 dark:border-gray-600">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                    <Palette size={20} className="text-pink-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Medium</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {artDetails.medium_tools}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-linear-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4 border border-blue-200 dark:border-gray-600">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                    <Ruler size={20} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Dimensions</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {artDetails.dimensions}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-linear-to-br from-green-100 to-emerald-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4 border border-green-200 dark:border-gray-600">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                    <DollarSign size={20} className="text-green-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Price</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      ${artDetails.price}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-linear-to-br from-purple-100 to-pink-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4 border border-purple-200 dark:border-gray-600">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                    <Calendar size={20} className="text-purple-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Created</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {formatDate(artDetails.create_date)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <button
                onClick={handleToggleFavorite}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-3 cursor-pointer ${
                  isFavorite
                    ? "bg-linear-to-r from-pink-500 to-purple-600 text-white"
                    : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-2 border-pink-500 dark:border-pink-400 hover:bg-pink-50 dark:hover:bg-gray-600"
                }`}
              >
                <Heart size={24} className={isFavorite ? "fill-current" : ""} />
                <span>{isFavorite ? "Remove from Favorites" : "Add to Favorites"}</span>
              </button>

              <button
                onClick={handlePurchase}
                className="w-full py-4 px-6 rounded-xl bg-linear-to-r from-green-500 to-emerald-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl hover:from-green-600 hover:to-emerald-700 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-3 cursor-pointer"
              >
                <DollarSign size={24} />
                <span>Purchase Artwork</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworksDetails;
