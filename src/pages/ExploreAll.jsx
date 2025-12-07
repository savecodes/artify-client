import { useState } from "react";
import { useLoaderData } from "react-router";
import { Search } from "lucide-react";
import AllArtworksCard from "../components/Main/AllArtworksCard";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

const ExploreAll = () => {
  const rawArtworks = useLoaderData();
  const { loading } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  if (loading) {
    return <LoadingSpinner />;
  }

  const categories = [
    "All",
    "Digital Art",
    "Painting",
    "Concept Art",
    "Illustration",
    "Photography",
  ];

  const filtered = rawArtworks.filter((art) => {
    const matchSearch =
      art.title.toLowerCase().includes(search.toLowerCase()) ||
      art.artistName.toLowerCase().includes(search.toLowerCase());

    const matchCategory = category === "All" || art.category === category;
    return matchSearch && matchCategory;
  });

  return (
    <div className="w-10/12 mx-auto px-4 py-10 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Explore Artworks</h1>

      {/* Search + Category Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between mb-10">
        {/* Search */}
        <div className="relative md:w-1/3">
          {/* Gradient Border Wrapper */}
          <div className="p-0.5 rounded-lg bg-linear-to-r from-pink-500 to-purple-600">
            <div className="relative bg-white dark:bg-gray-800 rounded-lg">
              <Search
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search title or artist..."
                className="w-full pl-10 pr-4 py-2 rounded-lg
          bg-white dark:bg-gray-800
          text-gray-900 dark:text-gray-100
          focus:outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Category Buttons */}
        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition font-medium cursor-pointer
          ${
            category === c
              ? "bg-linear-to-r from-pink-500 to-purple-600 text-white"
              : "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-700"
          }
        `}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-300 col-span-full">
            No artworks found.
          </p>
        ) : (
          filtered.map((art) => <AllArtworksCard key={art._id} art={art} />)
        )}
      </div>
    </div>
  );
};

export default ExploreAll;
