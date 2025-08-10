import { Outlet } from "react-router";
import Navbar from "@/components/basic/navbar";
import Footer from "@/components/basic/footer";

export default function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen max-w-3xl mx-auto">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
