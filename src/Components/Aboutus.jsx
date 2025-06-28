// src/components/AboutUs.js
import React from "react";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaEnvelope,
} from "react-icons/fa";

const teamMembers = [
  {
    name: "Rahul Bhilore",
    role: "CEO & Founder",
    imageUrl:
      "https://thumbs.dreamstime.com/b/man-short-haircut-wearing-green-shirt-looking-out-window-concept-solitude-contemplation-as-lost-thought-353764263.jpg",
    socialLinks: {
      instagram: "#",
      linkedin: "#",
      facebook: "#",
      email: "mailto:rahul@example.com",
    },
  },
  {
    name: "Ashvini Bhilore",
    role: "Chief Technology Officer",
    imageUrl:
      "https://thumbs.dreamstime.com/b/outdoor-portrait-cute-young-black-girl-smiling-african-pe-lying-down-grass-people-30878726.jpg",
    socialLinks: {
      instagram: "#",
      linkedin: "#",
      facebook: "#",
      email: "mailto:ashvini@example.com",
    },
  },
  {
    name: "Mayur Pawar",
    role: "Lead Developer",
    imageUrl:
      "https://wallpapers.com/images/hd/smart-boy-pictures-rq9gv5yunkywuq0u.jpg",
    socialLinks: {
      instagram: "#",
      linkedin: "#",
      facebook: "#",
      email: "mailto:mayur@example.com",
    },
  },
];

const SocialIcons = ({ links }) => {
  const icons = [
    { icon: <FaInstagram />, link: links.instagram },
    { icon: <FaLinkedin />, link: links.linkedin },
    { icon: <FaFacebook />, link: links.facebook },
    { icon: <FaEnvelope />, link: links.email },
  ];

  return (
    <div className="flex justify-center gap-4 mt-4">
      {icons.map((item, index) => (
        <motion.a
          key={index}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          className="text-gray-500 hover:text-blue-500 transition duration-300 text-xl"
        >
          {item.icon}
        </motion.a>
      ))}
    </div>
  );
};

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl font-extrabold text-gray-900">About Us</h1>
          <p className="mt-4 text-lg text-gray-600">
            We are dedicated to helping you manage your expenses efficiently and
            effectively.
          </p>
        </motion.div>

        <div className="mt-10">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-2xl font-bold text-gray-900 text-center"
          >
            Our Team
          </motion.h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.2 }}
                className="bg-white p-6 rounded-lg shadow-lg text-center"
              >
                <img
                  className="w-32 h-32 rounded-full mx-auto"
                  src={member.imageUrl}
                  alt={member.name}
                />
                <h3 className="mt-4 text-xl font-medium text-gray-900">
                  {member.name}
                </h3>
                <p className="mt-2 text-gray-600">{member.role}</p>

                {/* Social Icons */}
                <SocialIcons links={member.socialLinks} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
