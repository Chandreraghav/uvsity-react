import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "../../Thirdparty/Animation/AnimatedProgressProvider";

function CompletionProgress({ percentage }) {
    if(!percentage) return ''
  return (
    <div>

<AnimatedProgressProvider
        valueStart={0}
        valueEnd={percentage}
        duration={1.4}
        easingFunction={easeQuadInOut}
        
      >
        {value => {
          const roundedValue = Math.round(value);
          return (
            <CircularProgressbar
              value={value}
              text={`${roundedValue}%`}
              strokeWidth={3}
              styles={buildStyles({ 
              pathTransition: "none",
              pathColor: `rgba(62, 152, 199, ${roundedValue / 100})`,
              textColor: "#5271FF",
              trailColor: "#d6d6d6",
              textSize: "16px",})}
            />
          );
        }}
      </AnimatedProgressProvider>
    
      
    </div>
  );
}

export default CompletionProgress;
