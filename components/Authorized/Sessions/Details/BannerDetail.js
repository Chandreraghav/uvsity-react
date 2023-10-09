import { Tooltip, Typography } from '@mui/material';
import React from 'react'
import Spacer from '../../../shared/Spacer';
import EditIcon from "@mui/icons-material/Edit";
import { PLACEHOLDERS, TOOLTIPS } from '../../../../constants/userdata';
import SessionStyle from "../../../../styles/Session.module.css";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useMemo } from 'react';
import SessionOwner from '../../../SessionCards/SessionOwner';
import Actions from '../ActionableItems/Actions';
function BannerDetail(props) {
    const generateMonetizationAmountOnCard = useMemo(() => {

        const amount = Number(props.secondary?.fees?.amount);
        const isPaid = props.secondary?.fees?.paidInd;

        if (!isPaid || !amount || amount == 0 || isNaN(amount)) {
            if (props.owner === true) {
                return (
                    <Tooltip title={`${TOOLTIPS.FREE_SESSION} | Click to change`}>
                        <div
                            onClick={() => {
                                props.onNavigate ? props.onNavigate(3) : null;
                            }}
                            className={`${SessionStyle.session__card__costing} mt-2 cursor-pointer`}
                        >
                            {PLACEHOLDERS.FREE}
                        </div>
                    </Tooltip>
                );
            }
            else {
                return (
                    <Tooltip title={`${TOOLTIPS.FREE_SESSION}`}>
                        <div

                            className={`${SessionStyle.session__card__costing} mt-2 cursor-pointer`}
                        >
                            {PLACEHOLDERS.FREE}
                        </div>
                    </Tooltip>
                );
            }

        }
        if (props.owner === true) {
            return (
                <div
                    onClick={() => {
                        props.onNavigate ? props.onNavigate(3) : null;
                    }}
                >
                    <Tooltip title={`${TOOLTIPS.PAID_SESSION} | Click to change`}>
                        <div
                            className={`${SessionStyle.session__card__costing} ${SessionStyle.session__card__currency__amount} cursor-pointer`}
                        >
                            <MonetizationOnIcon />
                            <span className={`${SessionStyle.session__card__currency__amount}`}>
                                {amount}
                            </span>
                        </div>
                    </Tooltip>
                </div>
            );
        }
        return (
            <div

            >
                <Tooltip title={`${TOOLTIPS.PAID_SESSION}`}>
                    <div
                        className={`${SessionStyle.session__card__costing} ${SessionStyle.session__card__currency__amount} cursor-pointer`}
                    >
                        <MonetizationOnIcon />
                        <span className={`${SessionStyle.session__card__currency__amount}`}>
                            {amount}
                        </span>
                    </div>
                </Tooltip>
            </div>
        );
    }, [props])
    if (!props.banner) return (<></>)

    const getStartDate = () => {
        return props.secondary?.schedule?.startDate.getDate();
    };
    const getStartMonth = () => {
        const date = props.secondary?.schedule?.startDate;
        const month = date?.toLocaleString("default", { month: "short" });
        return month;
    };

    const isFreeSession = (data) => {
        const amount = Number(data?.amount);
        const isPaid = data?.paidInd;
        return (!isPaid || !amount || amount == 0 || isNaN(amount))
    }


    return (
        <>
            <div className="flex gap-3 ">
                {props.secondary?.schedule?.startDate && (
                    <div className="flex flex-col mt-1 bg-blue-800 p-4 justify-center items-center">
                        <Typography variant="h3">  {getStartDate()}</Typography>
                        <Typography variant="h6">
                            {getStartMonth()}
                        </Typography>

                    </div>)}

                <div className="mt-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  w-full p-4 shadow-md rounded-md">
                    <Spacer count={2} />
                    <div className=" flex ">
                        <Typography
                            variant="body"
                            className="lg:text-3xl sm:text-xl md:text-2xl   leading-tight line-clamp-2 align-middle  "
                        >
                            {props.banner?.name}

                        </Typography>

                        {props.secondary?.fees && (<div className="ml-auto">
                            <div className="flex gap-2">
                                {props.owner === true && (<div className={`${isFreeSession(props.secondary?.fees) ? 'mt-2.5' : 'mt-1.5'} text-blue-600
                              app-anchor-block cursor-pointer`}>
                                    <Tooltip title="Change">
                                        <EditIcon
                                            onClick={() => {
                                                props.onNavigate ? props.onNavigate(0) : null;
                                            }}

                                            className=" leading-3 font-semibold"
                                        />
                                    </Tooltip>
                                </div>)}


                                {generateMonetizationAmountOnCard}
                            </div>
                        </div>)}

                    </div>
                    {props.oid !== undefined && (<Actions variant='banner' data={props.sessionData} />)}
                </div>

            </div>
        </>
    )
}

export default BannerDetail