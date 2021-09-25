import React,{useState, useEffect} from "react";
import NavStyle from "../../styles/Nav.module.css"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom"
import {
    APP_LOGO_IMAGE
  } from "../../constants/AppConstants";
toast.configure();
function Nav() {
    let history = useHistory();
    const [show, handleShow] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", transitionNavBar)
        return () =>
            window.removeEventListener("scroll", transitionNavBar)

    }, []);
    const transitionNavBar = () => {
        if (window.scrollY > 100) {
            handleShow(true)
        }
        else {
            handleShow(false)
        }
    }
    return (
        <div className={`${NavStyle.nav} ${show && NavStyle.nav__black}`}>
            <div className={NavStyle.nav__contents}>
                <img onClick={(e) => history.push("/")} className={NavStyle.nav__logo} src={APP_LOGO_IMAGE} alt="uvsity-Logo" />
                <img onClick={(e) => history.push("profile")} className={NavStyle.nav__avatar} src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png"
                    alt="uvsity-User-Avatar" />
                
            </div>

        </div>
    )
}

export default Nav
