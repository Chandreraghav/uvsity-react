/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import PrivateRoute from "../../../components/Auth/HOC/Routes/PrivateRoute";
import PhoneMenu from "../../../components/Authorized/Shared/FireFighter/PhoneMenu";
import Header from "../../../components/Authorized/Shared/Header";
import Layout from "../../../components/Main/Layout";
import Footer from "../../../components/shared/Footer";
import { LOADING_MESSAGE_DEFAULT } from "../../../constants/constants";
import { useDataLayerContextValue } from "../../../context/DataLayer";

const SessionProfile = () => {
    const [ctxUserdata, dispatch] = useDataLayerContextValue();
    const [loginData, setLoginData] = useState(null);
    const router = useRouter();
    const { profileId } = router.query;
    const [isProfileOwner, setProfileOwner] = useState(false);
    const layoutObj = {
        title: LOADING_MESSAGE_DEFAULT,
        desc: null,
        poster: null,
    };
    const [layoutObject, setLayoutObject] = useState(null);
    const [responseError, setResponseError] = useState(null);
    const [hasChangeEventTriggered, setChangeEventTriggered] = useState(false);
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

            <div className="main xl:w-3/4 xl:mx-auto lg:w-3/4 lg:mx-auto">
                Hey you
            </div>
            <PhoneMenu />
            <Footer minimizeOnSmallScreens />
        </Layout>
    );
};

export default PrivateRoute(SessionProfile);
