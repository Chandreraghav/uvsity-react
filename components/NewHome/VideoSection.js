/* eslint-disable @next/next/no-img-element */
import React, { useMemo, useState } from "react";

const VideoSection = () => {
  const [isPristine, setPristine] = useState(true);

  const marketingVideoSrc = useMemo(() => {
    const videoSrc = process.env.NEXT_PUBLIC_APP_MARKETING_VIDEO_SRC || '';
    return `${videoSrc}${isPristine ? '' : '?autoplay=1'}`;    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPristine]);

  return (
    <section className="w-full py-16">
      <div className="container flex flex-col mx-auto items-center">
        <h2 className="text-3xl lg:text-4xl text-new-primary mb-4 font-bold text-center">An Educational Social Network</h2>
        <p className="text-xl lg:text-2xl max-w-3xl text-center text-new-secondary mb-16">Explore the Potential of Uvsity</p>
        <div className="relative w-full">
          <div className="w-full h-auto rounded-xl">
            <iframe className={`w-full h-auto aspect-video rounded-xl`} src={marketingVideoSrc} allow="autoplay" />
            {isPristine && (
              <img 
                alt=""
                src="/static/images/university-image.jpeg" 
                className="w-full h-full top-0 left-0 absolute rounded-xl" 
              />)
            }
          </div>
          
          {isPristine && (
            <>
              <button 
                className="
                  w-32 h-32 cursor-pointer rounded-full 
                  border border-new-text-new-secondary 
                  absolute left-1/2 top-1/2 bg-white 
                  -translate-y-2/4 -translate-x-2/4 hover:w-36 hover:h-36"
                onClick={() => setPristine(false)}
                >
                <img className="mx-auto w-14 pl-1" src="/static/images/play-button.svg" alt="" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
