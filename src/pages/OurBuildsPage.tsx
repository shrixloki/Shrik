import Navigation from '@/components/Navigation';
import OurBuilds from '@/components/OurBuilds';

const OurBuildsPage = () => {
  return (
    <div className="w-full bg-black min-h-screen">
      <Navigation />
      <main className="relative pt-20">
        <OurBuilds />
      </main>
    </div>
  );
};

export default OurBuildsPage;
