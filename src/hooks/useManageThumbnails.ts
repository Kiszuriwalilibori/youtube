import { useCallback, useState } from "react";
interface Props {
    sliderCapacity: number;
    fetchedVideos: [] | undefined;
}
const initialFirstVisibleThumbnailIndex = 0;

const useManageThumbnails = (props: Props) => {
    const { sliderCapacity, fetchedVideos } = props;
    const [firstVisibleThumbnailIndex, setFirstVisibleThumbnailIndex] = useState<number>(
        initialFirstVisibleThumbnailIndex
    );
    const resetFirstVisibleThumbnailIndex = useCallback(() => {
        setFirstVisibleThumbnailIndex(0);
    }, [setFirstVisibleThumbnailIndex]);

    const showNext = useCallback(() => {
        if (fetchedVideos && fetchedVideos.length) {
            if (firstVisibleThumbnailIndex <= fetchedVideos.length - 2 - sliderCapacity)
                setFirstVisibleThumbnailIndex(index => index + 1);
            else {
                setFirstVisibleThumbnailIndex(initialFirstVisibleThumbnailIndex);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [firstVisibleThumbnailIndex, sliderCapacity, fetchedVideos]);

    const showPrevious = useCallback(() => {
        if (fetchedVideos && fetchedVideos.length) {
            if (firstVisibleThumbnailIndex !== 0) setFirstVisibleThumbnailIndex(firstVisibleThumbnailIndex - 1);
            else {
                setFirstVisibleThumbnailIndex(fetchedVideos.length - 1);
            }
        }
    }, [firstVisibleThumbnailIndex, fetchedVideos]);

    const visibleVideoThumbnails =
        fetchedVideos && fetchedVideos.length
            ? fetchedVideos.slice(firstVisibleThumbnailIndex, sliderCapacity + firstVisibleThumbnailIndex)
            : undefined;

    const isFirst = Boolean(firstVisibleThumbnailIndex <= sliderCapacity - 1);
    const isLast = Boolean(
        fetchedVideos ? firstVisibleThumbnailIndex >= fetchedVideos.length - 2 - sliderCapacity : undefined
    );

    return {
        isLast,
        isFirst,
        resetFirstVisibleThumbnailIndex,
        setFirstVisibleThumbnailIndex,
        showNext,
        showPrevious,
        visibleVideoThumbnails,
    };
};

export default useManageThumbnails;
