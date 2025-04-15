import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PriceChart = ({ tokenId, timeRange = '1M' }) => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRange, setSelectedRange] = useState(timeRange);
  const [highestPrice, setHighestPrice] = useState(0);
  const [lowestPrice, setLowestPrice] = useState(0);
  const [averagePrice, setAveragePrice] = useState(0);

  // Generate random price data for demonstration
  useEffect(() => {
    const generatePriceData = () => {
      setIsLoading(true);
      
      // Determine number of data points based on selected range
      let dataPoints;
      let startDate = new Date();
      
      switch (selectedRange) {
        case '1D':
          dataPoints = 24; // Hourly for 1 day
          startDate.setDate(startDate.getDate() - 1);
          break;
        case '1W':
          dataPoints = 7; // Daily for 1 week
          startDate.setDate(startDate.getDate() - 7);
          break;
        case '1M':
          dataPoints = 30; // Daily for 1 month
          startDate.setMonth(startDate.getMonth() - 1);
          break;
        case '3M':
          dataPoints = 12; // Weekly for 3 months
          startDate.setMonth(startDate.getMonth() - 3);
          break;
        case '1Y':
          dataPoints = 12; // Monthly for 1 year
          startDate.setFullYear(startDate.getFullYear() - 1);
          break;
        default:
          dataPoints = 30;
          startDate.setMonth(startDate.getMonth() - 1);
      }
      
      // Base price and volatility based on token ID
      const basePrice = 0.1 + (parseInt(tokenId) % 10) * 0.05;
      const volatility = 0.1 + (parseInt(tokenId) % 5) * 0.02;
      
      // Generate data points
      const data = [];
      let currentDate = new Date(startDate);
      let currentPrice = basePrice;
      
      for (let i = 0; i < dataPoints; i++) {
        // Random price change with trend bias
        const trend = Math.sin(i / (dataPoints / 2) * Math.PI) * 0.1;
        const change = (Math.random() - 0.5) * volatility + trend;
        currentPrice = Math.max(0.01, currentPrice + change * currentPrice);
        
        data.push({
          date: new Date(currentDate),
          price: parseFloat(currentPrice.toFixed(4))
        });
        
        // Increment date based on selected range
        switch (selectedRange) {
          case '1D':
            currentDate.setHours(currentDate.getHours() + 1);
            break;
          case '1W':
            currentDate.setDate(currentDate.getDate() + 1);
            break;
          case '1M':
            currentDate.setDate(currentDate.getDate() + 1);
            break;
          case '3M':
            currentDate.setDate(currentDate.getDate() + 7);
            break;
          case '1Y':
            currentDate.setMonth(currentDate.getMonth() + 1);
            break;
          default:
            currentDate.setDate(currentDate.getDate() + 1);
        }
      }
      
      // Calculate statistics
      const prices = data.map(item => item.price);
      setHighestPrice(Math.max(...prices));
      setLowestPrice(Math.min(...prices));
      setAveragePrice(prices.reduce((sum, price) => sum + price, 0) / prices.length);
      
      setChartData(data);
      setIsLoading(false);
    };
    
    // Simulate loading delay
    setTimeout(generatePriceData, 500);
  }, [tokenId, selectedRange]);

  // Format date for display
  const formatDate = (date) => {
    if (selectedRange === '1D') {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (selectedRange === '1Y') {
      return date.toLocaleDateString([], { month: 'short', year: 'numeric' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  // Calculate chart dimensions
  const chartHeight = 200;
  const chartWidth = '100%';
  const padding = { top: 20, right: 10, bottom: 30, left: 40 };
  
  // Calculate chart scales
  const getYPosition = (price) => {
    const maxPrice = Math.max(...chartData.map(d => d.price)) * 1.1;
    const minPrice = Math.min(...chartData.map(d => d.price)) * 0.9;
    const range = maxPrice - minPrice;
    return chartHeight - padding.bottom - ((price - minPrice) / range) * (chartHeight - padding.top - padding.bottom);
  };
  
  // Create SVG path for the price line
  const createLinePath = () => {
    if (chartData.length === 0) return '';
    
    const points = chartData.map((d, i) => {
      const x = padding.left + (i / (chartData.length - 1)) * (100 - padding.left - padding.right);
      const y = getYPosition(d.price);
      return `${x},${y}`;
    });
    
    return `M ${points.join(' L ')}`;
  };
  
  // Create SVG path for the area under the price line
  const createAreaPath = () => {
    if (chartData.length === 0) return '';
    
    const points = chartData.map((d, i) => {
      const x = padding.left + (i / (chartData.length - 1)) * (100 - padding.left - padding.right);
      const y = getYPosition(d.price);
      return `${x},${y}`;
    });
    
    const firstX = padding.left;
    const lastX = padding.left + (100 - padding.left - padding.right);
    const bottomY = chartHeight - padding.bottom;
    
    return `M ${firstX},${bottomY} L ${points.join(' L ')} L ${lastX},${bottomY} Z`;
  };

  return (
    <div className="bg-dark-light rounded-xl p-6 border border-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Price History</h3>
        
        <div className="flex space-x-2">
          {['1D', '1W', '1M', '3M', '1Y'].map((range) => (
            <button
              key={range}
              onClick={() => setSelectedRange(range)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                selectedRange === range
                  ? 'bg-primary text-white'
                  : 'bg-dark-lighter text-gray-400 hover:text-white'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center" style={{ height: chartHeight }}>
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {/* Price Statistics */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-dark rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">Highest</p>
              <p className="font-medium text-green-400">{highestPrice.toFixed(4)} ETH</p>
            </div>
            <div className="bg-dark rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">Average</p>
              <p className="font-medium">{averagePrice.toFixed(4)} ETH</p>
            </div>
            <div className="bg-dark rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">Lowest</p>
              <p className="font-medium text-red-400">{lowestPrice.toFixed(4)} ETH</p>
            </div>
          </div>
          
          {/* Chart */}
          <div className="relative" style={{ height: chartHeight }}>
            <svg width={chartWidth} height={chartHeight} className="overflow-visible">
              {/* Y-axis labels */}
              {[0, 0.25, 0.5, 0.75, 1].map((fraction) => {
                const maxPrice = Math.max(...chartData.map(d => d.price)) * 1.1;
                const minPrice = Math.min(...chartData.map(d => d.price)) * 0.9;
                const price = minPrice + (maxPrice - minPrice) * fraction;
                const y = getYPosition(price);
                
                return (
                  <g key={fraction}>
                    <line
                      x1={padding.left}
                      y1={y}
                      x2="100%"
                      y2={y}
                      stroke="#374151"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                    <text
                      x={padding.left - 5}
                      y={y}
                      textAnchor="end"
                      dominantBaseline="middle"
                      fill="#9CA3AF"
                      fontSize="10"
                    >
                      {price.toFixed(3)}
                    </text>
                  </g>
                );
              })}
              
              {/* Area under the line */}
              <path
                d={createAreaPath()}
                fill="url(#gradient)"
                opacity="0.2"
              />
              
              {/* Price line */}
              <path
                d={createLinePath()}
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="2"
              />
              
              {/* Data points */}
              {chartData.map((d, i) => {
                const x = padding.left + (i / (chartData.length - 1)) * (100 - padding.left - padding.right);
                const y = getYPosition(d.price);
                
                return (
                  <g key={i}>
                    <circle
                      cx={x}
                      cy={y}
                      r="3"
                      fill="#8B5CF6"
                    />
                    
                    {/* X-axis labels (show only some for clarity) */}
                    {(i === 0 || i === chartData.length - 1 || i % Math.ceil(chartData.length / 5) === 0) && (
                      <text
                        x={x}
                        y={chartHeight - 10}
                        textAnchor="middle"
                        fill="#9CA3AF"
                        fontSize="10"
                      >
                        {formatDate(d.date)}
                      </text>
                    )}
                  </g>
                );
              })}
              
              {/* Gradient definition */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Tooltip would go here in a more advanced implementation */}
          </div>
          
          {/* Latest price */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-400">Current Price</p>
            <p className="text-xl font-bold">{chartData[chartData.length - 1]?.price.toFixed(4)} ETH</p>
          </div>
        </>
      )}
    </div>
  );
};

export default PriceChart;
