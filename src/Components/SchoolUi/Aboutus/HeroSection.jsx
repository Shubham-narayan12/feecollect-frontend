import React from "react";

const HeroSection = () => {
  return (
    <div className="w-full">
      {/* ── TOP BANNER ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "230px" }}
      >
        <img
          src="/school main banner.jpeg"
          alt="School Banner"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(56, 142, 60, 0.72)" }}
        />
      </div>

      {/* ── WELCOME SECTION ── */}
      <div className="w-full bg-white py-14">
        <div className="w-full flex flex-col md:flex-row gap-10 items-start px-6 md:px-16 lg:px-24">
          {/* Left — Image */}
          <div className="flex-shrink-0 w-full md:w-[420px]">
            <img
              src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=580,fit=crop/dOqNXeekPrHE45km/tsc-school-1---copy-AGBvZob37oSBNpvr.jpg"
              alt="Students"
              className="w-full h-full object-cover"
              style={{ height: "360px" }}
            />
          </div>

          <div>
            {/* Heading */}
            <h2
              className="font-bold text-gray-800 mb-3"
              style={{ fontSize: "clamp(26px, 3.5vw, 38px)" }}
            >
              Welcome to{" "}
              <span style={{ color: "#4CAF50" }}>Green Field School (GFS)</span>
            </h2>

            {/* Tagline */}
            <p
              className="font-bold text-gray-700 mb-5"
              style={{ fontSize: "16px", lineHeight: 1.6 }}
            >
              "Learner centric, Integrated School Empowering Lives through Value
              Education"
            </p>

            {/* Divider */}
            <div
              style={{
                width: "60px",
                height: "3px",
                background: "#4CAF50",
                marginBottom: "18px",
              }}
            />

            {/* Description 1 */}
            <p
              className="text-gray-700 mb-4"
              style={{
                fontSize: "15px",
                lineHeight: 1.85,
                textAlign: "justify",
              }}
            >
              Green Field School (GFS), a learner-centric, integrated and
              inclusive school based in <strong>Patna, Bihar</strong>, is
              committed to providing a nurturing and progressive learning
              environment for students. The school focuses on holistic
              development, blending academics with values, discipline, and
              modern learning approaches.
            </p>

            {/* Description 2 */}
            <p
              className="text-gray-700 mb-4"
              style={{
                fontSize: "15px",
                lineHeight: 1.85,
                textAlign: "justify",
              }}
            >
              GFS was established in the <strong>Summer of 1984</strong> with a
              clear aim and vision to deliver quality education to future
              generations and equip students with knowledge, skills, and values
              needed to thrive in a rapidly changing world. The school
              emphasizes the integration of modern technologies and innovative
              teaching methods.
            </p>

            {/* Description 3 */}
            <p
              className="text-gray-700 mb-6"
              style={{
                fontSize: "15px",
                lineHeight: 1.85,
                textAlign: "justify",
              }}
            >
              At GFS, we strive to create a healthy, happy, creative, and
              interactive learning environment, where students develop a natural
              curiosity with an
              <strong> “I WANT TO KNOW MORE” </strong> attitude. We aim to
              reduce academic pressure while promoting joyful learning with
              balanced homework, activities, and assessments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
