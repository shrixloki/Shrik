import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import WhatWeDo from '@/components/WhatWeDo';
import OurBuilds from '@/components/OurBuilds';
import Team from '@/components/Team';
import Contact from '@/components/Contact';

const Home = () => {
  return (
    <div className="w-full bg-black">
      <Navigation />
      <main className="relative">
        <Hero />
        <WhatWeDo />
        <OurBuilds />
        <Team />
        <Contact />
      </main>
    </div>
  );
};

export default Home;
