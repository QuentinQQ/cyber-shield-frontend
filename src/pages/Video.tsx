import React, { useEffect, useState } from "react";
import YouTube from 'react-youtube';
import { useNavigate, useParams } from "react-router-dom";
import { TeleportBubble } from "@/components/TeleportBubble";

interface VideoData {
    id: string;
    title: string;
    description: string;
}

const videoLibrary: Record<string, VideoData> = {
    "emma": {
        id: "qA1TJjJgdz8",
        title: "Emma's Story",
        description: "How Emma dealt with online bullying"
    },
    "elena": {
        id: "e5CDOxLD6Jc",
        title: "elena's Story",
        description: "Keeping personal information safe online"
    }
};

const VideoPage: React.FC = () => {
    const { videoId = "emma" } = useParams<{ videoId: string }>();
    const navigate = useNavigate();
    const [glowIntensity, setGlowIntensity] = useState(0.7);
    
    // Get video data from library or use default
    const videoData = videoLibrary[videoId] || videoLibrary.emma;

    // Old TV flicker effect
    useEffect(() => {
        const flickerInterval = setInterval(() => {
            // Random intensity changes to simulate old TV
            const newIntensity = 0.5 + Math.random() * 0.5; // Between 0.5 and 1.0
            setGlowIntensity(newIntensity);
        }, 120); // Flicker interval - adjust for more/less frequent changes

        return () => clearInterval(flickerInterval);
    }, []);

    // Player Configuration Options
    const opts = {
        height: '450',  // Adjusted to fit the gray screen
        width: '900',   // Adjusted to fit the gray screen
        playerVars: {
            autoplay: 0,
            controls: 1,
            rel: 0,
            modestbranding: 1,
        },
    };

    const handleTeleportBack = () => {
        navigate(-1);
    };

    const handleTeleportNext = () => {
      navigate("/scenario");
    };

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Full-screen cinema background */}
            <div className="absolute inset-0 w-full h-full z-0">
                <img
                    src="/cinema-screen.png"
                    alt="Cinema Screen Background"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="relative z-10 w-full h-full flex flex-col">
                {/* Video title overlay */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
                    <h1 className="text-white text-2xl font-bold drop-shadow-lg">{videoData.title}</h1>
                    <p className="text-blue-200 text-center drop-shadow-md">{videoData.description}</p>
                </div>
                
                <div className="flex-1 flex items-center justify-center">
                    <div className="relative w-full max-w-7xl mx-auto" style={{ height: '100%' }}>
                        {/* Video positioned to align with cinema screen - with dynamic flicker */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-[-120px]">
                            {/* Outer glow layer - bluish CRT halo */}
                            <div 
                                style={{ 
                                    position: 'absolute',
                                    background: `radial-gradient(ellipse at center, rgba(30,160,255,${glowIntensity * 0.6}) 0%, rgba(30,160,255,${glowIntensity * 0.3}) 60%, rgba(0,0,0,0) 70%)`,
                                    transform: 'scale(1.3)',
                                    filter: `blur(${30 + glowIntensity * 15}px)`,
                                    width: '1000px',
                                    height: '550px',
                                    top: '-50px',
                                    left: '-50px',
                                    zIndex: 1,
                                    transition: 'all 0.1s ease-out'
                                }}
                            ></div>
                            
                            {/* Middle glow layer - more intense and bluer */}
                            <div 
                                style={{ 
                                    position: 'absolute',
                                    background: `radial-gradient(ellipse at center, rgba(150,220,255,${glowIntensity * 0.8}) 0%, rgba(100,200,255,${glowIntensity * 0.5}) 40%, rgba(0,0,0,0) 70%)`,
                                    transform: 'scale(1.15)',
                                    filter: `blur(${15 + glowIntensity * 8}px)`,
                                    width: '960px',
                                    height: '510px',
                                    top: '-30px',
                                    left: '-30px',
                                    zIndex: 2,
                                    transition: 'all 0.1s ease-out'
                                }}
                            ></div>
                            
                            {/* Inner bright glow - closest to screen with slight color tint */}
                            <div 
                                style={{ 
                                    position: 'absolute',
                                    background: `radial-gradient(ellipse at center, rgba(255,255,255,${glowIntensity * 0.9}) 0%, rgba(180,240,255,${glowIntensity * 0.7}) 30%, rgba(0,0,0,0) 70%)`,
                                    transform: 'scale(1.07)',
                                    filter: `blur(${5 + glowIntensity * 5}px)`,
                                    width: '930px',
                                    height: '480px',
                                    top: '-15px',
                                    left: '-15px',
                                    zIndex: 3,
                                    transition: 'all 0.08s ease-out'
                                }}
                            ></div>

                            {/* Scan lines effect */}
                            <div 
                                style={{ 
                                    position: 'absolute',
                                    backgroundImage: 'linear-gradient(0deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.1) 50%, transparent 50%, transparent 100%)',
                                    backgroundSize: '4px 4px',
                                    opacity: 0.3,
                                    mixBlendMode: 'overlay',
                                    width: '900px',
                                    height: '450px',
                                    zIndex: 5,
                                    pointerEvents: 'none'
                                }}
                            ></div>
                            
                            {/* Video container with bright border */}
                            <div style={{ 
                                borderRadius: '8px', 
                                overflow: 'hidden',
                                boxShadow: `0 0 10px 3px rgba(255,255,255,${glowIntensity * 0.9}), 
                                           0 0 20px 6px rgba(100,200,255,${glowIntensity * 0.8}), 
                                           0 0 40px 12px rgba(0,150,255,${glowIntensity * 0.6})`,
                                zIndex: 4,
                                position: 'relative',
                                transition: 'all 0.08s ease-out'
                            }}>
                                <YouTube
                                    videoId={videoData.id}
                                    opts={opts}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <TeleportBubble onClick={handleTeleportBack} color="purple" position="left" text="2.Voices" />
                <TeleportBubble onClick={handleTeleportNext} color="blue" position="right" text="3.Scenario" />
            </div>
        </div>
    );
};

export default VideoPage;