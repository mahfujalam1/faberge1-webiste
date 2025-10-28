// components/Footer.tsx
"use client";

import React from "react";
import { MapPin, Phone, Facebook, Instagram } from "lucide-react";
import Link from "next/link";

const Footer: React.FC = () => {
  const role = ''
  return (
    <footer className="w-full bg-[#F48CB840] text-white">
      {/* === Top Section === */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row justify-between gap-10">
        {/* Left Section: Links */}
        <div className="flex-1">
          {
            !role && <>
              <h3 className="text-lg font-bold mb-4 text-primary">
                How Can We Help?
              </h3>
              <ul className="space-y-2 flex flex-col text-sm text-black">
                <Link href={'/contact'} className="cursor-pointer hover:text-primary transition">
                  Contact Us
                </Link>
                <Link href={'/services'} className="cursor-pointer hover:text-primary transition">
                  Services
                </Link>
              </ul>
            </>
          }
        </div>

        {/* Right Section: Newsletter */}
        <div className="flex-1">
          <h3 className="text-lg font-bold text-primary mb-4">
            Keep In Touch With In Home Beauty Services
          </h3>
          <p className="text-sm mb-4 text-black">
            Join In Home Beauty Services and be the first to hear about news and
            offers.
          </p>

          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Email Address"
              className="flex-1 px-4 py-2 border-b-2 border-primary bg-transparent text-primary placeholder-primary focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 cursor-pointer border border-primary text-primary hover:bg-primary hover:text-white transition rounded-md"
            >
              Subscribe
            </button>
          </form>

          <p className="text-xs mt-3 text-black flex items-start gap-2">
            <input
              type="checkbox"
              className="mt-0.5 accent-primary cursor-pointer"
            />
            By submitting your email, you agree to receive advertising emails
            from In Home Beauty Services.
          </p>
        </div>
      </div>

      {/* === Contact Section === */}
      <div className="w-full bg-primary py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-white/80 gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <MapPin size={16} />
              <span>31 W. 34th St. Suite 7162 New York, NY 10001</span>
            </div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <Phone size={16} />
              <span>1 (855) 622-6264</span>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-end">
            <a href="#" className="hover:text-white transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-white transition">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* === Bottom Section === */}
      <div className="w-full bg-secondary py-3">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-xs text-white/50 gap-2 text-center sm:text-left">
          <p>© 2025 In Home Beauty Services. All Rights Reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer transition">
              Terms & Conditions
            </span>
            <span className="hover:text-white cursor-pointer transition">
              Privacy Policy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
