import img_balloons from './images/balloons.png';
import img_hat from './images/hat.png';
import img_cake from './images/cake.png';
import React from 'react';

export default function KidsInvite() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-[#FDFBF7] flex items-center justify-center p-6">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Pacifico&family=Zilla+Slab:wght@700&display=swap');
      `}</style>
      
      {/* Frame */}
      <div className="w-full h-full border-[12px] border-[#239C9F] rounded-3xl relative overflow-hidden z-10 flex flex-col items-center">
        
        {/* Background Noise Texture */}
        <div 
          className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-30 z-0"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'
          }}
        />

        {/* Confetti & Stars Background SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 800 800">
          <circle cx="80" cy="120" r="8" fill="#ef4b36" />
          <circle cx="720" cy="180" r="12" fill="#ffc107" />
          <circle cx="150" cy="620" r="7" fill="#239c9f" />
          <circle cx="680" cy="580" r="9" fill="#ef4b36" />
          <circle cx="380" cy="60" r="8" fill="#ffc107" />
          <circle cx="50" cy="400" r="10" fill="#239c9f" />
          <circle cx="750" cy="420" r="6" fill="#ef4b36" />
          
          {/* Stars */}
          <path d="M 140 380 L 144 392 L 156 392 L 147 400 L 150 412 L 140 404 L 130 412 L 133 400 L 124 392 L 136 392 Z" fill="#ffc107" />
          <path d="M 640 340 L 643 348 L 652 348 L 645 354 L 647 362 L 640 358 L 633 362 L 635 354 L 628 348 L 637 348 Z" fill="#239c9f" />
          <path d="M 140 660 L 144 672 L 156 672 L 147 680 L 150 692 L 140 684 L 130 692 L 133 680 L 124 672 L 136 672 Z" fill="#ef4b36" />
          <path d="M 520 100 L 525 115 L 540 115 L 528 125 L 532 140 L 520 130 L 508 140 L 512 125 L 500 115 L 515 115 Z" fill="#ef4b36" />
        </svg>

        {/* Spot Illustrations */}
        <div className="absolute top-4 left-4 w-40 h-40 transform -rotate-12 z-10 drop-shadow-md">
          <img src={img_balloons} alt="" className="w-full h-full object-contain pointer-events-none" />
        </div>
        
        {/* HOORAY Pennant */}
        <div className="absolute top-10 right-6 transform rotate-[12deg] z-10 drop-shadow-sm">
          <svg width="150" height="90" viewBox="0 0 150 90">
            <path d="M 0 10 L 150 0 L 130 45 L 150 90 L 0 80 Z" fill="#ffc107" stroke="#239c9f" strokeWidth="3" strokeLinejoin="round" />
            <path d="M 6 16 L 140 8 L 122 45 L 140 82 L 6 74 Z" fill="none" stroke="#ef4b36" strokeWidth="2" strokeDasharray="5 3" />
            <text x="65" y="52" fontFamily="Bangers" fontSize="28" fill="#ef4b36" transform="rotate(-4 65 52)" textAnchor="middle">HOORAY!</text>
          </svg>
        </div>

        <div className="absolute bottom-28 left-6 w-32 h-32 transform -rotate-12 z-10 drop-shadow-md">
          <img src={img_hat} alt="" className="w-full h-full object-contain pointer-events-none" />
        </div>

        <div className="absolute bottom-8 right-6 w-32 h-32 transform rotate-12 z-0 drop-shadow-md">
          <img src={img_cake} alt="" className="w-full h-full object-contain pointer-events-none" />
        </div>

        {/* Main Content Area */}
        <div className="relative flex-1 w-full flex flex-col items-center justify-center mt-8 z-20 pointer-events-none">
          
          {/* Arc Text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] overflow-visible z-20">
            <svg viewBox="0 0 600 600" className="w-full h-full drop-shadow-[2px_2px_0px_#fdfbf7] overflow-visible">
              <path id="curve-top" d="M 60, 350 A 250, 250 0 0,1 540, 350" fill="transparent" />
              
              <text className="fill-[#239c9f]" style={{ fontFamily: 'Bangers, cursive', fontSize: '52px', letterSpacing: '4px' }}>
                <textPath href="#curve-top" startOffset="50%" textAnchor="middle">BIRTHDAY <tspan className="fill-[#ef4b36]">PARTY</tspan></textPath>
              </text>
            </svg>
          </div>

          {/* Central Graphics */}
          <div className="relative w-[400px] h-[350px] flex items-center justify-center -mt-8">
            
            {/* Base "6" for stroke and drop shadow */}
            <div 
              className="absolute text-[#ef4b36] leading-none text-center"
              style={{
                fontFamily: 'Bangers, cursive',
                fontSize: '360px',
                WebkitTextStroke: '8px #fdfbf7',
                textShadow: '8px 8px 0px #ffc107, 0px 0px 0px #fdfbf7',
              }}
            >
              6
            </div>
            
            {/* Halftone "6" overlay */}
            <div 
              className="absolute text-transparent leading-none text-center opacity-30 mix-blend-multiply"
              style={{
                fontFamily: 'Bangers, cursive',
                fontSize: '360px',
                backgroundImage: 'radial-gradient(circle, #239c9f 25%, transparent 30%)',
                backgroundSize: '14px 14px',
                backgroundPosition: '0 0',
                WebkitBackgroundClip: 'text',
              }}
            >
              6
            </div>

            {/* Smiley Face inserted into the loop of the 6 */}
            <div className="absolute left-[46%] top-[36%] w-14 h-14 rotate-12 drop-shadow-md z-0">
               <svg viewBox="0 0 100 100" className="w-full h-full">
                 <circle cx="50" cy="50" r="46" fill="#ffc107" stroke="#239c9f" strokeWidth="6"/>
                 <circle cx="34" cy="40" r="7" fill="#239c9f" />
                 <circle cx="66" cy="40" r="7" fill="#239c9f" />
                 <path d="M 30,60 Q 50,85 70,60" fill="transparent" stroke="#239c9f" strokeWidth="7" strokeLinecap="round" />
                 <path d="M 22,25 Q 34,20 44,28" fill="transparent" stroke="#239c9f" strokeWidth="5" strokeLinecap="round" />
                 <path d="M 56,28 Q 66,20 78,25" fill="transparent" stroke="#239c9f" strokeWidth="5" strokeLinecap="round" />
               </svg>
            </div>

            {/* Script Text */}
            <div 
              className="absolute top-[65%] left-1/2 -translate-x-1/2 w-[600px] text-center text-[#239c9f] -rotate-6 drop-shadow-[5px_5px_0_#fdfbf7] z-10"
              style={{ fontFamily: 'Pacifico, cursive', fontSize: '72px', WebkitTextStroke: '3px #fdfbf7', lineHeight: '1' }}
            >
              You're Invited!
            </div>
          </div>
        </div>

        {/* Details Block */}
        <div className="absolute bottom-8 w-full flex flex-col items-center z-30">
          <div className="w-[480px] flex flex-col items-center">
            
            <div className="flex items-center gap-4 w-full mb-3">
              <div className="h-0.5 bg-[#239c9f] flex-1"></div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffc107" stroke="#ef4b36" strokeWidth="2" className="flex-shrink-0">
                <path d="M12 2L15 9L22 10L17 15L18 22L12 18L6 22L7 15L2 10L9 9Z" />
              </svg>
              <div className="h-0.5 bg-[#239c9f] flex-1"></div>
            </div>
            
            <div className="text-[#ef4b36] tracking-[0.2em] uppercase font-bold text-center" style={{ fontFamily: 'Zilla Slab, serif', fontSize: '24px', letterSpacing: '3px' }}>
              SATURDAY AUGUST 22 &middot; 2 PM
            </div>
            
            <div className="text-[#239c9f] tracking-[0.1em] mt-1 uppercase font-bold text-center" style={{ fontFamily: 'Zilla Slab, serif', fontSize: '20px', letterSpacing: '2px' }}>
              THE GARDEN HOUSE
            </div>
            
            <div className="flex items-center gap-4 w-full mt-4">
              <div className="h-[3px] rounded-full bg-[#239c9f] flex-1"></div>
              <div className="text-[#ef4b36] px-4 -mt-2 drop-shadow-sm flex-shrink-0" style={{ fontFamily: 'Pacifico, cursive', fontSize: '38px' }}>
                RSVP
              </div>
              <div className="h-[3px] rounded-full bg-[#239c9f] flex-1"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
