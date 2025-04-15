import React from 'react';
import { motion } from 'framer-motion';

const Roadmap = () => {
  const roadmapItems = [
    {
      phase: 'Phase 1',
      title: 'Project Launch',
      description: 'Initial release of the ModernNFT collection with 10,000 unique NFTs. Community building and marketing campaigns.',
      items: [
        'Smart contract development and auditing',
        'Website launch',
        'Community building on Discord and Twitter',
        'Whitelist pre-sale for early supporters',
        'Public mint launch'
      ],
      status: 'completed',
      date: 'Q2 2023'
    },
    {
      phase: 'Phase 2',
      title: 'Community Growth',
      description: 'Expanding the community and adding utility to the NFTs. Implementing governance mechanisms for holders.',
      items: [
        'DAO formation for community governance',
        'Holder-exclusive events and giveaways',
        'Partnerships with other NFT projects',
        'Merchandise store launch',
        'Community treasury establishment'
      ],
      status: 'in-progress',
      date: 'Q3 2023'
    },
    {
      phase: 'Phase 3',
      title: 'Metaverse Integration',
      description: 'Bringing ModernNFT into the metaverse with 3D models and virtual experiences for holders.',
      items: [
        '3D model development for all NFTs',
        'Virtual gallery in the metaverse',
        'Interactive experiences for holders',
        'Virtual meetups and events',
        'Metaverse land acquisition'
      ],
      status: 'upcoming',
      date: 'Q4 2023'
    },
    {
      phase: 'Phase 4',
      title: 'Ecosystem Expansion',
      description: 'Expanding the ModernNFT ecosystem with new collections, utility tokens, and real-world benefits.',
      items: [
        'Companion collection launch',
        'Utility token for the ecosystem',
        'Staking and rewards system',
        'Real-world events and exhibitions',
        'Charitable initiatives led by the community'
      ],
      status: 'upcoming',
      date: 'Q1 2024'
    }
  ];

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
    <div className="min-h-screen py-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-16">
            <h1 className="mb-4">
              <span className="text-gradient">Project</span> Roadmap
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our vision for the future of ModernNFT. This roadmap outlines our plans and goals as we continue to develop and expand the project.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gray-800"></div>

            {/* Roadmap Items */}
            {roadmapItems.map((item, index) => (
              <motion.div
                key={index}
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
            ))}
          </div>

          {/* Future Plans */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 bg-dark-light rounded-xl p-8 border border-gray-800"
          >
            <h2 className="text-2xl font-bold mb-4">Beyond the Roadmap</h2>
            <p className="text-gray-300 mb-6">
              Our roadmap represents our current vision, but we're always open to new ideas and opportunities. The future of ModernNFT will be shaped by our community and the evolving Web3 landscape.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-dark rounded-lg p-5">
                <h3 className="text-lg font-semibold mb-2 text-primary">Community-Driven</h3>
                <p className="text-gray-400">
                  We believe in the power of community governance. As we grow, more decisions will be made by our holders through our DAO.
                </p>
              </div>
              <div className="bg-dark rounded-lg p-5">
                <h3 className="text-lg font-semibold mb-2 text-primary">Adaptive Strategy</h3>
                <p className="text-gray-400">
                  We'll remain flexible and adapt our strategy based on market conditions, technological advancements, and community feedback.
                </p>
              </div>
              <div className="bg-dark rounded-lg p-5">
                <h3 className="text-lg font-semibold mb-2 text-primary">Long-Term Vision</h3>
                <p className="text-gray-400">
                  ModernNFT is built for the long term. We're committed to creating lasting value for our community and the broader NFT ecosystem.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Roadmap;
