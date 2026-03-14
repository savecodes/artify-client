import Footer from "../shared/Footer/Footer";
import Navbar from "../shared/Navbar/Navbar";
import ScrollToTop from "../shared/ScrollToTop";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 z-50">
          <Navbar />
        </header>
        <main className="flex-1">
          <Outlet />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default MainLayout;
