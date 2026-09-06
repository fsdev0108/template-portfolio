import './fonts.css';
import asset0 from "./assets/lp-08-hero.png";
import asset1 from "./assets/lp-08-texture.png";

import React from 'react';
import { ArrowRight, Leaf, Droplets, Recycle, Menu, Search, ShoppingBag } from 'lucide-react';

export const Lp08 = () => {
  return (
    <div 
      style={{ width: "100%", height: "100%" }} 
      className="overflow-hidden bg-[#F6F5F2] relative text-[#2C3B29] font-sans flex flex-col"
    >
      {/* Navigation */}
      <nav className="w-full flex items-center justify-between px-12 py-8 absolute top-0 left-0 z-20">
        <div className="flex items-center gap-12">
          <h1 className="text-3xl font-['Playfair_Display'] font-bold tracking-widest uppercase">
            Verde
          </h1>
          <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
            <a href="#" className="hover:text-[#4A5E44] transition-colors">Shop</a>
            <a href="#" className="hover:text-[#4A5E44] transition-colors">Collections</a>
            <a href="#" className="hover:text-[#4A5E44] transition-colors">Our Story</a>
            <a href="#" className="hover:text-[#4A5E44] transition-colors">Sustainability</a>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="p-2 hover:bg-[#EAE8E3] rounded-full transition-colors">
            <Search size={20} strokeWidth={1.5} />
          </button>
          <button className="p-2 hover:bg-[#EAE8E3] rounded-full transition-colors relative">
            <ShoppingBag size={20} strokeWidth={1.5} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#8C9C84] rounded-full"></span>
          </button>
          <button className="p-2 hover:bg-[#EAE8E3] rounded-full transition-colors md:hidden">
            <Menu size={20} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex w-full h-full pt-28">
        {/* Left Column - Text */}
        <div className="w-[50%] h-full flex flex-col justify-center px-16 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#EAE8E3] rounded-full w-fit mb-8">
            <Leaf size={14} className="text-[#4A5E44]" />
            <span className="text-xs font-semibold tracking-wider text-[#4A5E44] uppercase">100% Recycled Materials</span>
          </div>
          
          <h2 className="text-7xl font-['Playfair_Display'] leading-[1.1] mb-8">
            Earth in <br />
            <span className="text-[#6B7A64]">every thread.</span>
          </h2>
          
          <p className="text-lg text-[#4A5E44] leading-relaxed mb-12 max-w-md">
            Discover our new collection crafted entirely from post-consumer textiles. 
            Uncompromising style, zero environmental compromise. Wear the change.
          </p>
          
          <div className="flex items-center gap-6 mb-20">
            <button className="bg-[#2C3B29] text-white px-8 py-4 rounded-full font-medium tracking-wide flex items-center gap-3 hover:bg-[#1A2318] transition-all hover:pr-6 group">
              Explore Collection
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a href="#" className="font-medium tracking-wide hover:text-[#6B7A64] transition-colors underline underline-offset-4 decoration-[#8C9C84]">
              View Lookbook
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 border-t border-[#EAE8E3] pt-8">
            <div>
              <div className="flex items-center gap-2 mb-2 text-[#4A5E44]">
                <Droplets size={18} strokeWidth={1.5} />
                <span className="font-semibold text-sm">Water Saved</span>
              </div>
              <p className="text-2xl font-['Playfair_Display']">1.2M+ Liters</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2 text-[#4A5E44]">
                <Recycle size={18} strokeWidth={1.5} />
                <span className="font-semibold text-sm">Textiles Reused</span>
              </div>
              <p className="text-2xl font-['Playfair_Display']">50,000+ kg</p>
            </div>
          </div>
        </div>

        {/* Right Column - Images */}
        <div className="w-[50%] h-full relative">
          <div className="absolute top-12 right-12 bottom-12 left-0">
            {/* Main Hero Image */}
            <div className="w-full h-full rounded-[2rem] overflow-hidden shadow-2xl relative">
              <img 
                src={asset0} 
                alt="Model wearing sustainable clothing in nature" 
                className="w-full h-full object-cover object-center"
              />
              
              {/* Overlay elements */}
              <div className="absolute top-8 left-8 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
                <span className="text-xs font-bold tracking-wider uppercase">New Arrival</span>
              </div>
            </div>

            {/* Floating Texture Image */}
            <div className="absolute -left-16 bottom-24 w-64 h-40 rounded-2xl overflow-hidden shadow-xl border-4 border-[#F6F5F2]">
              <img 
                src={asset1} 
                alt="Close up of woven recycled fabric" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <p className="absolute bottom-3 left-4 text-white text-xs font-semibold tracking-wider">
                RAW ORGANIC FIBER
              </p>
            </div>
            
            {/* Decorative Element */}
            <div className="absolute -right-8 top-32 w-32 h-32 rounded-full border border-[#8C9C84] flex items-center justify-center -rotate-12 mix-blend-multiply opacity-60">
              <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow" style={{ animationDuration: '20s' }}>
                <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                <text className="text-[10px] font-bold tracking-[0.2em] uppercase fill-[#2C3B29]">
                  <textPath href="#circlePath">Sustainable • Ethical • Mindful • </textPath>
                </text>
              </svg>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export { Lp08 as "lp-08" };

