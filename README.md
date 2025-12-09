# 🎨 ARTIFY - Creative Artwork Showcase Platform

**Live Site:** [https://artify-artwork.netlify.app/](https://artify-artwork.netlify.app/)

ARTIFY is an online art-sharing platform where artists can upload their artworks, explore other artists' creations, and connect through likes and favorites.

---

## ✨ Features

- **Browse Artworks** - Explore beautiful artworks from talented artists
- **Like & Favorite System** - Like artworks and save your favorites
- **Upload Your Art** - Share your creative work with the community
- **Personal Gallery** - Manage all your uploaded artworks in one place
- **Dark/Light Mode** - Switch between themes for comfortable viewing

---

## 🛠️ Technologies Used

- **React** - Frontend library
- **Firebase** - Authentication
- **MongoDB** - Database
- **Tailwind CSS** - Styling
- **Express.js** - Backend server

---

## 📚 Main Packages

- `react` - UI building
- `firebase` - User authentication
- `react-router-dom` - Page navigation
- `axios` - API calls
- `react-toastify` - Notifications
- `sweetalert2` - Alert messages
- `react-image-gallery` - Banner slider
- `react-simple-typewriter` - Text animation
- `swiper` - Community highlights carousel
- `lucide-react` - Icons

---

## 🚀 How to Run

1. **Clone the project**
   ```bash
   git clone https://github.com/savecodes/artify-client
   cd artify-client
   ```

2. **Install packages**
   ```bash
   npm install
   ```

3. **Add Environment Variables**
   
   Create `.env.local` file:
   ```
   VITE_APIKEY=your_firebase_api_key
   VITE_AUTHDOMAIN=your_firebase_auth_domain
   VITE_PROJECTID=your_project_id
   VITE_STORAGEBUCKET=your_storage_bucket
   VITE_MESSAGINGSENDERID=your_sender_id
   VITE_APPID=your_app_id
   VITE_API_URL=your_backend_url
   ```

4. **Run the project**
   ```bash
   npm run dev
   ```

---

## 📄 Pages

- **Home** - Banner, Featured artworks, Top artists, Community highlights
- **Explore** - All public artworks with search and filter
- **Add Artwork** - Upload new artwork (Private)
- **My Gallery** - Your uploaded artworks with edit/delete (Private)
- **My Favorites** - Your favorite artworks (Private)
- **Login/Register** - User authentication

---

## 🔐 Authentication

- Email & Password login/registration
- Google login
- Password validation (uppercase, lowercase, minimum 6 characters)
- Private routes protection

---

## 🎨 Special Features

- Responsive design for mobile, tablet, desktop
- Theme toggle (dark/light mode)
- Real-time like count updates
- Search artworks by title or artist
- Filter by category
- Toast notifications for all actions
- Loading spinners

---

## 📦 Project Structure

```
src/
├── components/     # Reusable components
├── pages/          # All pages
├── context/        # Auth context
├── routes/         # Router setup
├── firebase/       # Firebase config
└── assets/         # Images
```

---

## 🌐 Deployment

- **Client:** Netlify or Firebase Hosting
- **Server:** Vercel

---

Made with ❤️ for Programming Hero Assignment