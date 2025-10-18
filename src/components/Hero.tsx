import Hyperspeed from './Hyperspeed';
import ScrollReveal from './ScrollReveal';

const Hero = () => {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden" style={{ background: 'transparent', margin: 0 }}>
      <Hyperspeed />
      <div className="relative z-10 text-center px-6 hero-text-animate">
        <h1 className="text-7xl md:text-8xl font-thin text-white mb-8 tracking-wider font-mono">
          Shrik
        </h1>

        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={2}
          blurStrength={8}
          containerClassName="mb-6"
          textClassName="text-xl md:text-2xl font-extralight text-white/95 tracking-widest uppercase font-sans"
        >
          Authors of the Frameworks That Shape the Next Era.
        </ScrollReveal>

        <ScrollReveal
          baseOpacity={0.1}
          enableBlur={true}
          baseRotation={1}
          blurStrength={6}
          containerClassName=""
          textClassName="text-base md:text-lg text-white/75 font-light tracking-wide max-w-3xl mx-auto leading-loose font-sans"
        >
          Shrik builds the invisible frameworks that sustain cognition, structure, and motion. Each construct we author fortifies the logic that holds the digital world together. We don't follow structure. We define it.
        </ScrollReveal>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] rounded-full flex items-start justify-center p-2 backdrop-blur-sm">
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
