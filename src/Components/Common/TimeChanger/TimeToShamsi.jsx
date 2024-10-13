import moment from "moment-jalaali";
import React from "react";

const convertToJalali = (miladiDate) => {
  return moment(miladiDate, "YYYY-MM-DD").locale("fa").format("YYYY/MM/DD");
};
export default convertToJalali;