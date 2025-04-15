import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQAccordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Toggle FAQ item
  const toggleItem = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="mb-4"
        >
          <button
            onClick={() => toggleItem(index)}
            className={`w-full text-left bg-dark-light p-5 rounded-xl border ${
              activeIndex === index ? 'border-primary' : 'border-gray-800'
            } hover:border-primary transition-colors duration-200 focus:outline-none`}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">{item.question}</h3>
              <svg
                className={`w-5 h-5 text-primary transform transition-transform duration-200 ${
                  activeIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </button>
          <AnimatePresence>
            {activeIndex === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-dark border border-gray-800 border-t-0 rounded-b-xl p-5"
              >
                <p className="text-gray-300">{item.answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default FAQAccordion;
