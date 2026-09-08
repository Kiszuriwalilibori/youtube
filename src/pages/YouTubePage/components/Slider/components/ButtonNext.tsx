// import IconButton from "@mui/material/IconButton";
// import Icons from "icons";
// import { SliderOrientation } from "types";

// interface Props {
//     disabled: boolean | undefined;
//     handleClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
//     sliderOrientation: SliderOrientation | undefined;
// }

// const ButtonNext = (props: Props) => {
//     const { handleClick, disabled, sliderOrientation } = props;

//     return (
//         <IconButton
//             id="next"
//             aria-label="Show next thumb"
//             className={
//                 sliderOrientation === "horizontal" ? "button--slider button--right" : "button--slider button--upwards"
//             }
//             onClick={handleClick}
//             disabled={disabled}
//             disableRipple
//         >
//             <Icons.Right />
//         </IconButton>
//     );
// };

// export default ButtonNext;
import IconButton from "@mui/material/IconButton";
import Icons from "icons";
import { SliderOrientation } from "types";
import { styles } from "./ButtonNext.styles";

interface Props {
    disabled: boolean | undefined;
    handleClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
    sliderOrientation: SliderOrientation | undefined;
}

const ButtonNext = (props: Props) => {
    const { handleClick, disabled, sliderOrientation } = props;

    const isHorizontal = sliderOrientation === "horizontal";

    return (
        <IconButton
            id="next"
            aria-label="Show next thumb"
            onClick={handleClick}
            disabled={disabled}
            disableRipple
            sx={styles(sliderOrientation)}
            // sx={{
            //     position: "absolute",
            //     top: "40px",
            //     right: 0,
            //     border: "none",
            //     borderRadius: "var(--ytd-search-height)",
            //     padding: 0,
            //     margin: "5px",
            //     height: "44px",
            //     width: "44px",
            //     backgroundColor: "var(--ytd-alarm-color)",
            //     zIndex: 10,
            //     transform: isHorizontal ? "none" : "rotateZ(-90deg)",
            //     "&:disabled": {
            //         backgroundColor: "var(--yt-spec-touch-response)",
            //     },
            //     "& svg": {
            //         pointerEvents: "none",
            //     },
            //     "@media (min-width: 751px)": {
            //         top: isHorizontal ? "auto" : 0,
            //         right: isHorizontal ? "auto" : 0,
            //         left: "120px",
            //         bottom: isHorizontal ? 0 : "auto",
            //     },
            // }}
        >
            <Icons.Right />
        </IconButton>
    );
};

export default ButtonNext;
