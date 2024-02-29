/* eslint-disable @next/next/no-img-element */
import React, { useRef, useEffect, useState } from "react";
import { NumberCounter, StatData, useIsVisible } from './shared';

const StatsBanner = () => {
  const [liveSessions, setLiveSessions] = useState(0);
  const [meetings, setMeetings] = useState(0);
  const [countries, setCountries] = useState(0);

  useEffect(() => {
    // Simulating live updates
    const interval = setInterval(() => {
      setLiveSessions((prevLiveSessions) => prevLiveSessions + 1);
      setMeetings((prevMeetings) => prevMeetings + 1);
      setCountries((prevCountries) => prevCountries + 1);
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  return (
    <>
    
    {/* count -liveSessions-meetings-ountries*/}
<div className="auto-container" style={{ 
  backgroundImage: 'url(https://dev.uvsity.com/assets/images/bg1.png)',
  background: 'cover',
  backgroundColor: 'rgba(15, 141, 191, 0.6)',
  backgroundPosition: '50% -65px',
  backgroundRepeat: 'no-repeat',
  height: '120px',
  overflow:'hidden'
}}>
  <div className="row align-items-center">
    <div className="col-lg-12 col-md-12">
      <div className="content">
        <h5 style={{ textAlign: 'center', letterSpacing: '0.8px', color: '#fff', fontWeight: 'normal', padding: '2%', overflow: 'hidden',position:'relative' }}>
          <span style={{ fontSize: '1.9em' }}>{liveSessions}+</span> Live sessions{' '}
          <span style={{ margin: '0 5em' }}>|</span> <span style={{ fontSize: '1.9em' }}>{meetings}+</span> Meetings{' '}
          <span style={{ margin: '0 5em' }}>|</span> <span style={{ fontSize: '1.9em' }}>{countries}+</span> Countries{' '}
        </h5>
      </div>
    </div>
  </div>
</div>
{/* count -liveSessions-meetings-ountries-close*/}
    
    </>
    // <section className="w-full py-16 bg-new-tertiary" ref={componentParentRef}>
    //   <div className="container flex flex-col lg:flex-row mx-auto justify-center items-center">
    //     <div className="w-full flex flex-row justify-around sm:justify-evenly flex-wrap sm:flex-nowrap">
    //       {
    //         (StatData || []).map(({ text, count }, index) => {
    //           return (
    //             <NumberCounter 
    //               key={text} 
    //               className="mr-4 mb-16 sm:!mb-0 sm:!mr-0"
    //               number={count} 
    //               unit="+" 
    //               subTitle={text}
    //               start={startCounter}
    //             />
    //           )
    //         })
    //       }
    //     </div>  
    //   </div>
    // </section>
  );
};



export default StatsBanner;
