import { Skeleton } from '@mui/material';
import React from 'react'
import { styled } from "@mui/material/styles";
import Spacer from '../../../../shared/Spacer';
function CardShimmer(props) {
    const Skeleton1 = styled("div")(({ theme }) => ({
        [theme.breakpoints.down("sm")]: {
            width: 300,
        },
        [theme.breakpoints.down("xs")]: {
            width: 250,
        },
        [theme.breakpoints.up("md")]: {
            width: 500,
        },
        [theme.breakpoints.up("lg")]: {
            width: 300,
        },
        [theme.breakpoints.up("xl")]: {
            width: 350,
        },
    }));

    const Skeleton2 = styled("div")(({ theme }) => ({
        [theme.breakpoints.down("sm")]: {
            width: 200,
        },
        [theme.breakpoints.down("xs")]: {
            width: 150,
        },
        [theme.breakpoints.up("md")]: {
            width: 400,
        },
        [theme.breakpoints.up("lg")]: {
            width: 200,
        },
        [theme.breakpoints.up("xl")]: {
            width: 250,
        },
    }));

    const Skeleton3 = styled("div")(({ theme }) => ({
        [theme.breakpoints.down("sm")]: {
            width: 150,
        },
        [theme.breakpoints.down("xs")]: {
            width: 50,
        },
        [theme.breakpoints.up("md")]: {
            width: 300,
        },
        [theme.breakpoints.up("lg")]: {
            width: 150,
        },
        [theme.breakpoints.up("xl")]: {
            width: 150,
        },
    }));
    if (!props.visible) return "";
    return (
        <div
            className={` relative border-0   rounded
       overflow-hidden ${props.dark ? "dark-dialog-variant" : "default-dialog-variant"
                }  flex flex-col ${props.fullWidth ? 'rectangular-md-card-fullWidth' : 'rectangular-md-card'}  rectangular-md-card-fixed-height`}
        >
            <div className="flex">
                <div className="flex flex-col">
                    <Skeleton
                        className="dark:bg-gray-600"
                        variant="circular"
                        width={80}
                        height={80}
                    />
                </div>

                <div className="flex flex-col px-2 py-2">
                    <div className="flex gap-1">
                        <Skeleton1>
                            <Skeleton
                                className="dark:bg-gray-600"
                                animation={props.animation ? props.animation : "wave"}
                                variant="text"
                                height={20}

                            />
                        </Skeleton1>

                    </div>
                    <Spacer />
                    <Skeleton2>
                        <Skeleton
                            className="dark:bg-gray-600"
                            animation={props.animation ? props.animation : "wave"}
                            variant="text"
                            height={20}

                        />
                    </Skeleton2>

                    <Spacer />
                    <Skeleton3>
                        <Skeleton
                            className="dark:bg-gray-600"
                            animation={props.animation ? props.animation : "wave"}
                            variant="text"
                            height={20}

                        />
                    </Skeleton3>

                    <div
                        className={`flex  gap-2  slow-transition mt-3  `}
                        role="button"

                    >
                        <Skeleton
                            className="dark:bg-gray-600"
                            variant="circular"
                            width={20}
                            height={20}
                        />

                        <Skeleton
                            className="dark:bg-gray-600"
                            variant="circular"
                            width={20}
                            height={20}
                        />
                    </div>

                    <div
                        className={`flex  gap-2  slow-transition mt-2  `}
                        role="button"

                    >
                        <Skeleton
                            className="dark:bg-gray-600"
                            variant="text"
                            width={100}
                            height={40}
                        />

                        <Skeleton
                            className="dark:bg-gray-600"
                            variant="text"
                            width={100}
                            height={40}
                        />
                    </div>
                </div>



            </div>
        </div>
    )
}

export default CardShimmer