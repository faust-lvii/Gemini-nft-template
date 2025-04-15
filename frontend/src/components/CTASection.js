import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-dark to-dark-light relative overflow-hidden">
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-dark-light border border-gray-800 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto text-center"
        >
          <h2 className="mb-6 text-gradient">Ready to Join the Collection?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Don't miss your chance to own a piece of this unique NFT collection. Mint your NFT today and become part of our growing community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/mint" className="btn-primary">
              Mint Your NFT
            </Link>
            <Link to="/roadmap" className="btn-outline">
              View Roadmap
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-secondary rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default CTASection;
