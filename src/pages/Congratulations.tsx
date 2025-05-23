import React from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../components/PrimaryButton'; 
import './planet.css'; // Import the planet CSS file

const Congratulations: React.FC = () => {
  const navigate = useNavigate();

  const handleGetHelp = () => {
    navigate('/get-help');
  };

  return (
    <>
      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Sigmar+One&family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
      
      <div className="min-h-screen relative overflow-hidden" style={{
        backgroundImage: 'url(/party-back.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        {/* Help Button - Bottom Right Corner */}
        <div className="fixed bottom-20 right-10 z-50">
          <PrimaryButton onClick={handleGetHelp} variant="default">
            Need More Help?
          </PrimaryButton>
        </div>
        
        {/* Speech Bubble - Independent positioning */}
        <div className="absolute top-50 left-36 z-30">
          <div className="speech-bubble">
            🌟 You're now a Cyberbullying Hero! 🌟
          </div>
        </div>
        
        {/* Character - Independent positioning */}
        <div className="absolute top-46 left-1 z-30">
          <img 
            src="/char-congrat.gif" 
            alt="Congratulations Character" 
            className="w-120 h-auto filter drop-shadow-lg"
          />
        </div>
        
        {/* Saturn and Titan Scene */}
        <div 
          className="absolute z-20" 
          style={{ 
            top: '20%', 
            left: '40%', 
            transform: 'translateY(-50%) scale(0.8)', 
            transformOrigin: 'center' 
          }}
        >
          <div className="scene">
            {/* Titan Shadow */}
            <div className="scene_titanShadow"></div>
            
            {/* Titan Wrapper */}
            <div className="t_wrap">
              <div className="scene_titan">
                <div className="eyes">
                  <div className="eye eye--left"></div>
                  <div className="eye eye--right"></div>
                </div>
              </div>
            </div>

            {/* Saturn */}
            <div className="scene_saturn">
              {/* Saturn Shadow */}
              <div className="scene_saturn__shadow"></div>
              
              {/* Saturn Ring Shadow */}
              <div className="scene_saturn__shadowRing"></div>
              
              {/* Saturn Face */}
              <div className="scene_saturn__face">
                <div className="face_clip">
                  <div className="eye eye--left"></div>
                  <div className="eye eye--right"></div>
                  <div className="mouth"></div>
                </div>
              </div>
              
              {/* Saturn Sparks */}
              <div className="scene_saturn__sparks">
                {Array.from({ length: 20 }, (_, i) => (
                  <div key={i} className="spark"></div>
                ))}
              </div>
              
              {/* Saturn Ring */}
              <div className="scene_saturn__ring">
                <div className="small">
                  {Array.from({ length: 40 }, (_, i) => (
                    <div key={i} className="small_part"></div>
                  ))}
                </div>
                
                {Array.from({ length: 4 }, (_, layerIndex) => (
                  <div key={layerIndex} className="layer">
                    {Array.from({ length: 50 }, (_, i) => (
                      <div key={i} className="layer_part"></div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FLOATING MAGICAL PLATE - Main congratulations content */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-40 px-4">
          <div 
            className="relative"
            style={{
              animation: 'float-platform 4s ease-in-out infinite'
            }}
          >
            {/* Platform shadow */}
            <div 
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
              style={{
                width: '80%',
                height: '20px',
                background: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '50%',
                filter: 'blur(10px)',
                animation: 'shadow-pulse 4s ease-in-out infinite'
              }}
            ></div>
            
            {/* The magical plate */}
            <div 
              className="relative p-8 rounded-full"
              style={{
                background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.95), rgba(240, 248, 255, 0.98))',
                border: '4px solid rgba(0, 123, 255, 0.6)',
                boxShadow: '0 0 30px rgba(0, 123, 255, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(10px)',
                animation: 'plate-glow 2s ease-in-out infinite alternate'
              }}
            >
              {/* Sparkle effects around the plate */}
              <div className="absolute inset-0">
                {Array.from({ length: 8 }, (_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                    style={{
                      top: `${20 + Math.sin(i * Math.PI / 4) * 40}%`,
                      left: `${50 + Math.cos(i * Math.PI / 4) * 45}%`,
                      animation: `sparkle-orbit ${3 + i * 0.5}s linear infinite`,
                      animationDelay: `${i * 0.2}s`
                    }}
                  ></div>
                ))}
              </div>
              
              <h1 
                className="mb-5 text-2xl md:text-2xl font-bold text-gray-800"
                style={{
                  textShadow: '0 0 10px rgba(0, 123, 255, 0.8), 0 0 20px rgba(0, 123, 255, 0.6), 0 0 30px rgba(0, 123, 255, 0.4), 0 4px 8px rgba(0, 0, 0, 0.3)',
                  animation: 'blue-glow 2s ease-in-out infinite alternate'
                }}
              >
                🎉Congratulations!🎉
              </h1>
              <h2 
                className="text-2xl md:text-3xl font-bold mb-4 text-gray-700"
                style={{
                  textShadow: '0 0 10px rgba(0, 123, 255, 0.8), 0 0 20px rgba(0, 123, 255, 0.6), 0 0 30px rgba(0, 123, 255, 0.4), 0 4px 8px rgba(0, 0, 0, 0.3)',
                  animation: 'blue-glow 2s ease-in-out infinite alternate'
                }}
              >
                You've completed your cyberbullying journey!
              </h2>
              <p 
                className="text-lg md:text-xl mb-4 max-w-2xl leading-relaxed text-gray-700"
                style={{
                  textShadow: '0 0 10px rgba(0, 123, 255, 0.8), 0 0 20px rgba(0, 123, 255, 0.6), 0 0 30px rgba(0, 123, 255, 0.4), 0 4px 8px rgba(0, 0, 0, 0.3)',
                  animation: 'blue-glow 2s ease-in-out infinite alternate'
                }}
              >
                <strong>You should be incredibly proud of yourself!</strong>
              </p>
              <p 
                className="text-lg font-bold text-gray-800"
                style={{ 
                  animation: 'pulse 2s infinite, blue-glow 2s ease-in-out infinite alternate',
                  textShadow: '0 0 10px rgba(0, 123, 255, 0.8), 0 0 20px rgba(0, 123, 255, 0.6), 0 0 30px rgba(0, 123, 255, 0.4), 0 4px 8px rgba(0, 0, 0, 0.3)'
                }}
              >
              </p>
            </div>
          </div>
        </div>

        {/* CSS Animations - Only for the magical plate and speech bubble */}
        <style>{`
          /* Floating Magical Plate Animations */
          @keyframes float-platform {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-15px) rotate(1deg); }
            50% { transform: translateY(-10px) rotate(0deg); }
            75% { transform: translateY(-20px) rotate(-1deg); }
          }
          
          @keyframes shadow-pulse {
            0%, 100% { opacity: 0.2; transform: translateX(-50%) scale(1); }
            50% { opacity: 0.4; transform: translateX(-50%) scale(1.1); }
          }
          
          @keyframes plate-glow {
            from { box-shadow: 0 0 30px rgba(0, 123, 255, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.5); }
            to { box-shadow: 0 0 50px rgba(0, 123, 255, 0.6), inset 0 0 30px rgba(255, 255, 255, 0.8); }
          }
          
          @keyframes sparkle-orbit {
            from { transform: rotate(0deg) translateX(50px) rotate(0deg); }
            to { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
          }

          @keyframes blue-glow {
            from {
              text-shadow: 0 0 10px rgba(0, 123, 255, 0.8), 0 0 20px rgba(0, 123, 255, 0.6), 0 0 30px rgba(0, 123, 255, 0.4), 0 4px 8px rgba(0, 0, 0, 0.3);
            }
            to {
              text-shadow: 0 0 15px rgba(0, 123, 255, 1), 0 0 25px rgba(0, 123, 255, 0.8), 0 0 35px rgba(0, 123, 255, 0.6), 0 4px 8px rgba(0, 0, 0, 0.3);
            }
          }

          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }

          /* Speech Bubble Styles */
          .speech-bubble {
            position: relative;
            margin: 0.5em auto;
            padding: 1em;
            width: 14em; 
            height: 5em;
            border-radius: 0.25em;
            transform: rotate(-4deg) rotateY(15deg);
            background: #629bdd;
            font: 1em/1.3 'Century Gothic', Verdana, sans-serif;
            text-align: center;
            color: black;
            font-weight: bold;
            text-shadow: 1px 1px 2px rgba(255,255,255,0.5);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            animation: speech-float 3s ease-in-out infinite;
          }
          
          .speech-bubble:before, 
          .speech-bubble:after {
            position: absolute;
            z-index: -1;
            content: '';
          }
          
          .speech-bubble:after {
            top: 0; 
            right: 0; 
            bottom: 0; 
            left: 0;
            border-radius: inherit;
            transform: rotate(2deg) translate(0.35em, -0.15em) scale(1.02);
            background: #f4fbfe;
          }
          
          .speech-bubble:before {
            border: solid 0 transparent;
            border-right: solid 3.5em #f4fbfe;
            border-bottom: solid 0.25em #629bdd;
            bottom: 0.25em; 
            left: 1.25em;
            width: 0; 
            height: 1em;
            transform: rotate(45deg) skewX(75deg);
          }

          @keyframes speech-float {
            0%, 100% { transform: rotate(-4deg) rotateY(15deg) translateY(0px); }
            50% { transform: rotate(-4deg) rotateY(15deg) translateY(-10px); }
          }

          @media (max-width: 768px) {
            .magical-plate {
              padding: 1.5rem;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default Congratulations;