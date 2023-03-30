import React from "react";

const DisplayTransaction = (props) => {

  return (
    <p>{ props.counterPartyName } { props.direction } { props.status } { props.amount }</p>
  )
}

export default DisplayTransaction;