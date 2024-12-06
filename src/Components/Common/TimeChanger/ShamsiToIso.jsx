import React from "react";
import DateObject from "react-date-object";


const ShamsiToISO = (shamsiDate) => {


  const isoDate = shamsiDate.toISOString();


  return isoDate;
};

export default ShamsiToISO;
