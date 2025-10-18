import { useEffect, useRef, useState } from 'react';
import ScrollReveal from './ScrollReveal';

const Services = () => {
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

  const services = [
    {
      title: 'AI Product Development',
      description: 'From ideation to deployment, we design intelligent systems built to scale.',
    },
    {
      title: 'Blockchain Solutions',
      description: 'Secure and autonomous cross-chain architecture.',
    },
    {
      title: 'Research & Innovation',
      description: 'Building tools that redefine how humans and AI collaborate.',
    },
  ];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-900 to-black py-32 px-6 relative"
    >
      <div className={`max-w-6xl mx-auto w-full section-fade-in ${isVisible ? 'visible' : ''}`}>
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={3}
          blurStrength={10}
          containerClassName="mb-16 text-center"
          textClassName="text-5xl md:text-6xl font-bold text-white tracking-tight"
        >
          Services We Provide.
        </ScrollReveal>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="border border-white/20 p-8 transition-all duration-500 hover:border-white/60 hover:-translate-y-2 hover:shadow-xl hover:shadow-white/10 group"
            >
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                {service.title}
              </h3>
              
              <p className="text-base text-white/70 leading-relaxed font-light">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
