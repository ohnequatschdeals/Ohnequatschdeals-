import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Tailwind className birleştirme fonksiyonu
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}