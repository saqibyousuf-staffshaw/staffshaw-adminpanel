import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function timeAgo(dateString) {
  const date = new Date(dateString).getTime();
  const seconds = Math.floor((new Date().getTime() - date) / 1000);

  let interval = Math.floor(seconds / 31536000); // years
  if (interval >= 1) return interval === 1 ? "1 year ago" : `${interval} years ago`;

  interval = Math.floor(seconds / 2592000); // months
  if (interval >= 1) return interval === 1 ? "1 month ago" : `${interval} months ago`;

  interval = Math.floor(seconds / 86400); // days
  if (interval >= 1) return interval === 1 ? "1 day ago" : `${interval} days ago`;

  interval = Math.floor(seconds / 3600); // hours
  if (interval >= 1) return interval === 1 ? "1 hour ago" : `${interval} hours ago`;

  interval = Math.floor(seconds / 60); // minutes
  if (interval >= 1) return interval === 1 ? "1 min ago" : `${interval} mins ago`;

  return seconds <= 1 ? "just now" : `${seconds} sec ago`;
}

export function formatDate(dateInput) {
  if (!dateInput) return "";

  const date = new Date(dateInput);

  return date.toLocaleDateString("en-US", {
    month: "short", // "Sep"
    day: "numeric", // "5"
    year: "numeric", // "2025"
  });
}