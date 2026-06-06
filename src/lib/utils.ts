import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
