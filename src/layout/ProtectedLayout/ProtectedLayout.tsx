import { Outlet } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const ProtectedLayout = () => {
  return (
    <div className="protected-layout">
      <Navbar />

      <main className="protected-layout__content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default ProtectedLayout;
