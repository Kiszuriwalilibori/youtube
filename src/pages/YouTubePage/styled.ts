import styled from "@emotion/styled";
import IconButton from "@mui/material/IconButton";

export const SliderButton = styled(IconButton as any)(({ theme, variant, orientation }) => ({
    backgroundColor: "rgb(255,0,0)",
    "&:disabled": {
        backgroundColor: "#e5e5e5",
        cursor: "default !important",
        opacity: 0.7,
    },
    "&:hover": {
        backgroundColor: "rgba(255,0,0,0.7)",
    },
    zIndex: 10,
    margin: theme.spacing(0.5),
    height: theme.spacing(5),
    ...(variant === "next" && orientation === "horizontal"
        ? { position: "absolute", top: "40px", right: "0", "@media (min-width: 751px)": { top: "0", left: "120px" } }
        : {}),
    ...(variant === "next" && orientation === "vertical"
        ? {
              position: "absolute",
              top: "40px",
              right: "0",
              "@media (min-width: 751px)": { top: "0", left: "120px" },
              transform: "rotateZ(-90deg)",
          }
        : {}),
    ...(variant === "previous" && orientation === "horizontal"
        ? {
              position: "absolute",
              top: "40px",
              left: "0",
              "@media (min-width: 751px)": { top: "0", left: "120px" },
              transform: "rotateZ(180deg)",
          }
        : {}),
    ...(variant === "previous" && orientation === "vertical"
        ? {
              position: "absolute",
              top: "50px",
              left: "0",
              "@media (min-width: 751px)": { bottom: "0", left: "120px" },
              transform: "rotateZ(90deg)",
          }
        : {}),
}));
