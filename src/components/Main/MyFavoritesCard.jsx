import { Heart, Eye, DollarSign } from "lucide-react";
import { Link } from "react-router";

const MyFavoritesCard = ({ art }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-200 dark:border-gray-700">
      {/* Artwork Image */}
      <div className="relative overflow-hidden h-56">
        <img
          src={art.artwork_image}
          alt={art.title}
          className="w-full h-full object-cover transform transition duration-500 group-hover:scale-110"
        />
        
        {/* Overlay with gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-block bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 dark:text-gray-300">
            {art.category}
          </span>
        </div>
        
        {/* Likes Badge */}
        <div className="absolute top-3 right-3">
          <div className="flex items-center space-x-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-2 py-1 rounded-full">
            <Heart size={14} className="text-pink-500 fill-pink-500" />
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              {art.likes_count}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Artist Info */}
        <div className="flex items-center mb-3">
          <img
            src={art.user_avatar}
            alt={art.artist_name}
            className="w-8 h-8 rounded-full mr-2 border-2 border-pink-500 object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {art.artist_name}
            </p>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 truncate group-hover:text-pink-500 dark:group-hover:text-pink-400 transition-colors">
          {art.title}
        </h3>

        {/* Medium & Dimensions */}
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-1">
          {art.medium_tools} • {art.dimensions}
        </p>

        {/* Price */}
        <div className="flex items-center mb-4">
          <DollarSign size={16} className="text-green-500 mr-1" />
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            {art.price}
          </span>
        </div>

        {/* View Details Button */}
        <Link
          to={`/artwork/${art._id}`}
          className="block w-full text-center py-3 px-4 bg-linear-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 transform hover:-translate-y-0.5 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <div className="flex items-center justify-center space-x-2">
            <Eye size={18} />
            <span>View Details</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MyFavoritesCard;