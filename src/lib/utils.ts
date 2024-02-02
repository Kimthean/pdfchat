import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const AccessKey = process.env.S3_ACCESS_KEY!
export const SecretKey = process.env.S3_SECRET_KEY!