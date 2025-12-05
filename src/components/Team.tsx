import ScrollReveal from './ScrollReveal';

const Team = () => {
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
      className="relative w-full min-h-screen bg-black overflow-hidden"
    >
      <div className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-32">
        
        {/* Header */}
        <div className="text-center mb-20 md:mb-32">
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={0}
            blurStrength={4}
            containerClassName="mb-4"
            textClassName="!text-white !font-bold !tracking-tight !text-5xl md:!text-6xl !m-0"
            mode="words"
          >
            The Collective.
          </ScrollReveal>
          <ScrollReveal
            baseOpacity={0.2}
            enableBlur={true}
            baseRotation={0}
            blurStrength={3}
            textClassName="!text-white/60 !font-light !tracking-wide !text-xl !m-0"
            mode="words"
          >
            The Minds Behind Shrik.
          </ScrollReveal>
        </div>
        
        {/* Team Members */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-20 mb-32 md:mb-40">
          {team.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-56 h-56 rounded-full bg-gradient-to-br from-white/[0.08] to-white/[0.02] mb-8 transition-all duration-500 group-hover:scale-105 group-hover:from-white/[0.12] group-hover:to-white/[0.04] flex items-center justify-center backdrop-blur-sm border border-white/5">
                <div className="text-7xl font-bold text-white/20">
                  {member.role[0]}
                </div>
              </div>
              
              <div className="text-xs font-medium text-white/40 tracking-[0.3em] mb-3 uppercase">
                {member.role}
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">
                {member.name}
              </h3>
              
              <p className="text-lg md:text-xl text-white/70 italic font-light leading-relaxed max-w-md">
                {member.philosophy}
              </p>
            </div>
          ))}
        </div>

        {/* Philosophy Section */}
        <div className="text-center max-w-4xl mx-auto mb-32 md:mb-40">
          <div className="w-32 h-px bg-white/10 mx-auto mb-12" />
          
          <ScrollReveal
            baseOpacity={0.1}
            enableBlur={true}
            baseRotation={0}
            blurStrength={3}
            containerClassName="mb-8"
            textClassName="!text-white !font-bold !text-3xl md:!text-4xl !m-0"
            mode="words"
          >
            Built on Vision. Driven by Purpose.
          </ScrollReveal>
          
          <ScrollReveal
            baseOpacity={0.2}
            enableBlur={true}
            baseRotation={0}
            blurStrength={2}
            textClassName="!text-white/70 !font-light !text-lg md:!text-xl !leading-relaxed !m-0"
            mode="words"
          >
            Shrik isn't just a company — it's a philosophy. We are engineers, thinkers, and architects who believe in building systems that endure, frameworks that evolve, and intelligence that serves humanity. Every project we undertake is a step toward a more deliberate future.
          </ScrollReveal>
        </div>

        {/* Collaboration Call-to-Action */}
        <div className="text-center">
          <div className="inline-block px-8 py-4 border border-white/10 rounded-sm hover:border-white/20 transition-all duration-300 group cursor-pointer">
            <p className="text-white/60 font-light text-base md:text-lg tracking-wide group-hover:text-white/80 transition-colors">
              Interested in collaborating?{' '}
              <span className="text-white font-medium border-b border-white/30 group-hover:border-white/60 transition-colors">
                Let's build together
              </span>
            </p>
          </div>
          
          <div className="mt-16 flex items-center justify-center gap-2 text-white/30 text-sm">
            <div className="w-2 h-2 rounded-full bg-white/30" />
            <span>Remote-first</span>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <span>Global mindset</span>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <span>Purpose-driven</span>
            <div className="w-2 h-2 rounded-full bg-white/30" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
