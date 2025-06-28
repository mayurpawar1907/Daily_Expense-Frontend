// src/components/LandingPage.js
import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Track Expenses',
    description: 'Monitor your spending habits with detailed reports and analytics.',
    icon: '📊',
  },
  {
    title: 'Set Budgets',
    description: 'Define your budgets and receive alerts when you exceed them.',
    icon: '💰',
  },
  {
    title: 'Secure Data',
    description: 'Your financial data is encrypted and securely stored.',
    icon: '🔒',
  },
  // Add more features as needed
];

const Documentation = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold mb-2"
          >
            Manage Your Expenses Effortlessly
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl mb-8"
          >
            Take control of your finances with our intuitive expense tracking app.
          </motion.p>
          <motion.a
            href="#"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-full shadow-lg"
          >
            Get Started
          </motion.a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">Features</h2>
            <p className="text-gray-600 mt-4">
              Discover the powerful features that make our app the best choice for managing your expenses.
            </p>
          </div>
          <div className="flex flex-wrap">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="w-full md:w-1/3 px-4 mb-8"
              >
                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-4"
          >
            Start Managing Your Expenses Today
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl mb-8"
          >
            Join thousands of users who are taking control of their finances.
          </motion.p>
          <motion.a
            href="#"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-full shadow-lg"
          >
            Sign Up Now
          </motion.a>
        </div>
      </section>
    </div>
  );
};

export default Documentation;
