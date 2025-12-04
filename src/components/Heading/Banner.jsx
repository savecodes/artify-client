import { useState } from "react";
import ImageGallery from "react-image-gallery";
import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";
import "react-image-gallery/styles/css/image-gallery.css";
import slider1 from "../../assets/Untitled_design_53.webp";
import slider2 from "../../assets/Untitled_design_56.webp";
import slider3 from "../../assets/Untitled_design_59.webp";

const Banner = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      original: slider1,
      thumbnail: slider1,
    },
    {
      original: slider2,
      thumbnail: slider2,
    },
    {
      original: slider3,
      thumbnail: slider3,
    },
  ];

  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      {/* Image Gallery Background */}
      <div className="absolute inset-0 z-0">
        <ImageGallery
          items={images}
          showThumbnails={false}
          showFullscreenButton={false}
          showPlayButton={false}
          autoPlay={true}
          slideInterval={5000}
          slideDuration={800}
          showNav={false}
          onSlide={(index) => setCurrentIndex(index)}
          renderItem={(item) => (
            <div className="h-[90vh] w-full relative">
              <img
                src={item.original}
                alt="Art Gallery"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/30"></div>
            </div>
          )}
        />
      </div>

      <div className="relative z-10 h-full flex items-center">
        <div className="w-10/12 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Main Heading with Typewriter */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
              <span className="inline-block">Discover&nbsp;</span>
              <span className="inline-block bg-linear-to-r from-[#E94B8B] to-[#7C3AED] bg-clip-text text-transparent whitespace-nowrap">
                <Typewriter
                  words={["Creativity", "Inspiration", "Art", "Beauty"]}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={100}
                  deleteSpeed={80}
                  delaySpeed={2000}
                />
              </span>
            </h1>

            {/* Description */}
            <p className="text-white/90 text-base sm:text-lg md:text-xl mb-10 leading-relaxed max-w-2xl">
              Join a community of artists and art lovers. Share your work, find
              inspiration, and connect.
            </p>

            <div>
              <button
                onClick={() => navigate("/explore")}
                className="group relative px-8 py-4 bg-linear-to-r from-[#E94B8B] to-[#7C3AED] text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#E94B8B]/50 transform hover:scale-105"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Explore Artworks
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-[#f43f5e] to-[#9333ea] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            <div className="flex gap-2 mt-12">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "w-12 bg-linear-to-r from-[#E94B8B] to-[#7C3AED]"
                      : "w-8 bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-[#E94B8B]/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-[#7C3AED]/20 rounded-full blur-3xl animate-float-delayed"></div>

      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(20px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }

        /* Custom Gallery Styles */
        .image-gallery-slide {
          transition: opacity 800ms ease-in-out;
        }

        /* Hide default bullets */
        .image-gallery-bullets {
          display: none;
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .image-gallery-slide img {
            object-position: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Banner;
