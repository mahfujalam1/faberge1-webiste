"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const MAX_PHOTOS = 10;

const buildSrc = (path: string) => {
    if (!path) return "";
    if (/^https?:\/\//i.test(path)) return path;
    const base = process.env.NEXT_PUBLIC_SERVER_URL ?? "";
    const sep = path.startsWith("/") ? "" : "/";
    return `${base}${sep}${path}`;
};

type TeamMemberGalleryProps = {
    memberName: string;
    photos: string[];
};

export default function TeamMemberGallery({
    memberName,
    photos,
}: TeamMemberGalleryProps) {
    const gallery = (photos ?? []).filter(Boolean).slice(0, MAX_PHOTOS);
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    if (gallery.length === 0) return null;

    const showPrev = () =>
        setActiveIndex((i) =>
            i === null ? i : (i - 1 + gallery.length) % gallery.length
        );
    const showNext = () =>
        setActiveIndex((i) =>
            i === null ? i : (i + 1) % gallery.length
        );

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="text-primary text-xs underline hover:text-pink-700 cursor-pointer mt-1"
            >
                View Photos ({gallery.length})
            </button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>{memberName}&apos;s Photos</DialogTitle>
                    </DialogHeader>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[60vh] overflow-y-auto pr-1">
                        {gallery.map((photo, idx) => (
                            <button
                                key={`${photo}-${idx}`}
                                type="button"
                                onClick={() => setActiveIndex(idx)}
                                className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100 hover:opacity-90 transition cursor-pointer"
                            >
                                <Image
                                    src={buildSrc(photo)}
                                    alt={`${memberName} photo ${idx + 1}`}
                                    fill
                                    sizes="(max-width: 640px) 50vw, 25vw"
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>

            {activeIndex !== null && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
                    onClick={() => setActiveIndex(null)}
                >
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            setActiveIndex(null);
                        }}
                        aria-label="Close"
                        className="absolute top-4 right-4 text-white/90 hover:text-white cursor-pointer"
                    >
                        <X size={28} />
                    </button>

                    {gallery.length > 1 && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                showPrev();
                            }}
                            aria-label="Previous photo"
                            className="absolute left-4 md:left-8 text-white/90 hover:text-white cursor-pointer"
                        >
                            <ChevronLeft size={36} />
                        </button>
                    )}

                    <div
                        className="relative w-full max-w-4xl h-[80vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={buildSrc(gallery[activeIndex])}
                            alt={`${memberName} large photo ${activeIndex + 1}`}
                            fill
                            sizes="100vw"
                            className="object-contain"
                            priority
                        />
                    </div>

                    {gallery.length > 1 && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                showNext();
                            }}
                            aria-label="Next photo"
                            className="absolute right-4 md:right-8 text-white/90 hover:text-white cursor-pointer"
                        >
                            <ChevronRight size={36} />
                        </button>
                    )}
                </div>
            )}
        </>
    );
}
