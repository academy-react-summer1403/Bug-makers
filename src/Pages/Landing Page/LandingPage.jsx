import React from 'react'
import ScrollSvg from '../../Components/Common/ScrollSvg/ScrollSvg'
import BahrAcademy from '../../Components/Common/BahrAcademy/BahrAcademy'
import StoreService from '../../Components/ComponentOnce/StoreService/StoreService'
import CourseTraining from '../../Components/Common/CourseTraining/CourseTraining'
import WorkshopTarget from '../../Components/ComponentOnce/WorkshopTarget/WorkshopTarget'
import CursesAcademyLanding from '../../Components/Common/CursesAcademyLanding/CursesAcademyLanding'
import StatisticsData from '../../Components/Common/StatisticsData/StatisticsData'
import LandingSlider from '../../Components/Common/LandingSlider/LandingSlider'
import BlogLanding from '../../Components/ComponentOnce/BlogLanding/BlogLanding'
import Footer from '../../Components/Layout/Footer/Footer'

const LandingPage = () => {

  return (
    <div className='border relative w-[100%]'>
        <BahrAcademy />
        <StoreService />
        <CourseTraining />
        <WorkshopTarget />
        <CursesAcademyLanding />
        <StatisticsData />
        <LandingSlider />
        <BlogLanding />
        <Footer />
        <ScrollSvg />

    </div>
  )
}

export default LandingPage