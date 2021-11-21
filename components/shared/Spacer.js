import React from "react";

function Spacer({ count }) {
  const getElement = () => {
    const _count = count || 1;
    let jsx = [];
    for (var i = 0; i < _count; i++) {
      jsx.push(
        <>
          <div className="spacer"></div>
        </>
      );
    }
    return jsx;
  };

  return <div>{getElement()}</div>;
}

export default Spacer;
