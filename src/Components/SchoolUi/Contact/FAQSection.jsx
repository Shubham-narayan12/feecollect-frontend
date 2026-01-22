import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus, FaQuestionCircle } from "react-icons/fa";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

 const faqs = [
  {
    q: "What is the admission process for new students?",
    a: "The process starts with an enquiry form, followed by an interactive session with the student and parents. Documents like Birth Certificate, Aadhaar Card, and TC from the previous school are required."
  },
  {
    q: "Does Thawe Central School provide transport facilities?",
    a: "Yes, we have a fleet of safe and well-maintained buses covering major routes in Gopalganj and surrounding areas like Thawe, Mirganj, and nearby villages."
  },
  {
    q: "What are the school office working hours?",
    a: "The school office is open from 07:00 AM to 04:00 PM, Monday to Saturday. Please note that the office remains closed on Sundays and all public holidays."
  },
  {
    q: "What is the age criteria for Nursery admission?",
    a: "For admission in Nursery, the child should be at least 3 years old as of March 31st of the academic year in which admission is sought."
  },
  {
    q: "Which board is the school affiliated with?",
    a: "Thawe Central School follows a comprehensive curriculum based on CBSE guidelines, focusing on holistic development through both academic and co-curricular excellence."
  },
  {
    q: "Does the school offer extra-curricular activities?",
    a: "Absolutely! We encourage students to participate in sports, music, dance, debate, and various club activities to ensure their all-round physical and mental growth."
  },
  {
    q: "How can I pay the school fees?",
    a: "Fees can be paid directly at the school accounts office via cash or cheque. We are also working on an online payment portal to make the process easier for parents."
  }
];

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-8">
        <FaQuestionCircle className="text-blue-900 text-2xl" />
        <h2 className="text-3xl font-extrabold text-slate-900">General <span className="text-blue-900">FAQs</span></h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-100 last:border-0">
            <button
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              className="w-full py-5 flex items-center justify-between text-left group transition-all"
            >
              <span className={`font-bold text-lg ${openIndex === index ? 'text-blue-900' : 'text-slate-700 group-hover:text-blue-700'}`}>
                {faq.q}
              </span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${openIndex === index ? 'bg-blue-900 text-white rotate-180' : 'bg-gray-100 text-slate-400'}`}>
                {openIndex === index ? <FaMinus size={12} /> : <FaPlus size={12} />}
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
                  <p className="pb-6 text-gray-500 leading-relaxed italic">
                    {faq.a}
                  </p>
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