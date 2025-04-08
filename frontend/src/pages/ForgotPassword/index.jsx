import React, { useState } from 'react';
import { Mail, ArrowLeft, Loader2 } from 'lucide-react';

const index = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('Forgot password email:', email);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMessage('If an account with this email exists, we have sent a password reset link.');
      setError('');
      setEmail('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setMessage('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 shadow-2xl rounded-3xl overflow-hidden bg-white">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          Forgot Password
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Enter your email to receive a password reset link
        </p>

        {message && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
            <p className="text-green-700 text-sm">{message}</p>
          </div>
        )}
        
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* email address  */}
          <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="text-gray-600" size={20} />
              </div>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full inset-y-0 pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition" 
                placeholder="Enter your email" 
                required 
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#070528] text-white font-medium py-3 rounded-xl hover:scale-105 transition duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              'Send Reset Link'
            )}
          </button>

          <div className="text-center">
            <a 
              href="/login" 
              className="inline-flex items-center text-amber-500 hover:text-amber-800 font-medium transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Sign In
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default index;