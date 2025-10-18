import ScrollReveal from './ScrollReveal';

const WhatWeDo = () => {
  return (
    <section
      id="what-we-do"
      className="relative w-full min-h-screen overflow-hidden bg-black"
    >
      <div className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-32">
        
        {/* 1️⃣ SECTION HEADER — IDENTITY */}
        <div className="text-center mb-32 md:mb-40">
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={0}
            blurStrength={4}
            containerClassName="mb-6"
            textClassName="!text-white !font-bold !tracking-tight !text-[clamp(3.5rem,5vw,5rem)] !leading-[1.2] !m-0"
            mode="words"
          >
            What We Do.
          </ScrollReveal>
          
          <ScrollReveal
            baseOpacity={0.1}
            enableBlur={true}
            baseRotation={0}
            blurStrength={3}
            containerClassName="mx-auto max-w-3xl"
            textClassName="!text-white/70 !font-light !text-[clamp(1.2rem,2vw,1.5rem)] !leading-[1.5] !m-0"
            mode="words"
          >
            We build, we design, and we collaborate — crafting the frameworks that define the next era of systems.
          </ScrollReveal>
        </div>

        {/* 2️⃣ CORE SECTION — THREE PILLARS */}
        
        {/* A. WE BUILD FOUNDATIONAL SYSTEMS */}
        <div className="relative mb-24 md:mb-32 min-h-[25vh] flex items-center">
          {/* Subtle vertical divider */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white/15" />
          
          <div className="pl-8 md:pl-12 max-w-4xl">
            <ScrollReveal
              baseOpacity={0.1}
              enableBlur={true}
              baseRotation={0}
              blurStrength={3}
              containerClassName="mb-6"
              textClassName="!text-white !font-bold !text-3xl md:!text-4xl !m-0"
              mode="words"
            >
              We Build Foundational Systems.
            </ScrollReveal>
            
            <ScrollReveal
              baseOpacity={0.2}
              enableBlur={true}
              baseRotation={0}
              blurStrength={2}
              textClassName="!text-white/80 !font-light !text-lg md:!text-xl !leading-relaxed !m-0"
              mode="words"
            >
              Intelligent frameworks and infrastructures that form the backbone of digital ecosystems. Every construct we create is engineered to scale with precision and permanence.
            </ScrollReveal>
          </div>
        </div>

        {/* B. WE COLLABORATE TO CREATE */}
        <div className="relative mb-24 md:mb-32 min-h-[25vh] flex items-center justify-end">
          {/* Subtle circular glow */}
          <div 
            className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-5 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)' }}
          />
          
          <div className="pr-8 md:pr-12 max-w-4xl text-right">
            <ScrollReveal
              baseOpacity={0.1}
              enableBlur={true}
              baseRotation={0}
              blurStrength={3}
              containerClassName="mb-6"
              textClassName="!text-white !font-bold !text-3xl md:!text-4xl !m-0"
              mode="words"
            >
              We Collaborate to Create.
            </ScrollReveal>
            
            <ScrollReveal
              baseOpacity={0.2}
              enableBlur={true}
              baseRotation={0}
              blurStrength={2}
              textClassName="!text-white/80 !font-light !text-lg md:!text-xl !leading-relaxed !m-0"
              mode="words"
            >
              Shrik works with engineers, creators, and organizations to craft production-grade systems — from autonomous AI frameworks to full-scale digital platforms. Vision, architecture, and precision define every partnership.
            </ScrollReveal>
          </div>
        </div>

        {/* C. WE CRAFT WHAT COMES NEXT */}
        <div className="relative mb-32 md:mb-40 min-h-[25vh] flex items-center justify-center">
          {/* Neural grid backdrop */}
          <div 
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
          
          <div className="text-center max-w-4xl px-4 relative z-10">
            <ScrollReveal
              baseOpacity={0.1}
              enableBlur={true}
              baseRotation={0}
              blurStrength={3}
              containerClassName="mb-6"
              textClassName="!text-white !font-bold !text-3xl md:!text-4xl !m-0"
              mode="words"
            >
              We Craft What Comes Next.
            </ScrollReveal>
            
            <ScrollReveal
              baseOpacity={0.2}
              enableBlur={true}
              baseRotation={0}
              blurStrength={2}
              textClassName="!text-white/80 !font-light !text-lg md:!text-xl !leading-relaxed !m-0"
              mode="words"
            >
              We design intelligent architectures that learn, adapt, and endure. Not chasing trends — but defining trajectories. Shaping environments where intelligence evolves and systems think.
            </ScrollReveal>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhatWeDo;
