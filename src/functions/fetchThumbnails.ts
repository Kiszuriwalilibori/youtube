export const fetchThumbnails = async (url: string) => {
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
