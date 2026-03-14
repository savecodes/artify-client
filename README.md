# 🎨 Artify - Creative Artwork Showcase

**Live Site:** [https://artify-artwork.netlify.app/](https://artify-artwork.netlify.app/)

Artify is a premium, high-performance artwork discovery platform built with a modern React architecture. It serves as a creative hub where artists can manage their galleries and enthusiasts can discover inspirational works from around the globe.

---

## 🛠️ Frontend Tech Stack

- **Core:** [React 19](https://react.dev/) & [Vite](https://vitejs.dev/)
- **Routing:** [React Router 7](https://reactrouter.com/) (with Loaders & Lazy Loading)
- **Styling:** [TailwindCSS v4](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
- **State & Auth:** [Firebase Authentication](https://firebase.google.com/) & Context API
- **API Client:** [Axios](https://axios-http.com/) (with centralized interceptors)
- **UI Components:** [Lucide React](https://lucide.dev/) (Icons), [Swiper](https://swiperjs.com/), [React Image Gallery](https://www.npmjs.com/package/react-image-gallery)
- **Feedback & Alerts:** [React Toastify](https://fkhadra.github.io/react-toastify/), [SweetAlert2](https://sweetalert2.github.io/)

---

## 📂 Project Structure

The project follows a **Feature-First & Service-Oriented Architecture** to ensure scalability and maintainability.

```bash
src/
├── app/            # Core application setup & routing (React Router 7)
├── assets/         # Static assets (images, logos, etc.)
├── components/     # Categorized UI components
│   ├── layout/     # Structural components (MainLayout)
│   ├── shared/     # Cross-page components (Navbar, Footer, Banner)
│   └── ui/         # Atomic/Presentational components (Loaders, NotFound)
├── constants/      # Global configuration & fixed data (API URLs, Categories)
├── context/        # Global state providers (Authentication)
├── features/       # Domain-specific logic & components (Gallery, Favorites)
├── firebase/       # Firebase initialization & configuration
├── pages/          # Full-view components (Home, Explore, Auth pages)
├── services/       # API abstraction layer (Axios instances, resource services)
├── utils/          # Helper functions (SEO, formating, metadata)
└── main.jsx        # App entry point
```

### Folder Responsibilities:
- **`app/`**: Handles the centralized routing logic and route-based code splitting.
- **`features/`**: Encapsulates specific domain logic. For example, all gallery-related components and logic live in `features/gallery`.
- **`services/`**: Abstracts all backend communication, removing API logic from components for better testability.
- **`utils/`**: Contains pure helper functions, such as dynamic SEO meta updates.

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/savecodes/artify-client.git
cd artify-client
npm install
```

### 2. Setup Environment Variables
Create a `.env` file in the root directory and add your credentials:
```env
VITE_API_BASE_URL=https://artify-server-eight.vercel.app
VITE_APIKEY=your_firebase_api_key
VITE_AUTHDOMAIN=your_firebase_auth_domain
VITE_PROJECTID=your_project_id
VITE_STORAGEBUCKET=your_storage_bucket
VITE_MESSAGINGSENDERID=your_sender_id
VITE_APPID=your_app_id
```

### 3. Run Development Server
```bash
npm run dev
```

---

## ✨ Features

- **Dynamic Gallery:** Real-time browsing of featured and latest artworks.
- **Advanced Filtering:** Search by keyword or filter by specialized categories (Digital Art, Painting, etc.).
- **Artist Portfolio:** Personalized "My Gallery" for artists to create, update, and delete their works.
- **Engagement System:** Like system with real-time feedback and a dedicated Favorites collection.
- **Premium UI/UX:** Dark mode support, smooth transitions, and responsive design for all devices.
- **Robust Auth:** Firebase-powered Email/Password and Google Social Login.

---

## ⚡ Performance & Quality

- **Route Splitting:** Every page is lazy-loaded using `React.lazy` and `Suspense`, significantly reducing initial bundle size.
- **Resource Optimization:** Global image lazy-loading implemented across all gallery grids.
- **Service Layer Implementation:** Centralized Axios instance with interceptors for consistent error handling and clean API calls.
- **Dynamic SEO:** Custom utility functions to manage page titles and meta-descriptions dynamically for better search ranking.
- **MVC Pattern:** Separation of UI (Components), Data/Logic (Services), and Routing (App) for enterprise-grade code quality.

---

Made with ❤️ by Artify Engineering Team