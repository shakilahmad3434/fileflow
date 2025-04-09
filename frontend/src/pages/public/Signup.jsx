import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import React, { useState } from "react";
import { useNavigate} from 'react-router-dom'
import { signup } from "../../services/authService";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true)

      const {data} = await signup(formData);
      setFormData({ fullname: "", email: "", password: "" });
      toast.success(data.message, {duration: 3000})

      setTimeout(() => {
        navigate('/login')
      }, 2000)

    } catch (err) {
      toast.error(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="bg-yellow-100 flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row shadow-2xl rounded-3xl overflow-hidden bg-white">
        {/* Left side - Hero Section */}
        <div className="lg:w-1/2 bg-gradient-to-br from-violet-600 to-indigo-800 p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-400 rounded-full opacity-20 transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-300 rounded-full opacity-20 transform -translate-x-1/3 translate-y-1/3"></div>

          {/* Logo */}
          <div className="relative z-10">
            <div className="flex items-center mb-12">
              <div className="bg-white text-indigo-600 font-bold p-2 rounded-md shadow-lg mr-2">
                F
              </div>
              <span className="text-xl font-bold text-white">FileFlow</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Start your journey today
            </h1>
            <p className="text-lg text-indigo-100 mb-8 max-w-md">
              Join thousands of professionals managing and collaborating on
              files with our powerful platform.
            </p>
          </div>

          {/* Features */}
          <div className="relative z-10 space-y-5 mt-auto">
            <div className="flex items-center bg-white bg-opacity-10 p-4 rounded-xl backdrop-blur-sm">
              <div className="rounded-full bg-indigo-500 bg-opacity-30 p-3">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  ></path>
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-gray-700 font-medium">
                  Enterprise-level security
                </h3>
                <p className="text-gray-500 text-sm">
                  Military-grade encryption for all your files
                </p>
              </div>
            </div>

            <div className="flex items-center bg-white bg-opacity-10 p-4 rounded-xl backdrop-blur-sm">
              <div className="rounded-full bg-indigo-500 bg-opacity-30 p-3">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-gray-700 font-medium">
                  Advanced collaboration
                </h3>
                <p className="text-gray-500 text-sm">
                  Work with your team in real-time
                </p>
              </div>
            </div>

            <div className="flex items-center bg-white bg-opacity-10 p-4 rounded-xl backdrop-blur-sm">
              <div className="rounded-full bg-indigo-500 bg-opacity-30 p-3">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-gray-700 font-medium">Automated backups</h3>
                <p className="text-gray-500 text-sm">
                  Never lose important work again
                </p>
              </div>
            </div>

            {/* Testimonial */}
            <div className="mt-8 bg-white bg-opacity-10 p-5 rounded-xl backdrop-blur-sm">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center">
                    <span className="text-white font-semibold">SJ</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-700 italic text-sm">
                    "FileFlow has completely transformed how our team manages
                    documents. The automated workflows have saved us countless
                    hours every week."
                  </p>
                  <p className="text-xs text-gray-500 mt-2 font-medium">
                    — Sarah Johnson, Marketing Director
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Signup Form */}
        <div className="lg:w-1/2 p-8 lg:p-12">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Create your account
              </h2>
              <p className="text-gray-500">
                Join FileFlow in just a few simple steps
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div className="space-y-2">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="fullName"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    className="block w-full inset-y-0 pl-11 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full inset-y-0 pl-11 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full inset-y-0 pl-11 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Must be at least 8 characters
                </p>
              </div>

              {/* Terms agreement */}
              <div className="flex items-start mt-6">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="agreeTerms" className="text-gray-600">
                    I agree to the{" "}
                    <a
                      href="/terms"
                      className="text-indigo-600 hover:text-indigo-500 font-medium"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="/privacy"
                      className="text-indigo-600 hover:text-indigo-500 font-medium"
                    >
                      Privacy Policy
                    </a>
                  </label>
                </div>
              </div>

              {/* Submit button */}
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full flex gap-2 items-center justify-center bg-[#070528] text-white font-medium py-3 rounded-xl hover:scale-105 transition duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-lg"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Create free acount"
                  )}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <div className="px-4 text-sm text-gray-400">or sign up with</div>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* Social signup */}
            <div className="grid grid-cols-2 gap-4">
              <button className="flex justify-center items-center py-3 px-4 border border-gray-200 rounded-xl shadow-sm bg-white hover:bg-gray-200 hover:scale-105 transition duration-300">
                <svg
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </button>
              <button className="flex justify-center items-center py-3 px-4 border border-gray-200 rounded-xl shadow-sm bg-white hover:bg-gray-200 hover:scale-105 transition duration-300">
                <svg
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="black"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.176 0-.31-.02-.465-.04-.15-.01-.278-.04-.395-.04-.414 0-.904.19-1.395.53-.565.38-1.06 1.04-1.354 1.89l-.11.24c.528-.06 1.054-.13 1.633-.13 1.232 0 2.453.62 3.22 1.14.783.52 1.35 1.19 1.698 1.85.154.34.28.79.28 1.26 0 .39-.061.93-.184 1.35-.099.41-.245.81-.416 1.19-.22.47-.55.95-.854 1.36-.32.41-.63.78-.904 1.07-.273.28-.497.49-.563.55-.066.06-.108.09-.108.09v.04c.03.04.105.11.184.18.094.09.226.21.4.36.39.32.855.81 1.201 1.48.172.33.31.73.403 1.21.09.48.14 1.03.14 1.59 0 .67-.067 1.34-.243 1.95-.137.5-.34.97-.594 1.4-.494.83-1.23 1.5-2.1 1.97-.868.49-1.884.74-2.933.74-.245 0-.498-.02-.751-.05-1.462-.18-2.563-.73-3.355-1.42-.784-.7-1.277-1.57-1.574-2.23-.058-.15-.114-.27-.14-.33-.02-.06-.03-.09-.015-.05-.06-.24-.13-.55-.181-.91-.05-.36-.086-.76-.086-1.19 0-1.17.316-2.31.935-3.15.303-.4.659-.75 1.033-1.02.373-.28.784-.51 1.174-.66.39-.16.737-.25 1.026-.31l.328-.07c.154-.03.294-.06.43-.09.066-.02.126-.03.18-.07.022-.01.039-.02.052-.04.013-.01.026-.03.026-.05 0-.02-.013-.04-.026-.05-.027-.01-.053-.03-.092-.04-.09-.03-.209-.06-.35-.09-.147-.03-.318-.06-.493-.08-.33-.04-.737-.08-1.15-.09-.455-.01-.907.05-1.33.16-.42.11-.813.27-1.14.45-.743.38-1.293.9-1.693 1.42C2.696 14.53 2.4 15.23 2.4 16c0 .82.33 1.68.913 2.37.584.69 1.38 1.22 2.28 1.55.9.32 1.9.47 2.904.55.18.01.354.02.526.02.131 0 .263.01.394.01 1.356 0 2.694-.17 3.842-.68 1.15-.5 2.113-1.35 2.657-2.76.183-.46.303-.95.356-1.42.054-.48.043-.94-.013-1.35-.056-.41-.167-.76-.33-1.04-.165-.29-.388-.51-.603-.7-.217-.18-.428-.33-.601-.42-.2-.11-.36-.17-.468-.21-.107-.04-.168-.05-.168-.05.054-.02.132-.05.24-.09.106-.04.24-.09.396-.16.778-.33 1.56-.8 2.126-1.54.564-.73.822-1.66.822-2.73 0-1.72-.66-2.94-1.535-3.72-.845-.76-1.844-1.13-2.76-1.32-.114-.02-.224-.04-.335-.04-.11-.01-.212-.01-.31-.01zM13.55 11.57c-.067-.32-.192-.61-.35-.87-.367-.63-.948-1.07-1.532-1.4-.584-.32-1.2-.58-1.75-.58h-.368c-.152 0-.31.01-.465.04-.157.02-.311.06-.468.12-.103.04-.202.11-.285.15-.13.08-.233.16-.364.27-.13.11-.254.24-.35.34l-.045.05c-.434.51-.622 1.11-.622 1.76 0 .52.123 1.06.356 1.51.232.45.554.81.902 1.09.348.27.72.49 1.1.62.38.14.76.21 1.1.26l.31.04c.16.02.31.03.43.03h.29c.38 0 .68-.04.91-.09.22-.05.36-.12.42-.16.05-.04.03-.05-.01-.04-.03.01-.12.05-.24.06-.13.01-.3.01-.51-.01-.38-.02-.84-.13-1.23-.34-.39-.21-.71-.5-.93-.89-.07-.14-.12-.29-.15-.45-.03-.17-.05-.35-.02-.53.03-.19.09-.39.17-.57.16-.36.39-.65.67-.88.28-.22.59-.36.95-.45.18-.04.37-.07.58-.07h.14c.41.01.75.15 1.05.29.3.15.56.34.79.54.23.21.44.42.62.66.18.23.35.46.45.72.21.52.25 1.11.12 1.63-.13.51-.37.95-.69 1.3-.16.17-.34.31-.53.44-.19.12-.39.22-.58.29-.1.03-.19.06-.29.08-.09.02-.19.03-.27.04-.18.02-.33.01-.47 0-.14-.02-.26-.05-.36-.08-.2-.06-.31-.13-.31-.13s.07.08.22.21c.08.06.17.13.29.2.12.07.26.14.43.2.32.12.71.2 1.14.2.74 0 1.63-.34 2.3-1.01.32-.32.58-.69.77-1.08.19-.4.3-.81.33-1.22.03-.41-.01-.82-.09-1.21z" />
                </svg>
                Apple
              </button>
            </div>

            {/* Sign in link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-indigo-600 font-medium hover:text-indigo-500"
                >
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Signup;
