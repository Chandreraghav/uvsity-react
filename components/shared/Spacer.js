import React from "react";

function Spacer({ count }) {
  const getElement = () => {
    const _count = count || 1;
    let jsx = [];
    for (var i = 0; i < _count; i++) {
      jsx.push(
        <React.Fragment key={i}>
          <div className="spacer"></div>
        </React.Fragment>
      );
    }
    return jsx;
  };

  return <div>{getElement()}</div>;
}

export default Spacer;
