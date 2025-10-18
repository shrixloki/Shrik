import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';

const Home = () => {
  return (
    <div className="w-full bg-black">
      <Navigation />
      <main className="relative">
        <Hero />
      </main>
    </div>
  );
};

export default Home;
