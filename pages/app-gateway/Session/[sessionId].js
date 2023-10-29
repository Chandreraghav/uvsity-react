/* eslint-disable @next/next/no-img-element */
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { KEYS } from "../../../async/queries/keys/unique-keys";
import { asyncSubscriptions } from "../../../async/subscriptions";
import PrivateRoute from "../../../components/Auth/HOC/Routes/PrivateRoute";
import PhoneMenu from "../../../components/Authorized/Shared/FireFighter/PhoneMenu";
import Header from "../../../components/Authorized/Shared/Header";
import Layout from "../../../components/Main/Layout";
import Footer from "../../../components/shared/Footer";
import { LOADING_MESSAGE_DEFAULT } from "../../../constants/constants";
import { IMAGE_PATHS, TOOLTIPS } from "../../../constants/userdata";
import { useDataLayerContextValue } from "../../../context/DataLayer";
import { getLocalStorageObject, removeLocalStorageObject } from "../../../localStorage/local-storage";
import UserDataService from "../../api/users/data/UserDataService";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import SProfile from "./SProfile";

const SessionProfile = () => {
    const [ctxUserdata, dispatch] = useDataLayerContextValue();
    const [loginData, setLoginData] = useState(null);
    const [_isLoggedInUserSessionOwner, setSessionOwner] = useState(false);
    const router = useRouter();
    const { sessionId } = router.query;

    const layoutObj = {
        title: LOADING_MESSAGE_DEFAULT,
        desc: null,
        poster: null,
    };
    const [layoutObject, setLayoutObject] = useState(null);
    const [responseError, setResponseError] = useState(null);
    const [hasChangeEventTriggered, setChangeEventTriggered] = useState(false);

    const getSessionDetail = async () =>
        await UserDataService.getSessionDetailPerCourse(sessionId);

    const { data, isError, isSuccess, isLoading } = useQuery(
        [KEYS.SESSION.BY_SESSION_ID + "_" + sessionId],
        getSessionDetail,
        {
            refetchInterval: () =>
                asyncSubscriptions.SESSION_VIEWS.enabled
                    ? asyncSubscriptions.PROFILE_VIEWS.pollEvery
                    : false,
            staleTime: asyncSubscriptions.SESSION_VIEWS.staleTime,
            onError: (err) => {
                const _layoutObj = {
                    title: `${process.env.NEXT_PUBLIC_APP_NAME}`,
                    desc: "Error",
                    poster: null,
                };
                if (layoutObj.desc !== "Error") setLayoutObject(_layoutObj);
                if (!responseError) {
                    setResponseError(
                        JSON.parse(getLocalStorageObject("uvsity-internal-error-response"))
                    );
                    removeLocalStorageObject("uvsity-internal-error-response");
                }
            },
            refetchOnWindowFocus: false
        }
    );

    const getData = {
        SESSION_SUMMARY: data,
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const isLoggedInUserSessionOwner = (user_id) => {
        return (
            Number(user_id) === loginData?.userDetailsId
        );
    };
    useEffect(() => {
        if (isSuccess) {
            const session_name = getData.SESSION_SUMMARY?.data?.courseFullName
            const obj = {
                title: `${session_name} | ${process.env.NEXT_PUBLIC_APP_NAME}`,
                desc: `Session Details for the session ${session_name}`,
                poster: getData.SESSION_SUMMARY?.data?.imageURL,
            };
            setLayoutObject(obj);
            const isOwner = getData.SESSION_SUMMARY?.data?.owner && isLoggedInUserSessionOwner(getData.SESSION_SUMMARY?.data?.createdByUser)
            setSessionOwner(isOwner);
            return () => {
                setLayoutObject(null);
                setResponseError(null);
            };
        }
    }, [data]);

    useEffect(() => {
        setLayoutObject(layoutObj);
        return () => {
            setLayoutObject(null);
            setChangeEventTriggered(false);
        };
    }, []);
    const handleChangeEvent = (event) => {
        if (event) {
            getSessionDetail().then((res) => {
                getData.SESSION_SUMMARY = res;
                setChangeEventTriggered(event?.changed);
            });
        }
    };
    const handleNavigationError = (obj) => {
        console.log(obj);
    };

    useEffect(() => {
        setLoginData(ctxUserdata?.logged_in_info)
    }, [ctxUserdata?.logged_in_info])

    return (
        <Layout private lowZoom={false} options={layoutObject}>
            <Header
                onHeaderNavigationError={handleNavigationError}

            />

            {isSuccess && (<div className="main xl:w-3/4 xl:mx-auto lg:w-3/4 lg:mx-auto">
                <SProfile hasChangeEventTriggered={hasChangeEventTriggered}
                    changeEvent={handleChangeEvent}
                    owner={_isLoggedInUserSessionOwner}
                    session_data={getData.SESSION_SUMMARY?.data}
                    loggedInUser={loginData} />
            </div>)}

            {isError && (
                // session not found custom error
                <div className="min-h-screen w-1/2 mx-auto">
                    <div className="flex flex-col ">
                        <Typography
                            variant="caption"
                            className="dark:text-white-100 mt-5  text-gray-800 text-center font-semibold"
                        >
                            <EventNoteOutlinedIcon />
                            {TOOLTIPS.SESSION_NOT_FOUND}
                        </Typography>
                        <img
                            alt="Error"
                            className=" object-cover"
                            src={IMAGE_PATHS.NO_DATA.SESSION}
                        />
                    </div>
                </div>
            )}
            {isLoading && (
                <div className="  min-h-screen dark:bg-gray-dark bg-gray-100"></div>
            )}

            <PhoneMenu />
            <Footer minimizeOnSmallScreens />
        </Layout>
    );
};

export default PrivateRoute(SessionProfile);
