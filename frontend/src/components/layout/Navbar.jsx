import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50); // Change background when scrolled past 50px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Cleanup
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 py-4 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md'
          : 'bg-yellow-100 bg-opacity-95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-1">
            <div className="w-8 h-8 rounded-md gradient-bg flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span
              className={`font-bold text-xl ${
                isScrolled ? 'text-fileflow-dark' : 'text-fileflow-dark'
              }`}
            >
              FileFlow
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/features"
            className={`${
              isScrolled ? 'text-black' : 'text-black'
            } hover:underline font-semibold`}
          >
            Features
          </Link>
          <Link
            to="/pricing"
            className={`${
              isScrolled ? 'text-black' : 'text-black'
            } hover:underline font-semibold`}
          >
            Pricing
          </Link>
          <Link
            to="/about"
            className={`${
              isScrolled ? 'text-black' : 'text-black'
            } hover:underline font-semibold`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`${
              isScrolled ? 'text-black' : 'text-black'
            } hover:underline font-semibold`}
          >
            Contact
          </Link>

          <div className="flex items-center space-x-4 ml-4">
            <Link
              to="/login"
              className={`${
                isScrolled
                  ? 'bg-transparent border-black text-black hover:bg-gray-100'
                  : 'bg-transparent border-black text-black hover:bg-[#070528] hover:text-white'
              } flex gap-2 px-6 py-1.5 border-2 hover:scale-103 rounded-xl transition duration-300`}
            >
              <LogOut />
              Sign In
            </Link>
            <Link
              to="/signup"
              className={`${
                isScrolled
                  ? 'bg-[#070528] text-white hover:bg-gray-800'
                  : 'bg-[#070528] text-white'
              } px-6 py-2 hover:scale-103 rounded-lg transition duration-300`}
            >
              Try for free
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-black">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div
          className={`md:hidden shadow-lg mt-2 py-4 px-6 transition-all duration-300 ${
            isScrolled ? 'bg-white' : 'bg-white'
          }`}
        >
          <div className="flex flex-col space-y-4">
            <Link
              to="/features"
              className="text-black hover:underline font-semibold"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className="text-black hover:underline font-semibold"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            <Link
              to="/about"
              className="text-black hover:underline font-semibold"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-black hover:underline font-semibold"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>

            <div className="pt-2">
              <Link
                to="/login"
                className="bg-transparent hover:bg-[#070528] hover:text-white flex justify-center gap-2 text-black px-6 py-2 rounded-full border border-slate-800 mb-2"
                onClick={() => setIsOpen(false)}
              >
                <LogOut />
                Sign In
              </Link>
              <Link
                to="/signup"
                className="block bg-[#070528] hover:bg-transparent hover:text-black border hover:border-slate-800 text-white px-6 py-2 rounded-full text-center"
                onClick={() => setIsOpen(false)}
              >
                Try for free
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;