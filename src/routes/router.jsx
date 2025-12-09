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
import MyArtworksDetails from "../pages/MyArtworksDetails";
import UpdateMyArtworks from "../pages/UpdateMyArtworks";
import { Suspense } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <HomePage />
          </Suspense>
        ),
        loader: () =>
          fetch("https://artify-server-eight.vercel.app/latest-artworks"),
      },
      {
        path: "/explore",
        element: <ExploreAll />,
        loader: () =>
          fetch("https://artify-server-eight.vercel.app/all-artworks"),
      },
      {
        path: "/artwork/:id",
        element: (
          <PrivateRoute>
            <ArtworksDetails />
          </PrivateRoute>
        ),
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
        element: (
          <PrivateRoute>
            <MyGallery />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-gallery/:id",
        element: (
          <PrivateRoute>
            <MyArtworksDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-gallery/edit/:id",
        element: (
          <PrivateRoute>
            <UpdateMyArtworks />
          </PrivateRoute>
        ),
      },
      {
        path: "/favorites",
        element: (
          <PrivateRoute>
            <Favorites />
          </PrivateRoute>
        ),
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
