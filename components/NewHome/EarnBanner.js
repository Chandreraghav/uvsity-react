/* eslint-disable @next/next/no-img-element */
import React from "react";
import { EarnBannerFeatures, BannerAccordion } from './shared';

const EarnBanner = () => {
  return (
    <>
    <br/>
    <br/>
    {/* left-video and right-text */}
<div id="EarnBanner">
      <h3 style={{ textAlign: 'center',color:'#0f8dbf',fontSize:'30px' }} ><strong>How to create session</strong></h3><br/>
      <br/>
<br/>
<br/>
      <div id="howItWorksSection" className="howToWrap one clearfix" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'center' }}>
       
        <div className="subsection animated fadeInLeft videoSec">
          <div className="gifWrap" >
           <video width="80%" autoPlay muted controls loop style={{textAlign:'center',marginLeft:'20%'}}>
              <source src="https://s3.amazonaws.com/uvsityImages/HowToCreateSession.mp4" type="video/mp4" />
              Your browser does not support HTML video.
            </video>
          </div>
        </div>

        <div className="subsection animated fadeInRight contentSec">
          <div className="gifContentWrap">
          <ul className="section3Ul" style={{padding: '20px 0',marginLeft:'30px',color:'#108dbf'}}>
              <li className="section3Li" >
              <i className="fa fa-check" aria-hidden="true"></i>Signup today and host your online sessions,
                talks or events.
              </li>
              <br/>
              <li className="section3Li">
                <i className="fa fa-check" aria-hidden="true"></i> To create your session, go to Sessions  Create
                Session.
              </li>
              <br/>
              <li className="section3Li">
                <i className="fa fa-check" aria-hidden="true"></i> Fill out session details, select Schedule, price,
                Preview then Submit.
              </li>
              <br/>
              <li className="section3Li">
                <i className="fa fa-check" aria-hidden="true"></i> Share the session URL in social media, Stay in
                network with all attendees after your sessions or events.
              </li>
            </ul>
          </div>
        </div>



      </div>
    </div>
{/* left-video and right-text close*/}
    </>
    // <section className="w-full py-16 !bg-new-text-white" id="earn-money">
    //   <div className="container flex flex-col mx-auto items-left">
    //     <h2 className="text-3xl lg:text-4xl text-new-primary mb-16 font-bold">Opportunities to Earn on Uvsity</h2>
    //     <BannerAccordion bannerItems={EarnBannerFeatures} />
    //   </div>
    // </section>
  );
};

export default EarnBanner;
