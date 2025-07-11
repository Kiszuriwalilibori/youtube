/**
 * Fetches YouTube thumbnails from the provided URL
 * @param url - The YouTube API URL to fetch from
 * @returns Promise with the fetched data
 * @throws Error if the response is not OK
 */
const fetchThumbnails = async (url: string) => {
    const response = await fetch(url);

    if (!response.ok) {
        const status = response?.status;
        const result = await response.json();
        throw new Error(`${status} ${result?.error?.message || "unknown error"}`);
    }
    const data = response.json();

    console.log("url", url); //używane do weryfikacji czy cachowanie działa czy nie
    return data;
};

export default fetchThumbnails;
