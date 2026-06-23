// components/Footer.tsx
"use client";

import React, { useState } from "react";
import { MapPin, Phone, Facebook, Instagram } from "lucide-react";
import { PiTiktokLogoBold } from "react-icons/pi";
import Link from "next/link";
import { toast } from "sonner";
import { GetMeResponse } from "@/redux/api/baseApi";
import { useGetProfileQuery } from "@/redux/api/authApi";
import { useSubscribeMutation } from "@/redux/api/subscriberApi";
import Cookies from "js-cookie"; // Make sure to install: npm install js-cookie @types/js-cookie
import { authKey } from "@/constants/auth";

const Footer: React.FC = () => {
  const accessToken = Cookies.get(authKey);

  // Conditionally call the API only if token exists
  const {data} = useGetProfileQuery<GetMeResponse>(undefined, {
    skip: !accessToken, // Skip the query if no accessToken
  });

  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [subscribe, { isLoading }] = useSubscribeMutation();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }
    if (!agreed) {
      toast.error("Please agree to receive advertising emails.");
      return;
    }

    try {
      const res = await subscribe({ email: email.trim() }).unwrap();
      toast.success(res?.message || "Subscribed successfully!");
      setEmail("");
      setAgreed(false);
    } catch (err: unknown) {
      const message =
        (err as { data?: { message?: string } })?.data?.message ||
        "Subscription failed. Please try again.";
      toast.error(message);
    }
  };

  return (
    <footer className="w-full bg-[#F48CB840] text-white">
      {/* === Top Section === */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row justify-between gap-10">
        {/* Left Section: Links */}
        <div className="flex-1">
          {
            data?.role === 'customer' && <>
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

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2 border-b-2 border-primary bg-transparent text-primary placeholder-primary focus:outline-none"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 cursor-pointer border border-primary text-primary hover:bg-primary hover:text-white transition rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>

          <p className="text-xs mt-3 text-black flex items-start gap-2">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
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
            <Link href="https://www.facebook.com/ihbsworldwide" className="hover:text-white transition" target="_blank" rel="noopener noreferrer">
              <Facebook size={20} />
            </Link>
            <Link href="https://www.instagram.com/inhomebeautyservices" className="hover:text-white transition" target="_blank" rel="noopener noreferrer">
              <Instagram size={20} />
            </Link>
            <Link href="https://www.tiktok.com/@inhomebeautyservices" className="hover:text-white transition" target="_blank" rel="noopener noreferrer">
              <PiTiktokLogoBold size={20} />
            </Link>
            
          </div>

        </div>
      </div>

      {/* === Bottom Section === */}
      <div className="w-full bg-secondary py-3">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-xs text-white/50 gap-2 text-center sm:text-left">
          <p>© 2025 In Home Beauty Services. All Rights Reserved.</p>
          <div className="flex gap-4">
            <Link href="/terms-and-conditions" className="hover:text-white cursor-pointer transition">
              Terms & Conditions
            </Link>
            <Link href="/privacy-policy" className="hover:text-white cursor-pointer transition">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
