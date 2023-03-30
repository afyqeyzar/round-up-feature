import React from "react";

const DisplayAccountBalance = (props) => {

  return (
    <div>
      <div>{ props.accountType}</div>
      <div className="amount">{ props.minorUnits } {props.currency}</div>
      <div>{ props.name}</div>
    </div>
  );
}

export default DisplayAccountBalance;