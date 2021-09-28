import React from 'react'
import BannerStyle from "../../styles/Banner.module.css"
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';

function Banner() {
    return (
        <div>
        <header
        className={BannerStyle.banner} style={{
            backgroundImage: `url("/static/images/HeaderImage.jpg")`, backgroundSize: 'cover',
            backgroundPosition: "center center",
            backgroundAttachment:"fixed",
            backgroundRepeat:"no-repeat"
        }}> 
             
            <div className={BannerStyle.banner__contents}>
            
                <h1 className={BannerStyle.banner__title}>
                Create your own session today
                </h1>
                <h4 className={BannerStyle.banner__title__small}>No Payment Required</h4>
                <div className={BannerStyle.banner__buttons}>
                    <button className={BannerStyle.banner__button}>Get Started</button>
                    <a href="#popularlivesessions"><button className={BannerStyle.banner__button}>Live Sessions</button></a>
                </div>
                
                <ul className={BannerStyle.banner__description}>
                    <li><DoubleArrowIcon/>A Marketplace for all educators, coaches and session organizers.</li>
                    <li><DoubleArrowIcon/>Earn from your paid sessions and sponsorships.</li>
                    <li><DoubleArrowIcon/>Earn from your one on one appointment.</li>
                    <li><DoubleArrowIcon/>Stay connected with your audience and followers.</li>
                </ul>
          
             
            </div>
            <div className={BannerStyle.banner__fadeBottom}></div>
        </header>
      
       
        </div>

    )
}

export default Banner
