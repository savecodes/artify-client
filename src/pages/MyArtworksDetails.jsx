import { useState, useContext, useEffect, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router";
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
import LoadingSpinner from "../components/ui/LoadingSpinner";
import Swal from "sweetalert2";
import { artworkService } from "../services/artworkService";

const MyArtworksDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, user } = useContext(AuthContext);

  const [artDetails, setArtDetails] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchArtwork = useCallback(async () => {
    if (!id || !user?.accessToken) return;
    try {
      const data = await artworkService.getMyArtworkById(id, user.accessToken);
      setArtDetails(data.result);
    } catch (error) {
      console.error("Error loading artwork:", error);
      toast.error("Failed to load artwork");
    } finally {
      setLoadingData(false);
    }
  }, [id, user?.accessToken]);

  useEffect(() => {
    fetchArtwork();
  }, [fetchArtwork]);

  if (loading || loadingData || !artDetails) {
    return <LoadingSpinner />;
  }

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsDeleting(true);
        try {
          await artworkService.deleteArtwork(artDetails._id, user.accessToken);
          Swal.fire({
            title: "Deleted!",
            text: "Artwork deleted successfully!",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          navigate("/my-gallery");
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: error.message || "Failed to delete",
            icon: "error",
          });
          setIsDeleting(false);
        }
      }
    });
  };

  const handleShare = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link);
    toast.success("🔗 Link copied to clipboard!");
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
        <Link
          to="/my-gallery"
          className="mb-6 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors flex items-center space-x-2 w-fit"
        >
          <span>←</span>
          <span>Back to My Gallery</span>
        </Link>

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
                  {artDetails.likes_count || 0}
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <img
                  src={artDetails.user_avatar || user?.photoURL || "https://i.pravatar.cc/150"}
                  alt={artDetails.artist_name}
                  className="w-16 h-16 rounded-full border-4 border-pink-500 object-cover"
                />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Created by</p>
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
                  <Palette size={20} className="text-pink-500" />
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
                  <Ruler size={20} className="text-blue-500" />
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
                  <DollarSign size={20} className="text-green-500" />
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
                  <Calendar size={20} className="text-purple-500" />
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
              <Link
                to={`/my-gallery/edit/${artDetails._id}`}
                className="w-full py-4 px-6 rounded-xl bg-linear-to-r from-blue-500 to-indigo-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-indigo-700 transform hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-3"
              >
                <Edit size={24} />
                <span>Edit Artwork</span>
              </Link>

              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="w-full py-4 px-6 rounded-xl bg-linear-to-r from-red-500 to-pink-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl hover:from-red-600 hover:to-pink-700 transform hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-3 cursor-pointer"
              >
                <Trash2 size={24} />
                <span>{isDeleting ? "Deleting..." : "Delete Artwork"}</span>
              </button>

              <button
                onClick={handleShare}
                className="w-full py-4 px-6 rounded-xl bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-2 border-purple-500 font-semibold text-lg shadow-lg hover:bg-purple-50 dark:hover:bg-gray-600 transform hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-3 cursor-pointer"
              >
                <Share2 size={24} />
                <span>Share Artwork</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyArtworksDetails;
