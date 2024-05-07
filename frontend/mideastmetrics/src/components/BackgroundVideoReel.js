import React, { useState } from 'react';
import BackgroundVideoPlayer from 'react-background-video-player';
import video1 from '../assets/background_videos/egypt.mp4';
import video2 from '../assets/background_videos/morocco.mp4';
import video3 from '../assets/background_videos/qatar.mp4';

const backgrounds = [video1, video2, video3];

const BackgroundVideoReel = () => {
  const [currentBackground, setCurrentBackground] = useState(0);

  const handleVideoEnd = () => {
    const nextVideoIndex = (currentBackground + 1) % backgrounds.length;
    setCurrentBackground(nextVideoIndex);
  };

  return (
    <div className="fixed -z-10 w-svw h-svh bg-cover">
      <BackgroundVideoPlayer
        src={backgrounds[currentBackground]}
        disableBackgroundCover={true}
        muted
        loop={false}
        playsInline
        onEnd={handleVideoEnd}
        className="absolute bg-repeat"
      />
    </div>
  );
};

export default BackgroundVideoReel;