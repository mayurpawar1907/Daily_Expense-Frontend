import React from "react";
import { Mail, Facebook, Instagram, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

const ContactForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Contact Us</h2>

        <form className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-gray-700 font-medium">Subject</label>
            <input
              type="text"
              placeholder="Enter the subject"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-gray-700 font-medium">Message</label>
            <textarea
              rows="4"
              placeholder="Write your message..."
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Send Message
          </button>
        </form>

        {/* Social Media Links with Animations */}
        <div className="flex justify-center mt-6 space-x-6">
          <AnimatedIcon link="mailto:your@email.com" Icon={Mail} color="#ff9f43" />
          <AnimatedIcon link="https://facebook.com" Icon={Facebook} color="#1877F2" />
          <AnimatedIcon link="https://instagram.com" Icon={Instagram} color="#E1306C" />
          <AnimatedIcon link="https://linkedin.com" Icon={Linkedin} color="#0A66C2" />
        </div>
      </div>
    </div>
  );
};

// Animated Icon Component
const AnimatedIcon = ({ link, Icon, color }) => {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.2, rotate: 10 }}
      whileTap={{ scale: 0.9 }}
      className="p-2 rounded-full transition duration-300"
      style={{ backgroundColor: color }}
    >
      <Icon size={30} className="text-white" />
    </motion.a>
  );
};

export default ContactForm;
