// src/components/Home/HomeLayout.jsx
import React from "react";
import SidebarLeft from "./SidebarLeft";
import SidebarRight from "./SidebarRight";
import Feed from "../../pages/Feed";

const HomeLayout = () => {
  return (
    <div className="min-h-screen bg-white flex">
      {/* LEFT SIDEBAR */}
      <div className="hidden md:flex">
        <SidebarLeft />
      </div>

      {/* MAIN FEED - Right side ke liye bhi margin add kiya */}
      <div className="flex-1 p-4 lg:p-6 bg-white overflow-y-auto ml-16 md:ml-15 mr-0 lg:mr-72">
        <Feed />
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="hidden lg:flex">
        <SidebarRight />
      </div>
    </div>
  );
};

export default HomeLayout;