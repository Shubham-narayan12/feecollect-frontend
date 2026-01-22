// ContactPage.jsx (Main Page File)
import React from "react";

// In components ko hum ek-ek karke banayenge
import ContactHero from "../Components/SchoolUi/Contact/ContactHero";

import ContactCards from "../Components/SchoolUi/Contact/ContactCards";
import ContactFormSection from "../Components/SchoolUi/Contact/ContactFormSection";
import FAQSection from "../Components/SchoolUi/Contact/FAQSection";
import MapSection from "../Components/SchoolUi/Contact/MapSection";

const SchoolContactPage = () => {
  return (
    <main className="w-full min-h-screen bg-white">
      {/* 1. Hero Section (Header with Title) */}
      <ContactHero />

      {/* 2. Quick Info Cards (Phone, Email, Address) */}
      <section className="relative z-10 -mt-16 container mx-auto px-4">
        <ContactCards />
      </section>

      {/* 3. Main Body (Form + School Details/FAQ) */}
      <section className="py-20 container mx-auto px-4 grid lg:grid-cols-2 gap-12">
        <ContactFormSection />
        <FAQSection />
      </section>

      {/* 4. Map Section (Location) */}
      <section className="w-full">
        <MapSection />
      </section>
    </main>
  );
};

export default SchoolContactPage;
