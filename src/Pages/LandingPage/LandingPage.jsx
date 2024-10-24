import React from "react";
import ScrollSvg from "../../Components/Common/ScrollSvg/ScrollSvg";
import BahrAcademy from "../../Components/Common/BahrAcademy/BahrAcademy";
import StoreService from "../../Components/ComponentOnce/StoreService/StoreService";
import CourseTraining from "../../Components/Common/CourseTraining/CourseTraining";
import WorkshopTarget from "../../Components/ComponentOnce/WorkshopTarget/WorkshopTarget";
import CursesAcademyLanding from "../../Components/Common/CursesAcademyLanding/CursesAcademyLanding";
import StatisticsData from "../../Components/Common/StatisticsData/StatisticsData";
import LandingSlider from "../../Components/Common/LandingSlider/LandingSlider";
import BlogLanding from "../../Components/ComponentOnce/BlogLanding/BlogLanding";
import Footer from "../../Components/Layout/Footer/Footer";
import { PathMotion } from "./PathMotion";
import { ReactComponent  as SSV} from "./Main.svg";


const LandingPage = () => {
  console.log(SSV);
  return (
    <div className="border relative w-[100%]">
      <div className="svgHolder absolute w-[85%] top-0 right-1/2 translate-x-1/2  max-lg:hidden  xl:mt-24 mt-80 mx-auto">
        <SSV/>
         {/* <PathMotion
          progressObject={[
            { percent: 5, line: 11, flow: 0 },
            { percent: 10, line: 5, flow: 15 },
            { percent: 15, line: 5, flow: 19 },
            { percent: 20, line: 5, flow: 35 },
            { percent: 25, line: 5, flow: 37 },
            { percent: 30, line: 5, flow: 43 },
            { percent: 35, line: 5, flow: 45 },
            { percent: 40, line: 5, flow: 50 },
            { percent: 45, line: 5, flow: 55 },
            { percent: 50, line: 5, flow: 57 },
            { percent: 55, line: 5, flow: 60 },
            { percent: 60, line: 5, flow: 65 },
            { percent: 65, line: 5, flow: 75 },
            { percent: 70, line: 5, flow: 80 },
            { percent: 75, line: 5, flow: 85 },
            { percent: 80, line: 3, flow: 90 },
            { percent: 85, line: 1, flow: 92 },
            { percent: 87, line: 2, flow: 95 },
            { percent: 90, line: 2, flow: 100 },
          ]}
        >
          {ReactComponent}
        </PathMotion>  */}
      {/* </div> */}
      </div>
      {/* <BahrAcademy /> */}
      {/* <StoreService />
        <CourseTraining />
        <WorkshopTarget />
        <CursesAcademyLanding />
        <StatisticsData />
        <LandingSlider />
        <BlogLanding />
        <Footer />
        <ScrollSvg /> */}
    </div>
  );
};

export default LandingPage;
