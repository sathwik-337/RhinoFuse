import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Products = () => {
  const [cart, setCart] = useState([]);
  const [payment, setPayment] = useState("COD");
  const [address, setAddress] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("overview");
  const [currentImage, setCurrentImage] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  // Product data
  const product = {
    id: 1,
    name: "RhinoFuse Ultimate",
    description:
      "The RhinoFuse Ultimate is an advanced AI-enabled diagnostic chip for motorcycles, designed for riders who prioritize safety and performance. It offers real-time health monitoring, predictive AI alerts, and weather & road condition tracking to ensure a smooth and secure ride.",
    features: [
      "Real-time engine health monitoring",
      "Predictive AI alerts for upcoming failures",
      "Weather & road condition tracking",
      "Compact and easy-to-install design",
      "Compatible with most motorcycles",
      "Water and dust resistant (IP67)",
      "6-month battery life with auto-recharge",
      "Mobile app integration"
    ],
    price: 6999,
    images: [
      "/bikefuse1.jpg",
      "/bikefuse2.jpg",
      "/bikefuse3.jpg",
      "/bikefuse5.png"
    ],
    specs: {
      dimensions: "45mm x 45mm x 15mm",
      weight: "80g",
      connectivity: "Bluetooth 5.0, Wi-Fi",
      battery: "Lithium-ion, 1200mAh",
      sensors: "Accelerometer, Gyroscope, Temperature, Humidity, Pressure",
      compatibility: "All motorcycles with OBD-II port"
    },
    reviews: [
      { id: 1, name: "Jayanth Nayak", rating: 5, comment: "This device saved me from a major engine failure. Worth every penny!", date: "2023-10-15" },
      { id: 2, name: "Peter Dsouza", rating: 4, comment: "Easy to install and very accurate predictions. App could be better.", date: "2023-09-28" },
      { id: 3, name: "Ganesh Acharya ", rating: 5, comment: "As a long-distance rider, this gives me peace of mind. Highly recommended!", date: "2023-08-30" }
    ]
  };

  // Add to cart with animation effect
  const addToCart = () => {
    setIsAddedToCart(true);
    
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    
    // Reset animation after 1.5 seconds
    setTimeout(() => {
      setIsAddedToCart(false);
      setShowCart(true);
    }, 1500);
  };

  const placeOrder = () => {
    alert(`Order placed! Payment method: ${payment}\nTotal: ₹${cart.reduce((total, item) => total + (item.price * item.quantity), 0)}`);
    setCart([]);
    setAddress("");
    setShowCart(false);
  };

  // Handle keyboard navigation for image gallery
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isImageModalOpen) {
        if (e.key === 'ArrowRight') {
          setCurrentImage((prev) => (prev + 1) % product.images.length);
        } else if (e.key === 'ArrowLeft') {
          setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);
        } else if (e.key === 'Escape') {
          setIsImageModalOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isImageModalOpen, product.images.length]);

  // Floating particles background component
  const FloatingParticles = ({ count = 20 }) => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(count)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-yellow-500/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 2}px`,
              height: `${Math.random() * 10 + 2}px`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    );
  };

  // Cart modal component
  const CartModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      onClick={() => setShowCart(false)}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <button
            onClick={() => setShowCart(false)}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-10">
            <div className="text-4xl mb-4">🛒</div>
            <p className="text-gray-300">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="max-h-64 overflow-y-auto pr-2">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center py-4 border-b border-gray-800">
                  <div className="w-16 h-16 bg-gray-700 rounded-lg overflow-hidden mr-4">
                    <img 
                      src={item.images[0]} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-400 text-sm">Quantity: {item.quantity}</p>
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold">₹{item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <div className="flex justify-between py-3 border-b border-gray-800">
                <span>Subtotal</span>
                <span>₹{cart.reduce((total, item) => total + (item.price * item.quantity), 0)}</span>
              </div>
              <div className="flex justify-between py-3 text-yellow-500">
                <span>Total</span>
                <span className="font-bold">₹{cart.reduce((total, item) => total + (item.price * item.quantity), 0)}</span>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm mb-2">Delivery Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your full address"
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-yellow-500"
                rows="3"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm mb-2">Payment Method</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPayment("COD")}
                  className={`py-2 rounded-lg border ${
                    payment === "COD" 
                      ? "border-yellow-500 bg-yellow-500/10 text-yellow-500" 
                      : "border-gray-700"
                  }`}
                >
                  Cash on Delivery
                </button>
                <button
                  onClick={() => setPayment("Online")}
                  className={`py-2 rounded-lg border ${
                    payment === "Online" 
                      ? "border-yellow-500 bg-yellow-500/10 text-yellow-500" 
                      : "border-gray-700"
                  }`}
                >
                  Online Payment
                </button>
              </div>
            </div>

            <button
              onClick={placeOrder}
              className="w-full mt-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg font-bold hover:opacity-90 transition"
            >
              Place Order
            </button>
          </>
        )}
      </motion.div>
    </motion.div>
  );

  // Image gallery modal
  const ImageModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-md flex justify-center items-center z-50"
      onClick={() => setIsImageModalOpen(false)}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="relative max-w-4xl w-full p-4"
      >
        <button
          className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 z-10"
          onClick={() => setIsImageModalOpen(false)}
        >
          ✕
        </button>
        
        <motion.img
          key={currentImage}
          src={product.images[currentImage]}
          alt={product.name}
          className="w-full max-h-[80vh] object-contain"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        
        <div className="absolute inset-y-0 left-0 flex items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);
            }}
            className="ml-2 bg-black/50 text-white rounded-full p-3 hover:bg-black/70"
          >
            ❮
          </button>
        </div>
        
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentImage((prev) => (prev + 1) % product.images.length);
            }}
            className="mr-2 bg-black/50 text-white rounded-full p-3 hover:bg-black/70"
          >
            ❯
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  // Review stars component
  const ReviewStars = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "text-yellow-500" : "text-gray-600"}>
          ★
        </span>
      );
    }
    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white min-h-screen pt-24 pb-20 px-4 relative overflow-hidden">
      <FloatingParticles />
      
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full filter blur-3xl opacity-20"></div>
      
      {/* Navigation */}
      <motion.div 
        className="max-w-7xl mx-auto mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center space-x-1 text-gray-400">
          <span>Home</span>
          <span>❯</span>
          <span>Products</span>
          <span>❯</span>
          <span className="text-yellow-500">RhinoFuse Ultimate</span>
        </div>
      </motion.div>

      {/* Main product container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Main image */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
            onClick={() => {
              setCurrentImage(0);
              setIsImageModalOpen(true);
            }}
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
              <h1 className="text-3xl font-extrabold tracking-wide text-white">
                {product.name}
              </h1>
            </div>
          </motion.div>
          
          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-4 mt-4">
            {product.images.map((img, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className={`relative rounded-lg overflow-hidden cursor-pointer border-2 ${
                  currentImage === index ? "border-yellow-500" : "border-gray-800"
                }`}
                onClick={() => {
                  setCurrentImage(index);
                  setIsImageModalOpen(true);
                }}
              >
                <img
                  src={img}
                  alt={`Product view ${index + 1}`}
                  className="w-full h-24 object-cover"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Product Details */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Price and badge */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-3xl font-extrabold text-yellow-500 mb-2">
                ₹{product.price}
              </p>
              <p className="text-gray-400">Inclusive of all taxes</p>
            </div>
            <div className="bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full text-sm font-medium">
              Best Seller
            </div>
          </div>
          
          {/* Quantity selector */}
          <div className="mb-8">
            <label className="block text-sm mb-2">Quantity</label>
            <div className="flex items-center">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 bg-gray-800 rounded-l-lg hover:bg-gray-700"
              >
                -
              </button>
              <div className="px-6 py-2 bg-gray-800">{quantity}</div>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 bg-gray-800 rounded-r-lg hover:bg-gray-700"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addToCart}
              className={`relative flex-1 py-4 rounded-lg font-bold transition-all ${
                isAddedToCart 
                  ? "bg-green-500" 
                  : "bg-gradient-to-r from-yellow-500 to-orange-500 hover:opacity-90"
              }`}
            >
              <span className="relative z-10 flex items-center justify-center">
                {isAddedToCart ? (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Added to Cart
                  </>
                ) : (
                  "Add to Cart"
                )}
              </span>
              {isAddedToCart && (
                <motion.div
                  className="absolute inset-0 bg-green-500 rounded-lg"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5 }}
                />
              )}
            </motion.button>
            
            <button
              onClick={() => {
                addToCart();
                setShowCart(true);
              }}
              className="flex-1 py-4 bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition"
            >
              Buy Now
            </button>
          </div>
          
          {/* Features list */}
          <div className="mb-10">
            <h3 className="text-xl font-bold mb-4">Key Features:</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.features.map((feature, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <span className="text-yellow-500 mr-2">✓</span>
                  <span className="text-gray-300">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          
          {/* Additional info */}
          <div className="border border-gray-800 rounded-xl p-4">
            <div className="flex items-center">
              <div className="bg-gray-800 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div>
                <p className="font-medium">Free Installation</p>
                <p className="text-sm text-gray-400">Available at all authorized service centers</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Product Tabs */}
      <motion.div 
        className="max-w-7xl mx-auto mt-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="border-b border-gray-800 flex overflow-x-auto">
          {["overview", "specs", "reviews", "support"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 font-medium text-sm sm:text-base ${
                activeTab === tab
                  ? "border-b-2 border-yellow-500 text-yellow-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="py-8">
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="prose prose-invert max-w-none"
            >
              <h3 className="text-2xl font-bold mb-4">Product Overview</h3>
              <p className="text-gray-300 mb-6">{product.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold mb-4">How It Works</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">1</div>
                      <p className="text-gray-300">Plug the device into your motorcycle's OBD-II port</p>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">2</div>
                      <p className="text-gray-300">Connect to the RhinoFuse mobile app via Bluetooth</p>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">3</div>
                      <p className="text-gray-300">Get real-time diagnostics and predictive alerts</p>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">4</div>
                      <p className="text-gray-300">Receive maintenance suggestions and service reminders</p>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-gray-800">
                  <h4 className="text-xl font-semibold mb-4">What's in the Box</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <span className="text-yellow-500 mr-2">•</span>
                      <span>RhinoFuse Ultimate Device</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-yellow-500 mr-2">•</span>
                      <span>OBD-II Connector Cable</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-yellow-500 mr-2">•</span>
                      <span>Mounting Kit</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-yellow-500 mr-2">•</span>
                      <span>Quick Start Guide</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-yellow-500 mr-2">•</span>
                      <span>1-Year Warranty Card</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
          
          {activeTab === "specs" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-6">Technical Specifications</h3>
                
                <div className="space-y-4">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b border-gray-800 pb-3">
                      <span className="text-gray-400 capitalize">{key}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-gray-800">
                <h4 className="text-xl font-semibold mb-4">Compatibility</h4>
                <p className="text-gray-300 mb-6">
                  The RhinoFuse Ultimate is compatible with all motorcycles manufactured after 2005 that feature an OBD-II port. 
                  For specific models, please refer to our compatibility checker.
                </p>
                
                <div className="flex items-center justify-between bg-gray-800 rounded-lg p-4 mb-4">
                  <div>
                    <p className="font-medium">Mobile App</p>
                    <p className="text-sm text-gray-400">iOS & Android</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-gray-700 rounded-lg text-sm">App Store</button>
                    <button className="px-4 py-2 bg-gray-700 rounded-lg text-sm">Play Store</button>
                  </div>
                </div>
                
                <button className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg font-bold">
                  Check Compatibility
                </button>
              </div>
            </motion.div>
          )}
          
          {activeTab === "reviews" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Customer Reviews</h3>
                  <div className="flex items-center">
                    <ReviewStars rating={4.7} />
                    <span className="ml-2 text-gray-400">4.7 out of 5 (128 reviews)</span>
                  </div>
                </div>
                <button className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg font-bold">
                  Write a Review
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {product.reviews.map((review) => (
                  <motion.div 
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-b from-gray-900 to-black rounded-xl p-6 border border-gray-800"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-medium">{review.name}</h4>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </div>
                      <ReviewStars rating={review.rating} />
                    </div>
                    <p className="text-gray-300">{review.comment}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          
          {activeTab === "support" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3 className="text-2xl font-bold mb-6">Support & Warranty</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-gray-800">
                  <h4 className="text-xl font-semibold mb-4">Product Warranty</h4>
                  <p className="text-gray-300 mb-4">
                    All RhinoFuse products come with a standard 1-year manufacturer warranty against defects in materials and workmanship.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <span className="text-yellow-500 mr-2">•</span>
                      <span>1-year limited warranty</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-500 mr-2">•</span>
                      <span>Free replacement for manufacturing defects</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-500 mr-2">•</span>
                      <span>24/7 customer support</span>
                    </li>
                  </ul>
                  <button className="px-6 py-3 bg-gray-800 rounded-lg font-medium">
                    Claim Warranty
                  </button>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold mb-4">Frequently Asked Questions</h4>
                  
                  <div className="space-y-4">
                    {[
                      {
                        question: "How do I install the RhinoFuse device?",
                        answer: "Installation is simple. Just locate your motorcycle's OBD-II port (usually under the seat or near the handlebars), plug in the device, and pair it with our mobile app."
                      },
                      {
                        question: "Is the device waterproof?",
                        answer: "Yes, the RhinoFuse Ultimate has an IP67 rating, making it dustproof and waterproof for up to 30 minutes in 1 meter of water."
                      },
                      {
                        question: "How often does the device need charging?",
                        answer: "The built-in battery lasts approximately 6 months with normal use. It automatically charges when your motorcycle is running."
                      }
                    ].map((faq, index) => (
                      <div key={index} className="border-b border-gray-800 pb-4">
                        <h5 className="font-medium mb-2">{faq.question}</h5>
                        <p className="text-gray-400">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
      
      {/* Related products */}
      <motion.div 
        className="max-w-7xl mx-auto mt-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-2xl font-bold mb-8">You Might Also Like</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            {
              id: 2,
              name: "RhinoFuseLite",
              price: 4999,
              image: "https://in.element14.com/productimages/large/en_GB/9943862-40.jpg"
            },
            {
              id: 3,
              name: "Smart Helmet HUD",
              price: 8999,
              image: "https://www.yooshopper.com/cdn/shop/files/3_6a5e0f53-c61d-4f31-abf5-375f63a34232.jpg?v=1716889612&width=1445"
            },
            {
              id: 4,
              name: "Bike Security System",
              price: 5999,
              image: "https://m.media-amazon.com/images/I/71uoQUc7u2L.jpg"
            },
            {
              id: 5,
              name: "GPS Tracker Pro",
              price: 3499,
              image: "/gps.jpg"
            }
          ].map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -10 }}
              className="bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden border border-gray-800"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover hover:scale-110 transition duration-500"
                />
              </div>
              <div className="p-4">
                <h4 className="font-medium mb-1">{product.name}</h4>
                <p className="text-yellow-500 font-bold">₹{product.price}</p>
                <button className="w-full mt-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
                  View Product
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Modals */}
      {showCart && <CartModal />}
      {isImageModalOpen && <ImageModal />}
    </div>
  );
};

export default Products;