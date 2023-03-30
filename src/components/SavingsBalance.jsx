import React from "react";

const DisplaySavingsBalance = (props) => {

  return (
    <div>
      <div className="savings-amounts">
        <div className="amount">{ props.totalSavedMinorUnits} { props.totalSavedCurrency} </div>
        <div className="target">/ { props.targetMinorUnits} { props.targetCurrency}</div>
      </div>
      <div className="name"> { props.name}</div>
       
    </div>
  );
}

export default DisplaySavingsBalance;