import React, { useState } from 'react';
import PrimaryButton from "@/components/PrimaryButton";
import SectionWrapper from "@/components/SectionWrapper";
import angryImg from "@/assets/welcomePage/hero-angry.svg";
import happyImg from "@/assets/welcomePage/hero-happy.svg";
import logoImg from "@/assets/logo.svg";
import playgameImg from "@/assets/playgame.png";

const PlayGameSection: React.FC = () => {
    const images = [
        { id: 0, url: playgameImg, alt: 'default image' },
        { id: 1, url: angryImg, alt: 'image 1' },
        { id: 2, url: happyImg, alt: 'image 2' },
        { id: 3, url: logoImg, alt: 'image 3' }
    ];
    const [currentImage, setCurrentImage] = useState(images[0]);
    return (
        <SectionWrapper id="demo" withGrid headerHeight={80}>
            <div className="flex items-center flex-row justify-center">
                <div className="flex flex-col">
                    <PrimaryButton className="mb-[10px]"
                        onClick={() => setCurrentImage(images[1])}>
                        Option 1
                    </PrimaryButton>
                    <PrimaryButton  className="mb-[10px]"
                        onClick={() => setCurrentImage(images[2])}>
                        Option 2
                    </PrimaryButton>
                    <PrimaryButton  className="mb-[10px]"
                        onClick={() => setCurrentImage(images[3])}>
                        Option 3
                    </PrimaryButton>
                </div>


                <div className="image-container">
                    < img
                        src={currentImage.url}
                        alt={currentImage.alt}
                        style={{ maxWidth: '100%', height: 'auto' }}
                    />
                </div>
            </div>
        </SectionWrapper>
    );
};

export default PlayGameSection;