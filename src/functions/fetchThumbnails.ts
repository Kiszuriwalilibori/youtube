export const fetchThumbnails = async (url: string) => {
    console.log("FetchThumbnailscalled", url); //używane do weryfikacji czy cachowanie działa czy nie
    const response = await fetch(url);
    if (!response.ok) {
        const status = response?.status;
        const result = await response.json();
        throw new Error(`${status} ${result?.error?.message || "unknown error"}`);
    }
    const data = response.json();

    return data;
};

export default fetchThumbnails;
