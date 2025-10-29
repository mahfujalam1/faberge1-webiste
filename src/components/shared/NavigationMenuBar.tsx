"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { IMAGES } from "@/constants/image.index";
import { cn } from "@/lib/utils";

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
  ];

  const handleSignOut = () => {
    logout();
    setIsDropdownOpen(false);
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    const firstSegment = "/" + pathname.split("/")[1];
    return firstSegment === href;
  };

  const role: string = '' // example
  const navItems = role && user?.email ? navItemsWorker : navItemsCustomer;

  const isLoggedIn = Boolean(user?.email);

  return (
    <nav className={cn("sticky top-0 bg-pink-300 shadow-sm z-50")}>
      <div className="container mx-auto px-4 py-1 flex items-center justify-between">
        {/* 🔹 Layout changes based on login state */}
        {!isLoggedIn ? (
          // 🧭 LOGGED OUT LAYOUT — logo left, menu right
          <>
            {/* Left Logo */}
            <div className="flex-shrink-0 flex items-center justify-start w-[180px]">
              <Image
                src={IMAGES.logo.src}
                alt="IHBS Logo"
                width={84}
                height={86}
                className="object-contain"
              />
            </div>

            {/* Right Menu */}
            <div className="hidden lg:flex space-x-8 text-white font-medium justify-end flex-1">
              {navItems.map((item) => (
                <Link
                  href={item.href}
                  key={item.href}
                  className={`cursor-pointer text-white text-xl ${isActive(item.href)
                    ? "text-white border-b-2 border-primary pb-1"
                    : "hover:text-pink-700 duration-500 transition-all"
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </>
        ) : (
          // 🧭 LOGGED IN LAYOUT — profile left, menu center, logo right
          <>
            {/* Left User Section */}
            <div className="relative h-10">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg  border-2 transition-colors"
              >
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <Image
                    src={IMAGES.profile.src}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
                <div className="hidden xl:block">
                  <p className="text-sm font-medium text-white">
                    {"John Wick"}
                  </p>
                  <p className="text-xs text-start text-white">{role ? "Nail Tech" : "New York"}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-white" />
              </button>

              {isDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                    <div className="block lg:hidden ps-4">
                      <p className="text-sm font-medium text-white">
                        {"John Wick"}
                      </p>
                      <p className="text-xs text-start text-white">New York</p>
                    </div>
                    {role !== "worker" && (
                      <Link href={"/my-bookings"}>
                        <div className="px-4 py-2 border-b border-gray-100 hover:bg-gray-100 hover:text-primary">
                          <p>My Bookings</p>
                        </div>
                      </Link>
                    )}
                    {
                      role && user?.email ? <div className="text-xs ms-4">
                        <h1>Nail Tech</h1>
                        <h1>Location: New York</h1>
                        <h1>ID: #9234982</h1>
                      </div> : <div></div>
                    }
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Center Menu */}
            <div className="hidden lg:flex space-x-8  font-medium">
              {navItems.map((item) => (
                <Link
                  href={item.href}
                  key={item.href}
                  className={`cursor-pointer text-white  text-xl ${isActive(item.href)
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "hover:text-pink-700"
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right Logo */}
            <div className="flex-shrink-0 w-[180px] flex items-center justify-center xl:justify-end">
              <Image
                src={IMAGES.logo.src}
                alt="IHBS Logo"
                width={84}
                height={86}
                className="object-contain"
              />
            </div>
          </>
        )}

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-white/10 opacity-70 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-pink-300 z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <Image src={IMAGES.logo.src} alt="IHBS Logo" width={80} height={60} />
          <button onClick={() => setIsOpen(false)}>
            <X className="text-gray-700" size={28} />
          </button>
        </div>

        <ul className="flex flex-col p-6 space-y-6 text-white font-medium">
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
