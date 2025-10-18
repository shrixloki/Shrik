import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const OurBuilds = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const builds = [
    {
      title: 'Loki AI',
      subtitle: 'Cross-chain Intelligence',
      description: 'Seamless blockchain operations powered by AI agents and biometric security.',
      available: true,
    },
    {
      title: 'ShrikDB',
      subtitle: 'Intelligent Database',
      description: 'Next-generation database architecture with AI-driven optimization.',
      available: false,
    },
  ];

  return (
    <section
      id="builds"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center bg-black py-24 px-6"
    >
      <div className={`max-w-6xl mx-auto w-full section-fade-in ${isVisible ? 'visible' : ''}`}>
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-16 text-center tracking-tight">
          Our Builds.
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {builds.map((build, index) => (
            <div
              key={index}
              className="group relative border border-white/20 p-8 md:p-12 transition-all duration-500 hover:border-white/40 hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/10"
            >
              {!build.available && (
                <div className="absolute top-4 right-4 text-xs font-medium text-white/40 tracking-widest">
                  COMING SOON
                </div>
              )}
              
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
                {build.title}
              </h3>
              
              <p className="text-lg text-white/60 mb-6 font-light tracking-wide">
                {build.subtitle}
              </p>
              
              <p className="text-base text-white/80 mb-8 leading-relaxed">
                {build.description}
              </p>
              
              {build.available && (
                <button className="inline-flex items-center gap-2 text-sm font-medium text-white border border-white/40 px-6 py-3 transition-all duration-300 hover:bg-white hover:text-black group-hover:gap-4">
                  Explore {build.title}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurBuilds;
