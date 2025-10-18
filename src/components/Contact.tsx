import { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

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
      className="min-h-screen flex items-center justify-center bg-white py-24 px-6"
    >
      <div className={`max-w-2xl mx-auto w-full section-fade-in ${isVisible ? 'visible' : ''}`}>
        <h2 className="text-5xl md:text-6xl font-bold text-black mb-6 text-center tracking-tight">
          Contact Us.
        </h2>
        
        <p className="text-xl text-black/60 text-center mb-12 font-light">
          We'd love to collaborate or discuss future partnerships.
        </p>
        
        <form className="space-y-6 mb-16">
          <div>
            <input
              type="text"
              placeholder="Name"
              className="w-full px-0 py-3 bg-transparent border-b-2 border-black/20 focus:border-black outline-none transition-colors text-black placeholder:text-black/40"
            />
          </div>
          
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-0 py-3 bg-transparent border-b-2 border-black/20 focus:border-black outline-none transition-colors text-black placeholder:text-black/40"
            />
          </div>
          
          <div>
            <textarea
              placeholder="Message"
              rows={4}
              className="w-full px-0 py-3 bg-transparent border-b-2 border-black/20 focus:border-black outline-none transition-colors resize-none text-black placeholder:text-black/40"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-black text-white py-4 font-medium tracking-wide transition-all duration-300 hover:bg-white hover:text-black border-2 border-black"
          >
            Submit
          </button>
        </form>
        
        <div className="text-center">
          <p className="text-sm text-black/60 mb-4 tracking-wide">
            © Shrik 2025 — Intelligence for the Creators.
          </p>
          
          <div className="flex justify-center gap-6">
            <a
              href="#"
              className="text-black/60 hover:text-black transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-black/60 hover:text-black transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-black/60 hover:text-black transition-colors"
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
