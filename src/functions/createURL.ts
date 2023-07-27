const prefix = " https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=";
const postfix = "&key=";

export const createURL = (param: string) => `${prefix}${param}type=video${postfix}${process.env.REACT_APP_API_KEY}`;
export default createURL;
