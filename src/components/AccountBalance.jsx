import React from "react";

const DisplayAccountBalance = (props) => {

  return (
    <div>
      <div>Name: { props.name}</div>
      <div>Type: { props.accountType}</div>
      <div>Total Amount: { props.minorUnits } {props.currency}</div>
    </div>
  );
}

export default DisplayAccountBalance;