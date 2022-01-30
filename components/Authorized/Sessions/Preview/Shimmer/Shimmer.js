import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { styled } from "@mui/material/styles";

function Shimmer({ visible, animation }) {
  if (!visible) return (<></>);
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
      width: 450,
    },
    [theme.breakpoints.down("xs")]: {
      width: 450,
    },
    [theme.breakpoints.up("md")]: {
      width: 520,
    },
    [theme.breakpoints.up("lg")]: {
      width: 220,
    },
    [theme.breakpoints.up("xl")]: {
      width: 230,
    },
  }));
 
  return (
      <div className=" uvsity__card__border__disabled bg-white w-full dark:bg-brand-dark-grey-800 dark:border-brand-grey-800 rounded-bl-lg rounded-br-lg px-2">
        <div className="flex flex-row flex-wrap flex-grow-0">
          <div className="flex-auto w-full pr-0 xl:w-auto xl:flex-1 xl:pr-5 px-2 py-2">
            <Skeleton1>
              <Skeleton
                animation={animation ? animation : "wave"}
                variant="text"
                height={30}
              />
            </Skeleton1>

            <div>
              <div className="spacer"></div>
            </div>
            <div className="flex flex-col px-2 py-2">
              <div>
                <div className="flex flex-row items-center flex-1 mb-4 gap-2 pt-2">
                  <div className="avatar flex items-center justify-center flex-shrink-0 w-10 h-10 mr-2 rounded-full bg-brand-grey-200 dark:bg-brand-grey-700">
                    <div>
                      {" "}
                      <Skeleton
                        animation={animation ? animation : "wave"}
                        variant="circular"
                        height={70}
                        width={70}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col text-sm leading-snug w-full">
                    <div className="flex">
                      <div className="name font-bold flex flex-row flex-wrap items-center mb-px DashboardProfile_profile__name">
                        <span className="name">
                          {" "}
                          <Skeleton
                            animation={animation ? animation : "wave"}
                            variant="text"
                            height={20}
                            width={160}
                          />
                        </span>
                      </div>
                    </div>
                    <div className="  sm:line-clamp-1 text-gray-700 text-xs text-brand-grey-700 dark:text-brand-grey-500">
                      <Skeleton
                        animation={animation ? animation : "wave"}
                        variant="text"
                        height={20}
                        width={200}
                      />
                    </div>
                    <div
                      className=" 
sm:line-clamp-1  event-date text-brand-grey-700 dark:text-brand-grey-500"
                    >
                      <div className="flex text-xs">
                        <div className="mt-0 leading-tight text-xs">
                          <Skeleton
                            animation={animation ? animation : "wave"}
                            variant="text"
                            height={20}
                            width={160}
                          />
                        </div>
                      </div>
                      <div class="flex gap-2">
                        {" "}
                        <Skeleton
                          animation={animation ? animation : "wave"}
                          variant="circular"
                          height={20}
                          width={20}
                        />
                        <Skeleton
                          animation={animation ? animation : "wave"}
                          variant="circular"
                          height={20}
                          width={20}
                        />
                        <Skeleton
                          animation={animation ? animation : "wave"}
                          variant="circular"
                          height={20}
                          width={20}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="  line-clamp-3 text-gray-700 py-1 mb-1 leading-snug">
                <Skeleton
                  animation={animation ? animation : "wave"}
                  variant="text"
                  height={20}
                  width={200}
                />
                <Skeleton
                  animation={animation ? animation : "wave"}
                  variant="text"
                  height={20}
                  width={160}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="w-full h-auto pt-2 xl:w-56">
              <Skeleton2>
                <Skeleton
                  className="block w-full overflow-hidden bg-cover rounded post-cover dark:bg-brand-grey-800 dark:border-brand-grey-800"
                  animation={animation ? animation : "wave"}
                  variant="rectangular"
                  height={200}
                />
              </Skeleton2>
            </div>
          </div>
        </div>
        <div>
          <div className="spacer"></div>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between">
            <div className="flex gap-0 px-2 py-2">
              <Skeleton
                animation={animation ? animation : "wave"}
                variant="circular"
                height={20}
                width={20}
              />
            </div>
            <div className="flex flex-row cursor-pointer leading-slug px-2 py-2">
              <div className=" dialog-title  text-xs font-medium leading-tight">
                <Skeleton
                  animation={animation ? animation : "wave"}
                  variant="text"
                  height={20}
                  width={60}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="spacer"></div>
          </div>
          <div>
            <hr className="MuiDivider-root MuiDivider-fullWidth" />
          </div>
        </div>
        <div className="flex flex-wrap px-2 py-2 gap-4">
          <div className=" mt-2">
            <Skeleton
              animation={animation ? animation : "wave"}
              variant="text"
              height={20}
              width={80}
            />
          </div>
          <div className=" flex text-sm px-2 py-2 gap-2">
            <div className="flex Session_session__action ">
              <div className="items-center">
                <Skeleton
                  animation={animation ? animation : "wave"}
                  variant="text"
                  height={20}
                  width={90}
                />
              </div>
            </div>

            <div className="flex Session_session__action ">
              <div className="items-center">
                <Skeleton
                  animation={animation ? animation : "wave"}
                  variant="text"
                  height={20}
                  width={90}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Shimmer;
