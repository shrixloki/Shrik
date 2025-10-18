import { useEffect, useRef, useState } from 'react';
import ScrollReveal from './ScrollReveal';

const Team = () => {
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

  const team = [
    {
      role: 'Founder',
      name: 'Visionary Lead',
      philosophy: '"We don\'t build products. We build possibilities."',
    },
    {
      role: 'Co-Founder',
      name: 'Technical Architect',
      philosophy: '"Intelligence is not artificial when it serves a real purpose."',
    },
  ];

  return (
    <section
      id="team"
      ref={sectionRef}
      className="section py-24 md:py-32 flex items-center justify-center px-6 relative"
    >
      <div className={`max-w-6xl mx-auto w-full section-fade-in ${isVisible ? 'visible' : ''}`}>
        <div className="text-center mb-16">
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={3}
            blurStrength={10}
            containerClassName="mb-4"
            textClassName="text-5xl md:text-6xl font-bold text-white tracking-tight"
          >
            The Collective.
          </ScrollReveal>
          <ScrollReveal
            baseOpacity={0.2}
            enableBlur={true}
            baseRotation={1}
            blurStrength={6}
            containerClassName=""
            textClassName="text-xl text-white/60 font-light tracking-wide"
          >
            The Minds Behind Shrik.
          </ScrollReveal>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {team.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-white/[0.08] to-white/[0.02] mb-6 transition-all duration-500 group-hover:scale-105 group-hover:from-white/[0.12] group-hover:to-white/[0.04] flex items-center justify-center backdrop-blur-sm">
                <div className="text-6xl font-bold text-white/20">
                  {member.role[0]}
                </div>
              </div>
              
              <div className="text-sm font-medium text-white/50 tracking-widest mb-2">
                {member.role}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                {member.name}
              </h3>
              
              <p className="text-lg text-white/70 italic font-light leading-relaxed max-w-sm">
                {member.philosophy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
