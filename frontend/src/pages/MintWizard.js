import React, { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Web3Context } from '../utils/Web3Context';
import { NotificationContext } from '../utils/NotificationContext';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const MintWizard = () => {
  const { isConnected, account, connectWallet } = useContext(Web3Context);
  const { addNotification } = useContext(NotificationContext);
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [collections, setCollections] = useState([]);
  
  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
    collection: '',
    price: '',
    royalty: '10',
    attributes: [{ trait_type: '', value: '' }],
    supply: '1',
    unlockableContent: '',
    hasUnlockableContent: false
  });
  
  // Generate sample collections for demonstration
  useEffect(() => {
    if (isConnected) {
      const sampleCollections = [
        { id: 1, name: 'Modern Art Collection' },
        { id: 2, name: 'Pixel Avatars' },
        { id: 3, name: 'Abstract Worlds' },
        { id: 4, name: 'Cosmic Explorers' }
      ];
      
      setCollections(sampleCollections);
    }
  }, [isConnected]);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file
      });
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle attribute changes
  const handleAttributeChange = (index, field, value) => {
    const updatedAttributes = [...formData.attributes];
    updatedAttributes[index] = {
      ...updatedAttributes[index],
      [field]: value
    };
    
    setFormData({
      ...formData,
      attributes: updatedAttributes
    });
  };
  
  // Add new attribute
  const addAttribute = () => {
    setFormData({
      ...formData,
      attributes: [...formData.attributes, { trait_type: '', value: '' }]
    });
  };
  
  // Remove attribute
  const removeAttribute = (index) => {
    const updatedAttributes = [...formData.attributes];
    updatedAttributes.splice(index, 1);
    
    setFormData({
      ...formData,
      attributes: updatedAttributes
    });
  };
  
  // Navigate to next step
  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Navigate to previous step
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };
  
  // Validate current step
  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        if (!formData.name.trim()) {
          addNotification({
            title: 'Missing Information',
            message: 'Please enter a name for your NFT',
            type: 'error'
          });
          return false;
        }
        if (!formData.image) {
          addNotification({
            title: 'Missing Information',
            message: 'Please upload an image for your NFT',
            type: 'error'
          });
          return false;
        }
        return true;
      
      case 2:
        if (formData.attributes.some(attr => !attr.trait_type.trim() || !attr.value.trim())) {
          addNotification({
            title: 'Invalid Attributes',
            message: 'Please fill in all attribute fields or remove empty ones',
            type: 'error'
          });
          return false;
        }
        return true;
      
      case 3:
        if (!formData.price.trim() || isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
          addNotification({
            title: 'Invalid Price',
            message: 'Please enter a valid price greater than 0',
            type: 'error'
          });
          return false;
        }
        if (!formData.royalty.trim() || isNaN(parseFloat(formData.royalty)) || parseFloat(formData.royalty) < 0 || parseFloat(formData.royalty) > 50) {
          addNotification({
            title: 'Invalid Royalty',
            message: 'Please enter a valid royalty percentage between 0 and 50',
            type: 'error'
          });
          return false;
        }
        return true;
      
      default:
        return true;
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateCurrentStep()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate minting process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success notification
      addNotification({
        title: 'NFT Minted Successfully',
        message: `Your NFT "${formData.name}" has been minted!`,
        type: 'success'
      });
      
      // Redirect to NFT detail page (using a random ID for demo)
      const randomId = Math.floor(Math.random() * 1000) + 1;
      navigate(`/nft/${randomId}`);
    } catch (error) {
      console.error('Error minting NFT:', error);
      
      // Error notification
      addNotification({
        title: 'Minting Failed',
        message: 'There was an error minting your NFT. Please try again.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Render step content
  const renderStepContent = () => {
    if (!isConnected) {
      return (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 bg-dark-lighter rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">Connect Your Wallet</h2>
          <p className="text-gray-400 mb-6 text-center max-w-md">
            Connect your wallet to start minting your NFT.
          </p>
          <button onClick={connectWallet} className="btn-primary">
            Connect Wallet
          </button>
        </div>
      );
    }
    
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner />
        </div>
      );
    }
    
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Basic Information</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                  NFT Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter a name for your NFT"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Describe your NFT (optional)"
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">
                  The description will be displayed on the detail page of your NFT.
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Upload Image <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                  {previewImage ? (
                    <div className="mb-4">
                      <img
                        src={previewImage}
                        alt="NFT Preview"
                        className="max-h-64 mx-auto rounded-lg"
                      />
                    </div>
                  ) : (
                    <svg className="w-12 h-12 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  )}
                  <p className="text-gray-400 mb-2">Drag and drop your file here, or click to browse</p>
                  <p className="text-xs text-gray-500 mb-4">
                    Supported formats: JPG, PNG, GIF, SVG, MP4, WEBM. Max size: 50MB.
                  </p>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleImageUpload}
                    accept="image/*,video/*"
                    className="hidden"
                  />
                  <label htmlFor="image" className="btn-outline cursor-pointer">
                    Browse Files
                  </label>
                </div>
              </div>
              
              <div>
                <label htmlFor="collection" className="block text-sm font-medium text-gray-400 mb-1">
                  Collection
                </label>
                <select
                  id="collection"
                  name="collection"
                  value={formData.collection}
                  onChange={handleInputChange}
                  className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select a collection (optional)</option>
                  {collections.map((collection) => (
                    <option key={collection.id} value={collection.id}>
                      {collection.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Adding your NFT to a collection helps collectors discover it.
                </p>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={nextStep}
                className="btn-primary"
              >
                Next Step
              </button>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Properties & Attributes</h2>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-400">
                    Attributes
                  </label>
                  <button
                    type="button"
                    onClick={addAttribute}
                    className="text-sm text-primary hover:text-primary-dark transition-colors"
                  >
                    + Add Attribute
                  </button>
                </div>
                <p className="text-xs text-gray-500 mb-4">
                  Attributes appear as key-value pairs and help define the uniqueness and rarity of your NFT.
                </p>
                
                <div className="space-y-3">
                  {formData.attributes.map((attribute, index) => (
                    <div key={index} className="flex space-x-4 items-center">
                      <input
                        type="text"
                        value={attribute.trait_type}
                        onChange={(e) => handleAttributeChange(index, 'trait_type', e.target.value)}
                        className="flex-1 bg-dark border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Trait Type (e.g. Color)"
                      />
                      <input
                        type="text"
                        value={attribute.value}
                        onChange={(e) => handleAttributeChange(index, 'value', e.target.value)}
                        className="flex-1 bg-dark border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Value (e.g. Blue)"
                      />
                      {formData.attributes.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeAttribute(index)}
                          className="text-red-500 hover:text-red-400 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label htmlFor="supply" className="block text-sm font-medium text-gray-400 mb-1">
                  Supply
                </label>
                <input
                  type="number"
                  id="supply"
                  name="supply"
                  value={formData.supply}
                  onChange={handleInputChange}
                  min="1"
                  max="10000"
                  className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  The number of copies of this NFT. Leave as 1 for a unique NFT.
                </p>
              </div>
              
              <div>
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="hasUnlockableContent"
                    name="hasUnlockableContent"
                    checked={formData.hasUnlockableContent}
                    onChange={handleInputChange}
                    className="w-4 h-4 bg-dark border border-gray-700 rounded focus:ring-primary"
                  />
                  <label htmlFor="hasUnlockableContent" className="ml-2 text-sm font-medium text-gray-400">
                    Include Unlockable Content
                  </label>
                </div>
                <p className="text-xs text-gray-500 mb-2">
                  Unlockable content is only visible to the owner of the NFT.
                </p>
                
                {formData.hasUnlockableContent && (
                  <textarea
                    id="unlockableContent"
                    name="unlockableContent"
                    value={formData.unlockableContent}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter unlockable content or instructions"
                  ></textarea>
                )}
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="btn-outline"
              >
                Previous Step
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="btn-primary"
              >
                Next Step
              </button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Pricing & Royalties</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-400 mb-1">
                  Price (ETH) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.001"
                  min="0"
                  className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="0.05"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  The price at which your NFT will be listed for sale.
                </p>
              </div>
              
              <div>
                <label htmlFor="royalty" className="block text-sm font-medium text-gray-400 mb-1">
                  Royalty (%)
                </label>
                <input
                  type="number"
                  id="royalty"
                  name="royalty"
                  value={formData.royalty}
                  onChange={handleInputChange}
                  step="0.1"
                  min="0"
                  max="50"
                  className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="10"
                />
                <p className="text-xs text-gray-500 mt-1">
                  You will receive this percentage of the sale price each time your NFT is sold on the secondary market.
                </p>
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="btn-outline"
              >
                Previous Step
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Minting...
                  </div>
                ) : (
                  'Mint NFT'
                )}
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
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
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2">Create New NFT</h1>
            <p className="text-gray-400">Follow the steps below to mint your NFT</p>
          </div>
          
          {isConnected && (
            <div className="mb-10">
              <div className="flex items-center justify-between mb-8">
                <div className="hidden sm:flex items-center w-full">
                  {[1, 2, 3].map((step) => (
                    <React.Fragment key={step}>
                      <div className="relative">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          currentStep >= step ? 'bg-primary text-white' : 'bg-dark-light text-gray-400'
                        }`}>
                          {currentStep > step ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            step
                          )}
                        </div>
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-medium">
                          {step === 1 ? 'Basic Info' : step === 2 ? 'Properties' : 'Pricing'}
                        </div>
                      </div>
                      {step < 3 && (
                        <div className={`flex-grow h-0.5 mx-2 ${
                          currentStep > step ? 'bg-primary' : 'bg-dark-light'
                        }`}></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                
                <div className="sm:hidden text-center w-full">
                  <p className="text-sm font-medium">
                    Step {currentStep} of 3: {currentStep === 1 ? 'Basic Info' : currentStep === 2 ? 'Properties' : 'Pricing'}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="bg-dark-light rounded-xl p-6 md:p-8">
            <form onSubmit={handleSubmit}>
              {renderStepContent()}
            </form>
          </div>
          
          {isConnected && (
            <div className="mt-10">
              <div className="bg-dark-light rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">NFT Preview</h3>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="w-full md:w-1/3 aspect-square bg-dark rounded-xl overflow-hidden">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="NFT Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  <div className="w-full md:w-2/3">
                    <h3 className="text-xl font-bold mb-2">
                      {formData.name || 'Untitled NFT'}
                    </h3>
                    <p className="text-gray-400 mb-4">
                      {formData.description || 'No description provided'}
                    </p>
                    
                    {formData.attributes.length > 0 && formData.attributes[0].trait_type && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-400 mb-2">Attributes</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {formData.attributes.map((attr, index) => (
                            attr.trait_type && attr.value ? (
                              <div key={index} className="bg-dark rounded-lg p-2 text-center">
                                <p className="text-xs text-gray-400">{attr.trait_type}</p>
                                <p className="font-medium text-sm">{attr.value}</p>
                              </div>
                            ) : null
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-400">Price</p>
                        <p className="text-lg font-bold">
                          {formData.price ? `${formData.price} ETH` : '0 ETH'}
                        </p>
                      </div>
                      
                      {formData.collection && (
                        <div className="text-right">
                          <p className="text-xs text-gray-400">Collection</p>
                          <p className="text-sm font-medium">
                            {collections.find(c => c.id.toString() === formData.collection)?.name || 'Unknown Collection'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MintWizard;
