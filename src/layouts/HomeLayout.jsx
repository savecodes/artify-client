import Footer from "../components/Footer/Footer";
import Navbar from "../components/Heading/Navbar";
import ScrollToTop from "../components/ScrollToTop";
import { Outlet } from "react-router";

const HomeLayout = () => {
  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col">
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

export default HomeLayout;
