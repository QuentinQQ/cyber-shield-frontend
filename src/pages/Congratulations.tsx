import React from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../components/PrimaryButton'; 

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
                className="mb-5 text-4xl md:text-6xl font-bold text-gray-800"
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

        {/* CSS Animations - Streamlined */}
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

          /* Saturn & Titan Scene Styles */
          .scene {
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
            top: 50%;
            transform: translateY(-50%);
            perspective: 2600px;
            width: 500px;
            height: 500px;
          }

          .scene_titanShadow {
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
            top: 50%;
            transform: translateY(-50%);
            width: 84px;
            height: 21px;
            border-radius: 100%;
            transform-style: preserve-3d;
            box-shadow: 0px 200px 20px rgba(41, 24, 99, 0.5);
            animation: titan 6s infinite ease;
            bottom: 400px;
          }

          .t_wrap {
            animation: titanWrap 6s infinite ease;
          }

          .scene_titan {
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
            top: 50%;
            transform: translateY(-50%);
            width: 84px;
            height: 84px;
            border-radius: 42px;
            background: #a5c6ff;
            transform-style: preserve-3d;
            box-shadow: 0px 0px 0px 4px rgba(189, 236, 169, 0.39) inset, -30px -20px 50px #637bff inset;
            animation: titan 6s infinite ease;
            top: -220px;
          }

          .scene_titan .eyes {
            animation: titan_eye 6s infinite ease;
          }

          .scene_titan .eye {
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
            top: 50%;
            transform: translateY(-50%);
            width: 6px;
            height: 6px;
            background: #53487a;
            border-radius: 10px;
            bottom: 34px;
            animation: blink 1s 0s infinite linear;
          }

          .scene_titan .eye.eye--left {
            left: -34px;
            bottom: -120px;
          }

          .scene_titan .eye.eye--right {
            left: 34px;
            bottom: -120px;
          }

          .scene_saturn {
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
            top: 50%;
            transform: translateY(-50%);
            width: 152px;
            height: 152px;
            border-radius: 76px;
            background: #FFFFFF;
            transform-style: preserve-3d;
            box-shadow: 0px 0px 0px 4px rgba(255, 255, 255, 0.8) inset, -30px -20px 50px #a5adff inset;
            animation: saturn 0.6s infinite linear;
          }

          .scene_saturn__shadow {
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
            top: 50%;
            transform: translateY(-50%);
            width: 152px;
            height: 38px;
            border-radius: 100%;
            box-shadow: 0 150px 40px rgba(41, 24, 99, 0.6);
          }

          .scene_saturn__shadowRing {
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
            top: 50%;
            transform: translateY(-50%);
            width: 330px;
            height: 19px;
            border-radius: 100%;
            box-shadow: 0 150px 40px rgba(41, 24, 99, 0.4);
            left: -100px;
            animation: ringShadow 0.6s infinite linear;
          }

          .scene_saturn__face {
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
            top: 50%;
            transform: translateY(-50%);
            width: 152px;
            height: 152px;
            border-radius: 76px;
            overflow: hidden;
          }

          .face_clip {
            position: relative;
            top: 95px;
            left: 14px;
            transform: rotate(8deg);
            animation: face 3.6s infinite linear, faceTilt 0.9s infinite linear;
          }

          .face_clip .eye {
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
            top: 50%;
            transform: translateY(-50%);
            width: 6px;
            height: 6px;
            background: #53487a;
            border-radius: 10px;
            bottom: 34px;
            animation: blink 1s 0s infinite linear;
          }

          .face_clip .eye.eye--left {
            left: -80px;
          }

          .face_clip .eye.eye--right {
            left: 80px;
          }

          .mouth {
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
            top: 50%;
            transform: translateY(-50%);
            width: 15px;
            height: 10px;
            top: -5px;
            background: #ea0e61;
            border-bottom-right-radius: 10px;
            border-bottom-left-radius: 2px;
            box-shadow: 0 6px 0px #53487a inset;
          }

          .scene_saturn__sparks {
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
            top: 50%;
            transform: translateY(-50%);
            transform: translateZ(-100px);
          }

          .spark {
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
            top: 50%;
            transform: translateY(-50%);
            width: 20px;
            height: 20px;
            border-radius: 10px;
            background: #fafa46;
          }

          .spark:nth-of-type(odd) {
            background: red;
          }

          .scene_saturn__ring {
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
            top: 50%;
            transform: translateY(-50%);
            transform: rotateX(84deg) rotateY(8deg);
            transform-origin: 50% 165px;
            animation: ring 0.6s infinite linear;
            top: -80px;
          }

          .small {
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
            top: 50%;
            transform: translateY(-50%);
            animation: spin 0.6s infinite linear;
            transform-origin: 50% 195px;
            top: -50px;
          }

          .small_part {
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
            top: 50%;
            transform: translateY(-50%);
            width: 30px;
            background:rgb(244, 27, 70);
            transform-origin: 50% 195px;
          }

          .layer {
            position: relative;
          }

          .layer:nth-of-type(2) {
            top: 6px;
          }

          .layer:nth-of-type(3) {
            top: -6px;
          }

          .layer:nth-of-type(4) {
            top: -18px;
          }

          .layer:nth-of-type(1) .layer_part {
            background: #2deaed;
          }

          .layer:nth-of-type(2) .layer_part {
            background: #faf623;
          }

          .layer_part {
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
            top: 50%;
            transform: translateY(-50%);
            width: 20px;
            height: 50px;
            background: #21ced2;
            transform-origin: 50% 165px;
          }

          /* Generate rotation transforms for small parts */
          ${Array.from({ length: 40 }, (_, i) => `
            .small_part:nth-of-type(${i + 1}) {
              transform: translateY(-50%) rotate(${2 * i}deg);
              height: ${10 - (i / 4)}px;
            }
          `).join('')}

          /* Generate rotation transforms for ring parts */
          ${Array.from({ length: 50 }, (_, i) => `
            .layer_part:nth-of-type(${i + 1}) {
              transform: translateY(-50%) rotate(${(360 / 50) * i}deg);
            }
          `).join('')}

          /* Generate spark animations */
          ${Array.from({ length: 20 }, (_, i) => `
            @keyframes spark--${i + 1} {
              from {
                transform: scale(1);
              }
              to {
                left: ${Math.random() * 400 - 200}px;
                top: ${Math.random() * 400 - 200}px;
                transform: scale(0);
              }
            }
            
            .spark:nth-of-type(${i + 1}) {
              animation: spark--${i + 1} 1s ${(i + 1) / 10}s infinite;
            }
          `).join('')}

          /* Saturn & Titan Keyframes */
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes saturn {
            0% { left: 0; }
            25% { left: -40px; }
            50% { left: 0px; }
            75% { left: 40px; }
          }

          @keyframes ring {
            0% {
              left: 0;
              transform: rotateX(84deg) rotateY(8deg);
            }
            25% { left: 70px; }
            50% {
              left: 0px;
              transform: rotateX(80deg) rotateY(-8deg);
            }
            75% { left: -70px; }
            100% {
              left: 0px;
              transform: rotateX(84deg) rotateY(8deg);
            }
          }

          @keyframes ringShadow {
            0% { left: -100px; }
            25% { left: -40px; }
            50% { left: -100px; }
            75% { left: -140px; }
            100% { left: -100px; }
          }

          @keyframes face {
            from { left: -200px; }
            to { left: 200px; }
          }

          @keyframes faceTilt {
            0% { transform: rotate(12deg); }
            50% { transform: rotate(-12deg); }
            100% { transform: rotate(12deg); }
          }

          @keyframes blink {
            0% { height: 6px; }
            40% { height: 6px; }
            50% { height: 0px; }
            60% { height: 6px; }
            100% { height: 6px; }
          }

          @keyframes titanWrap {
            0% { transform: translateY(370px); }
            33% { transform: translateY(370px); }
            38% { transform: translateY(400px); }
            43% { transform: translateY(370px); }
            73% { transform: translateY(370px); }
            78% { transform: translateY(400px); }
            83% { transform: translateY(370px); }
            100% { transform: translateY(370px); }
          }

          @keyframes titan {
            0% { left: -400px; }
            33% { left: -400px; }
            43% { left: 400px; }
            73% { left: 400px; }
            83% { left: -400px; }
            100% { left: -400px; }
          }

          @keyframes titan_eye {
            0% { transform: rotate(-10deg); }
            33% { transform: rotate(-10deg); }
            43% { transform: rotate(10deg); }
            73% { transform: rotate(10deg); }
            83% { transform: rotate(-10deg); }
            100% { transform: rotate(-10deg); }
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
            .scene {
              transform: translateY(-50%) scale(0.6);
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default Congratulations;