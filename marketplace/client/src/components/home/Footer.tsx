import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="container mx-auto text-center">
        <p>© {new Date().getFullYear()} Naturopura. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
