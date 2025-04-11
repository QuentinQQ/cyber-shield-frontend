import React from "react";
import PrimaryButton from "../components/PrimaryButton";
import PageWrapper from "../components/PageWrapper";
import friendlyOnesSitting from "@/assets/storyPage/friendlyOnesSitting.png";
import { useNavigate } from "react-router-dom";

const StoryPage: React.FC = () => {
    const navigate = useNavigate();
    return (
        <PageWrapper className="min-h-screen bg-gradient-to-b from-[#4DC0BE] to-[#23A2DA] text-white">
            <div className="container mx-auto py-10">
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
                    Stories
                </h1>
            </div>

            <div className="flex items-center justify-center" style={{ position: 'relative'}}>
                <div style={{ position: 'relative', width: '50%'}}>
                    <img src={friendlyOnesSitting}
                        alt="friendly Ones Sitting image"
                        style={{ display: 'block', width: '100%', height: 'auto' }}
                    />
                    <PrimaryButton variant="cta" style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        padding: '8px 16px',
                        fontSize:'26px'
                      
                    }}>
                        Story time!  What awesome story should we watch?
                    </PrimaryButton>
                </div>

                <PrimaryButton   onClick={() => navigate("/video")} style={{
                    position: 'absolute',
                    right: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    padding: '8px 16px'
                }}
                    rotate
                    className="bg-[#E76F50] font-semibold hover:bg-gray-200 transition pl-[50px] pr-[50px]"
                >
                    Next -&gt;
                </PrimaryButton>
            </div>

        </PageWrapper >
    );
};

export default StoryPage;