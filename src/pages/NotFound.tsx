import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-white">404</h1>
        <p className="mb-8 text-xl text-white/60">Oops! Page not found</p>
        <a href="/" className="inline-block px-8 py-3 bg-white text-black font-medium hover:bg-white/90 transition-all">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
