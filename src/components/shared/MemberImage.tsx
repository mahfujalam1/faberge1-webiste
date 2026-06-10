"use client";

import { useState } from "react";
import { buildImageSrc, DEFAULT_IMAGE } from "@/lib/utils";

type MemberImageProps = {
    /** Server-relative photo path (uploadPhoto or a gallery photo). */
    path?: string | null;
    alt: string;
    className?: string;
} & ({ fill: true; width?: never; height?: never } | { fill?: false; width: number; height: number });

/**
 * Member/worker photo with a guaranteed fallback. buildImageSrc handles the
 * "no path / missing slash" cases up front; onError covers the remaining case
 * where a path IS set but the file doesn't exist (e.g. a worker created without
 * a real upload) — instead of a broken image, we swap to the default avatar.
 *
 * Uses a plain <img> (not next/image) on purpose: onError fires reliably, and
 * the local /default.svg is served as a static file, so the fallback never
 * depends on the next/image optimizer config (dangerouslyAllowSVG / hosts).
 */
export default function MemberImage({ path, alt, className, fill, width, height }: MemberImageProps) {
    const [src, setSrc] = useState(() => buildImageSrc(path));

    const handleError = () => {
        if (src !== DEFAULT_IMAGE) setSrc(DEFAULT_IMAGE);
    };

    if (fill) {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src={src}
                alt={alt}
                onError={handleError}
                className={`absolute inset-0 h-full w-full object-cover ${className ?? ""}`}
            />
        );
    }

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            onError={handleError}
            className={className}
        />
    );
}
