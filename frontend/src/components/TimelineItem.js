import React from 'react';
import { motion } from 'framer-motion';

const TimelineItem = ({ item, index }) => {
  // Function to determine status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-yellow-500';
      case 'upcoming':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Function to determine status text
  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'upcoming':
        return 'Upcoming';
      default:
        return 'Planned';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`relative mb-16 md:mb-24 ${
        index % 2 === 0 ? 'md:text-right' : ''
      }`}
    >
      <div className={`flex flex-col md:flex-row items-center ${
        index % 2 === 0 ? 'md:flex-row-reverse' : ''
      }`}>
        {/* Content */}
        <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
          <div className="bg-dark-light rounded-xl p-6 border border-gray-800 hover:border-primary transition-colors duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">{item.phase}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)} text-white`}>
                {getStatusText(item.status)}
              </span>
            </div>
            <h4 className="text-lg font-semibold mb-2 text-primary">{item.title}</h4>
            <p className="text-gray-300 mb-4">{item.description}</p>
            <ul className="space-y-2 mb-4">
              {item.items.map((listItem, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-gray-400">{listItem}</span>
                </li>
              ))}
            </ul>
            <div className="text-sm text-gray-500">{item.date}</div>
          </div>
        </div>

        {/* Timeline Node */}
        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/3 flex items-center justify-center">
          <div className={`w-8 h-8 rounded-full border-4 border-dark ${getStatusColor(item.status)}`}></div>
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineItem;
