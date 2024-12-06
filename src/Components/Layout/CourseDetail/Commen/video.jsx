import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, IconButton, Tooltip } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LockIcon from '@mui/icons-material/Lock';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux'; // استفاده از useSelector برای دسترسی به وضعیت گلوبال

const VideoAccordion = ({ data }) => {
  // دریافت وضعیت دارک مود از استیت
  const dark = useSelector((state) => state.darkMood);

  return (
    <div>
      {data?.groups.map((group) => (
        <Accordion key={group.groupId} style={{ background: dark.bgHigh, color: dark.textHigh }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${group.groupId}-content`}
            id={`panel-${group.groupId}-header`}
          >
            <h2 variant="h6" style={{ color: dark.textHigh }}>
              {group.groupName}
            </h2>
          </AccordionSummary>

          <AccordionDetails>
            {group.videos.length > 0 ? (
              group.videos.map((video) => (
                <div key={video.videoId} style={{ marginBottom: '20px' }}>
                  <h2 variant="h6" className='text-right font-bold' style={{ margin: '0 0 10px 0', color: dark.textHigh }}>
                    {video.title}
                  </h2>
                  {video.isLock === false ? (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <ReactPlayer url={video.videoUrl} width="100%" />
                    </div>
                  ) : (
                    <Tooltip title="دسترسی به دوره قفل است" placement="bottom">
                      <LockIcon color='error' style={{ margin: '0 20px 10px 0' }} />
                    </Tooltip>
                  )}
                </div>
              ))
            ) : (
              <h2 className='text-right font-bold' style={{ color: dark.textHigh }}>ویدیو وجود ندارد</h2>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default VideoAccordion;
