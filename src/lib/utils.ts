import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Default placeholder shown when a user/worker has no photo (served from /public). */
export const DEFAULT_IMAGE = "/default.svg"

/**
 * Build an absolute image URL from a server-relative path. Returns the default
 * placeholder when the path is missing — this avoids producing
 * `${SERVER_URL}undefined`, which crashes next/image with an "unconfigured host"
 * error (the literal "undefined" gets appended to the hostname).
 */
export function buildImageSrc(path?: string | null): string {
  // No path → placeholder (avoids `${SERVER_URL}undefined`).
  if (!path) return DEFAULT_IMAGE
  // Already an absolute URL (or the local default) → use as-is.
  if (/^https?:\/\//i.test(path) || path.startsWith("/default")) return path
  const base = process.env.NEXT_PUBLIC_SERVER_URL ?? ""
  // Normalize to exactly one slash between base and path. Some stored paths
  // start with "/" (e.g. "/uploads/x.png") and some don't ("uploads/x.png");
  // without this, the latter produced "...up.railway.appuploads/..." (bad host).
  const sep = path.startsWith("/") ? "" : "/"
  return `${base}${sep}${path}`
}

/**
 * Parse a "YYYY-MM-DD" string as a date in the LOCAL timezone.
 *
 * `new Date("2026-06-06")` parses the string as UTC midnight, which in any
 * negative-UTC-offset timezone (all of the Americas) resolves to the PREVIOUS
 * calendar day in local time. That made "today" compare as a past date in the
 * US while working fine in Bangladesh (UTC+6). Building the Date from explicit
 * y/m/d components keeps it in local time so date logic is correct everywhere.
 */
export function parseLocalDate(dateString: string): Date {
  const [year, month, day] = dateString.split("-").map(Number)
  return new Date(year, month - 1, day)
}

/** Format a "YYYY-MM-DD" string as "MM-DD-YYYY" for display, timezone-safe. */
export function formatDateMMDDYYYY(dateString: string): string {
  const [year, month, day] = dateString.split("-")
  return `${month}-${day}-${year}`
}
