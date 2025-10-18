import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import WhatWeDo from '@/components/WhatWeDo';
import OurBuilds from '@/components/OurBuilds';
import Team from '@/components/Team';
import Services from '@/components/Services';
import Contact from '@/components/Contact';

const Index = () => {
  return (
    <div className="w-full">
      <Navigation />
      <main>
        <Hero />
        <WhatWeDo />
        <OurBuilds />
        <Team />
        <Services />
        <Contact />
      </main>
    </div>
  );
};

export default Index;
