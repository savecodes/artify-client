import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import {
  DollarSign,
  Eye,
  FileText,
  Image,
  Layers,
  Palette,
  Ruler,
  Tag,
  Save,
  ArrowLeft,
} from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import Swal from "sweetalert2";

const UpdateMyArtworks = () => {
  const { user, loading } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [artDetails, setArtDetails] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/my-gallery/${id}`, {
          headers: { authorization: `bearer ${user.accessToken}` },
        });
        const data = await res.json();
        setArtDetails(data.result);
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", "Failed to load artwork!", "error");
      } finally {
        setLoadingData(false);
      }
    };

    loadData();
  }, [id, user?.accessToken]);

  if (loading || loadingData || !artDetails) {
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

    const formData = {
      artwork_image: e.target.image_url.value,
      title: e.target.title.value,
      category: e.target.category.value,
      medium_tools: e.target.medium_tools.value,
      description: e.target.description.value,
      dimensions: e.target.dimensions.value,
      price: parseFloat(e.target.price.value),
      visibility: e.target.visibility.value,
    };

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/my-gallery/edit/${artDetails._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${user.accessToken}`,
          },
          body: JSON.stringify(formData),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              Swal.fire(
                "Saved!",
                "Artwork updated successfully!",
                "success"
              ).then(() => {
                navigate(`/my-gallery/${artDetails._id}`);
              });
            } else {
              Swal.fire("Failed!", "Failed to update artwork.", "error");
            }
          })
          .catch((error) => {
            Swal.fire("Error!", "Something went wrong!", "error");
            console.log(error);
          });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors flex items-center space-x-2"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-pink-500 to-purple-600 rounded-full mb-4">
              <Palette size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-linear-to-r from-pink-500 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
              Update Your Artwork
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Edit and improve your masterpiece
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image URL */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <Image size={18} className="mr-2 text-pink-500" />
                Artwork Image URL
              </label>
              <input
                type="url"
                name="image_url"
                defaultValue={artDetails.artwork_image || artDetails.image}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Title */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <FileText size={18} className="mr-2 text-purple-500" />
                Artwork Title
              </label>
              <input
                type="text"
                name="title"
                defaultValue={artDetails.title}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
              />
            </div>

            {/* Category + Medium */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <Tag size={18} className="mr-2 text-pink-500" />
                  Category
                </label>
                <select
                  name="category"
                  defaultValue={artDetails.category}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <Layers size={18} className="mr-2 text-purple-500" />
                  Medium & Tools
                </label>
                <input
                  type="text"
                  name="medium_tools"
                  defaultValue={artDetails.medium_tools}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <FileText size={18} className="mr-2 text-blue-500" />
                Description
              </label>
              <textarea
                name="description"
                defaultValue={artDetails.description}
                rows="4"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 resize-none"
              />
            </div>

            {/* Dimensions + Price + Visibility */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <Ruler size={18} className="mr-2 text-pink-500" />
                  Dimensions
                </label>
                <input
                  type="text"
                  name="dimensions"
                  defaultValue={artDetails.dimensions}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <DollarSign size={18} className="mr-2 text-green-500" />
                  Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  defaultValue={artDetails.price}
                  min="0"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <Eye size={18} className="mr-2 text-purple-500" />
                  Visibility
                </label>
                <select
                  name="visibility"
                  defaultValue={artDetails.visibility}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-lg bg-linear-to-r from-pink-500 via-purple-600 to-blue-600 text-white font-semibold text-lg shadow-lg flex items-center justify-center"
              >
                <Save size={20} />
                <span>Save Changes</span>
              </button>
            </div>
          </form>

          {/* Info */}
          <div className="mt-6 bg-linear-to-r from-pink-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4 border border-pink-200 dark:border-gray-600">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              💡 <span className="font-semibold">Note:</span> Original creation
              date, likes, and artist info will be preserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateMyArtworks;
