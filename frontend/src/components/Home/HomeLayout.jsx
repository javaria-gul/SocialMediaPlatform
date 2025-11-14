// src/components/Home/HomeLayout.jsx
import React from "react";
import SidebarLeft from "./SidebarLeft";
import SidebarRight from "./SidebarRight";
import Feed from "../../pages/Feed";

const HomeLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* LEFT SIDEBAR */}
      <div className="hidden md:flex w-20 lg:w-24 p-3 flex-col items-center bg-white shadow-md">
        <SidebarLeft />
      </div>

      {/* MAIN FEED */}
      <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
        <Feed />
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="hidden lg:flex w-72 p-3 flex-col bg-white shadow-md">
        <SidebarRight />
      </div>
    </div>
  );
};

export default HomeLayout;
