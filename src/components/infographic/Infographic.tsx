import React, { useState } from 'react';
import './styles.css';
import { generate } from './script'

const Infographic = () => {
    const [showCaptions, setShowCaptions] = useState(false);
    
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '1rem', padding: '2rem' }}>
            <h1 className="question">How many students are there in your year level at your school?</h1>
            <input className="input" type="number" id="studentCount" min="10" max="200" placeholder="e.g. 120"  />
            <button onClick={async () => {
                setShowCaptions(true);
                generate();
            }}>Show</button>

            <div style={{
                display: 'grid',
                justifyContent: 'center',
                alignContent: 'start',
                gap: '6px',
                width: '100%',
                maxWidth: '800px',
            }} id="grid"></div>
            {showCaptions && (
                <div className="hide" id="captionContainer" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: '#FFFC35', borderRadius: 16, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', padding: '0 1rem 1rem 1rem', width: '100%', maxWidth: '600px' }}>
                    <div className="caption hide" style={{ color: '#F8C128' }} id="caption1">30% of students have experienced cyberbullying.</div>
                    <div className="caption hide" style={{ color: '#8C171D' }} id="caption2">Only one in five who face cyberbullying share their pain with their parents.</div>
                    <div className="caption hide" style={{ color: '#C2E764' }} id="caption3">You don’t have to face this alone - reach out for support.</div>
                    <div className="caption hide" style={{ color: 'black' }} id="caption4">Talk to an adult, and together we can stop it!</div>
                </div>
            )}
            
            <audio id="pop" src="95265__department64__tree_pop.wav" preload="auto" />
        </div>
    )
}

export default Infographic;