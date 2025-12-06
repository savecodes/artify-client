import { Link } from "react-router";

const TopArtistsOfWeek = ({ topArtists }) => {
  return (
    <div className="bg-linear-to-br from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-10/12 mx-auto px-4 py-16 ">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800 dark:text-gray-100">
              Top Artists of the Week
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
              The most loved creators by our community.
            </p>
          </div>
          <span
            to="/artists"
            className="mt-4 md:mt-0 px-4 py-2 rounded-full font-semibold text-white 
                     bg-linear-to-r from-pink-500 to-purple-600 
                     hover:opacity-90 transition"
          >
            Weekly Ranked
          </span>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {topArtists.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-300 col-span-full">
              No artists found.
            </p>
          ) : (
            topArtists.map((artist) => (
              <div
                key={artist.artist_name}
                className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition p-5 flex flex-col items-center"
              >
                <img
                  src={artist.image_url || "https://picsum.photos/200"}
                  alt={artist.artist_name}
                  className="w-24 h-24 rounded-full mb-3 object-cover"
                />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {artist.artist_name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {artist.likes_count} Likes
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TopArtistsOfWeek;
