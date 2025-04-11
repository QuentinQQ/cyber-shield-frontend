import React from "react";
import PrimaryButton from "../components/PrimaryButton";
import PageWrapper from "../components/PageWrapper";
import friendlyOnesSitting2 from "@/assets/storyPage/friendlyOnesSitting2.png";
import YouTube from 'react-youtube';

const VideoPage: React.FC = () => {

    const videoId = 'qA1TJjJgdz8';

    // 播放器配置选项
    const opts = {
        height: '700',
        width: '1100',
        playerVars: {
            autoplay: 0,
            controls: 1,
            rel: 0,
            modestbranding: 1,
        },
    };

    return (
        <PageWrapper className="min-h-screen bg-gradient-to-b from-[#4DC0BE] to-[#23A2DA] text-white">
            <div className="container mx-auto py-10">
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
                    "Remember, Words Can Wound"
                </h1>
            </div>

            <div className="flex items-center flex-row justify-start">

                <img className="mt-[200px]"
                    src={friendlyOnesSitting2}
                    alt="friendly Ones Sitting image"
                    style={{ width: '30%', height: 'auto' }}
                />

                <div className="flex items-center flex-col justify-center">
                    <div className="youtube-container">
                        <YouTube
                            videoId={videoId}
                            opts={opts}
                        />
                    </div>
                    <p style={{ color : 'black', fontSize: '20px'}}>This is Emma’s story</p>
                    <p style={{ color : 'black', fontSize: '20px'}}>Emma was bullied by her best friend, “cyber bullying is hard to deal with by yourself”, let’s learn how Emma asked for help to end the cyber bully.</p>
                </div>
            </div>

        </PageWrapper >
    );
};

export default VideoPage;