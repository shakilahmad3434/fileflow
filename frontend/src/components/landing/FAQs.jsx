import { useState } from 'react';

const faqsQuestion = [
  {
    question: 'What is FileFlow used for?',
    answer:
      'FileFlow is a Digital Asset Management (DAM) tool designed to help you tag, find, and share your files efficiently.',
  },
  {
    question: 'Is there a free trial available?',
    answer:
      'Yes! You can try FileFlow for free by clicking the "Try for free" button on the top right.',
  },
  {
    question: 'Can I schedule a live demo?',
    answer:
      'Absolutely! Just hit the "Schedule a demo" button to pick a time that works for you.',
  },
  {
    question: 'Which file types are supported?',
    answer:
      'FileFlow supports images, videos, documents, and various other file formats commonly used in digital workflows.',
  },
];

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="relative bg-yellow-100 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">


      <div className="max-w-4xl mx-auto relative z-10">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-black">
          Frequently Asked Questions
        </h2>

        {/* FAQ Items */}
        <div className="space-y-6">
          {faqsQuestion.map((faq, index) => (
            <div
              key={index}
              className={`group bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                activeIndex === index ? 'ring-2 ring-indigo-300' : ''
              }`}
              onClick={() => toggleFaq(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                  {faq.question}
                </h3>
                <span className="text-2xl text-indigo-500 font-bold transition-transform duration-300 group-hover:scale-110">
                  {activeIndex === index ? '−' : '+'}
                </span>
              </div>
              {activeIndex === index && (
                <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed animate-fade-in">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;