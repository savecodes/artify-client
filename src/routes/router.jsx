import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import HomePage from "../pages/HomePage";
import ExploreAll from "../pages/ExploreAll";
import AddArtwork from "../pages/AddArtwork";
import MyGallery from "../pages/MyGallery";
import Favorites from "../pages/Favorites";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/explore",
        element: <ExploreAll />,
      },
      {
        path: "/add-artwork",
        element: <AddArtwork />,
      },
      {
        path: "/my-gallery",
        element: <MyGallery />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
    ],
  },
]);

export default router;
