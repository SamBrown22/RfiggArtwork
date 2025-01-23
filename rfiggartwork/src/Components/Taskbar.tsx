"use client";

import { useState } from "react";
import Link from "next/link";

export const Taskbar = () => {
  const navigationtabs = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Contact Us", href: "/contact" },
    { name: "Basket", href: "/basket" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="max-h-24 bg-base p-4 shadow-md relative">
      <nav className="flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-white">Ricky Figg Artwork</h1>
        </Link>

        {/* Hamburger Icon (Visible on small screens) */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Navigation (Visible on large screens) */}
        <div className="hidden lg:flex items-center space-x-8">
          <ul className="flex space-x-6">
            {navigationtabs.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-base-content font-medium hover:text-gray-300 p-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu (Visible when menu is open) */}
      <div
        className={`lg:hidden ${isMenuOpen ? "block" : "hidden"} absolute top-16 left-0 w-full bg-base p-4`}
      >
        <ul className="space-y-4">
          {navigationtabs.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="text-base-content font-medium hover:text-gray-300 p-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                onClick={() => setIsMenuOpen(false)} // Close menu on item click
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
