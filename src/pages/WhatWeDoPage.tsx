import Navigation from '@/components/Navigation';
import WhatWeDo from '@/components/WhatWeDo';

const WhatWeDoPage = () => {
  return (
    <div className="w-full bg-black min-h-screen">
      <Navigation />
      <main className="relative pt-20">
        <WhatWeDo />
      </main>
    </div>
  );
};

export default WhatWeDoPage;
