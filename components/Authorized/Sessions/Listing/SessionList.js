import React, { useMemo, useState, useEffect } from 'react'
import { AUTHORIZED_ROUTES, CUSTOM_ERRORS, IMAGE_PATHS, SESSION } from '../../../../constants'
import OnlineSessions from './OnlineSessions'
import OwnSessions from './OwnSessions'
import EnrolledSessions from './EnrolledSessions'
import { useGetSessions } from '../../../../hooks'
import { Typography } from '@mui/material'
import Error from '../../Shared/Error'
import NoDataFound from '../../Shared/NoDataFound'
import Splash from '../../../shared/Splash'

function SessionList(props) {
    const [isSticky, setSticky] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            const scrollheightLimit = 50;
            if (window.scrollY > scrollheightLimit) {
                if (isSticky === false) {
                    setSticky(true);
                }

            } else {
                setSticky(false);
            }
        });
        return () => {
            try {
                window.removeEventListener("scroll");
            } catch (error) { }
        };
    }, []);
    const utrn = useMemo(() => props.utrn, [props.utrn])
    const getSessions = useGetSessions(utrn)
    const getFilteredDataSetForOnlineSessions = useGetSessions(utrn, true)
    const icon = useMemo(() => {
        if (utrn === AUTHORIZED_ROUTES.AUTHORIZED.UTRN.ONLINE_SESSIONS)
            return SESSION.MENU[0].icon
        if (utrn === AUTHORIZED_ROUTES.AUTHORIZED.UTRN.ENROLLED_SESSIONS)
            return SESSION.MENU[1].icon
        if (utrn === AUTHORIZED_ROUTES.AUTHORIZED.UTRN.OWN_SESSIONS)
            return SESSION.MENU[2].icon

        return <></>
    }, [utrn])
    const sessionData = useMemo(() => getSessions.data, [getSessions])
    const filteredDataSetForOnlineSessions = useMemo(() => getFilteredDataSetForOnlineSessions.data, [getFilteredDataSetForOnlineSessions.data])
    return (
        <>
            {props.title && (

                <Typography className={` py-2 flex lg:justify-start md:justify-start xs:justify-center sm:justify-center ${isSticky
                    ? "fixed ease-in-out transition-all z-[1000] p-2 w-full  bg-gray-300 dark:bg-gray-950       "
                    : ""
                    }`} variant="h5">
                    <div className=" space-x-2 px-2 w-2"></div>
                    <div className={`mt-2 flex gap-2`}  >
                        <div>{icon}</div>
                        <div>{props.title}</div>
                    </div>
                </Typography>

            )}

            {getSessions.isError && (<><Error message={CUSTOM_ERRORS.SOMETHING_WENT_WRONG} /></>)}
            {getSessions.isLoading === false && getSessions.isError === false && !sessionData && (<>
                <NoDataFound src={IMAGE_PATHS.NO_DATA.SESSION} message={CUSTOM_ERRORS.NOTHING_TO_SHOW} />
            </>)}
            {getSessions.isLoading && (<><div className="min-h-screen dark:bg-gray-dark bg-gray-100"><Splash /></div></>)}
            {getSessions.isSuccess && sessionData && (<>
                {utrn === AUTHORIZED_ROUTES.AUTHORIZED.UTRN.ONLINE_SESSIONS && (<OnlineSessions data={sessionData} filteredData={filteredDataSetForOnlineSessions} type={utrn} />)}
                {utrn === AUTHORIZED_ROUTES.AUTHORIZED.UTRN.OWN_SESSIONS && (<OwnSessions data={sessionData} type={utrn} />)}
                {utrn === AUTHORIZED_ROUTES.AUTHORIZED.UTRN.ENROLLED_SESSIONS && (<EnrolledSessions data={sessionData} type={utrn} />)}

            </>)}
        </>
    )
}

export default SessionList