import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}
