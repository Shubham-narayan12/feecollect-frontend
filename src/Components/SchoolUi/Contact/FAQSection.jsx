import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus, FaQuestionCircle } from "react-icons/fa";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "What is the admission process for new students?",
      a: "The process starts with an enquiry form, followed by an interaction with the student and parents. Required documents include Birth Certificate, Aadhaar Card, and Transfer Certificate from the previous school.",
    },
    {
      q: "Does Green Field School provide transport facilities?",
      a: "Yes, we provide safe and reliable transport services covering nearby areas and routes for the convenience of students.",
    },
    {
      q: "What are the school office working hours?",
      a: "The school office is open from 08:00 AM to 03:00 PM, Monday to Saturday. It remains closed on Sundays and public holidays.",
    },
    {
      q: "What is the age criteria for Nursery admission?",
      a: "For Nursery admission, the child should be at least 3 years old as of March 31st of the academic session.",
    },
    {
      q: "Which board is the school affiliated with?",
      a: "Green Field School follows CBSE curriculum guidelines focusing on academic excellence and holistic development.",
    },
    {
      q: "Does the school offer extra-curricular activities?",
      a: "Yes, we offer a wide range of activities including sports, music, dance, and cultural programs for overall development.",
    },
    {
      q: "How can I pay the school fees?",
      a: "Fees can be paid at the school office. Online payment options will also be available soon for added convenience.",
    },
  ];

  return (
    <div className="w-full">
      {/* Heading */}
      <div className="flex items-center gap-3 mb-8">
        <FaQuestionCircle className="text-green-700 text-2xl" />
        <h2 className="text-3xl font-extrabold text-gray-900">
          General <span className="text-green-700">FAQs</span>
        </h2>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-green-100 rounded-xl px-4 bg-white shadow-sm hover:shadow-md transition"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              className="w-full py-5 flex items-center justify-between text-left group"
            >
              <span
                className={`font-semibold text-lg ${
                  openIndex === index
                    ? "text-green-700"
                    : "text-gray-700 group-hover:text-green-600"
                }`}
              >
                {faq.q}
              </span>

              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  openIndex === index
                    ? "bg-green-700 text-white rotate-180"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {openIndex === index ? (
                  <FaMinus size={12} />
                ) : (
                  <FaPlus size={12} />
                )}
              </div>
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 text-gray-600 leading-relaxed">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
