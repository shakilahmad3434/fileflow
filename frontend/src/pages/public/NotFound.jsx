import { FileQuestion, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

const NotFound = () => {
  // Animation state for the icon
  const [isAnimating, setIsAnimating] = useState(false);
  
  const triggerAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-yellow-100">
      
      {/* Main content */}
      <div className="z-10 flex flex-col items-center text-center px-6 py-16">
        <div 
          className={`mb-8 text-indigo-800 ${isAnimating ? 'animate-bounce' : ''}`}
          onClick={triggerAnimation}
        >
          <FileQuestion size={120} strokeWidth={1.5} />
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-6">
          404 - Page Not Found
        </h1>
        
        <p className="text-xl mb-12 max-w-lg text-gray-800">
          The file you're looking for seems to be missing from our platform.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="/" className="bg-gray-900 text-white py-3 px-8 rounded-full font-medium inline-flex items-center justify-center">
            <ArrowLeft className="mr-2" size={20} />
            Back to Homepage
          </a>
          
          <a href="/contact" className="bg-indigo-700 text-white py-3 px-8 rounded-full font-medium">
            Contact Support
          </a>
        </div>

        <div className="mt-12 p-6 bg-yellow-200 rounded-lg max-w-md shadow-lg">
          <h3 className="font-bold text-lg mb-2">Looking for something?</h3>
          <p className="mb-4">Try exploring our features or search for what you need</p>
          <a href="/features" className="text-indigo-700 font-medium hover:underline">
            Explore Features →
          </a>
        </div>
      </div>
    </div>
  );
}

export default NotFound