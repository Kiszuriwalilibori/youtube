/**
 * Creates a URL for the YouTube API search endpoint
 * @param query - The search query
 * @param pageToken - Optional page token for pagination
 * @returns Formatted URL string for the YouTube API
 */
const createTanstackURL = (query: string, pageToken: string) => {
    const PREFIX = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=";
    const POSTFIX = "&key=";
    return `${PREFIX}${pageToken ? `&pageToken=${pageToken}&q=` : ""}${query}type=video${POSTFIX}${
        process.env.REACT_APP_API_KEY
    }`;
};

export default createTanstackURL;
