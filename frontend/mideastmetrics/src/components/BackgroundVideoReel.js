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
        <div className="fixed top-0 left-0 w-full h-full -z-20">
            <BackgroundVideoPlayer
                src={backgrounds[currentBackground]}
                disableBackgroundCover={true}
                muted
                loop={false}
                playsInline
                onEnd={handleVideoEnd}
                className="w-full h-full object-cover"
            />
        </div>
    );
};

export default BackgroundVideoReel;
