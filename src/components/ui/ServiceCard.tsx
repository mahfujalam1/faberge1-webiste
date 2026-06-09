import Image from "next/image"
import { useState } from "react"

interface ServiceCardProps {
    title: string
    image: string
    caption: string
    isLoading?: boolean
}

export function ServiceCard({ title, image, caption, isLoading = false }: ServiceCardProps) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    // Default placeholder image - you can replace this with your preferred default
    const defaultImage = "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80";

    return (
        <div className="w-full container mx-auto mt-10">
            {/* Card Header with Gradient */}
            <div className="bg-gradient-to-b from-[#E88764] to-[#FCCAB8] rounded-t-2xl px-6 py-4">
                {/* <h3 className="text-gray-900 font-semibold text-4xl text-center">{title}</h3> */}
            </div>

            {/* Card Body */}
            <div className="bg-white rounded-b-2xl p-6 shadow-lg">
                {/* Service Image with Skeleton Loading */}
                <div className="relative w-full h-96 mb-6 rounded-lg overflow-hidden bg-gray-100">
                    {(isLoading || !imageLoaded) && (
                        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]">
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="text-gray-400">
                                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    )}

                    {!isLoading && (
                        <img
                            src={imageError || !image ? defaultImage : image}
                            alt={title}
                            className={`object-cover w-full h-full transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                                }`}
                            onLoad={() => setImageLoaded(true)}
                            onError={() => {
                                setImageError(true);
                                setImageLoaded(true);
                            }}
                        />
                    )}
                </div>

                {/* Caption line */}
                <p className="text-center text-gray-900 font-semibold text-lg md:text-2xl tracking-wide">
                    {caption}
                </p>
            </div>
        </div>
    )
}