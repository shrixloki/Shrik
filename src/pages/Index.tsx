import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import WhatWeDo from '@/components/WhatWeDo';
import OurBuilds from '@/components/OurBuilds';
import Team from '@/components/Team';
import Contact from '@/components/Contact';
import SectionDivider from '@/components/SectionDivider';

const Index = () => {
  return (
    <div className="w-full" style={{ background: 'transparent' }}>
      <Navigation />
      <main className="relative">
        <Hero />
        <WhatWeDo />
        <OurBuilds />
        <Team />
        
        {/* Intentional divider for elegant separation */}
        <SectionDivider />
        
        <Contact />
      </main>
    </div>
  );
};

export default Index;
