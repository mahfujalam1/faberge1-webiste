"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { IMAGES } from "@/constants/image.index";

const NavigationMenuBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();


  const navItemsCustomer = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    ...(user?.email ? [{ name: "Bookings", href: "/bookings" }] : []),
    { name: "Services", href: "/services" },
    { name: "Contact Us", href: "/contact" },
  ];

  const navItemsWorker = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Schedule", href: "/schedule" },
    { name: "Bookings", href: "/all-bookings" },
    { name: "Contact Us", href: "/contact" },
  ];

  const handleSignOut = () => {
    logout();
    setIsDropdownOpen(false);
  };

  // ✅ Improved route matching logic
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    const firstSegment = "/" + pathname.split("/")[1];
    return firstSegment === href;
  };


  // ✅ Which nav to use
  const navItems = user?.email  ? navItemsWorker : navItemsCustomer;

  return (
    <nav className="sticky top-0 bg-white shadow-sm border-b border-pink-100 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left User Section */}
        <div className="relative h-10">
          {user?.email ? (
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 border-2 transition-colors"
            >
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <Image
                  src={IMAGES.profile.src}
                  alt="IHBS Logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{"Jhon Wick"}</p>
                <p className="text-xs text-start text-gray-900">New York</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </button>
          ) : (
            <div>
              <Image
                src={IMAGES.userIcon.src}
                alt="IHBS Logo"
                width={50}
                height={50}
              />
            </div>
          )}

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsDropdownOpen(false)}
              />
              <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                {/* ✅ My Bookings visible only if NOT worker */}
                {user?.role !== "worker" && (
                  <Link href={"/my-bookings"}>
                    <div className="px-4 py-2 border-b border-gray-100 hover:bg-gray-100 hover:text-primary">
                      <p>My Bookings</p>
                    </div>
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="w-full cursor-pointer text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>

        {/* Center Menu (Desktop) */}
        <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
          {navItems.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              className={`cursor-pointer transition-colors text-xl ${isActive(item.href)
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "hover:text-pink-700"
                }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right Logo */}
        <div className="flex-shrink-0 w-[180px] flex items-center justify-center md:justify-end">
          <Image
            src={IMAGES.logo.src}
            alt="IHBS Logo"
            width={84}
            height={86}
            className="object-contain"
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Left Drawer (Mobile) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <Image src={IMAGES.logo.src} alt="IHBS Logo" width={80} height={60} />
          <button onClick={() => setIsOpen(false)}>
            <X className="text-gray-700" size={28} />
          </button>
        </div>

        <ul className="flex flex-col p-6 space-y-6 text-gray-700 font-medium">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block text-lg ${isActive(item.href)
                    ? "text-primary font-semibold"
                    : "hover:text-pink-700"
                  }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavigationMenuBar;
