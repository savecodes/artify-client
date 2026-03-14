import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "../components/layout/MainLayout";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import NotFound from "../components/ui/NotFound";
import PrivateRoute from "../context/PrivateRoute";
import { artworkService } from "../services/artworkService";

// Lazy loaded pages
const HomePage = lazy(() => import("../pages/HomePage"));
const ExploreAll = lazy(() => import("../pages/ExploreAll"));
const AddArtwork = lazy(() => import("../pages/AddArtwork"));
const MyGallery = lazy(() => import("../pages/MyGallery"));
const Favorites = lazy(() => import("../pages/Favorites"));
const SignIn = lazy(() => import("../pages/SignIn"));
const SignUp = lazy(() => import("../pages/SignUp"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const Profile = lazy(() => import("../pages/Profile"));
const ArtworksDetails = lazy(() => import("../pages/ArtworksDetails"));
const MyArtworksDetails = lazy(() => import("../pages/MyArtworksDetails"));
const UpdateMyArtworks = lazy(() => import("../pages/UpdateMyArtworks"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <HomePage />
          </Suspense>
        ),
        loader: () => artworkService.getLatestArtworks(),
      },
      {
        path: "explore",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ExploreAll />
          </Suspense>
        ),
        loader: () => artworkService.getAllArtworks(),
      },
      {
        path: "artwork/:id",
        element: (
          <PrivateRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <ArtworksDetails />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "add-artwork",
        element: (
          <PrivateRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <AddArtwork />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "my-gallery",
        element: (
          <PrivateRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <MyGallery />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "my-gallery/:id",
        element: (
          <PrivateRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <MyArtworksDetails />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "my-gallery/edit/:id",
        element: (
          <PrivateRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <UpdateMyArtworks />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "favorites",
        element: (
          <PrivateRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <Favorites />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <SignIn />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <SignUp />
          </Suspense>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ForgotPassword />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
