import React from "react";

function Opportunities(props) {
  return (
    <div className="Opportunities-item" onClick={props.displayOppId}>
      <div className="Opportunities-holder">
        <div className="Opportunities-item-oppComp">{props.data.oppName}</div>
        <div className="Opportunities-item-title">{props.data.oppComp}</div>
      </div>
    </div>
  );
}

export default Opportunities;
