'use client';

import { useState, FormEvent } from 'react';

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formState.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-graph-900 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-accent/5 via-transparent to-transparent blur-3xl" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-radial from-violet/5 via-transparent to-transparent blur-3xl" />
      
      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle mx-auto">
              Have a project in mind or want to discuss graph algorithms? I'd love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="glass-card p-6">
                <h3 className="font-display text-lg font-semibold text-graph-100 mb-6">Let's Connect</h3>
                <div className="space-y-4">
                  <a href="mailto:you@example.com" className="flex items-center gap-4 p-4 rounded-lg bg-graph-700/30 hover:bg-accent/10 border border-transparent hover:border-accent/30 transition-all group">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-graph-400">Email</p>
                      <p className="text-graph-200 group-hover:text-accent transition-colors">you@example.com</p>
                    </div>
                  </a>
                  <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-lg bg-graph-700/30 hover:bg-accent/10 border border-transparent hover:border-accent/30 transition-all group">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-graph-400">GitHub</p>
                      <p className="text-graph-200 group-hover:text-accent transition-colors">@yourusername</p>
                    </div>
                  </a>
                </div>
              </div>
              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-graph-200">San Francisco Bay Area</span>
                </div>
                <p className="text-sm text-graph-400">Open to remote opportunities worldwide.</p>
              </div>
            </div>

            <div className="glass-card p-6 md:p-8">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-graph-100 mb-2">Message Sent!</h3>
                  <p className="text-graph-400">Thanks for reaching out. I'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-graph-200 mb-2">Name</label>
                    <input type="text" id="name" value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} className={`input ${errors.name ? 'border-red-500' : ''}`} placeholder="Your name" />
                    {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-graph-200 mb-2">Email</label>
                    <input type="email" id="email" value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} className={`input ${errors.email ? 'border-red-500' : ''}`} placeholder="you@example.com" />
                    {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-graph-200 mb-2">Message</label>
                    <textarea id="message" rows={5} value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })} className={`textarea ${errors.message ? 'border-red-500' : ''}`} placeholder="Tell me about your project..." />
                    {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
                  </div>
                  <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-50">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
