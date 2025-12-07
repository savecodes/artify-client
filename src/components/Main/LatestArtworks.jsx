import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import LatestArtworksCard from "./LatestArtworksCard";
import { Link } from "react-router";
import LoadingSpinner from "../LoadingSpinner";

const LatestArtworks = ({ latestArtworks }) => {
    const { loading } = useContext(AuthContext);
    if (loading) {
      return <LoadingSpinner />;
    }
  return (
    <div className="w-10/12 mx-auto px-4 py-16">
      {/* Header */}
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">
            Featured Artworks
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
            Discover the latest creations from our artists, sorted by creation
            date.
          </p>
        </div>

        <Link
          to="/explore"
          className="mt-4 md:mt-0 px-4 py-2 rounded-full font-semibold text-white 
               bg-linear-to-r from-pink-500 to-purple-600 
               hover:opacity-90 transition"
        >
          Explore All
        </Link>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {latestArtworks.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-300 col-span-full">
            No artworks found.
          </p>
        ) : (
          latestArtworks.map((art) => (
            <LatestArtworksCard key={art._id} art={art} />
          ))
        )}
      </div>
    </div>
  );
};

export default LatestArtworks;
