import Head from 'next/head';
import { useState } from 'react';

export default function Contact() {
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      company: formData.get('company'),
      title: formData.get('title'),
      inquiry: formData.get('inquiry'),
      projectStage: formData.get('projectStage') || '',
      message: formData.get('message'),
      consent: formData.get('consent') === 'on'
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setFormStatus({
          type: 'success',
          message: result.message
        });
        // Reset form
        e.target.reset();
        // Track analytics event
        if (typeof gtag !== 'undefined') {
          gtag('event', 'form_submit', {
            event_category: 'engagement',
            event_label: 'contact_form',
            value: 1
          });
        }
      } else {
        throw new Error(result.detail || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus({
        type: 'error',
        message: 'Unable to submit your request. Please try again or contact us directly at contact@boston-mfg.com.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us - Boston Manufacturing Group</title>
        <meta name="description" content="Contact Boston Manufacturing Group for expert manufacturing consulting, global sourcing, and production optimization. Get your free consultation today." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <img src="/bmg-logo.png" alt="Boston Manufacturing Group" className="h-12 w-auto mr-3" />
                <span className="text-2xl font-bold text-primary">Boston Manufacturing Group</span>
              </div>
              <div className="hidden md:flex space-x-6">
                <a href="/" className="text-gray-700 hover:text-primary transition duration-200">Home</a>
                <a href="/sourcing" className="text-gray-700 hover:text-primary transition duration-200">Sourcing</a>
                <a href="/reports" className="text-gray-700 hover:text-primary transition duration-200">Reports</a>
                <a href="/about" className="text-gray-700 hover:text-primary transition duration-200">About</a>
                <a href="/contact" className="text-primary font-semibold">Contact</a>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Manufacturing Operations?</h1>
            <p className="text-xl mb-4">BMG provides manufacturing and AI consulting services to companies looking to optimize their operations, reduce costs, and scale production.</p>
            <p className="text-lg text-blue-200 mb-8">We work with COOs, Engineering Managers, and Manufacturing Leaders who need expert guidance from prototype to high-volume production.</p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Our Manufacturing Experts</h2>
                
                {/* Status Message */}
                {formStatus.message && (
                  <div className={`p-4 rounded-lg mb-6 ${
                    formStatus.type === 'success' 
                      ? 'bg-green-100 border border-green-400 text-green-700' 
                      : 'bg-red-100 border border-red-400 text-red-700'
                  }`}>
                    <div className="flex">
                      <div className="flex-shrink-0">
                        {formStatus.type === 'success' ? (
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">{formStatus.message}</p>
                      </div>
                    </div>
                  </div>
                )}

                <form id="contactForm" className="space-y-4" onSubmit={(e) => handleFormSubmit(e)}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                      <input type="text" id="firstName" name="firstName" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Your first name" />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                      <input type="text" id="lastName" name="lastName" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Your last name" />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Business Email *</label>
                    <input type="email" id="email" name="email" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="your.name@company.com" />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                    <input type="text" id="company" name="company" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Your company name" />
                  </div>
                  
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Your Role/Title *</label>
                    <input type="text" id="title" name="title" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., COO, Engineering Manager, VP Manufacturing" />
                  </div>
                  
                  <div>
                    <label htmlFor="inquiry" className="block text-sm font-medium text-gray-700 mb-1">I am interested in: *</label>
                    <select id="inquiry" name="inquiry" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">Please select your primary interest</option>
                      <option value="ai-supply-chain">AI Supply Chain Disruption Analysis</option>
                      <option value="manufacturing-consulting">Manufacturing Operations Consulting</option>
                      <option value="global-sourcing">Global Sourcing & Supplier Management</option>
                      <option value="quality-control">Quality Control & Process Improvement</option>
                      <option value="prototype-production">Prototype to Production Support</option>
                      <option value="general-consultation">General Manufacturing Consultation</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="projectStage" className="block text-sm font-medium text-gray-700 mb-1">Current Project Stage</label>
                    <select id="projectStage" name="projectStage" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">Select current stage (optional)</option>
                      <option value="concept">Concept/Design Phase</option>
                      <option value="prototype">Prototype Development</option>
                      <option value="pilot">Pilot Production</option>
                      <option value="scaling">Scaling/Volume Production</option>
                      <option value="operational">Ongoing Operations Optimization</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Project Details *</label>
                    <textarea id="message" name="message" required rows="4" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Briefly describe your manufacturing challenge, project goals, and how BMG can help..."></textarea>
                  </div>
                  
                  <div className="flex items-start">
                    <input type="checkbox" id="consent" name="consent" required className="mt-1 mr-2" />
                    <label htmlFor="consent" className="text-sm text-gray-600">I confirm that I represent a company seeking manufacturing consulting services (not a vendor/supplier) and consent to being contacted by BMG about our manufacturing solutions. *</label>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`w-full font-semibold py-3 px-6 rounded-lg transition duration-200 ${
                      isSubmitting 
                        ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending Request...
                      </div>
                    ) : (
                      'Request Consultation'
                    )}
                  </button>
                  
                  {/* Response Time Info */}
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                      <span className="inline-flex items-center">
                        <svg className="w-4 h-4 mr-1 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        We'll respond within 24-48 hours
                      </span>
                    </p>
                  </div>
                </form>
              </div>
              
              {/* Contact Information & What to Expect */}
              <div className="space-y-6">
                {/* Direct Contact Info */}
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Direct Contact</h3>
                  <div className="space-y-3">
                    <p className="font-semibold text-gray-700">📧 Email: <a href="mailto:contact@boston-mfg.com" className="text-blue-600 underline hover:text-blue-800">contact@boston-mfg.com</a></p>
                    <p className="font-semibold text-gray-700">📞 Phone: <a href="tel:16174108155" className="text-blue-600 underline hover:text-blue-800">(617) 410-8155</a></p>
                    <p className="text-gray-600 text-sm">Business hours: Monday-Friday, 9 AM - 5 PM EST</p>
                  </div>
                </div>
                
                {/* What to Expect */}
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">What to Expect</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start"><span className="mr-2 text-green-600">✓</span>Initial consultation within 24-48 hours</li>
                    <li className="flex items-start"><span className="mr-2 text-green-600">✓</span>Detailed assessment of your manufacturing challenges</li>
                    <li className="flex items-start"><span className="mr-2 text-green-600">✓</span>Customized proposal with clear next steps</li>
                    <li className="flex items-start"><span className="mr-2 text-green-600">✓</span>Access to our global manufacturing network</li>
                    <li className="flex items-start"><span className="mr-2 text-green-600">✓</span>Ongoing partnership and support</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-blue-900 text-white py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center border-t border-blue-800 pt-6">
              <p className="text-blue-200 mb-2">Boston Manufacturing Group - Your Partner from Prototype to Production</p>
              <p className="text-sm">© {new Date().getFullYear()} Boston Manufacturing Group. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>

      <script src="https://cdn.tailwindcss.com"></script>
      <script dangerouslySetInnerHTML={{
        __html: `
          tailwind.config = {
            theme: {
              extend: {
                fontFamily: {
                  'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
                },
                colors: {
                  primary: '#c1272d',
                  secondary: '#2a4e7e',
                  accent: '#3a3a3a',
                  background: '#ffffff',
                }
              }
            }
          }
        `
      }} />
    </>
  );
}
