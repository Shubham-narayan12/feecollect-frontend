import React from "react";
import { motion } from "framer-motion";
import { 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaClock, 
  FaArrowRight 
} from "react-icons/fa";

const ContactCards = () => {
  const contactDetails = [
    {
      id: 1,
      title: "Location",
      icon: <FaMapMarkerAlt />,
      content: "AT- BEDUTOLA, POST OFFICE - THAWE",
      subContent: "DIST- GOPALGANJ, PIN CODE - 841440",
      color: "bg-blue-600",
      link: "https://maps.google.com", // Aap apna location link yahan daal sakte hain
    },
    {
      id: 2,
      title: "Contacts",
      icon: <FaPhoneAlt />,
      content: "+91 - 94714 04548",
      subContent: "+91 - 70501 54850",
      color: "bg-yellow-500",
      link: "tel:+919471404548",
    },
    {
      id: 3,
      title: "Hours",
      icon: <FaClock />,
      content: "07:00 AM TO 04:00 PM",
      subContent: "Sunday Closed",
      color: "bg-slate-800",
      isSpecial: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
      {contactDetails.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -10 }}
          className="group relative bg-white rounded-[32px] p-8 shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col items-center text-center overflow-hidden"
        >
          {/* Decorative Background Shape */}
          <div className={`absolute -right-4 -top-4 w-24 h-24 ${item.color} opacity-[0.03] rounded-full group-hover:scale-150 transition-transform duration-500`}></div>

          {/* Icon Container */}
          <div className={`w-16 h-16 ${item.color} text-white rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg transform group-hover:rotate-[360deg] transition-transform duration-700`}>
            {item.icon}
          </div>

          {/* Text Content */}
          <h3 className="text-2xl font-bold text-slate-800 mb-4">{item.title}</h3>
          
          <div className="space-y-2">
            <p className="text-slate-600 font-semibold leading-relaxed px-2">
              {item.content}
            </p>
            <p className={`text-sm ${item.isSpecial ? 'text-red-500 font-bold' : 'text-slate-400'}`}>
              {item.subContent}
            </p>
          </div>

          {/* Action Button/Link */}
          {item.link && (
            <a 
              href={item.link} 
              target="_blank" 
              rel="noreferrer"
              className="mt-6 flex items-center gap-2 text-blue-600 font-bold text-sm hover:gap-3 transition-all"
            >
              Get Details <FaArrowRight className="text-xs" />
            </a>
          )}
          
          {!item.link && <div className="mt-8 h-1 w-12 bg-gray-100 rounded-full"></div>}
        </motion.div>
      ))}
    </div>
  );
};

export default ContactCards;