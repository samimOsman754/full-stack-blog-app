"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaChevronDown,
} from "react-icons/fa";
import { BsSearch } from "react-icons/bs"; // BsChevronBarDown is not used, FaChevronDown is a better fit.
import { IoMoon } from "react-icons/io5";
import { IoMdSunny } from "react-icons/io";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

interface NavItem {
  label: string;
  href: string;
  subItems?: NavItem[];
}

const mainNavItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Categories",
    href: "/categories",
    subItems: [
      { label: "Politics", href: "/categories/politics" },
      { label: "Health", href: "/categories/health" },
      { label: "Travel", href: "/categories/travel" },
    ],
  },
  { label: "Lifestyle", href: "/categories/lifestyle" },
  { label: "Education", href: "/categories/education" },
  { label: "Design", href: "/categories/design" },
  { label: "Technology", href: "/categories/technology" },
  { label: "Culture", href: "/categories/culture" },
  { label: "Contact", href: "/contact" },
  {
    label: "More",
    href: "/#",
    subItems: [
      { label: "Search", href: "/search" },
      { label: "About Us", href: "/about" },
      { label: "Advertise", href: "/advertise" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
    ],
  },
];

const Logo = () => (
  <h1 className="flex-shrink-0">
    <Link
      href="/"
      className="text-2xl flex items-center font-semibold text-gray-900 hover:text-primary transition-colors duration-300"
    >
      <span className="ml-2 text-xl font-semibold">Veritas</span>
    </Link>
  </h1>
);

const Navbar = () => {
  const pathName = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const handleThemeToggle = () =>
    setTheme(theme === "light" ? "dark" : "light");

  return (
    <header className="relative bg-white font-lora text-gray-800 shadow-sm">
      {/* top header */}
      <div className="hidden lg:block py-3">
        <div className="blog-container flex items-center justify-between">
          <Logo />

          {/* top header right side */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-full text-gray-500 hover:text-primary transition-colors focus:outline-none cursor-pointer"
                aria-label="Open search"
              >
                <BsSearch size={18} />
              </button>
              {isSearchOpen && (
                <form
                  action="/search"
                  className="absolute top-full right-0 mt-2 p-3 bg-white rounded-lg shadow-xl w-64 md:w-80 z-20 border border-gray-200 flex items-center space-x-2"
                  onSubmit={() => setIsSearchOpen(true)}
                >
                  <input
                    type="text"
                    name="q"
                    autoFocus
                    placeholder="Type to search articles..."
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary transition"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors"
                    aria-label="Submit search"
                  >
                    <BsSearch size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="ml-1 p-2 rounded-full text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Close search"
                  >
                    <HiOutlineX size={18} />
                  </button>
                </form>
              )}
            </div>
            <button
              className="p-2 rounded-full text-gray-500 hover:text-primary transition-colors focus:outline-none cursor-pointer"
              onClick={handleThemeToggle}
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <IoMoon size={18} />
              ) : (
                <IoMdSunny size={18} />
              )}
            </button>

            {/* social icons */}
            <div className="flex items-center space-x-3">
              <Link
                href="#"
                className="text-gray-500 hover:text-primary transition-colors"
              >
                <FaFacebookF size={18} />
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-primary transition-colors"
              >
                <FaTwitter size={18} />
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-primary transition-colors"
              >
                <FaInstagram size={18} />
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-primary transition-colors"
              >
                <FaLinkedin size={18} />
              </Link>
            </div>
            <Link
              href="/contact"
              className="px-5 py-2 rounded-md border border-gray-300  text-gray-500 hover:text-primary transition-colors focus:outline-none cursor-pointer"
            >
              Contact
            </Link>

            {/* sign in button */}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-5 py-2 rounded-md border border-gray-300  text-white hover:bg-primary transition-colors focus:outline-none cursor-pointer bg-primary ">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
      {/* main navigation */}
      <nav className="border-t border-b border-gray-200">
        {/* large device */}
        <div className="blog-container">
          {/* mobile menu toggle (hamburger) */}
          <div className="flex items-center justify-between lg:hidden w-full p-4 border-t border-b border-gray-200">
            <h1 className="flex-shrink-0">
              <Link
                href="/"
                className="text-2xl flex items-center font-semibold text-gray-900 hover:text-primary transition-colors duration-300"
              >
                <span className="font-semibold">Veritas</span>
              </Link>
            </h1>
            <button
              className=" p-2 rounded-md border border-gray-300  text-gray-500 hover:text-primary transition-colors focus:outline-none cursor-pointer float-right mt-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <HiOutlineX size={24} />
              ) : (
                <HiOutlineMenu size={24} />
              )}
            </button>
          </div>
          <ul className="hidden lg:flex items-center justify-center space-x-8 py-4">
            {mainNavItems.map(({ label, href, subItems }) => {
              const isActive = pathName === href;
              return (
                <li key={label} className="group relative">
                  <Link
                    href={href}
                    className={`inline-flex items-center text-sm uppercase font-medium text-gray-500 hover:text-primary ${
                      isActive ? "text-primary" : ""
                    } transition-colors duration-300`}
                  >
                    {label}
                    {subItems && (
                      <FaChevronDown
                        size={12}
                        className="ml-2 group-hover:rotate-180 transition-transform duration-300"
                      />
                    )}
                  </Link>
                  {subItems && (
                    <ul className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 z-20 uppercase">
                      {subItems.map(({ label: subLabel, href: subHref }) => (
                        <li key={subLabel}>
                          <Link
                            href={subHref}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary"
                          >
                            {subLabel}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200">
            {/* mobile search bar */}
            <div className="flex items-center p-4">
              <form
                action="/search"
                className="flex items-center w-full space-x-2"
                onSubmit={() => setIsMobileMenuOpen(false)}
              >
                <input
                  type="text"
                  name="q"
                  placeholder="Search articles..."
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary transition"
                />
                <button
                  type="submit"
                  className="p-2 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors"
                  aria-label="Submit search"
                >
                  <BsSearch size={18} />
                </button>
              </form>
            </div>
            <ul className="flex flex-col p-4">
              {mainNavItems.map(({ label, href, subItems }) => {
                const isActive = pathName === href;
                return (
                  <li key={label} className="border-b border-gray-100">
                    <div className="relative">
                      <Link
                        href={href}
                        className={`flex items-center justify-between w-full py-3 text-sm uppercase font-medium text-gray-500 hover:text-primary ${
                          isActive ? "text-primary" : ""
                        } transition-colors duration-300`}
                      >
                        {label}
                        {subItems && (
                          <FaChevronDown
                            size={12}
                            className="ml-2 group-hover:rotate-180 transition-transform duration-300"
                          />
                        )}
                      </Link>
                      {subItems && (
                        <ul className="pl-4 uppercase">
                          {subItems.map(
                            ({ label: subLabel, href: subHref }) => (
                              <li key={subLabel}>
                                <Link
                                  href={subHref}
                                  className="block py-2 text-sm text-gray-700 hover:text-primary"
                                >
                                  {subLabel}
                                </Link>
                              </li>
                            )
                          )}
                        </ul>
                      )}
                    </div>
                  </li>
                );
              })}
              <li>
                {/* sign in button */}
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className=" text-left px-5 py-2 rounded-md border border-gray-300 text-white hover:bg-primary transition-colors focus:outline-none cursor-pointer bg-primary mt-4">
                      Sign In
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
