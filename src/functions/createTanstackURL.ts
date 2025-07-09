const PREFIX = " https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=";
const POSTFIX = "&key=";

export const createTanstackURL = (query: string, pageToken: string) =>
    `${PREFIX}${pageToken ? `&pageToken=${pageToken}&q=` : ""}${query}type=dupa${POSTFIX}${
        process.env.REACT_APP_API_KEY_
    }`;

// export const createTanstackURL = (query: string, pageToken: string) =>
//     `${PREFIX}${pageToken ? `&pageToken=${pageToken}&q=` : ""}${query}type=video${POSTFIX}${
//         process.env.REACT_APP_API_KEY
//     }`;
export default createTanstackURL;

// TODO: podmień tutaj i popraw guziki w Message/tsx
