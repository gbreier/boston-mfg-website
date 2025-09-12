import Head from 'next/head';

export default function Home() {

  return (
    <>
      <Head>
        <title>AI Manufacturing Consulting & Supply Chain Solutions | Boston Manufacturing Group</title>
        <meta name="description" content="Leading manufacturing consulting firm specializing in AI-powered supply chain disruption analysis, prototype to production support, intelligent sourcing, and quality control solutions for global manufacturers." />
        <meta name="keywords" content="AI manufacturing consulting, supply chain disruption analysis, prototype to production, manufacturing quality control, intelligent sourcing, Boston manufacturing, AI supply chain solutions" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://boston-mfg.com" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="AI Manufacturing Consulting & Supply Chain Solutions | Boston Manufacturing Group" />
        <meta property="og:description" content="Leading manufacturing consulting firm specializing in AI-powered supply chain disruption analysis, prototype to production support, and intelligent sourcing solutions." />
        <meta property="og:image" content="https://boston-mfg.com/bmg-logo.png" />
        <meta property="og:url" content="https://boston-mfg.com" />
        <meta property="og:site_name" content="Boston Manufacturing Group" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Manufacturing Consulting & Supply Chain Solutions | Boston Manufacturing Group" />
        <meta name="twitter:description" content="Leading manufacturing consulting firm specializing in AI-powered supply chain disruption analysis and prototype to production support." />
        <meta name="twitter:image" content="https://boston-mfg.com/bmg-logo.png" />
        
        {/* Structured Data - Organization */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Boston Manufacturing Group",
              "alternateName": "BMG",
              "url": "https://boston-mfg.com",
              "logo": "https://boston-mfg.com/bmg-logo.png",
              "description": "Leading manufacturing consulting firm specializing in AI-powered supply chain disruption analysis, prototype to production support, intelligent sourcing, and quality control solutions.",
              "foundingLocation": {
                "@type": "Place",
                "name": "Boston, Massachusetts, USA"
              },
              "areaServed": "Worldwide",
              "serviceType": ["Manufacturing Consulting", "Supply Chain Analysis", "Quality Control", "Sourcing Solutions", "AI Manufacturing Solutions"],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-617-410-8155",
                "email": "contact@boston-mfg.com",
                "contactType": "Customer Service",
                "availableLanguage": "English"
              },
              "sameAs": [
                "https://www.linkedin.com/company/boston-manufacturing-group/"
              ],
              "founder": [
                {
                  "@type": "Person",
                  "name": "Guy Breier",
                  "jobTitle": "Chief Executive Officer",
                  "alumniOf": ["Tel Aviv University", "Boston College"],
                  "worksFor": {
                    "@type": "Organization",
                    "name": "Boston Manufacturing Group"
                  }
                }
              ]
            })
          }}
        />
        
        {/* Structured Data - Local Business */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Boston Manufacturing Group",
              "image": "https://boston-mfg.com/bmg-logo.png",
              "url": "https://boston-mfg.com",
              "telephone": "+1-617-410-8155",
              "email": "contact@boston-mfg.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Boston",
                "addressRegion": "MA",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "42.3601",
                "longitude": "-71.0589"
              },
              "openingHours": "Mo-Fr 09:00-17:00",
              "priceRange": "$$$$",
              "serviceArea": {
                "@type": "Place",
                "name": "Worldwide"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Manufacturing Consulting Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "AI Supply Chain Disruption Analysis",
                      "description": "AI-powered analysis of Bill of Materials, historical KPIs, and market intelligence to generate realistic supply chain disruption scenarios and actionable mitigation strategies."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Intelligent Sourcing Solutions",
                      "description": "Global sourcing services for electronics, metals, plastics, motors, batteries, and complete assemblies with quality assurance."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Manufacturing Quality Control",
                      "description": "Comprehensive quality control measures and supplier audits to ensure products meet and exceed industry standards."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Prototype to Production Support",
                      "description": "End-to-end technical support guiding products from prototype phase through high-volume manufacturing."
                    }
                  }
                ]
              }
            })
          }}
        />
      </Head>
      <main className="bg-gray-900 min-h-screen font-sans">
        {/* Logo */}
        <div className="flex justify-center items-center gap-4 pt-6 pb-2 bg-gray-800">
          <img src="/bmg-logo.png" alt="Boston Manufacturing Group logo" className="h-16 w-auto" />
          <a href="https://www.linkedin.com/company/boston-manufacturing-group/?viewAsMember=true" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="ml-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="6" fill="#0077B5"/>
              <path d="M10.666 13.333H13.333V22.667H10.666V13.333ZM12 11.333C12.7364 11.333 13.333 10.7364 13.333 10C13.333 9.2636 12.7364 8.66699 12 8.66699C11.2636 8.66699 10.667 9.2636 10.667 10C10.667 10.7364 11.2636 11.333 12 11.333ZM16 13.333H18.333V14.333C18.6667 13.6667 19.6667 13 21 13C23.3333 13 23.3333 14.6667 23.3333 16.6667V22.667H20.6667V17.333C20.6667 16.333 20.6667 15.333 19.3333 15.333C18 15.333 18 16.333 18 17.333V22.667H16V13.333Z" fill="white"/>
            </svg>
          </a>
        </div>
        {/* Hero Section with Video Background */}
        <section className="relative h-[350px] md:h-[450px] flex items-center justify-center overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
            src="/manufacturing-bg.mp4"
          />
          <div className="relative z-10 w-full flex flex-col items-center justify-center h-full bg-secondary/60 text-white px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Boston Manufacturing Group</h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-6">Navigating the path from idea to production with world-class manufacturing solutions and support.</p>
            <div className="flex flex-col md:flex-row justify-center gap-4 mt-4">
              <a href="/contact" className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded shadow hover:bg-secondary transition">Contact Us</a>
              <a href="/reports" className="inline-block bg-secondary text-white font-semibold px-8 py-3 rounded shadow hover:bg-primary transition">View Reports</a>
              <a href="/sourcing" className="inline-block bg-accent text-white font-semibold px-8 py-3 rounded shadow hover:bg-primary transition">Sourcing</a>
              <a href="/about" className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded shadow hover:bg-secondary transition">About</a>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-12 px-4 max-w-5xl mx-auto" id="services">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-800 rounded-lg shadow p-6 text-white">
              <h3 className="text-xl font-semibold mb-2 text-blue-300">Intelligent Sourcing</h3>
              <p className="text-gray-300">We identify and procure the best materials and resources for your product, ensuring cost-effectiveness and quality.</p>
            </div>
            <div className="bg-gray-800 rounded-lg shadow p-6 text-white">
              <h3 className="text-xl font-semibold mb-2 text-blue-300">Technical Support</h3>
              <p className="text-gray-300">Our experts provide ongoing guidance throughout the manufacturing process, keeping your product development on track.</p>
            </div>
            <div className="bg-gray-800 rounded-lg shadow p-6 text-white">
              <h3 className="text-xl font-semibold mb-2 text-blue-300">Quality Control</h3>
              <p className="text-gray-300">Stringent quality control measures ensure your products meet and exceed industry standards.</p>
            </div>
            <div className="bg-gray-800 rounded-lg shadow p-6 border-2 border-blue-400 relative text-white">
              <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">Coming Soon</div>
              <h3 className="text-xl font-semibold mb-2 text-blue-300">AI Supply Chain Analysis</h3>
              <p className="text-gray-300">AI-powered disruption analysis and risk assessment system providing comprehensive supply chain intelligence and mitigation strategies.</p>
            </div>
          </div>
        </section>

        {/* AI Supply Chain Analysis System - Coming Soon */}
        <section className="py-16 px-4 bg-gradient-to-r from-gray-800 to-gray-700 border-t border-gray-600 border-b border-gray-600">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <span className="animate-pulse">🚀</span>
                Coming Soon
              </div>
                              <h2 className="text-4xl font-bold text-white mb-4">AI-Powered Supply Chain Disruption Analysis</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">Revolutionary AI system that analyzes your Bill of Materials, historical KPIs, and market intelligence to generate realistic supply chain disruption scenarios and actionable mitigation strategies.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
              <div>
                                 <h3 className="text-2xl font-bold text-white mb-6">Key Capabilities</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm">🧠</span>
                    </div>
                    <div>
                                             <h4 className="font-semibold text-blue-300">Advanced AI Analysis</h4>
                       <p className="text-gray-300">Advanced AI Engines powered scenario generation with historical data integration and statistical risk modeling</p>
                     </div>
                   </div>
                   <div className="flex items-start gap-3">
                     <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                       <span className="text-white text-sm">📊</span>
                     </div>
                     <div>
                       <h4 className="font-semibold text-blue-300">Real-Time Intelligence</h4>
                       <p className="text-gray-300">Dynamic market intelligence synthesis with geopolitical, economic, and industry trend analysis</p>
                     </div>
                   </div>
                   <div className="flex items-start gap-3">
                     <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                       <span className="text-white text-sm">🎯</span>
                     </div>
                     <div>
                       <h4 className="font-semibold text-blue-300">Personalized Mitigation Plans</h4>
                       <p className="text-gray-300">User-context-aware action plans tailored to your constraints, priorities, and organizational needs</p>
                     </div>
                   </div>
                   <div className="flex items-start gap-3">
                     <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                       <span className="text-white text-sm">🔍</span>
                     </div>
                     <div>
                       <h4 className="font-semibold text-blue-300">Comprehensive Component Analysis</h4>
                       <p className="text-gray-300">Multi-tier component intelligence with supplier verification and alternative sourcing recommendations</p>
                    </div>
                  </div>
                </div>
              </div>
              
                             <div className="bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-600">
                 <h3 className="text-2xl font-bold text-white mb-6">System Features</h3>
                <div className="grid grid-cols-2 gap-4">
                                     <div className="text-center p-4 bg-gray-700 rounded-lg">
                     <div className="text-2xl font-bold text-blue-400">5-7</div>
                     <div className="text-sm text-gray-300">Realistic Scenarios</div>
                   </div>
                   <div className="text-center p-4 bg-gray-700 rounded-lg">
                     <div className="text-2xl font-bold text-blue-400">10,000+</div>
                     <div className="text-sm text-gray-300">Components Supported</div>
                   </div>
                   <div className="text-center p-4 bg-gray-700 rounded-lg">
                     <div className="text-2xl font-bold text-blue-400">&lt;30s</div>
                     <div className="text-sm text-gray-300">Analysis Time</div>
                   </div>
                   <div className="text-center p-4 bg-gray-700 rounded-lg">
                     <div className="text-2xl font-bold text-blue-400">AI</div>
                     <div className="text-sm text-gray-300">Powered Intelligence</div>
                   </div>
                </div>
                
                                 <div className="mt-6 p-4 bg-gray-600 border border-gray-500 rounded-lg">
                   <h4 className="font-semibold text-blue-300 mb-2">📋 What You Can Analyze:</h4>
                   <ul className="text-sm text-gray-200 space-y-1">
                     <li>• Bill of Materials (BOM) Data</li>
                     <li>• Historical KPI Performance</li>
                     <li>• Supply Chain Context & Concerns</li>
                     <li>• Component Risk Assessments</li>
                   </ul>
                 </div>
              </div>
            </div>
            
                         <div className="bg-gray-800 rounded-xl p-8 shadow-lg border-l-8 border-blue-500">
               <div className="text-center">
                 <h3 className="text-2xl font-bold text-white mb-4">Fully Customizable to Your Needs</h3>
                 <p className="text-lg text-gray-300 mb-6 max-w-4xl mx-auto">Our AI Supply Chain Analysis System can be tailored to your specific industry, component types, supplier networks, and risk tolerance levels. Whether you're in electronics, automotive, medical devices, or any other manufacturing sector, we customize the analysis parameters, risk factors, and mitigation strategies to match your unique requirements.</p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                                     <div className="text-center">
                     <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                       <span className="text-2xl">⚙️</span>
                     </div>
                     <h4 className="font-semibold text-blue-300 mb-2">Custom Risk Parameters</h4>
                     <p className="text-sm text-gray-300">Tailored to your industry and component categories</p>
                   </div>
                   <div className="text-center">
                     <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                       <span className="text-2xl">🎯</span>
                     </div>
                     <h4 className="font-semibold text-blue-300 mb-2">Industry-Specific Analysis</h4>
                     <p className="text-sm text-gray-300">Customized scenarios based on your sector's unique challenges</p>
                   </div>
                   <div className="text-center">
                     <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                       <span className="text-2xl">📈</span>
                     </div>
                     <h4 className="font-semibold text-blue-300 mb-2">Personalized Mitigation</h4>
                     <p className="text-sm text-gray-300">Action plans adapted to your team size and constraints</p>
                   </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-6">
                  <h4 className="text-xl font-bold mb-3">Want to Learn More?</h4>
                  <p className="mb-4">This revolutionary system is launching soon. Contact us to discuss how we can customize it for your specific supply chain challenges and get early access information.</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a href="/contact" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">Contact Us About AI Analysis</a>
                    <a href="mailto:contact@boston-mfg.com?subject=AI Supply Chain Analysis Inquiry" className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-400 transition">Request Early Access Info</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sourcing Capabilities */}
        <section className="py-16 px-4 bg-gray-800 border-t border-gray-600 border-b border-gray-600">
          <h2 className="text-3xl font-bold text-center mb-10 text-white">Sourcing Capabilities</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
                          <div>
                <h4 className="font-semibold text-blue-300 mb-2">Electronics</h4>
                <ul className="list-disc list-inside text-gray-300">
                  <li>PCBA</li>
                  <li>Electronic components</li>
                  <li>Cable systems</li>
                  <li>Power supplies</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-300 mb-2">Metals & Plastics</h4>
                <ul className="list-disc list-inside text-gray-300">
                  <li>Precision machining</li>
                  <li>Stamping, castings, welding</li>
                  <li>Injection molding, 3D printing</li>
                  <li>Vacuum forming, extrusion</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-300 mb-2">Motors, Batteries, Assemblies</h4>
                <ul className="list-disc list-inside text-gray-300">
                  <li>BLDC, universal, induction motors</li>
                  <li>Li-Ion, Ni-MH, Lead-Acid batteries</li>
                  <li>Final assemblies & contract manufacturing</li>
                </ul>
              </div>
          </div>

          {/* Global Manufacturing Network Map */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-700 rounded-xl p-8 shadow-lg border-l-8 border-blue-500">
              <h3 className="text-2xl font-semibold text-white mb-6 flex items-center justify-center gap-2">
                <span>Global Manufacturing Network</span>
                <span className="text-xl">🌍</span>
              </h3>
              <p className="text-gray-300 mb-8 text-center">BMG maintains strategic partnerships with qualified suppliers across major manufacturing regions worldwide</p>
              
              {/* Real World Map with Manufacturing Locations */}
                              <div className="bg-gray-600 rounded-lg p-6 mb-6 shadow-inner relative">
                  <h4 className="text-xl font-bold text-center mb-4 text-white">BMG Global Manufacturing Network</h4>
                <div className="relative w-full max-w-4xl mx-auto">
                  <img 
                    src="/world-map.jpg" 
                    alt="World Map showing BMG manufacturing locations"
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                  
                  {/* Manufacturing Location Markers Overlaid on Real Map - 7 Strategic Locations */}
                  <div className="absolute inset-0">
                    {/* USA - West Coast (Silicon Valley/California) */}
                    <div 
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                      style={{left: '18%', top: '32%'}}
                    >
                      <div className="w-5 h-5 bg-red-600 rounded-full border-2 border-white shadow-lg hover:scale-125 transition-transform cursor-pointer"></div>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        🇺🇸 California - Advanced Electronics & Tech
                      </div>
                    </div>
                    
                    {/* USA - East Coast (Boston/New York) */}
                    <div 
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                      style={{left: '28%', top: '30%'}}
                    >
                      <div className="w-5 h-5 bg-red-600 rounded-full border-2 border-white shadow-lg hover:scale-125 transition-transform cursor-pointer"></div>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        🇺🇸 Boston - Precision Manufacturing & R&D
                      </div>
                    </div>
                    
                    {/* Europe - Germany (Munich/Stuttgart) */}
                    <div 
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                      style={{left: '55%', top: '25%'}}
                    >
                      <div className="w-5 h-5 bg-red-600 rounded-full border-2 border-white shadow-lg hover:scale-125 transition-transform cursor-pointer"></div>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        🇩🇪 Germany - Precision Machinery & Automotive
                      </div>
                    </div>
                    
                    {/* Europe - Northern Italy (Milan) */}
                    <div 
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                      style={{left: '54%', top: '28%'}}
                    >
                      <div className="w-5 h-5 bg-red-600 rounded-full border-2 border-white shadow-lg hover:scale-125 transition-transform cursor-pointer"></div>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        🇮🇹 Italy - Industrial Design & High-End Manufacturing
                      </div>
                    </div>
                    
                    {/* China - Eastern Coast (Shanghai/Jiangsu) */}
                    <div 
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                      style={{left: '82%', top: '33%'}}
                    >
                      <div className="w-6 h-6 bg-red-600 rounded-full border-2 border-white shadow-lg hover:scale-125 transition-transform cursor-pointer"></div>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        🇨🇳 Shanghai - Advanced Manufacturing Hub
                      </div>
                    </div>
                    
                    {/* China - Southern Coast (Shenzhen/Pearl River Delta) */}
                    <div 
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                      style={{left: '80%', top: '36%'}}
                    >
                      <div className="w-6 h-6 bg-red-600 rounded-full border-2 border-white shadow-lg hover:scale-125 transition-transform cursor-pointer"></div>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        🇨🇳 Shenzhen - Electronics & Innovation Center
                      </div>
                    </div>
                    
                    {/* Japan - Tokyo Region (Honshu Island) */}
                    <div 
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                      style={{left: '88%', top: '30%'}}
                    >
                      <div className="w-5 h-5 bg-red-600 rounded-full border-2 border-white shadow-lg hover:scale-125 transition-transform cursor-pointer"></div>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        🇯🇵 Tokyo - Robotics & Precision Technology
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Legend */}
                <div className="flex justify-center mt-4">
                  <div className="bg-gray-500 rounded-lg px-4 py-2 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-600 rounded-full border border-white"></div>
                      <span className="text-sm font-medium text-white">BMG Manufacturing Partners</span>
                    </div>
                    <div className="text-xs text-gray-300">Hover for details</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Five Phase Process */}
        <section className="py-16 px-4 max-w-5xl mx-auto" id="process">
          <h2 className="text-3xl font-bold text-center mb-10 text-white">Our Five Phase Approach</h2>
          <ol className="space-y-6 text-lg text-gray-300">
            <li><span className="font-semibold text-blue-300">1. Initial Engagement:</span> Comprehensive consultation to understand your needs and challenges.</li>
            <li><span className="font-semibold text-blue-300">2. Audit and Assessment:</span> In-depth evaluation of your product and production strategy.</li>
            <li><span className="font-semibold text-blue-300">3. Report and Proposal Delivery:</span> Concise report and proposal with recommended actions and costs.</li>
            <li><span className="font-semibold text-blue-300">4. Expert Engagement and Project Management:</span> Deployment of top manufacturing experts and project management for execution.</li>
            <li><span className="font-semibold text-blue-300">5. Sustain:</span> Ongoing partnership to ensure quality and successful production runs.</li>
          </ol>
        </section>

        {/* Team */}
        <section className="py-16 px-4 bg-gray-800 border-t border-gray-600 border-b border-gray-600" id="team">
          <h2 className="text-3xl font-bold text-center mb-10 text-white">Meet the Team</h2>
          <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto justify-center">
            <div className="flex-1 bg-gray-700 rounded-lg p-6 shadow flex flex-col items-center">
              <img src="/guy-breier.png" alt="Guy Breier portrait" className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-blue-300" />
              <h3 className="text-xl font-semibold text-blue-300 mb-2">Guy Breier</h3>
              <a href="https://www.linkedin.com/in/breier/" target="_blank" rel="noopener noreferrer" aria-label="Guy Breier LinkedIn" className="mb-2">
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" rx="6" fill="#0077B5"/>
                  <path d="M10.666 13.333H13.333V22.667H10.666V13.333ZM12 11.333C12.7364 11.333 13.333 10.7364 13.333 10C13.333 9.2636 12.7364 8.66699 12 8.66699C11.2636 8.66699 10.667 9.2636 10.667 10C10.667 10.7364 11.2636 11.333 12 11.333ZM16 13.333H18.333V14.333C18.6667 13.6667 19.6667 13 21 13C23.3333 13 23.3333 14.6667 23.3333 16.6667V22.667H20.6667V17.333C20.6667 16.333 20.6667 15.333 19.3333 15.333C18 15.333 18 16.333 18 17.333V22.667H16V13.333Z" fill="white"/>
                </svg>
              </a>
              <p className="mb-2 text-gray-300">Chief Executive Officer</p>
              <p className="text-gray-300">Guy Breier, the Chief Executive Officer at BMG, combines decades of international expertise in Operations, Manufacturing, and Quality Control with an impressive academic background. Holding an Engineering degree from Tel Aviv University and an MBA from Boston College, he has also enriched his knowledge and contributed to the field as a Professor of Operations at Boston University. His innovative approach culminated in the creation of the proprietary Five Phase Assessment Process, a game-changer in the manufacturing industry. This unique process has not only powered the successful delivery of millions of premium-quality products but also realized cumulative savings exceeding hundreds million dollars for manufacturing plants around the globe.</p>
            </div>
            <div className="flex-1 bg-gray-700 rounded-lg p-6 shadow flex flex-col items-center">
              <img src="/ron-rubin.png" alt="Dr. Ron Rubin portrait" className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-blue-300" />
              <h3 className="text-xl font-semibold text-blue-300 mb-2">Dr. Ron Rubin</h3>
              <a href="https://www.linkedin.com/in/ron-shai-rubin/" target="_blank" rel="noopener noreferrer" aria-label="Ron Rubin LinkedIn" className="mb-2">
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" rx="6" fill="#0077B5"/>
                  <path d="M10.666 13.333H13.333V22.667H10.666V13.333ZM12 11.333C12.7364 11.333 13.333 10.7364 13.333 10C13.333 9.2636 12.7364 8.66699 12 8.66699C11.2636 8.66699 10.667 9.2636 10.667 10C10.667 10.7364 11.2636 11.333 12 11.333ZM16 13.333H18.333V14.333C18.6667 13.6667 19.6667 13 21 13C23.3333 13 23.3333 14.6667 23.3333 16.6667V22.667H20.6667V17.333C20.6667 16.333 20.6667 15.333 19.3333 15.333C18 15.333 18 16.333 18 17.333V22.667H16V13.333Z" fill="white"/>
                </svg>
              </a>
              <p className="mb-2 text-gray-300">Advisor</p>
              <p className="text-gray-300">Dr. Ron Rubin, a distinguished member of the Boston College faculty, is also the esteemed founder of Rubin/Anders Scientific, a premier scientific placement agency serving an impressive roster of law firms and corporate clientele. His academic laurels include a Ph.D. from Harvard University, reinforcing his status as a leader in the scientific community. In addition to his contributions at Boston College, Dr. Rubin has also shared his knowledge as a lecturer at the prestigious Massachusetts Institute of Technology (MIT), showcasing his commitment to fostering the next generation of scientific minds.</p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4 max-w-5xl mx-auto" id="testimonials">
          <h2 className="text-3xl font-bold text-center mb-10 text-white">What People Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="italic mb-4">“I had a great experience with Guy when he was the head of quality at Jibo so I knew that Guy brought serious hardware quality skills to the table. I reached out to him at the Boston Manufacturing Group and he took my team at Pillo through a great quality review process and identified some items we needed to improve with our manufacturer. Very smooth structured experience and great results.”</p>
              <p className="font-semibold text-blue-300">Brian Eberman</p>
              <p className="text-gray-400">CEO at Pilo Health</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="italic mb-4">“While working as a Buyer at Piaggio Fast Forward, I have used the services of Guy Breier and The Boston Manufacturing Group. Guy and the group were instrumental in helping me in several areas including: Identifying the best quality components at a reasonable pricing, provide full quality analysis of every component, conducted Supplier audits and design validation, used the group's professional network to identify technical experts to support the design of the new robot. It has been an absolute pleasure working with The Boston Manufacturing Group, and I'm looking forward to the opportunity to work with them again in the future.”</p>
              <p className="font-semibold text-blue-800">Ariel Lisogorsky</p>
              <p className="text-gray-600">Buyer at Piaggio Fast Forward</p>
            </div>
          </div>
        </section>

        {/* Contact */}
        {/* Call to Action Section */}
        <section className="py-16 px-4 bg-blue-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Manufacturing Operations?</h2>
            <p className="text-xl mb-4">BMG provides manufacturing and AI consulting services to companies looking to optimize their operations, reduce costs, and scale production.</p>
            <p className="text-lg text-blue-200 mb-8">We work with COOs, Engineering Managers, and Manufacturing Leaders who need expert guidance from prototype to high-volume production.</p>
            
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <a 
                href="/contact" 
                className="inline-block bg-white text-blue-900 font-semibold py-4 px-8 rounded-lg hover:bg-blue-50 transition duration-200 shadow-lg"
              >
                Get Your Free Consultation
              </a>
              <a 
                href="mailto:contact@boston-mfg.com" 
                className="inline-block bg-blue-800 text-white font-semibold py-4 px-8 rounded-lg hover:bg-blue-700 transition duration-200 border border-blue-600"
              >
                Email Us Directly
              </a>
            </div>
            
            <div className="mt-8 text-blue-200">
              <p className="mb-2">📧 contact@boston-mfg.com | 📞 (617) 410-8155</p>
              <p className="text-sm">Initial consultation within 24-48 hours</p>
            </div>
            
            {/* Footer */}
            <div className="text-center border-t border-blue-800 pt-6 mt-8">
              <p className="text-blue-200 mb-2">Boston Manufacturing Group - Your Partner from Prototype to Production</p>
              <p className="text-sm">© {new Date().getFullYear()} Boston Manufacturing Group. All rights reserved.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
} 