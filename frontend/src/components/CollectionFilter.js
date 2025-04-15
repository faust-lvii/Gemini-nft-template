import React from 'react';
import { motion } from 'framer-motion';

const CollectionFilter = ({ 
  filter, 
  setFilter, 
  searchTerm, 
  setSearchTerm,
  availableFilters = ['all', 'common', 'rare', 'legendary']
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-dark-light rounded-xl p-6 mb-8 border border-gray-800"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {availableFilters.includes('all') && (
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-dark-lighter text-gray-300 hover:bg-dark-light'
              }`}
            >
              All
            </button>
          )}
          
          {availableFilters.includes('common') && (
            <button
              onClick={() => setFilter('common')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'common'
                  ? 'bg-primary text-white'
                  : 'bg-dark-lighter text-gray-300 hover:bg-dark-light'
              }`}
            >
              Common
            </button>
          )}
          
          {availableFilters.includes('rare') && (
            <button
              onClick={() => setFilter('rare')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'rare'
                  ? 'bg-primary text-white'
                  : 'bg-dark-lighter text-gray-300 hover:bg-dark-light'
              }`}
            >
              Rare
            </button>
          )}
          
          {availableFilters.includes('legendary') && (
            <button
              onClick={() => setFilter('legendary')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'legendary'
                  ? 'bg-primary text-white'
                  : 'bg-dark-lighter text-gray-300 hover:bg-dark-light'
              }`}
            >
              Legendary
            </button>
          )}
        </div>
        
        <div className="relative flex-grow md:max-w-xs">
          <input
            type="text"
            placeholder="Search by name or trait..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-dark-lighter border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <svg
            className="absolute right-3 top-2.5 h-4 w-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

export default CollectionFilter;
