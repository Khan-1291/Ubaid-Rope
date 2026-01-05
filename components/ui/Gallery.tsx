import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const VideoGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const videos = [
    { id: 1, src: '/images/video2.mp4', title: 'Video One' },
    { id: 2, src: '/images/video1.mp4', title: 'Video Two' },
    { id: 3, src: '/images/video3.mp4', title: 'Video Three' },
  ];

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4">
      {/* Main Feature Display */}
      <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
        {videos.map((video, index) => (
          <video
            key={video.id}
            src={video.src}
            autoPlay
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              activeIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          />
        ))}
        <div className="absolute bottom-4 left-4 z-20 text-white font-bold text-lg bg-black/40 px-3 py-1 rounded">
          {videos[activeIndex].title}
        </div>
      </div>

      {/* Thumbnails / Controls */}
      <div className="flex gap-4 mt-6">
        {videos.map((video, index) => (
          <button
            key={video.id}
            onClick={() => setActiveIndex(index)}
            className={`relative w-32 aspect-video rounded-md overflow-hidden border-2 transition-all ${
              activeIndex === index ? 'border-blue-500 scale-105' : 'border-transparent opacity-70'
            }`}
          >
            <video src={video.src} muted className="object-cover w-full h-full" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-transparent" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;