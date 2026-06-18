"use client";

import React from "react";
import { DynamicBanner } from "@/components/shared/DynamicBanner";
import { useGetPrivacyPolicyQuery } from "@/redux/api/publicApi";

const PrivacyPolicyPage = () => {
  const { data, isLoading } = useGetPrivacyPolicyQuery(undefined);
  const content = data?.data?.privacyPolicy || data?.privacyPolicy || "";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <DynamicBanner title="Privacy Policy" /> */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
            <div 
              className="legal-content max-w-none text-gray-700 leading-relaxed 
                [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-primary [&_h1]:mt-8 [&_h1]:mb-4
                [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-secondary [&_h2]:mt-6 [&_h2]:mb-3
                [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2
                [&_p]:mb-4 [&_p]:leading-7
                [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4
                [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4
                [&_li]:mb-2"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            {!content && !isLoading && (
              <p className="text-center text-gray-500">No privacy policy found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
