import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import PrivateRoute from "../../components/Auth/HOC/Routes/PrivateRoute";
import PhoneMenu from "../../components/Authorized/Shared/FireFighter/PhoneMenu";
import Header from "../../components/Authorized/Shared/Header";
import { navigateToPath } from "../../components/Authorized/Shared/Navigator";
import Layout from "../../components/Main/Layout";
import Footer from "../../components/shared/Footer";
import { AUTHORIZED_ROUTES } from "../../constants/routes";
import SessionList from "../../components/Authorized/Sessions/Listing/SessionList";

function Sessions() {
    const router = useRouter();
    const routeutrn = useMemo(() => {
        return router.query?.utrn
    }, [router.query?.utrn])

    const _title = useMemo(() => {
        return router.query?.title
    }, [router.query?.title])
    const [layoutObj, setLayoutObject] = useState(null);
    const handleNavigationError = (obj) => {
        console.log(obj);
    };
    const setLayout = useCallback(() => {

        if (routeutrn === AUTHORIZED_ROUTES.AUTHORIZED.UTRN.ONLINE_SESSIONS) {
            setLayoutObject({
                title: `${process.env.NEXT_PUBLIC_APP_NAME} | ${_title}`,
                desc: "View online sessions at uvsity from students, professors and alumni.",
            });


        } else if (routeutrn === AUTHORIZED_ROUTES.AUTHORIZED.UTRN.OWN_SESSIONS) {
            setLayoutObject({
                title: `${process.env.NEXT_PUBLIC_APP_NAME} | ${_title}`,
                desc: "View all sessions at uvsity that you've created.",
            });
        } else {
            setLayoutObject({
                title: `${process.env.NEXT_PUBLIC_APP_NAME} | ${_title}`,
                desc: "View sessions at uvsity to which you've enrolled.",
            });
        }
    }, [_title, routeutrn])

    useEffect(() => {
        if (!routeutrn) {
            navigateToPath(router, AUTHORIZED_ROUTES.AUTHORIZED.DASHBOARD);
            return;
        }
        setLayout();
        return () => {
            setLayoutObject(null);
        };
    }, [router, routeutrn, setLayout]);


    return (
        <Layout private options={layoutObj}>
            <Header
                onHeaderNavigationError={handleNavigationError}
            />
            <SessionList title={_title} utrn={routeutrn} />

            <PhoneMenu />
            <Footer minimizeOnSmallScreens />
        </Layout>
    );
}

export default PrivateRoute(Sessions);
