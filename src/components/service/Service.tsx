'use client';
import { ServiceCard } from "../ui/ServiceCard";
import Image from "next/image";
import { IMAGES } from "@/constants/image.index";
import SectionHeader from "../ui/SectionHeader";
import { usePathname } from "next/navigation";
import { useGetAllDynamicBannerQuery } from "@/redux/api/publicApi";
import { BannerData } from "@/types/global.types";

// Helper function to construct the full image URL
const getImageUrl = (relativePath: string | undefined): string => {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    return relativePath ? `${baseUrl}${relativePath}` : ''; // return empty string if no image
};

export default function ServicesSection() {
    const path = usePathname();
    const { data, isLoading } = useGetAllDynamicBannerQuery(undefined);

    const manicureBannerImage = data?.data.find((banner: BannerData) => banner.title === 'manicure');
    const pedicureBannerImage = data?.data.find((banner: BannerData) => banner.title === 'pedicure');

    // Banner 1 (left card)
    const manicureData = {
        title: "Manicure",
        image: getImageUrl(manicureBannerImage?.image),
        caption: "Mani/Pedi • Hairstyling • Makeup",
    };

    // Banner 2 (right card)
    const pedicureData = {
        title: "Pedicure",
        image: getImageUrl(pedicureBannerImage?.image),
        caption: "Facials • Massages • Haircuts",
    };

    return (
        <section className="relative min-h-screen">
            {/* Background */}
            {path === "/services" ? (
                <div className="absolute inset-0 bg-gradient-to-tl from-[#fdeaea] via-[#fff1f3] to-[#ffdae1]" />
            ) : (
                <div className="absolute inset-0 pointer-events-none">
                    <Image
                        src={IMAGES.serviceBgImage.src}
                        alt="Pink wave background"
                        fill
                        className="object-fill"
                        priority
                    />
                </div>
            )}

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 py-16">
                <SectionHeader sectionName="Our Services" />
                <div className="md:flex justify-around gap-8">
                    <ServiceCard {...manicureData} isLoading={isLoading} />
                    <ServiceCard {...pedicureData} isLoading={isLoading} />
                </div>
            </div>
        </section>
    );
}