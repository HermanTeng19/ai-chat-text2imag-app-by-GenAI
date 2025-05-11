/**
 * Formats a Unix timestamp (ms) into a human-readable time string (e.g., '12:34 PM').
 * @param timestamp - The Unix timestamp in milliseconds.
 * @returns Formatted time string.
 */
export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
} 