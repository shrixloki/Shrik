import { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const Contact = () => {
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

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section py-24 md:py-32 flex items-center justify-center px-6 relative"
    >
      <div className={`max-w-2xl mx-auto w-full section-fade-in ${isVisible ? 'visible' : ''}`}>
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={3}
          blurStrength={10}
          containerClassName="mb-6 text-center"
          textClassName="text-5xl md:text-6xl font-bold text-white tracking-tight"
        >
          Contact Us.
        </ScrollReveal>
        
        <ScrollReveal
          baseOpacity={0.2}
          enableBlur={true}
          baseRotation={1}
          blurStrength={6}
          containerClassName="mb-12 text-center"
          textClassName="text-xl text-white/60 font-light"
        >
          We'd love to collaborate or discuss future partnerships.
        </ScrollReveal>
        
        <form className="space-y-8 mb-16">
          <div className="relative">
            <input
              type="text"
              placeholder="Name"
              className="w-full px-6 py-4 bg-white/[0.03] backdrop-blur-sm rounded-2xl focus:bg-white/[0.06] outline-none transition-all duration-300 text-white placeholder:text-white/50 focus:placeholder:text-white/70"
            />
          </div>
          
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-6 py-4 bg-white/[0.03] backdrop-blur-sm rounded-2xl focus:bg-white/[0.06] outline-none transition-all duration-300 text-white placeholder:text-white/50 focus:placeholder:text-white/70"
            />
          </div>
          
          <div className="relative">
            <textarea
              placeholder="Message"
              rows={4}
              className="w-full px-6 py-4 bg-white/[0.03] backdrop-blur-sm rounded-2xl focus:bg-white/[0.06] outline-none transition-all duration-300 resize-none text-white placeholder:text-white/50 focus:placeholder:text-white/70"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm text-white py-4 font-medium tracking-wide rounded-2xl transition-all duration-300 hover:from-white hover:to-white/90 hover:text-black"
          >
            Submit
          </button>
        </form>
        
        <div className="text-center">
          <p className="text-sm text-white/60 mb-4 tracking-wide">
            © Shrik 2025 — Intelligence for the Creators.
          </p>
          
          <div className="flex justify-center gap-6">
            <a
              href="#"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
