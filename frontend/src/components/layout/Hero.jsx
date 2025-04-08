import { ArrowRight } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="bg-yellow-100 min-h-screen pt-16">
      <div className="container mx-auto px-6 flex flex-col items-center">
        {/* Hero Text */}
        <div className="text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-[#070528]">
          All-in-One File Management Platform
          </h1>
          <p className="text-xl md:text-2xl mb-12">
          Secure file sharing, cloud storage, image processing, document parsing, and more—all in one powerful platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">

            <Link to="/login" className="bg-[#070528] text-white text-lg font-semibold px-6 py-3 rounded-xl hover:scale-105 transition duration-300">
              Get Started Free
            </Link>

            <Link to="/try-free" className="border-2 border-amber-200 text-lg font-semibold flex items-center gap-2 px-6 py-3 rounded-xl hover:bg-amber-200 hover:text-black transition duration-300">
              Explore Features <ArrowRight />
            </Link>

          </div>
        </div>

        {/* Optional: Hero Visual Placeholder */}
        <div className="w-full max-w-6xl">
            <div className="relative bg-gray-800/10 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-white/10">
              <div className="w-full bg-gradient-to-br from-gray-800/20 to-gray-900/20 rounded-xl overflow-hidden">
              <img src="https://img.freepik.com/free-vector/user-panel-business-dashboard_23-2148359901.jpg?t=st=1744030714~exp=1744034314~hmac=8bff0fb41210a10541af9c641eaebbf937286b5b64aad7d8d7a3a198edc915e3&w=1380" alt="overflow image" />
              </div>
            </div>
          </div>
        
      </div>
    </div>
  );
};

export default Hero;