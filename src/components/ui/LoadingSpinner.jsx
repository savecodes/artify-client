import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>

          <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-transparent border-t-pink-500 border-r-purple-600 animate-spin"></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-linear-to-r from-pink-500 to-purple-600 animate-pulse"></div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-white dark:bg-gray-900"></div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <h3 className="text-xl font-semibold bg-linear-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Loading
          </h3>
          <div className="flex gap-1">
            <span
              className="w-2 h-2 rounded-full bg-pink-500 animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></span>
            <span
              className="w-2 h-2 rounded-full bg-purple-500 animate-bounce"
              style={{ animationDelay: "150ms" }}
            ></span>
            <span
              className="w-2 h-2 rounded-full bg-pink-600 animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></span>
          </div>
        </div>

        <div className="w-64 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-linear-to-r from-pink-500 to-purple-600 animate-progress"></div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(0.95);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes progress {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }

        .animate-bounce {
          animation: bounce 1s ease-in-out infinite;
        }

        .animate-progress {
          animation: progress 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
