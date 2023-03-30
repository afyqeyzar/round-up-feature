import React from "react";

const DisplayTransaction = (props) => {

  return (
    <div className="single-transaction">
      <div> { props.counterPartyName } </div>
      <div className="direction"> { props.direction } </div>
      <div> { props.status } </div>
      <div> { props.amount } </div>
    </div>
  )
}

export default DisplayTransaction;