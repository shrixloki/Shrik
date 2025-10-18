import { useEffect, useRef, useState } from 'react';
import InfiniteMenu from './InfiniteMenu';
import './OurBuilds.css';

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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const builds = [
    {
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop&q=80&sat=-100',
      link: '#',
      title: 'Loki AI',
      description: 'Cross-chain Intelligence — Seamless blockchain operations powered by AI agents and biometric security.'
    },
    {
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80&sat=-100',
      link: '#',
      title: 'ShrikDB',
      description: 'Intelligent Database — Next-generation database architecture with AI-driven optimization.'
    },
    {
      image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop&q=80&sat=-100',
      link: '#',
      title: 'Neural Framework',
      description: 'Advanced neural architectures that learn, adapt, and scale with your infrastructure.'
    },
    {
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80&sat=-100',
      link: '#',
      title: 'Quantum Bridge',
      description: 'Bridging classical and quantum computing paradigms for next-generation applications.'
    }
  ];

  return (
    <section
      id="builds"
      ref={sectionRef}
      className={`builds-section ${isVisible ? 'visible' : ''}`}
    >
      {/* Centered Content Container */}
      <div className="builds-container">
        
        {/* Hero Block - Top Third */}
        <div className="builds-hero">
          <h2 className="builds-title">Our Builds.</h2>
          <p className="builds-subtitle">
            Drag to explore our intelligent frameworks and systems
          </p>
        </div>
        
        {/* 3D Interactive Visualization - Centered */}
        <div className="builds-canvas">
          <InfiniteMenu items={builds} />
        </div>
        
      </div>
      
      {/* Bottom Gradient Overlay - Grounds the Scene */}
      <div className="builds-gradient-overlay"></div>
      
      {/* Subtle Section Divider */}
      <div className="builds-divider"></div>
    </section>
  );
};

export default OurBuilds;
