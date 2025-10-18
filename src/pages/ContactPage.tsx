import Navigation from '@/components/Navigation';
import Contact from '@/components/Contact';

const ContactPage = () => {
  return (
    <div className="w-full bg-black min-h-screen">
      <Navigation />
      <main className="relative pt-20">
        <Contact />
      </main>
    </div>
  );
};

export default ContactPage;
