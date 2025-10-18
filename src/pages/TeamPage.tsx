import Navigation from '@/components/Navigation';
import Team from '@/components/Team';

const TeamPage = () => {
  return (
    <div className="w-full bg-black min-h-screen">
      <Navigation />
      <main className="relative pt-20">
        <Team />
      </main>
    </div>
  );
};

export default TeamPage;
