/* eslint-disable @next/next/no-img-element */
import React from "react";
import { HowItWorksBannerFeatures, BannerAccordion } from './shared';

const HowItWorksBanner = () => {
  return (
    // <section className="w-full py-16 bg-new-light-gray" id="how-it-works">
    //   <div className="container flex flex-col mx-auto items-left">
    //     <h2 className="text-3xl lg:text-4xl text-new-primary mb-16 font-bold">How it works</h2>
    //     <BannerAccordion bannerItems={HowItWorksBannerFeatures} reverse/>
    //   </div>
    // </section>
    <>
    {/* left-text and right-video */}
<br/>
<br/>
<h3 style={{ textAlign: 'center',color:'#0f8dbf',fontSize:'30px' }}><strong>Setting up meeting is just few clicks away!</strong></h3><br/>
      <br/>
<br/>
<br/>
 <div className="howToWrap one clearfix" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'center' }}>

   <div className="subsection animated fadeInLeft contentSec">
     <div className="gifContentWrap">
     <br/>
     <ul className="section3Ul" style={{padding: '20px 0',marginLeft:'30px',color:'#108dbf'}}>
              <li className="section3Li" >
              <i className="fa fa-check" aria-hidden="true"></i>No back and forth emails or phone calls. Setting up appointment is just few clicks away.
              </li>
              <br/>
              <li className="section3Li">
                <i className="fa fa-check" aria-hidden="true"></i> Signup today and get your free personal appointment app with integrated zoom web conferencing.
              </li>
              <br/>
              <li className="section3Li">
                <i className="fa fa-check" aria-hidden="true"></i> Share your personal appointment link in email, social media or embed in your website!

              </li>
            </ul>
     </div>
   </div>
   <div className="subsection animated fadeInRight videoSec">
     <div className="gifWrap">
     <video width="80%" autoPlay muted controls loop style={{textAlign:'center',marginRight:'20%'}}>
              <source src="https://s3.amazonaws.com/uvsityImages/HowToScheduleMeeting.mp4" type="video/mp4" />
              Your browser does not support HTML video.
            </video>
          </div>
     </div>
   </div>

  {/* left-text and right-video close */}
    </>
  );
};

export default HowItWorksBanner;
