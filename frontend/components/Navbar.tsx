import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <>
      <div className="text-sm text-white w-full">
        {/* Bandeau promo */}
        <div className="text-center font-medium py-2 bg-gradient-to-r from-violet-500 via-[#9938CA] to-[#E0724A]">
          <p>
            Exclusive Price Drop! Hurry,{" "}
            <span className="underline underline-offset-2">
              Offer Ends Soon!
            </span>
          </p>
        </div>

        {/* Navbar principale */}
        <nav className="relative h-[70px] flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 bg-white text-gray-900 shadow transition-all">
          <div className="font-bold text-lg">MyBrand</div>

          <ul className="hidden md:flex items-center space-x-8 md:pl-28">
            <li>
              <Link to="/">Our Products</Link>
            </li>
            <li>
              <Link to="/add">Management Products</Link>
            </li>
            
          </ul>

          <button className="hidden md:inline bg-white hover:bg-gray-50 border border-gray-300 ml-20 px-9 py-2 rounded-full active:scale-95 transition-all">
            Get started
          </button>

          {/* Bouton menu mobile */}
          <button
            aria-label="menu"
            type="button"
            className="menu-btn inline-block md:hidden active:scale-90 transition"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
            >
              <path d="M3 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2z" />
            </svg>
          </button>

          {/* Menu mobile */}
          {isMenuOpen && (
            <div className="absolute top-[70px] left-0 w-full bg-white shadow-sm p-6 md:hidden animate-fade-in">
              <ul className="flex flex-col space-y-4 text-lg">
                <li>
                  <Link to="/" className="text-sm">
                    Our Products
                  </Link>
                </li>
                <li>
                  <Link to="/add" className="text-sm">
                    Management Products
                  </Link>
                </li>
               
              </ul>

              <button
                type="button"
                className="bg-white text-gray-600 border border-gray-300 mt-6 text-sm hover:bg-gray-50 active:scale-95 transition-all w-40 h-11 rounded-full"
              >
                Get started
              </button>
            </div>
          )}
        </nav>
      </div>

      <Outlet />
    </>
  );
};

export default Navbar;
