"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import Cookies from 'js-cookie';
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "@/redux/features/user/userSlice";

import { IMAGES } from "@/constants/image.index";
import { cn } from "@/lib/utils";

interface User {
  _id: string;
  email: string;
  role: 'customer' | 'worker';
  name?: string;
  avatar?: string;
}

const NavigationMenuBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  // Load user from cookie on mount
  useEffect(() => {
    const token = Cookies.get('auth-token');
    const userCookie = Cookies.get('user');

    if (token && userCookie) {
      try {
        const userData = JSON.parse(userCookie);
        setUserState(userData);
        dispatch(setUser(userData));
      } catch (error) {
        console.error('Error parsing user cookie:', error);
        Cookies.remove('auth-token');
        Cookies.remove('user');
      }
    }
    setLoading(false);
  }, [dispatch]);

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
    Cookies.remove('auth-token');
    Cookies.remove('user');
    dispatch(clearUser());
    setUserState(null);
    setIsDropdownOpen(false);
    router.push('/auth/sign-in');
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    const firstSegment = "/" + pathname.split("/")[1];
    return firstSegment === href;
  };

  const navItems = user?.role === 'worker' ? navItemsWorker : navItemsCustomer;
  const isLoggedIn = Boolean(user?.email);

  // Role-based route protection
  useEffect(() => {
    if (loading) return;

    const workerRoutes = ['/dashboard', '/schedule', '/all-bookings'];
    const customerRoutes = ['/bookings', '/my-bookings'];

    const isWorkerRoute = workerRoutes.some(route => pathname.startsWith(route));
    const isCustomerRoute = customerRoutes.some(route => pathname.startsWith(route));

    // If worker trying to access customer routes
    if (user?.role === 'worker' && isCustomerRoute) {
      router.push('/dashboard');
    }

    // If customer trying to access worker routes
    if (user?.role === 'customer' && isWorkerRoute) {
      router.push('/');
    }
  }, [user, pathname, loading, router]);

  if (loading) {
    return (
      <nav className="sticky top-0 bg-white shadow-sm z-50">
        <div className="container mx-auto px-4 py-1 h-20 flex items-center justify-between">
          <div className="flex-shrink-0">
            <Image
              src={IMAGES.logo.src}
              alt="IHBS Logo"
              width={84}
              height={86}
              className="object-contain"
            />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={cn("sticky top-0 bg-white shadow-sm z-50")}>
      <div className="container mx-auto px-4 py-1 flex items-center justify-between">
        {!isLoggedIn ? (
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
            <div className="hidden lg:flex space-x-8 text-black font-medium justify-end flex-1">
              {navItems.map((item) => (
                <Link
                  href={item.href}
                  key={item.href}
                  className={`cursor-pointer text-black text-xl ${isActive(item.href)
                      ? "text-black border-b-2 border-primary pb-1"
                      : "hover:text-pink-700 duration-500 transition-all"
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Left User Section */}
            <div className="relative h-10">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-colors"
              >
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  <Image
                    src={user?.avatar || IMAGES.profile.src}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="hidden xl:block">
                  <p className="text-sm font-medium text-black">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-start text-black">
                    {user?.role === 'worker' ? "Nail Tech" : "Customer"}
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-black" />
              </button>

              {isDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                    <div className="block lg:hidden ps-4 pb-2 border-b">
                      <p className="text-sm font-medium text-black">
                        {user?.name || "User"}
                      </p>
                      <p className="text-xs text-start text-black">
                        {user?.role === 'worker' ? "Nail Tech" : "Customer"}
                      </p>
                    </div>
                    {user?.role === 'customer' && (
                      <Link href="/my-bookings" onClick={() => setIsDropdownOpen(false)}>
                        <div className="px-4 py-2 border-b border-gray-100 hover:bg-gray-100 hover:text-primary">
                          <p>My Bookings</p>
                        </div>
                      </Link>
                    )}
                    {user?.role === 'worker' && (
                      <div className="text-xs ms-4 py-2 border-b">
                        <h1>Nail Tech</h1>
                        <h1>New York, NY</h1>
                        <h1>ID#: {user?._id?.slice(-7)}</h1>
                      </div>
                    )}
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
            <div className="hidden lg:flex space-x-8 font-medium">
              {navItems.map((item) => (
                <Link
                  href={item.href}
                  key={item.href}
                  className={`cursor-pointer text-black text-xl ${isActive(item.href)
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

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-white/10 opacity-70 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Mobile Drawer */}
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

        <ul className="flex flex-col p-6 space-y-6 text-black font-medium">
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