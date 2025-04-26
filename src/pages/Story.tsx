import React from "react";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigate } from "react-router-dom";

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