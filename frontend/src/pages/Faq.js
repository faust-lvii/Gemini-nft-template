import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  // FAQ data
  const faqItems = [
    {
      question: 'What is an NFT?',
      answer: 'NFT stands for Non-Fungible Token. Unlike cryptocurrencies such as Bitcoin or Ethereum, NFTs are unique digital assets that represent ownership of a specific item, such as digital art, music, or collectibles. Each NFT has a unique identifier that makes it different from any other token, even if they appear identical.'
    },
    {
      question: 'How do I purchase an NFT from this collection?',
      answer: 'To purchase an NFT from our collection, you need an Ethereum wallet (like MetaMask) with enough ETH to cover the mint price plus gas fees. Visit our Mint page, connect your wallet, select the quantity you want to mint, and confirm the transaction in your wallet. Once the transaction is confirmed, the NFT will be transferred to your wallet.'
    },
    {
      question: 'What is the mint price?',
      answer: 'The mint price for each NFT in our collection is 0.05 ETH. This price may change in the future based on project phases and community decisions.'
    },
    {
      question: 'How many NFTs are in the collection?',
      answer: 'Our collection consists of 10,000 unique NFTs. Each one is algorithmically generated with different traits and attributes, making every piece one-of-a-kind.'
    },
    {
      question: 'What blockchain is this project built on?',
      answer: 'This project is built on the Ethereum blockchain. We use the ERC-721 standard for our NFTs, which ensures compatibility with major marketplaces and wallets.'
    },
    {
      question: 'Can I sell my NFT after purchasing?',
      answer: 'Yes, once you own an NFT from our collection, you have full ownership rights and can sell it on secondary marketplaces like OpenSea, Rarible, or LooksRare. The NFT will always be tied to your wallet address until you transfer or sell it.'
    },
    {
      question: 'What utility do these NFTs provide?',
      answer: 'Our NFTs provide several utilities including: access to our exclusive community, voting rights in our DAO, eligibility for future airdrops, access to special events, and more utilities that will be announced as we progress through our roadmap.'
    },
    {
      question: 'How are the NFTs generated?',
      answer: 'Each NFT is algorithmically generated from a combination of different traits and attributes. We use a provably fair system to ensure randomness in the generation process, making each NFT unique.'
    },
    {
      question: 'Where is the NFT metadata stored?',
      answer: 'The metadata for our NFTs is stored on IPFS (InterPlanetary File System), a decentralized storage solution. This ensures that your NFT and its associated data will remain accessible even if our project website goes offline.'
    },
    {
      question: 'How can I get involved in the community?',
      answer: 'You can join our community by following us on Twitter, joining our Discord server, and participating in community discussions. NFT holders will have access to exclusive channels and opportunities to contribute to the project\'s future.'
    }
  ];

  // Toggle FAQ item
  const toggleItem = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
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
              <span className="text-gradient">Frequently Asked</span> Questions
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Find answers to common questions about our NFT collection, minting process, and more.
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="max-w-3xl mx-auto">
            {faqItems.map((item, index) => (
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
              </motion.div>
            ))}
          </div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 bg-dark-light rounded-xl p-8 border border-gray-800 max-w-3xl mx-auto"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">Still Have Questions?</h2>
            <p className="text-gray-300 text-center mb-6">
              If you couldn't find the answer to your question, feel free to reach out to us directly.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-dark rounded-lg p-5 text-center hover:bg-dark-lighter transition-colors duration-200"
              >
                <svg
                  className="w-8 h-8 mx-auto mb-3 text-primary"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"></path>
                </svg>
                <h3 className="font-bold mb-1">Join Our Discord</h3>
                <p className="text-gray-400 text-sm">
                  Get real-time support from our team and community members.
                </p>
              </a>
              <a
                href="mailto:support@modernnft.com"
                className="bg-dark rounded-lg p-5 text-center hover:bg-dark-lighter transition-colors duration-200"
              >
                <svg
                  className="w-8 h-8 mx-auto mb-3 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <h3 className="font-bold mb-1">Email Us</h3>
                <p className="text-gray-400 text-sm">
                  Send us an email and we'll get back to you within 24 hours.
                </p>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Faq;
