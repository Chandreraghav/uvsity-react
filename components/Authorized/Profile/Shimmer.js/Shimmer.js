import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { styled } from "@mui/material/styles";
function Shimmer({ visible, animation }) {
  const Skeleton1 = styled("div")(({ theme }) => ({
    [theme.breakpoints.down("sm")]: {
      width: 440,
    },
    [theme.breakpoints.down("xs")]: {
      width: 480,
    },
    [theme.breakpoints.up("md")]: {
      width: 220,
    },
    [theme.breakpoints.up("lg")]: {
      width: 260,
    },
    [theme.breakpoints.up("xl")]: {
      width: 290,
    },
  }));

   
  if (!visible) return "";
  return (
        <div className="flex justify-between gap-2">
          <Skeleton1>
            <Skeleton
              animation={animation ? animation : "wave"}
              variant="text"
              height={20}
            />
          </Skeleton1>
          <Skeleton
            animation={animation ? animation : "wave"}
            variant="circular"
            width={20}
            height={20}
          />
      </div>
  );
}

export default Shimmer;
