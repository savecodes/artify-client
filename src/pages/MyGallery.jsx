import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import MyGalleryCard from "../components/Main/MyGalleryCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { Palette, ImageIcon, Sparkles } from "lucide-react";

const MyGallery = () => {
  const { user } = useContext(AuthContext);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    fetch(`http://localhost:3000/my-gallery?email=${user.email}`, {
      headers: {
        authorization: `bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setGallery(data.result);
        setLoading(false);
      });
  }, [user?.email, user?.accessToken]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-pink-500 to-purple-600 rounded-full mb-4 shadow-lg">
            <Palette size={32} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-pink-500 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
            My Gallery
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Your personal collection of artworks
          </p>

          {/* Stats Bar */}
          {gallery.length > 0 && (
            <div className="mt-6 inline-flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-full px-6 py-3 shadow-lg border border-gray-200 dark:border-gray-700">
              <Sparkles size={20} className="text-purple-500" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {gallery.length} {gallery.length === 1 ? "Artwork" : "Artworks"}{" "}
                Created
              </span>
            </div>
          )}
        </div>

        {/* Gallery Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {gallery.length === 0 ? (
            <div className="col-span-full">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 text-center border border-gray-200 dark:border-gray-700">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-r from-pink-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-full mb-6">
                  <ImageIcon size={40} className="text-pink-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  No Artworks Yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                  Your gallery is empty. Start creating and sharing your amazing
                  artworks with the world!
                </p>
                <a
                  href="/add-artwork"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-linear-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-pink-600 hover:to-purple-700 transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Palette size={20} />
                  <span>Add Your First Artwork</span>
                </a>
              </div>
            </div>
          ) : (
            gallery.map((art) => <MyGalleryCard key={art._id} art={art} />)
          )}
        </div>

        {/* Footer Info */}
        {gallery.length > 0 && (
          <div className="mt-12 text-center">
            <div className="bg-linear-to-r from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border border-pink-200 dark:border-gray-600 max-w-2xl mx-auto">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                💡 <span className="font-semibold">Tip:</span> Keep creating and
                sharing your artworks to build your portfolio and gain
                recognition in the community!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyGallery;
