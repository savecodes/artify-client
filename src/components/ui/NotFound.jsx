import { useNavigate } from "react-router";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
      <div className="text-center">
        {/* 404 Animation */}
        <div className="relative">
          <h1 className="text-[150px] md:text-[200px] font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-purple-600 leading-none select-none">
            404
          </h1>
          
          {/* Floating Elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-pink-500/20 rounded-full blur-2xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl animate-float-delayed"></div>
        </div>

        {/* Message */}
        <div className="mt-8 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Artwork Illustration */}
        {/* <div className="mb-12">
          <div className="inline-block p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg">
            <svg
              className="w-32 h-32 md:w-40 md:h-40 text-pink-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div> */}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-700 hover:border-pink-500 dark:hover:border-pink-500 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-2 px-6 py-3 bg-linear-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer"
          >
            <Home className="w-5 h-5" />
            Go to Home
          </button>
        </div>

        {/* Fun Message */}
        <p className="mt-12 text-sm text-gray-500 dark:text-gray-400 italic">
          "Every artist was first an amateur, but this page... it never existed! 🎨"
        </p>
      </div>

      <style>{`
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

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFound;