import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    
    // If we're on the home page, scroll to section
    if (location.pathname === '/') {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Navigate to home page, then scroll to section
      navigate('/');
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const navItems = [
    { name: 'Home', sectionId: 'hero' },
    { name: 'What We Do', sectionId: 'what-we-do' },
    { name: 'Our Builds', sectionId: 'our-builds' },
    { name: 'Team', sectionId: 'team' },
    { name: 'Contact', sectionId: 'contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-transparent backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-center items-center">
          <ul className="flex gap-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={`#${item.sectionId}`}
                  onClick={(e) => handleNavClick(e, item.sectionId)}
                  className="text-sm font-medium tracking-wide transition-colors duration-200 relative group text-white hover:text-white/70 cursor-pointer"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
