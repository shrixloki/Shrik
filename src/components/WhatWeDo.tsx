import { useEffect, useRef, useState } from 'react';
import ScrollReveal from './ScrollReveal';

const WhatWeDo = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      title: "We Build Foundational Systems.",
      content: [
        "Shrik designs intelligent frameworks, infrastructures, and developer environments that form the backbone of digital ecosystems.",
        "Every construct we craft is engineered to scale with precision, autonomy, and permanence.",
        "",
        "△ Purpose: Expresses your role as builders of deep technology — this is the core of Shrik's identity."
      ]
    },
    {
      title: "We Collaborate to Create.",
      content: [
        "Shrik works alongside developers, startups, and enterprises to build production-grade systems — from autonomous AIs to complete digital platforms.",
        "We bring vision, architecture, and engineering discipline to every collaboration.",
        "",
        "△ Purpose: Shows your openness and authority — you don't just build your own systems, you help others reach that level of excellence."
      ]
    },
    {
      title: "We Craft What Comes Next.",
      content: [
        "Beyond frameworks, we design intelligent architectures that think, adapt, and endure.",
        "We don't chase trends — we define trajectories.",
        "",
        "Our craft lies in shaping the unseen: the environments where intelligence learns, where systems evolve, and where developers discover the tools that move civilization forward.",
        "",
        "Every construct we create — every interface, engine, and logic chain — is made to outlast its moment.",
        "We build with permanence in mind, precision in purpose, and a relentless curiosity for what lies beyond.",
        "",
        "Shrik doesn't iterate on the present.",
        "We engineer the infrastructure of what comes after."
      ]
    }
  ];

  return (
    <section
      id="what-we-do"
      ref={sectionRef}
      className="min-h-screen bg-black py-20 px-6 md:px-12 lg:px-20"
    >
      <div className={`w-full max-w-7xl mx-auto section-fade-in ${isVisible ? 'visible' : ''}`}>
        {/* Title */}
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={3}
          blurStrength={10}
          containerClassName="mb-16 text-center"
          textClassName="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-wide"
        >
          What we do?
        </ScrollReveal>
        
        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Top Left Card */}
          <div className="border border-white/30 rounded-2xl p-8 lg:p-10 hover:border-white/50 transition-colors duration-300">
            <h3 className="text-lg font-medium text-white mb-6">
              {services[0].title}
            </h3>
            <div className="space-y-3">
              {services[0].content.map((paragraph, index) => (
                paragraph ? (
                  <p key={index} className={`text-sm leading-relaxed ${
                    paragraph.startsWith('△') ? 'text-white/50 text-xs mt-2' : 'text-white/70'
                  }`}>
                    {paragraph}
                  </p>
                ) : (
                  <div key={index} className="h-2"></div>
                )
              ))}
            </div>
          </div>

          {/* Top Right Card - Spans 2 rows */}
          <div className="border border-white/30 rounded-2xl p-8 lg:p-10 hover:border-white/50 transition-colors duration-300 lg:row-span-2">
            <h3 className="text-lg font-medium text-white mb-6">
              {services[2].title}
            </h3>
            <div className="space-y-4">
              {services[2].content.map((paragraph, index) => (
                paragraph ? (
                  <p key={index} className="text-white/70 text-sm leading-relaxed">
                    {paragraph}
                  </p>
                ) : (
                  <div key={index} className="h-2"></div>
                )
              ))}
            </div>
          </div>

          {/* Bottom Left Card */}
          <div className="border border-white/30 rounded-2xl p-8 lg:p-10 hover:border-white/50 transition-colors duration-300">
            <h3 className="text-lg font-medium text-white mb-6">
              {services[1].title}
            </h3>
            <div className="space-y-3">
              {services[1].content.map((paragraph, index) => (
                paragraph ? (
                  <p key={index} className={`text-sm leading-relaxed ${
                    paragraph.startsWith('△') ? 'text-white/50 text-xs mt-2' : 'text-white/70'
                  }`}>
                    {paragraph}
                  </p>
                ) : (
                  <div key={index} className="h-2"></div>
                )
              ))}
            </div>
          </div>
        </div>

        {/* Optional: Subtle indicator dots at the top center */}
        <div className="flex justify-center mt-16 space-x-3">
          <div className="w-2 h-2 rounded-full bg-white/60"></div>
          <div className="w-2 h-2 rounded-full bg-white/30"></div>
          <div className="w-2 h-2 rounded-full bg-white/15"></div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
