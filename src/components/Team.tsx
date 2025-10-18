import { useEffect, useRef, useState } from 'react';

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
      className="min-h-screen flex items-center justify-center bg-white py-24 px-6"
    >
      <div className={`max-w-6xl mx-auto w-full section-fade-in ${isVisible ? 'visible' : ''}`}>
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-black mb-4 tracking-tight">
            The Collective.
          </h2>
          <p className="text-xl text-black/60 font-light tracking-wide">
            The Minds Behind Shrik.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {team.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-48 h-48 rounded-full bg-black/5 border-2 border-black/10 mb-6 transition-all duration-500 group-hover:scale-105 group-hover:border-black/30 flex items-center justify-center">
                <div className="text-6xl font-bold text-black/20">
                  {member.role[0]}
                </div>
              </div>
              
              <div className="text-sm font-medium text-black/50 tracking-widest mb-2">
                {member.role}
              </div>
              
              <h3 className="text-2xl font-bold text-black mb-4 tracking-tight">
                {member.name}
              </h3>
              
              <p className="text-lg text-black/70 italic font-light leading-relaxed max-w-sm">
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
