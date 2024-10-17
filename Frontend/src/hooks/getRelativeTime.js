export default function getRelativeTime(date) {
    const now = new Date();
    const postDate = new Date(date);
    const diffInMs = now - postDate;

    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) {
        return "Just now";
    } else if (diffInHours < 1) {
        return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
    } else if (diffInDays < 1) {
        return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
    } else if (diffInDays < 7) {
        return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
    } else {
        return postDate.toLocaleDateString();
    }
}
