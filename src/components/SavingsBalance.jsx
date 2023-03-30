import React from "react";

const DisplaySavingsBalance = (props) => {

  return (
    <div>
      <div>Name: { props.name}</div>
      <div>Target: { props.targetMinorUnits} { props.targetCurrency}</div>
      <div>Total Saved: { props.totalSavedMinorUnits} { props.totalSavedCurrency}</div>
    </div>
  );
}

export default DisplaySavingsBalance;