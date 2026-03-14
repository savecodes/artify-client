import { useLoaderData } from "react-router";
import { useContext, useMemo } from "react";
import { AuthContext } from "../context/AuthContext";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import Banner from "../components/shared/Navbar/Banner";
import LatestArtworks from "../features/gallery/components/LatestArtworks";
import TopArtistsOfWeek from "../features/gallery/components/TopArtistsOfWeek";
import CommunityHighlights from "../features/gallery/components/CommunityHighlights";
import { setPageTitle } from "../utils/seo";
import { useEffect } from "react";

const HomePage = () => {
  const latestArtworks = useLoaderData();
  const { loading } = useContext(AuthContext);

  useEffect(() => {
    setPageTitle("Home - Discover Creativity");
  }, []);

  const topArtists = useMemo(() => {
    return latestArtworks
      .reduce((acc, art) => {
        const existing = acc.find((a) => a.artist_name === art.artist_name);
        if (existing) {
          existing.likes_count += art.likes_count;
        } else {
          acc.push({ ...art });
        }
        return acc;
      }, [])
      .sort((a, b) => b.likes_count - a.likes_count)
      .slice(0, 3);
  }, [latestArtworks]);

  const communityHighlights = useMemo(() => {
    return latestArtworks.slice(0, 6);
  }, [latestArtworks]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen">
      <Banner />
      <div>
        <LatestArtworks latestArtworks={latestArtworks} />
        <TopArtistsOfWeek topArtists={topArtists} />
        <CommunityHighlights highlights={communityHighlights} />
      </div>
    </div>
  );
};

export default HomePage;
