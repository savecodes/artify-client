import { Heart } from "lucide-react";
import { Link } from "react-router";

const AllArtworksCard = ({ art }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden group">
      
      {/* Image */}
      <div className="overflow-hidden h-48">
        <img
          src={art.image}
          alt={art.title}
          className="w-full h-full object-cover transform transition duration-500 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white truncate">
          {art.title}
        </h3>

        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          by {art.artist_name}
        </p>

        <div className="flex items-center justify-between mt-2">
          <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
            {art.category}
          </span>

          <span className="flex items-center text-red-500 text-xs">
            <Heart size={12} className="mr-1 fill-red-500" /> {art.likes_count}
          </span>
        </div>

        <Link
          to={`/artwork/${art._id}`}
          className="block mt-4 w-full text-center py-2 
          bg-brand-50 dark:bg-brand-900 
          text-brand-700 dark:text-brand-300 
          rounded-md font-medium 
          hover:bg-brand-100 dark:hover:bg-brand-800 
          hover:underline transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default AllArtworksCard;