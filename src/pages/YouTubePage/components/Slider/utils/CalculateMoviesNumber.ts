export function calculateMoviesNumber(window: number, movieSize: number) {
    return Math.floor(window / movieSize);
}

export default calculateMoviesNumber;
