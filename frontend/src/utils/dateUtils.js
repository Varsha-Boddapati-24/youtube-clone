// Converts a timestamp (createdAt) into a human-readable "time ago" format

export function getTimeAgo(createdAt) {
  const now = new Date();  // Get current date and time
  const created = new Date(createdAt);    // Convert the createdAt timestamp to a Date object
  const diffInSeconds = Math.floor((now - created) / 1000);  // Difference in seconds
  // Convert the time difference into various units
  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(diffInSeconds / 3600);
  const days = Math.floor(diffInSeconds / 86400);
  const months = Math.floor(diffInSeconds / 2592000);
  const years = Math.floor(diffInSeconds / 31536000);
 // Return a readable string based on the largest applicable time unit
  if (years >= 1) return `${years} year${years > 1 ? 's' : ''} ago`;
  if (months >= 1) return `${months} month${months > 1 ? 's' : ''} ago`;
  if (days >= 1) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours >= 1) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes >= 1) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
// If less than a minute
  return `just now`;
}

// Formats a duration in seconds into mm:ss format (used in video thumbnails)
export function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);   // Get full minutes
  const secs = Math.floor(seconds % 60);     // Get remaining seconds
   // Pad single digit seconds with a leading zero
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}
