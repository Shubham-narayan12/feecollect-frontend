import { useEffect, useState } from "react";

const images = [
  "https://assets.zyrosite.com/dOqNXeekPrHE45km/thawe-dJoN9M7K8vfDLM2Y.jpg",
  "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=580,fit=crop/dOqNXeekPrHE45km/tsc-school-1---copy-AGBvZob37oSBNpvr.jpg",
  "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=205,h=205,fit=crop/dOqNXeekPrHE45km/computer-lab-school-YanzpDq96oFZ71qO.jpg",
  "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=580,fit=crop/dOqNXeekPrHE45km/tcs-logo-trans-12---copy-2-m2Wrv599agteQ3z1.png",
];

export default function HomeHeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[83vh] overflow-hidden mt-0">
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, index) => (
          <div key={index} className="w-full h-full flex-shrink-0">
            <img
              src={img}
              alt="School"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <h1 className="text-white text-4xl md:text-5xl font-bold">
          Learning Beyond Classrooms
        </h1>
        <p className="mt-4 text-white/90 text-lg">
          Future Ready Education
        </p>
      </div>
    </section>
  );
}
