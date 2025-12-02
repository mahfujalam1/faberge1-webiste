"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { IMAGES } from "@/constants/image.index";
import { cn } from "@/lib/utils";
import { logoutUser } from "@/services/actions/logoutUser";
import { getUserInfo } from "@/services/authServices";

const NavigationMenuBar = () => {
  const [user, setUser] = useState<any>(null); // Initially null
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state to prevent UI issues
  const pathname = usePathname();
  const router = useRouter();

  // Set the user data on the client side after the component mounts
  useEffect(() => {
    const userInfo = getUserInfo(); // Fetch user info client-side
    setUser(userInfo);
    setLoading(false); // Once user data is fetched, set loading to false
  }, []);

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
    logoutUser(router);
    router.push("/auth/sign-in");
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    const firstSegment = "/" + pathname.split("/")[1];
    return firstSegment === href;
  };

  const navItems = user?.role === "worker" ? navItemsWorker : navItemsCustomer;
  const isLoggedIn = Boolean(user?.email);

  useEffect(() => {
    const workerRoutes = ["/dashboard", "/schedule", "/all-bookings"];
    const customerRoutes = ["/bookings", "/my-bookings"];

    const isWorkerRoute = workerRoutes.some((route) => pathname.startsWith(route));
    const isCustomerRoute = customerRoutes.some((route) => pathname.startsWith(route));

    if (user?.role === "worker" && isCustomerRoute) {
      router.push("/dashboard");
    }

    if (user?.role === "customer" && isWorkerRoute) {
      router.push("/");
    }
  }, [user, pathname, router]);

  if (loading) {
    return (
      <nav className="sticky top-0 bg-white shadow-sm z-50">
        <div className="container mx-auto px-4 py-1 flex items-center justify-between">
          <div className="flex-shrink-0 flex items-center justify-start w-[180px]">
            <Image
              src={IMAGES.logo.src}
              alt="IHBS Logo"
              width={84}
              height={86}
              className="object-contain"
            />
          </div>
          {/* You can add a loading spinner here */}
          <div>Loading...</div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={cn("sticky top-0 bg-white shadow-sm z-50")}>
      <div className="container mx-auto px-4 py-1 flex items-center justify-between">
        {!isLoggedIn ? (
          <>
            <div className="flex-shrink-0 flex items-center justify-start w-[180px]">
              <Image
                src={IMAGES.logo.src}
                alt="IHBS Logo"
                width={84}
                height={86}
                className="object-contain"
              />
            </div>
            <div className="hidden lg:flex space-x-8 text-black font-medium justify-end flex-1">
              {navItems?.map((item) => (
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
            <div className="relative h-10">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-colors"
              >
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  <Image
                    src={user?.uploadPhoto || IMAGES.profile.src}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="hidden xl:block">
                  <p className="text-sm font-medium text-black">
                    {user?.firstName + " " + user?.lastName || "User"}
                  </p>
                  <p className="text-xs text-start text-black">
                    {user?.role === "worker" ? "Nail Tech" : "Customer"}
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
                        {user?.firstName + " " + user?.lastName || "User"}
                      </p>
                      <p className="text-xs text-start text-black">
                        {user?.role === "worker" ? "Nail Tech" : "Customer"}
                      </p>
                    </div>
                    {user?.role === "customer" && (
                      <Link href="/my-bookings" onClick={() => setIsDropdownOpen(false)}>
                        <div className="px-4 py-2 border-b border-gray-100 hover:bg-gray-100 hover:text-primary">
                          <p>My Bookings</p>
                        </div>
                      </Link>
                    )}
                    {user?.role === "worker" && (
                      <div className="text-xs ms-4 py-2 border-b">
                        <h1>Nail Tech</h1>
                        <h1>New York, NY</h1>
                        <h1>ID#: {user?._id?.slice(-7)}</h1>
                      </div>
                    )}
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>

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

        <button
          className="lg:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-white/10 opacity-70 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

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
