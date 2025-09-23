import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
/**
 * A utility function that combines clsx and tailwind-merge for more efficient 
 * conditional class name generation.
 * 
 * @param inputs - Class values to be conditionally merged together
 * @returns A string of merged class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Utility function to format currency in Saudi Riyal
 * 
 * @param amount - The amount to format
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number): string {
  return `${amount.toLocaleString('ar-SA')} ريال`;
}

/**
 * Scrolls to an element with smooth behavior
 * 
 * @param elementId - The ID of the element to scroll to
 */
export function scrollToElement(elementId: string): void {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Gets a readable date format in Arabic
 * 
 * @param date - The date to format
 * @returns Formatted date string in Arabic
 */
export function formatDateArabic(date: Date): string {
  return date.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
