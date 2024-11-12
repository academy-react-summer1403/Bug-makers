// AppTour.js
import React from "react";
import Tour from "reactour";
import styled from "styled-components";
import { useTour } from "./TourContext";
import { useNavigate } from "react-router-dom";

// استایل‌ها
const Button = styled.button`
  background-color: #4c6ef5;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin: 0 4px;

  &:hover {
    background-color: #364fc7;
  }
`;

const SkipButton = styled(Button)`
  background-color: #e53e3e;

  &:hover {
    background-color: #c53030;
  }
`;

const TourContainer = styled.div`
  background-color: #1a202c;
  color: #edf2f7;
  padding: 20px;
  border-radius: 12px;
  width: 320px;
`;

// کامپوننت اصلی تور
const AppTour = () => {
  const { isTourOpen, currentStep, handleTourClose, goToNextStep } = useTour();
const navigate = useNavigate()
  const steps = [
    { selector: ".step1", content: "به سایت اکادمی بحرالعلوم خوش امدید ❤️" },
    {
      selector: ".step2",
      content: "تو این قسمت شما میتونید به صفحات مختلف سایت سر بزنید",
    },
    {
      selector: ".step33",
      content: "این قسمت برای شماست تا همه چیزو خیلی زود پیدا کنید 😁",
    },
    {
      selector: ".step4",
      ac: `CoursePage`,
      content: "این قسمتم برای تغیر رنگ و تم سایتمونه",
    },
    {
      selector: ".step5",
      ac: `Blogpage`,
      content:
        "اینجا صفحه دوره های ماست که کلی دوره های مفید براتو قرار دادیم 👌",
    },
    {
      selector: ".step6",
      ac: `PodcastPage`,
      content:
        "اینجا هم صفحه مقالات ماست که میتونی اخبار مقالات بروز مارو دنبال کنی 😎",
    },
    {
      selector: ".step7",
      ac: `/`,
      content: "اینجام بخش پادکستای سایتمونه 😁",
    },
    { selector: ".step8", content: "امیدوارم ازین سفر خوشت اومده باشه ❤️" },
  ];

  const handleNextClick = () => {
    if (currentStep < steps.length - 1) {
      goToNextStep();
      if(steps[currentStep].ac){
        navigate(steps[currentStep].ac)
      }
    } else {
      handleTourClose(); // اگر مرحله آخر است، تور را ببندید
    }
  };

  return (
    <Tour
      steps={steps}
      isOpen={isTourOpen}
      onRequestClose={handleTourClose}
      getCurrentStep={currentStep} // به‌روزرسانی مرحله جاری
      goToStep={currentStep} // مرحله فعلی که باید نمایش داده شود
      CustomHelper={({ content }) => (
        <TourContainer>
          <div>{content}</div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "10px",
            }}
          >
            <SkipButton onClick={handleTourClose}>رد کردن</SkipButton>
            <Button onClick={handleNextClick}>
              {currentStep < steps.length - 1 ? "بعدی" : "پایان"}
            </Button>
          </div>
        </TourContainer>
      )}
    />
  );
};

export default AppTour;
