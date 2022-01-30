import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { styled } from "@mui/material/styles";
function Shimmer({ visible, animation }) {
  const Skeleton1 = styled("div")(({ theme }) => ({
    
    [theme.breakpoints.down("sm")]: {
      width: 380,
    },
    [theme.breakpoints.down("xs")]: {
      width: 500,
    },
    [theme.breakpoints.up('md')]: {
      width: 150,
    },
    [theme.breakpoints.up('lg')]: {
      width: 230,
    },
    [theme.breakpoints.up('xl')]: {
      width: 250,
    },
  }));

  const Skeleton2 = styled("div")(({ theme }) => ({
     
    [theme.breakpoints.down("sm")]: {
      width: 430,
    },
    [theme.breakpoints.down("xs")]: {
      width: 520,
    },
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
    [theme.breakpoints.up('lg')]: {
      width: 250,
    },
    [theme.breakpoints.up('xl')]: {
      width: 170,
    },
  }));

  const Skeleton3 = styled("div")(({ theme }) => ({
     
    [theme.breakpoints.down("sm")]: {
      width: 350,
    },
    [theme.breakpoints.down("xs")]: {
      width: 450,
    },
    [theme.breakpoints.up('md')]: {
      width: 130,
    },
    [theme.breakpoints.up('lg')]: {
      width: 180,
    },
    [theme.breakpoints.up('xl')]: {
      width: 280,
    },
  }));
  if (!visible) return "";
  return (
    <div>
      <div className="flex gap-2">
        <div className="flex mt-2">
          <Skeleton variant="circular" width={40} height={40} />
        </div>
        <div className="flex flex-col w-max">
          <Skeleton1>
            <Skeleton
              animation={animation ? animation : "wave"}
              variant="text"
              height={20}
            />
          </Skeleton1>
          <Skeleton2>
            <Skeleton
              animation={animation ? animation : "wave"}
              variant="text"
              height={20}
            />
          </Skeleton2>
          <Skeleton3>
            <Skeleton
              animation={animation ? animation : "wave"}
              variant="text"
              
              height={20}
            />
          </Skeleton3>
        </div>
      </div>
    </div>
  );
}

export default Shimmer;
