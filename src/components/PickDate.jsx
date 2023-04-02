import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

const PickDate = (startDate, setStartDate) => {
  
  return (
    <DatePicker 
      className="begin-date"
      dateFormat="dd/MM/yyyy"
      selected={startDate} 
      onChange={(date) => setStartDate(date)} 
    />
  );
};

export default PickDate;