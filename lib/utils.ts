import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteURL(path: string) {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL
  return `${baseURL}${path}`
}
