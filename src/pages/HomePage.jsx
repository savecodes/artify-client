import Banner from "../components/Heading/Banner";
import { useLoaderData } from "react-router";
import LatestArtworks from "../components/Main/LatestArtworks";
import TopArtistsOfWeek from "../components/Main/TopArtistsOfWeek";
import CommunityHighlights from "../components/Main/CommunityHighlights";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

const HomePage = () => {
  const latestArtworks = useLoaderData();
  const { loading } = useContext(AuthContext);
  if (loading) {
    return <LoadingSpinner />;
  }

  const topArtists = latestArtworks
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

  const communityHighlights = latestArtworks.slice(0, 6);

  return (
    <div>
      <Banner />
      <LatestArtworks latestArtworks={latestArtworks} />
      <TopArtistsOfWeek topArtists={topArtists} />
      <CommunityHighlights highlights={communityHighlights} />
    </div>
  );
};

export default HomePage;
