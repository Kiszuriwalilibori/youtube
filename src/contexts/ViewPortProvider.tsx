import { useState, useEffect, createContext, useContext, FC, ReactNode } from "react";
import throttle from "lodash/throttle";
import { ViewportSize, SliderOrientation } from "types";
import { BREAKPOINT_MOBILE, BREAKPOINT_DESKTOP, BREAKPOINT_PHABLET, BREAKPOINT_TABLET, THROTTLE_GAP } from "config";

type desktopSizes = "mobile" | "phablet" | "tablet" | "desktop" | "desktopHD";

// type Orientation = "vertical" | "horizontal";

const horizontal = new Set<string>(["mobile", "phablet"]);
const vertical = new Set<string>(["tablet", "desktop", "desktopHD"]);

const getSliderOrientation = (desktopSize: desktopSizes): SliderOrientation => {
    if (vertical.has(desktopSize)) return "vertical";
    if (horizontal.has(desktopSize)) return "horizontal";
    return "horizontal";
};

interface viewportContextInterface {
    point?: desktopSizes;
    sliderOrientation: SliderOrientation;
    sliderClass?: string;
    viewportSize: ViewportSize;
}

const viewportContext = createContext({} as viewportContextInterface);

const getDeviceConfig = (width: number): desktopSizes => {
    if (width < BREAKPOINT_MOBILE) {
        return "mobile";
    } else if (width >= BREAKPOINT_MOBILE && width < BREAKPOINT_PHABLET) {
        return "phablet";
    } else if (width >= BREAKPOINT_PHABLET && width < BREAKPOINT_TABLET) {
        return "tablet";
    } else if (width >= BREAKPOINT_TABLET && width < BREAKPOINT_DESKTOP) {
        return "desktop";
    } else {
        return "desktopHD";
    }
};

const ViewportProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [point, setPoint] = useState(() => getDeviceConfig(window.innerWidth));
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const [sliderOrientation, setSliderOrientation] = useState(() =>
        getSliderOrientation(getDeviceConfig(window.innerWidth))
    );
    const sliderClass =
        sliderOrientation === "horizontal" ? "sidebar sidebar--horizontal" : "sidebar sidebar--vertical";

    useEffect(() => {
        const calcInnerWidth = throttle(function () {
            setPoint(getDeviceConfig(window.innerWidth));
            setWidth(window.innerWidth);
            const newOrientation = getSliderOrientation(getDeviceConfig(window.innerWidth));
            if (newOrientation !== sliderOrientation) setSliderOrientation(newOrientation);
            setSliderOrientation(getSliderOrientation(getDeviceConfig(window.innerWidth)));
        }, THROTTLE_GAP);

        const calcInnerHeight = throttle(function () {
            const playerHeight = document.getElementById("player-id")?.offsetHeight;
            if (playerHeight && playerHeight >= window.innerHeight) setHeight(playerHeight);
            else {
                setHeight(window.innerHeight);
            }
        }, THROTTLE_GAP);

        window.addEventListener("resize", calcInnerWidth);
        window.addEventListener("resize", calcInnerHeight);
        return () => {
            window.removeEventListener("resize", calcInnerWidth);
            window.removeEventListener("resize", calcInnerHeight);
        };
    }, []); // todo radzą dać sliderOrientation jako dependency?

    return (
        <viewportContext.Provider
            value={{
                point: point,
                sliderOrientation: sliderOrientation,
                sliderClass: sliderClass,
                viewportSize: { width: width, height: height },
            }}
        >
            {children}
        </viewportContext.Provider>
    );
};

const useBreakpoints = () => {
    const { point, sliderOrientation, sliderClass, viewportSize } = useContext(viewportContext);
    return { point, sliderOrientation, sliderClass, viewportSize };
};

export { ViewportProvider, useBreakpoints };
