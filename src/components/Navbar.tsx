'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag, LogOut, User } from 'lucide-react';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <nav className="bg-forest text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <ShoppingBag className="w-8 h-8 text-terracotta" />
            <span className="font-heading text-2xl font-bold">ReThread</span>
          </Link>

          {/* Desktop Navigation - Moved closer to logo */}
          <div className="hidden lg:flex items-center space-x-6 ml-12">
            <Link href="/" className="hover:text-terracotta transition px-3 py-2">
              Home
            </Link>
            <Link href="/explore" className="hover:text-terracotta transition px-3 py-2">
              Explore
            </Link>
            <Link href="/about" className="hover:text-terracotta transition px-3 py-2">
              About
            </Link>
            <Link href="/contact" className="hover:text-terracotta transition px-3 py-2">
              Contact
            </Link>

            {isLoggedIn ? (
              <>
                <Link href="/items/add" className="hover:text-terracotta transition px-3 py-2">
                  Add Item
                </Link>
                <Link href="/items/manage" className="hover:text-terracotta transition px-3 py-2">
                  Manage
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 hover:text-terracotta transition px-3 py-2"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-terracotta transition px-3 py-2">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-terracotta hover:bg-terracotta-dark px-5 py-2 rounded-lg font-semibold transition ml-2"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-700">
            <div className="flex flex-col space-y-2">
              <Link href="/" className="hover:text-terracotta transition px-6 py-2">
                Home
              </Link>
              <Link href="/explore" className="hover:text-terracotta transition px-5 py-2">
                Explore
              </Link>
              <Link href="/about" className="hover:text-terracotta transition px-4 py-2">
                About
              </Link>
              <Link href="/contact" className="hover:text-terracotta transition px-3 py-2">
                Contact
              </Link>

              {isLoggedIn ? (
                <>
                  <Link href="/items/add" className="hover:text-terracotta transition px-3 py-2">
                    Add Item
                  </Link>
                  <Link href="/items/manage" className="hover:text-terracotta transition px-3 py-2">
                    Manage
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left hover:text-terracotta transition px-3 py-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="hover:text-terracotta transition px-3 py-2">
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bg-terracotta hover:bg-terracotta-dark px-5 py-2 rounded-lg font-semibold transition text-center mx-3"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}