import { Slide, useScrollTrigger } from "@mui/material";
import { FC, ReactElement } from "react";

export const HideOnScroll: FC<{ children: ReactElement }> = ({ children }) => {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};
