import React from "react";



const JobDetails = ({ jobData }) => {
  return (
    <div className="grid gap-4 p-4 border border-gray-300 rounded-lg text-right">
      <div className="flex justify-start gap-x-2 items-center">
        <div className="font-bold">عنوان شغل : </div>
        <div>{jobData.jobTitle}</div>
      </div>
      <div className="flex justify-start gap-x-2 items-center">
        <div className="font-bold">توضیحات شغل : </div>
        <div>{jobData.aboutJob}</div>
      </div>
      <div className="flex justify-start gap-x-2 items-center">
        <div className="font-bold">وبسایت شرکت : </div>
        <div>
          <a
            href={`http://${jobData.companyWebSite}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            {jobData.companyWebSite}
          </a>
        </div>
      </div>
      <div className="flex justify-start gap-x-2 items-center">
        <div className="font-bold">لینکدین شرکت : </div>
        <div>
          <a
            href={`http://${jobData.companyLinkdin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            {jobData.companyLinkdin}
          </a>
        </div>
      </div>
      <div className="flex justify-start gap-x-2 items-center">
        <div className="font-bold">تاریخ شروع کار : </div>
        <div>{jobData.workStartDate}</div>
      </div>
      <div className="flex justify-start gap-x-2 items-center">
        <div className="font-bold">تاریخ پایان کار : </div>
        <div>{jobData.workEndDate}</div>
      </div>
      <div className="flex justify-start gap-x-2 items-center">
        <div className="font-bold">در حال کار : </div>
        <div>{jobData.inWork ? "بله" : "خیر"}</div>
      </div>
      <div className="flex justify-start gap-x-2 items-center">
        <div className="font-bold">نام شرکت : </div>
        <div>{jobData.companyName}</div>
      </div>
    </div>
  );
};

export default JobDetails;
