import React from "react";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const StoryPage: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Full-screen background image */}
            <div className="absolute inset-0 w-full h-full z-0">
                <img
                    src="/story-select.png"
                    alt="Story Selection Background"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="relative z-10 w-full h-full flex flex-col">
                <div className="container mx-auto py-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-white">
                        Stories
                    </h1>
                </div>

                <div className="flex-1 flex items-center justify-center" style={{ position: 'relative' }}>
                    {/* Select-video GIF positioned in the center between the two screens */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-20"
                    >
                        <img
                            src="/select-video.gif"
                            alt="Select Video"
                            className="w-60 h-auto object-contain"
                            style={{ 
                                filter: 'drop-shadow(0 0 15px rgba(0,150,255,0.5))',
                                cursor: 'pointer'
                            }}
                            onClick={() => navigate("/video")}
                        />
                    </motion.div>

                    <PrimaryButton   
                        onClick={() => navigate("/video")} 
                        variant="cta"
                        rotate
                        style={{
                            position: 'absolute',
                            right: '20px',
                            bottom: '40px',
                            padding: '12px 24px',
                            fontSize: '20px'
                        }}
                    >
                        Next -&gt;
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default StoryPage;