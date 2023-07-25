export function getRoundedNumber(window: number, movieSize: number) {
    return Math.floor(window / movieSize);
}

export default getRoundedNumber;
