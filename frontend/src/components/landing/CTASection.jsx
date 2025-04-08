import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <div className="bg-yellow-100 py-12 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto py-24 rounded-xl text-center bg-[#070528] text-white">
        <h2 className="text-4xl font-bold mb-4">
        Ready to streamline your file management?
        </h2>
        <p className="text-lg text-gray-300 mb-8">
        Join thousands of users who have simplified their workflow with FileFlow's powerful tools.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="#"
            className="bg-white text-black text-lg font-semibold px-6 py-3 rounded-xl hover:bg-gray-200 hover:scale-105 transition duration-300"
          >
            View Plans
          </Link>
          <Link
            to="/signup"
            className="border-2 border-white text-white text-lg font-semibold px-6 py-3 rounded-xl hover:bg-white hover:text-black transition duration-300"
          >
            Start Free Trial
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
