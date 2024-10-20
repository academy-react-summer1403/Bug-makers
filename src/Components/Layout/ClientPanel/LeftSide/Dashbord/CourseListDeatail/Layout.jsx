// components/Layout.js
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6">
      <div className="max-w-5xl w-full bg-white p-6 rounded-lg shadow-md">
        {children}
      </div>
    </div>
  );
};

export default Layout;
