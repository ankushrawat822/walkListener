import React, { useRef, useState } from 'react'
import { FaPause, FaVolumeUp, FaVolumeMute, FaVolumeDown } from "react-icons/fa";
import audio from './assets/music.mp3'

const Player = () => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1); // Volume ranges from 0 to 1
    const [isMuted, setIsMuted] = useState(false);

    // Format time to MM:SS
    const formatTime = (timeInSeconds) => {
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = Math.floor(timeInSeconds % 60);
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };
  
    const togglePlay = () => {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    };

    // Volume control functions
    const decreaseVolume = () => {
      if (audioRef.current) {
        const newVolume = Math.max(0, volume - 0.1);
        setVolume(newVolume);
        audioRef.current.volume = newVolume;
        setIsMuted(newVolume === 0);
      }
    };

    const increaseVolume = () => {
      if (audioRef.current) {
        const newVolume = Math.min(1, volume + 0.1);
        setVolume(newVolume);
        audioRef.current.volume = newVolume;
        setIsMuted(false);
      }
    };

    const toggleMute = () => {
      if (audioRef.current) {
        if (isMuted) {
          // Unmute and restore previous volume
          audioRef.current.volume = volume;
          setIsMuted(false);
        } else {
          // Mute
          audioRef.current.volume = 0;
          setIsMuted(true);
        }
      }
    };
  
    // Update progress and current time
    const handleTimeUpdate = () => {
      if (audioRef.current) {
        const progressPercent = 
          (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(progressPercent);
        setCurrentTime(audioRef.current.currentTime);
      }
    };
  
    // Set duration when metadata is loaded
    const handleLoadedMetadata = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration);
      }
    };
  
    // Handle progress bar click to seek
    const handleProgressBarClick = (e) => {
      const progressBar = e.currentTarget;
      const clickPosition = e.nativeEvent.offsetX;
      const progressBarWidth = progressBar.clientWidth;
      const clickPositionPercent = (clickPosition / progressBarWidth) * 100;
      
      if (audioRef.current) {
        const newTime = (clickPositionPercent / 100) * audioRef.current.duration;
        audioRef.current.currentTime = newTime;
        setProgress(clickPositionPercent);
      }
    };

    // Determine volume icon based on current volume state
    const VolumeIcon = () => {
      if (isMuted) return <FaVolumeMute />;
      if (volume < 0.3) return <FaVolumeMute />;
      if (volume < 0.6) return <FaVolumeDown />;
      return <FaVolumeUp />;
    };

    return (
    <>
      <audio 
        ref={audioRef}
        src={audio}
        onEnded={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      <div className="bg-gray-100 p-4 flex justify-center items-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md w-80">
          {/* Album Cover */}
          <img src="https://picsum.photos/200" alt="idk - Highvyn, Taylor Shin" className="w-64 h-64 mx-auto rounded-lg mb-4 shadow-lg shadow-teal-50"/>
          
          {/* Song Title */}
          <h2 className="text-xl font-semibold text-center">Old School Beat</h2>
          
          {/* Artist Name */}
          <p className="text-gray-600 text-sm text-center">Highvyn, Taylor Shin</p>
          
          {/* Music Controls */}
          <div className="mt-6 flex justify-center items-center">
            {/* Decrease Volume */}
            <button 
              onClick={decreaseVolume}
              className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
            >
              <svg width="64px" height="64px" viewBox="0 0 24 24" className="w-4 h-4 text-gray-600" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)">
                <path d="M16.6598 14.6474C18.4467 13.4935 18.4467 10.5065 16.6598 9.35258L5.87083 2.38548C4.13419 1.26402 2 2.72368 2 5.0329V18.9671C2 21.2763 4.13419 22.736 5.87083 21.6145L16.6598 14.6474Z" fill="#000000"></path>
                <path d="M22.75 5C22.75 4.58579 22.4142 4.25 22 4.25C21.5858 4.25 21.25 4.58579 21.25 5V19C21.25 19.4142 21.5858 19.75 22 19.75C22.4142 19.75 22.75 19.4142 22.75 19V5Z" fill="#000000"></path>
              </svg>
            </button>
            
            {/* Play/Pause Button */}
            <button 
              onClick={togglePlay}
              className="p-4 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none mx-4"
            >
              <svg width="64px" height="64px" viewBox="0 0 24 24" className="w-6 h-6 text-gray-600" fill="none" xmlns="http://www.w3.org/2000/svg">
                {isPlaying ? (
                  <FaPause />
                ) : (
                  <path d="M16.6598 14.6474C18.4467 13.4935 18.4467 10.5065 16.6598 9.35258L5.87083 2.38548C4.13419 1.26402 2 2.72368 2 5.0329V18.9671C2 21.2763 4.13419 22.736 5.87083 21.6145L16.6598 14.6474Z" fill="#000000"/>
                )}
              </svg>
            </button>

            {/* Increase Volume */}
            <button 
              onClick={increaseVolume}
              className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
            >
              <svg width="64px" height="64px" viewBox="0 0 24 24" className="w-4 h-4 text-gray-600" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.6598 14.6474C18.4467 13.4935 18.4467 10.5065 16.6598 9.35258L5.87083 2.38548C4.13419 1.26402 2 2.72368 2 5.0329V18.9671C2 21.2763 4.13419 22.736 5.87083 21.6145L16.6598 14.6474Z" fill="#000000"></path>
                <path d="M22.75 5C22.75 4.58579 22.4142 4.25 22 4.25C21.5858 4.25 21.25 4.58579 21.25 5V19C21.25 19.4142 21.5858 19.75 22 19.75C22.4142 19.75 22.75 19.4142 22.75 19V5Z" fill="#000000"></path>
              </svg>
            </button>
          </div>

          {/* Volume Indicator */}
          <div className="mt-4 flex justify-center items-center">
            <button 
              onClick={toggleMute}
              className="mr-2 text-gray-600 hover:text-gray-800"
            >
              <VolumeIcon />
            </button>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-teal-500 h-2 rounded-full" 
                style={{width: `${volume * 100}%`}}
              ></div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div 
            className="mt-6 bg-gray-200 h-2 rounded-full cursor-pointer"
            onClick={handleProgressBarClick}
          >
            <div 
              className="bg-teal-500 h-2 rounded-full" 
              style={{width: `${progress}%`}}   
            ></div>
          </div>
          
          {/* Time Information */}
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Player