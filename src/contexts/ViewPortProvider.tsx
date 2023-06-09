import { useState, useEffect, createContext, useContext, FC, ReactNode } from "react";
import throttle from "lodash/throttle";
import debounce from "lodash/debounce";
type desktopSizes = "mobile" | "phablet" | "tablet" | "desktop" | "desktopHD";

type Orientation = "vertical" | "horizontal";

const horizontal = new Set<string>(["mobile", "phablet"]);
const vertical = new Set<string>(["tablet", "desktop", "desktopHD"]);

const getSliderOrientation = (desktopSize: desktopSizes): Orientation => {
    if (vertical.has(desktopSize)) return "vertical";
    if (horizontal.has(desktopSize)) return "horizontal";
    return "horizontal";
};

interface viewportContextInterface {
    point?: desktopSizes;
    width: number;
    height: number;
    orientation?: Orientation;
    sliderClass?: string;
}

const viewportContext = createContext({} as viewportContextInterface);

const getDeviceConfig = (width: number): desktopSizes => {
    if (width < 550) {
        return "mobile";
    } else if (width >= 550 && width < 750) {
        return "phablet";
    } else if (width >= 750 && width < 1000) {
        return "tablet";
    } else if (width >= 1000 && width < 1200) {
        return "desktop";
    } else {
        return "desktopHD";
    }
};

const ViewportProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [point, setPoint] = useState(() => getDeviceConfig(window.innerWidth));
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const [orientation, setOrientation] = useState(() => getSliderOrientation(getDeviceConfig(window.innerWidth)));
    const sliderClass = orientation === "horizontal" ? "sidebar sidebar--horizontal" : "sidebar sidebar--vertical";

    useEffect(() => {
        const calcInnerWidth = throttle(function () {
            setPoint(getDeviceConfig(window.innerWidth));
            setWidth(window.innerWidth);
            const newOrientation = getSliderOrientation(getDeviceConfig(window.innerWidth));
            if (newOrientation !== orientation) setOrientation(newOrientation);
            setOrientation(getSliderOrientation(getDeviceConfig(window.innerWidth)));
        }, 200);

        const calcInnerHeight = throttle(function () {
            const playerHeight = document.getElementById("player-id")?.offsetHeight;
            if (playerHeight && playerHeight >= window.innerHeight) setHeight(playerHeight);
            else {
                setHeight(window.innerHeight);
            }
        }, 200);

        window.addEventListener("resize", calcInnerWidth);
        window.addEventListener("resize", calcInnerHeight);
        return () => {
            window.removeEventListener("resize", calcInnerWidth);
            window.removeEventListener("resize", calcInnerHeight);
        };
    }, []);

    return (
        <viewportContext.Provider
            value={{ point: point, width: width, height: height, orientation: orientation, sliderClass: sliderClass }}
        >
            {children}
        </viewportContext.Provider>
    );
};

const useBreakpoints = () => {
    const { point, width, height, orientation, sliderClass } = useContext(viewportContext);
    return { point, width, height, orientation, sliderClass };
};

export { ViewportProvider, useBreakpoints };
