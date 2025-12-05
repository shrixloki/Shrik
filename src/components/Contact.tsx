import { useState } from 'react';
import { Github, Linkedin, Twitter, Mail, Instagram, Send, Check, AlertCircle, Loader2 } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    setStatus('idle');
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors = { name: '', email: '', message: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    // Send email via Python backend
    setStatus('sending');
    
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }
      
      // Show success message
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Email send error:', error);
      setStatus('error');
      setErrorMessage('Failed to send message. Please try emailing us directly at shrik.devs@gmail.com');
      
      // Reset error message after 8 seconds
      setTimeout(() => {
        setStatus('idle');
        setErrorMessage('');
      }, 8000);
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen bg-black overflow-hidden"
    >
      <div className="relative w-full max-w-[1000px] mx-auto px-6 md:px-12 py-16 md:py-24">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={0}
            blurStrength={4}
            containerClassName="mb-3"
            textClassName="!text-white !font-bold !tracking-tight !text-5xl md:!text-6xl !m-0"
            mode="words"
          >
            Contact Us.
          </ScrollReveal>
          
          <ScrollReveal
            baseOpacity={0.2}
            enableBlur={true}
            baseRotation={0}
            blurStrength={3}
            textClassName="!text-white/60 !font-light !text-lg !m-0"
            mode="words"
          >
            We'd love to collaborate or discuss future partnerships.
          </ScrollReveal>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          
          {/* Left Column - Contact Form */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 tracking-tight">Send us a message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Success Message */}
              {status === 'success' && (
                <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 text-green-400 text-sm animate-in fade-in slide-in-from-top-2">
                  <Check className="w-4 h-4 flex-shrink-0" />
                  <span>Message sent successfully! We'll get back to you soon.</span>
                </div>
              )}

              {/* Error Message */}
              {status === 'error' && errorMessage && (
                <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-in fade-in slide-in-from-top-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  disabled={status === 'sending'}
                  className={`w-full px-5 py-3 bg-black border ${errors.name ? 'border-red-500/50' : 'border-white/10'} focus:border-white/20 outline-none transition-all duration-300 text-white placeholder:text-white/40 focus:placeholder:text-white/60 disabled:opacity-50 disabled:cursor-not-allowed`}
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name}
                  </p>
                )}
              </div>
              
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  disabled={status === 'sending'}
                  className={`w-full px-5 py-3 bg-black border ${errors.email ? 'border-red-500/50' : 'border-white/10'} focus:border-white/20 outline-none transition-all duration-300 text-white placeholder:text-white/40 focus:placeholder:text-white/60 disabled:opacity-50 disabled:cursor-not-allowed`}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </p>
                )}
              </div>
              
              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  rows={5}
                  disabled={status === 'sending'}
                  className={`w-full px-5 py-3 bg-black border ${errors.message ? 'border-red-500/50' : 'border-white/10'} focus:border-white/20 outline-none transition-all duration-300 resize-none text-white placeholder:text-white/40 focus:placeholder:text-white/60 disabled:opacity-50 disabled:cursor-not-allowed`}
                />
                {errors.message && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.message}
                  </p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-white text-black py-3 font-medium tracking-wide transition-all duration-300 hover:bg-white/90 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column - Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-6 tracking-tight">Get in touch</h3>
              
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full bg-black border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-white/20 transition-colors">
                  <Mail className="w-4 h-4 text-white/60" />
                </div>
                <a href="mailto:shrik.devs@gmail.com" className="text-white/80 font-light hover:text-white transition-colors">
                  shrik.devs@gmail.com
                </a>
              </div>
            </div>

            {/* Social Media Links */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 tracking-tight">Connect with us</h3>
              
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://x.com/shrxloki"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-black border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-white/20 transition-all duration-300 group"
                  aria-label="X (Twitter)"
                >
                  <Twitter className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="https://www.linkedin.com/in/laukik-rajput-95bb48300/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-black border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-white/20 transition-all duration-300 group"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="https://github.com/shrixloki"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-black border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-white/20 transition-all duration-300 group"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="https://www.instagram.com/shrik.devs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-black border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-white/20 transition-all duration-300 group"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="https://discord.gg/JPN6Cv5H"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-black border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-white/20 transition-all duration-300 group"
                  aria-label="Discord"
                >
                  <svg className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                </a>
                <a
                  href="https://www.reddit.com/user/ShrishLoki/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-black border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-white/20 transition-all duration-300 group"
                  aria-label="Reddit"
                >
                  <svg className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-12 border-t border-white/5">
          <p className="text-sm text-white/40 tracking-wide">
            © Shrik 2025 — Intelligence for the Creators.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
