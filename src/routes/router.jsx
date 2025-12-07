import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import HomePage from "../pages/HomePage";
import ExploreAll from "../pages/ExploreAll";
import AddArtwork from "../pages/AddArtwork";
import MyGallery from "../pages/MyGallery";
import Favorites from "../pages/Favorites";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgotPassword";
import Profile from "../pages/Profile";
import PrivateRoute from "../context/PrivateRoute";
import ArtworksDetails from "../pages/ArtworksDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: () => fetch("http://localhost:3000/latest-artworks"),
      },
      {
        path: "/explore",
        element: <ExploreAll />,
        loader: () => fetch("http://localhost:3000/all-artworks"),
      },
      {
        path: "/artwork/:id",
        element: (
          <PrivateRoute>
            <ArtworksDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/artwork/${params.id}`),
      },
      {
        path: "/add-artwork",
        element: (
          <PrivateRoute>
            <AddArtwork />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-gallery",
        element: <MyGallery />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
      {
        path: "/settings",
        element: <Profile />,
      },
      {
        path: "/login",
        element: <SignIn />,
      },
      {
        path: "/register",
        element: <SignUp />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },
]);

export default router;
