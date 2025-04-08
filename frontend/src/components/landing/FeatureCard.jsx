import React from "react";

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  className = "",
  isPro = false,
}) => {
  // Simple className merging function to replace cn
  const combineClasses = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };

  return (
    <div
      className={combineClasses(
        "bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-fade-up",
        "transition-all duration-300 hover:shadow-md hover:border-gray-200",
        className
      )}
    >
      <div className="flex justify-between items-start">
        <div className="rounded-lg bg-blue-50 text-blue-600 p-3 inline-flex">
          <Icon size={24} strokeWidth={1.5} />
        </div>
        {isPro && (
          <span className="text-xs font-medium bg-purple-500 text-white px-2 py-1 rounded-full">
            Pro
          </span>
        )}
      </div>
      <h3 className="mt-4 font-semibold text-lg text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;