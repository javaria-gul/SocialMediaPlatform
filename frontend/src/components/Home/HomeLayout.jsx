import React from "react";
import SidebarLeft from "./SidebarLeft";
import SidebarRight from "./SidebarRight";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* LEFT SIDEBAR */}
      <div className="hidden md:flex">
        <SidebarLeft />
      </div>

      {/* MAIN CONTENT AREA - UPDATED WIDTH */}
      <div className="flex-1 p-4 lg:p-6 bg-gray-50 overflow-y-auto ml-16 md:ml-16 mr-0 lg:mr-64">
        <Outlet />
      </div>

      {/* RIGHT SIDEBAR - SMALLER WIDTH */}
      <div className="hidden lg:flex">
        <SidebarRight />
      </div>
    </div>
  );
};

export default HomeLayout;