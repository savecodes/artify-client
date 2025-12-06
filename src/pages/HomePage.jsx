import Banner from "../components/Heading/Banner";
import { useLoaderData } from "react-router";
import LatestArtworks from "../components/Main/LatestArtworks";

const HomePage = () => {
  const latestArtworks = useLoaderData();


  return (
    <div>
      <Banner />
      <LatestArtworks latestArtworks={latestArtworks} />
    </div>
  );
};

export default HomePage;
