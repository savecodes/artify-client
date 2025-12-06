import Banner from "../components/Heading/Banner";
import { useLoaderData } from "react-router";
import LatestArtworks from "../components/Main/LatestArtworks";
import TopArtistsOfWeek from "../components/Main/TopArtistsOfWeek";

const HomePage = () => {
  const latestArtworks = useLoaderData();

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


  return (
    <div>
      <Banner />
      <LatestArtworks latestArtworks={latestArtworks} />
      <TopArtistsOfWeek topArtists={topArtists} />
    </div>
  );
};

export default HomePage;
