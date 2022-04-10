import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { styled } from "@mui/material/styles";

function Shimmer({ visible, animation }) {
  if (!visible) return <></>;
  const Skeleton1 = styled("div")(({ theme }) => ({
    [theme.breakpoints.down("sm")]: {
      width: 450,
    },
    [theme.breakpoints.down("xs")]: {
      width: 420,
    },
    [theme.breakpoints.up("md")]: {
      width: 500,
    },
    [theme.breakpoints.up("lg")]: {
      width: 300,
    },
    [theme.breakpoints.up("xl")]: {
      width: 320,
    },
  }));

  const Skeleton2 = styled("div")(({ theme }) => ({
    [theme.breakpoints.down("sm")]: {
      width: 400,
    },
    [theme.breakpoints.down("xs")]: {
      width: 300,
    },
    [theme.breakpoints.up("md")]: {
      width: 700,
    },
    [theme.breakpoints.up("lg")]: {
      width: 800,
    },
    [theme.breakpoints.up("xl")]: {
      width: 1024,
    },
  }));

  return (
    <div className=" uvsity__card__border__disabled bg-white w-full dark:bg-brand-dark-grey-800 dark:border-brand-grey-800 rounded-bl-lg rounded-br-lg px-2">
      <div className="flex-auto lg:ml-32 py-4 md:ml-20 xs:ml-4 xl:ml-32 ml-6">
        <div className="">
          <div id="stepper" className="flex justify-evenly ">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <>
                <Skeleton1 key={index}>
                  <Skeleton
                    animation={animation ? animation : "wave"}
                    variant="circular"
                    height={60}
                    width={60}
                  />
                </Skeleton1>
              </>
            ))}
          </div>

          <div>
            <div className="spacer"></div>
          </div>
          <div className="flex flex-col px-2 py-2">
            <div>
              <div className="flex flex-row items-center flex-1 mb-4 gap-2 pt-2">
                <div className="flex flex-col text-sm leading-snug w-full">
                  <div className="flex">
                    <div className=" font-bold flex flex-col py-2 flex-wrap items-center mb-px ">
                      {[1, 2, 3].map((_, index) => (
                        <div key={index} className="py-2">
                          <Skeleton
                            animation={animation ? animation : "wave"}
                            variant="text"
                            height={20}
                            width={400}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <Skeleton2>
                    <Skeleton
                      animation={animation ? animation : "wave"}
                      variant="rectangular"
                      height={150}
                    />
                  </Skeleton2>
                </div>
              </div>
            </div>
            <div className="flex ">
              <div className=" ml-auto">
                <div className=" flex gap-2">
                  {[1, 2].map((_, index) => (
                    <Skeleton
                      key={index}
                      animation={animation ? animation : "wave"}
                      variant="rectangular"
                      height={20}
                      width={60}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shimmer;
