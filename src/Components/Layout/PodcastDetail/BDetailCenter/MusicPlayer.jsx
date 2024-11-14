import React, { useState, useRef, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import { FaPlay, FaPause, FaStop } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Select, SelectItem } from "@nextui-org/react";

const MusicPlayer = ({ audioUrl }) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    // ایجاد WaveSurfer با تنظیمات اولیه برای نمایش موج صوتی
    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#D1D5DB",
      progressColor: "#3B82F6",
      height: 60,
      barWidth: 2,
      responsive: true,
    });

    // بارگذاری فایل صوتی و آماده‌سازی موج صوتی
    wavesurfer.current.load(audioUrl);

    // تنظیم مدت زمان آهنگ بعد از بارگذاری کامل
    wavesurfer.current.on("ready", () => {
      setDuration(wavesurfer.current.getDuration());
    });

    // به‌روزرسانی زمان فعلی در حین پخش
    wavesurfer.current.on("audioprocess", () => {
      setCurrentTime(wavesurfer.current.getCurrentTime());
    });

    return () => {
      wavesurfer.current.destroy();
    };
  }, [audioUrl]);

  useEffect(() => {
    // تغییر سرعت پخش موزیک بر اساس تنظیم کاربر
    if (wavesurfer.current) {
      wavesurfer.current.setPlaybackRate(playbackRate);
    }
  }, [playbackRate]);

  const togglePlayPause = () => {
    if (isPlaying) {
      wavesurfer.current.pause();
    } else {
      wavesurfer.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const stopPlayback = () => {
    wavesurfer.current.stop();
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };
  const dark = useSelector((state) => state.darkMood);
  return (
    <div
      style={{ background: dark.bgHigh, color: dark.textHigh }}
      className="flex items-center max-md:flex-col max-md:gap-y-4 space-x-4 p-4 max-md:p-0 rounded-lg shadow-md"
    >
      {/* دکمه پخش و توقف */}
      <div className="flex space-x-2">
        <Button
          onClick={togglePlayPause}
          className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 focus:outline-none"
        >
          {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
        </Button>
        <Button
          onClick={stopPlayback}
          className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none"
        >
          <FaStop size={20} />
        </Button>
      </div>

      {/* ناحیه موج صوتی */}
      <div
        ref={waveformRef}
        className="flex-1 max-md:w-full"
        style={{ background: dark.bgHigh, color: dark.textHigh }}
      ></div>

      {/* تنظیم سرعت پخش */}
      <div className="flex items-center space-x-2 text-sm text-gray-400">
        <span>سرعت پخش</span>
        <Select
          id="speed"
          value={playbackRate}
          onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
          className="w-[120px] max-md:w-[60%]"
        >
          <SelectItem key="0.5">0.5x</SelectItem>
          <SelectItem key="0.75">0.75x</SelectItem>
          <SelectItem key="1">1x</SelectItem>
          <SelectItem key="1.25">1.25x</SelectItem>
          <SelectItem key="1.5">1.5x</SelectItem>
          <SelectItem key="2">2x</SelectItem>
        </Select>
      </div>

      {/* نمایش زمان فعلی و مدت زمان کل */}
      <div className="text-gray-400 text-sm">
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>
    </div>
  );
};

export default MusicPlayer;
