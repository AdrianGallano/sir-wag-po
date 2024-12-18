import { Outlet } from "react-router-dom";
import Navbar from "../navbar";

const Layout = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/0">
      <div className="flex flex-col pl-14">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
