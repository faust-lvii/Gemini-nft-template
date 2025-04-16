import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CollectionPreview = () => {
  // Generate sample NFTs for preview
  const previewNFTs = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    name: `MO-NFT #${index + 1}`,
    gradient: `linear-gradient(${45 + index * 20}deg, 
      hsl(${(index * 36) % 360}, 70%, 60%), 
      hsl(${((index * 36) + 60) % 360}, 70%, 60%))`
  }));

  return (
    <section className="py-20 bg-dark-light">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="mb-4">Collection Preview</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Get a sneak peek at some of the unique NFTs in our collection.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {previewNFTs.map((nft, index) => (
            <motion.div
              key={nft.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="card overflow-hidden"
            >
              <div 
                className="aspect-square" 
                style={{ background: nft.gradient }}
              ></div>
              <div className="p-3">
                <p className="font-medium text-sm">{nft.name}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/collection" className="btn-outline">
            View Full Collection
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CollectionPreview;
