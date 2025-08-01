import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} TaskFlow | Developed by Dibyendu Pramanik {new Date().getFullYear() === 2021 ? '' : '2021-'}{new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;