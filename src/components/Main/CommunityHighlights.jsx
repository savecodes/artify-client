import { Link } from "react-router";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import LoadingSpinner from "../LoadingSpinner";

const CommunityHighlights = ({ highlights }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
    const { loading } = useContext(AuthContext);
    if (loading) {
      return <LoadingSpinner />;
    }

  return (
    <div className="bg-linear-to-br from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 pb-15">
      <div className="w-10/12 mx-auto px-4 py-16 relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800 dark:text-gray-100">
              Community Highlights
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
              Discover the most loved creations from our artists.
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

        {/* Navigation Buttons */}
        <button
          ref={prevRef}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 shadow-md 
        w-10 h-10 rounded-full flex items-center justify-center 
        hover:bg-gray-100 dark:hover:bg-gray-600 transition z-20"
        >
          <ChevronLeft size={22} className="text-gray-700 dark:text-gray-200" />
        </button>

        <button
          ref={nextRef}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 shadow-md 
        w-10 h-10 rounded-full flex items-center justify-center 
        hover:bg-gray-100 dark:hover:bg-gray-600 transition z-20"
        >
          <ChevronRight
            size={22}
            className="text-gray-700 dark:text-gray-200"
          />
        </button>

        {/* Swiper */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {highlights.map((art) => (
            <SwiperSlide key={art._id}>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition overflow-hidden">
                <img
                  src={art.artwork_image}
                  alt={art.title}
                  className="w-full h-48 object-cover transform hover:scale-105 transition duration-500"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                    {art.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                    by {art.artist_name}
                  </p>
                  <div className="flex items-center justify-between text-sm text-red-500">
                    <span className="flex items-center">
                      <Heart size={14} className="mr-1 fill-red-500" />
                      {art.likes_count}
                    </span>
                    <Link
                      to={`/artwork/${art._id}`}
                      className="text-brand-600 dark:text-brand-300 hover:underline cursor-pointer"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CommunityHighlights;
