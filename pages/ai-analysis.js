import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function AIAnalysis() {
  const [serviceAvailable, setServiceAvailable] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the simulator API is available
    const checkService = async () => {
      try {
        const response = await fetch('/api/MySimulator/model-modes', {
          method: 'GET',
        });
        // If we get here without error, service is available
        if (response.ok) {
          setServiceAvailable(true);
        } else {
          setServiceAvailable(false);
        }
      } catch (error) {
        setServiceAvailable(false);
      } finally {
        setLoading(false);
      }
    };

    checkService();
  }, []);

  const handleLaunchApp = () => {
    window.open('/MySimulator', '_blank');
  };

  return (
    <>
      <Head>
        <title>AI Supply Chain Analysis | Boston Manufacturing Group</title>
        <meta name="description" content="AI-powered supply chain disruption analysis and risk assessment system providing comprehensive intelligence and mitigation strategies." />
        <meta name="robots" content="index, follow" />
      </Head>

      <main className="bg-gray-900 min-h-screen font-sans">
        {/* Logo and Navigation */}
        <div className="flex justify-between items-center gap-4 pt-6 pb-2 px-8 bg-gray-800">
          <div className="flex items-center gap-4">
            <a href="/">
              <img src="/bmg-logo.png" alt="Boston Manufacturing Group logo" className="h-16 w-auto cursor-pointer" />
            </a>
            <a href="https://www.linkedin.com/company/boston-manufacturing-group/?viewAsMember=true" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="ml-2">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="6" fill="#0077B5"/>
                <path d="M10.666 13.333H13.333V22.667H10.666V13.333ZM12 11.333C12.7364 11.333 13.333 10.7364 13.333 10C13.333 9.2636 12.7364 8.66699 12 8.66699C11.2636 8.66699 10.667 9.2636 10.667 10C10.667 10.7364 11.2636 11.333 12 11.333ZM16 13.333H18.333V14.333C18.6667 13.6667 19.6667 13 21 13C23.3333 13 23.3333 14.6667 23.3333 16.6667V22.667H20.6667V17.333C20.6667 16.333 20.6667 15.333 19.3333 15.333C18 15.333 18 16.333 18 17.333V22.667H16V13.333Z" fill="white"/>
              </svg>
            </a>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="/" className="text-white hover:text-blue-300 transition duration-200">Home</a>
            <a href="/sourcing" className="text-white hover:text-blue-300 transition duration-200">Sourcing</a>
            <a href="/about" className="text-white hover:text-blue-300 transition duration-200">About</a>
            <a href="/contact" className="text-white hover:text-blue-300 transition duration-200">Contact</a>
          </nav>
        </div>

        {loading ? (
          // Loading State
          <div className="flex items-center justify-center min-h-[80vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-white text-xl">Checking service availability...</p>
            </div>
          </div>
        ) : serviceAvailable ? (
          // Service Available - Show Launch Option
          <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="bg-gradient-to-br from-blue-900 to-gray-800 rounded-2xl shadow-2xl p-12 text-center border-2 border-blue-500">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full text-lg font-semibold mb-6">
                  <span className="animate-pulse">✅</span>
                  Service Available
                </div>
                <h1 className="text-5xl font-bold text-white mb-4">AI Supply Chain Analysis</h1>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                  Revolutionary AI system that analyzes your Bill of Materials, historical KPIs, and market intelligence to generate realistic supply chain disruption scenarios and actionable mitigation strategies.
                </p>
              </div>

              <div className="space-y-6">
                <button
                  onClick={handleLaunchApp}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xl font-bold px-12 py-5 rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transition duration-300 transform hover:scale-105"
                >
                  🚀 Launch AI Analysis Tool
                </button>
                
                <p className="text-gray-400 text-sm">
                  This will open the AI Supply Chain Analysis application in a new tab
                </p>
              </div>

              <div className="mt-12 grid md:grid-cols-3 gap-6">
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="text-3xl mb-2">🧠</div>
                  <h3 className="text-lg font-semibold text-blue-300 mb-2">Advanced AI Analysis</h3>
                  <p className="text-gray-300 text-sm">Powered by cutting-edge AI engines for scenario generation</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="text-3xl mb-2">📊</div>
                  <h3 className="text-lg font-semibold text-blue-300 mb-2">Real-Time Intelligence</h3>
                  <p className="text-gray-300 text-sm">Dynamic market intelligence synthesis</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="text-3xl mb-2">🎯</div>
                  <h3 className="text-lg font-semibold text-blue-300 mb-2">Personalized Plans</h3>
                  <p className="text-gray-300 text-sm">Tailored mitigation strategies for your needs</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Service Not Available - Show Instructions
          <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-12 text-center border-2 border-blue-400">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 bg-yellow-500 text-yellow-900 px-6 py-3 rounded-full text-lg font-semibold mb-6">
                  <span className="animate-pulse">⚙️</span>
                  Simulator Not Running
                </div>
                <h1 className="text-5xl font-bold text-white mb-4">AI Supply Chain Analysis</h1>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                  Revolutionary AI system that analyzes your Bill of Materials, historical KPIs, and market intelligence to generate realistic supply chain disruption scenarios and actionable mitigation strategies.
                </p>
              </div>

              <div className="bg-gray-700 rounded-xl p-8 mb-8 max-w-4xl mx-auto text-left">
                <h2 className="text-2xl font-bold text-white mb-4">🚀 Start the Simulator</h2>
                <p className="text-gray-300 mb-4">
                  The AI Supply Chain Simulator is integrated into this project. To use it, you need to start the simulator server:
                </p>
                <div className="bg-gray-800 rounded-lg p-4 mb-4">
                  <h3 className="text-lg font-semibold text-blue-300 mb-2">Quick Start:</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-300 text-sm">
                    <li>Navigate to the <code className="bg-gray-900 px-2 py-1 rounded">simulator</code> directory</li>
                    <li>Install Python dependencies: <code className="bg-gray-900 px-2 py-1 rounded">pip install -r requirements.txt</code></li>
                    <li>Set up your OpenAI API key in <code className="bg-gray-900 px-2 py-1 rounded">ChatGPT.API.env</code></li>
                    <li>Run the simulator: <code className="bg-gray-900 px-2 py-1 rounded">python start.py</code></li>
                    <li>Or use the startup script: <code className="bg-gray-900 px-2 py-1 rounded">./start-simulator.sh</code></li>
                  </ol>
                </div>
                <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-500">
                  <p className="text-blue-200 text-sm">
                    <strong>Note:</strong> The simulator is integrated into the website and accessible at <code className="bg-gray-900 px-2 py-1 rounded">/MySimulator</code>. 
                    Click the button below to launch the application.
                  </p>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                <button
                  onClick={handleLaunchApp}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xl font-bold px-12 py-5 rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transition duration-300 transform hover:scale-105"
                >
                  🚀 Launch AI Analysis Tool
                </button>
                
                <p className="text-gray-400 text-sm">
                  This will open the AI Supply Chain Analysis application in a new tab (requires simulator to be running)
                </p>
              </div>

              <div className="bg-gray-700 rounded-xl p-8 mb-8 max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-6">What to Expect</h2>
                
                <div className="grid md:grid-cols-2 gap-6 text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white">🧠</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-300 mb-1">Advanced AI Analysis</h4>
                      <p className="text-gray-300 text-sm">Powered by cutting-edge AI engines with historical data integration and statistical risk modeling</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white">📊</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-300 mb-1">Real-Time Intelligence</h4>
                      <p className="text-gray-300 text-sm">Dynamic market intelligence synthesis with geopolitical, economic, and industry trend analysis</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white">🎯</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-300 mb-1">Personalized Mitigation Plans</h4>
                      <p className="text-gray-300 text-sm">User-context-aware action plans tailored to your constraints, priorities, and organizational needs</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white">🔍</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-300 mb-1">Comprehensive Analysis</h4>
                      <p className="text-gray-300 text-sm">Multi-tier component intelligence with supplier verification and alternative sourcing recommendations</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 mb-8 max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold text-white mb-4">System Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-700 rounded-lg">
                    <div className="text-3xl font-bold text-blue-400">5-7</div>
                    <div className="text-sm text-gray-300">Realistic Scenarios</div>
                  </div>
                  <div className="text-center p-4 bg-gray-700 rounded-lg">
                    <div className="text-3xl font-bold text-blue-400">10,000+</div>
                    <div className="text-sm text-gray-300">Components Supported</div>
                  </div>
                  <div className="text-center p-4 bg-gray-700 rounded-lg">
                    <div className="text-3xl font-bold text-blue-400">&lt;30s</div>
                    <div className="text-sm text-gray-300">Analysis Time</div>
                  </div>
                  <div className="text-center p-4 bg-gray-700 rounded-lg">
                    <div className="text-3xl font-bold text-blue-400">AI</div>
                    <div className="text-sm text-gray-300">Powered Intelligence</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white mb-4">Get Early Access</h3>
                <p className="text-gray-300 mb-6">
                  Want to be among the first to experience our revolutionary AI Supply Chain Analysis system? Contact us to discuss early access and how we can customize it for your specific needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="/contact" 
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold px-8 py-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition duration-300 shadow-lg"
                  >
                    Contact Us for Early Access
                  </a>
                  <a 
                    href="mailto:contact@boston-mfg.com?subject=AI Supply Chain Analysis - Early Access Request" 
                    className="bg-gray-700 text-white text-lg font-semibold px-8 py-4 rounded-lg hover:bg-gray-600 transition duration-300"
                  >
                    Email Us Directly
                  </a>
                </div>
              </div>

              <div className="mt-12 text-gray-400 text-sm">
                <p>📧 contact@boston-mfg.com | 📞 (617) 410-8155</p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <section className="py-8 px-4 bg-blue-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="border-t border-blue-800 pt-6">
              <p className="text-blue-200 mb-2">Boston Manufacturing Group - Your Partner from Prototype to Production</p>
              <p className="text-sm">© {new Date().getFullYear()} Boston Manufacturing Group. All rights reserved.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
