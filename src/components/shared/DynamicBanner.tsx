interface DynamicBannerProps {
    title: string
    className?: string
}

export function DynamicBanner({ title, className = "" }: DynamicBannerProps) {
    return (
        <div className={`relative h-[500px] w-full overflow-hidden border-t-4 border-[#FCCAB8] ${className}`}>
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover"
            >
                <source src="/videos/dynamic-banner-video.mp4" type="video/mp4" />
            </video>

            {/* 🔥 Dark gradient overlay (bottom → top) */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/60 to-transparent" />

            {/* Dynamic text content */}
            <div className="relative flex h-full items-center justify-center">
                <h1 className="text-balance text-center text-4xl font-bold text-white md:text-7xl">
                    {title}
                </h1>
            </div>
        </div>
    )
}

