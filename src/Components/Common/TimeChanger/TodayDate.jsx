import React, { useState, useEffect } from "react";
import moment from "moment-jalaali";

const TodayDate = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = moment().format("jYYYY/jMM/jDD");
    setDate(today);
  }, []);

  return (

      <span>{date}</span>

  );
};

export default TodayDate;
