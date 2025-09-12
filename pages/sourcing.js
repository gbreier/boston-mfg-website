import Head from 'next/head';
import Link from 'next/link';

export default function Sourcing() {
  return (
    <>
      <Head>
        <title>Global Manufacturing Sourcing & Supply Chain Solutions | Electronics, Metals, Plastics | Boston Manufacturing Group</title>
        <meta name="description" content="BMG's intelligent global sourcing services across 7 strategic manufacturing regions worldwide. Expert sourcing for electronics, PCBA, metals, plastics, motors, batteries, and complete assemblies with quality assurance and cost optimization." />
        <meta name="keywords" content="global manufacturing sourcing, intelligent sourcing solutions, electronics sourcing, PCBA sourcing, precision machining, injection molding, manufacturing supply chain, China sourcing, Germany manufacturing, global supplier network" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://boston-mfg.com/sourcing" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Global Manufacturing Sourcing & Supply Chain Solutions | Boston Manufacturing Group" />
        <meta property="og:description" content="BMG's intelligent global sourcing services across 7 strategic manufacturing regions worldwide. Expert sourcing for electronics, metals, plastics, and complete assemblies." />
        <meta property="og:image" content="https://boston-mfg.com/world-map.jpg" />
        <meta property="og:url" content="https://boston-mfg.com/sourcing" />
        <meta property="og:site_name" content="Boston Manufacturing Group" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Global Manufacturing Sourcing Solutions | Boston Manufacturing Group" />
        <meta name="twitter:description" content="BMG's intelligent global sourcing services across 7 strategic manufacturing regions worldwide." />
        <meta name="twitter:image" content="https://boston-mfg.com/world-map.jpg" />
        
        {/* Structured Data - Service Page */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Global Manufacturing Sourcing Solutions",
              "description": "Intelligent global sourcing services for electronics, metals, plastics, motors, batteries, and complete assemblies across strategic manufacturing regions worldwide.",
              "provider": {
                "@type": "Organization",
                "name": "Boston Manufacturing Group",
                "url": "https://boston-mfg.com"
              },
              "areaServed": [
                {
                  "@type": "Place",
                  "name": "United States",
                  "description": "California - Advanced Electronics & Tech, Boston - Precision Manufacturing & R&D"
                },
                {
                  "@type": "Place", 
                  "name": "Germany",
                  "description": "Precision Machinery & Automotive Manufacturing"
                },
                {
                  "@type": "Place",
                  "name": "Italy", 
                  "description": "Industrial Design & High-End Manufacturing"
                },
                {
                  "@type": "Place",
                  "name": "China",
                  "description": "Shanghai - Advanced Manufacturing Hub, Shenzhen - Electronics & Innovation Center"
                },
                {
                  "@type": "Place",
                  "name": "Japan",
                  "description": "Tokyo - Robotics & Precision Technology"
                }
              ],
              "serviceType": [
                "Electronics Sourcing",
                "PCBA Manufacturing", 
                "Precision Machining",
                "Injection Molding",
                "3D Printing",
                "Motor Sourcing",
                "Battery Sourcing",
                "Contract Manufacturing"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Global Sourcing Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Electronics Sourcing",
                      "description": "PCBA, electronic components, cable systems, and power supplies sourcing with quality control."
                    }
                  },
                  {
                    "@type": "Offer", 
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Metals & Plastics Manufacturing",
                      "description": "Precision machining, stamping, castings, welding, injection molding, 3D printing, vacuum forming, and extrusion services."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service", 
                      "name": "Motors, Batteries & Assemblies",
                      "description": "BLDC, universal, induction motors; Li-Ion, Ni-MH, Lead-Acid batteries; final assemblies and contract manufacturing."
                    }
                  }
                ]
              }
            })
          }}
        />
        
        {/* Structured Data - Manufacturing Locations */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": "BMG Global Manufacturing Network",
              "description": "Strategic manufacturing partners across 7 key global regions",
              "itemListElement": [
                {
                  "@type": "Place",
                  "position": 1,
                  "name": "California Manufacturing Hub",
                  "description": "Advanced Electronics & Technology Manufacturing",
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": "37.4419",
                    "longitude": "-122.1430"
                  }
                },
                {
                  "@type": "Place",
                  "position": 2,
                  "name": "Boston Manufacturing Hub", 
                  "description": "Precision Manufacturing & R&D",
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": "42.3601",
                    "longitude": "-71.0589"
                  }
                },
                {
                  "@type": "Place",
                  "position": 3,
                  "name": "Germany Manufacturing Hub",
                  "description": "Precision Machinery & Automotive",
                  "geo": {
                    "@type": "GeoCoordinates", 
                    "latitude": "48.1351",
                    "longitude": "11.5820"
                  }
                },
                {
                  "@type": "Place",
                  "position": 4,
                  "name": "Italy Manufacturing Hub",
                  "description": "Industrial Design & High-End Manufacturing",
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": "45.4642",
                    "longitude": "9.1900"
                  }
                },
                {
                  "@type": "Place",
                  "position": 5,
                  "name": "Shanghai Manufacturing Hub",
                  "description": "Advanced Manufacturing Hub",
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": "31.2304",
                    "longitude": "121.4737"
                  }
                },
                {
                  "@type": "Place",
                  "position": 6,
                  "name": "Shenzhen Manufacturing Hub",
                  "description": "Electronics & Innovation Center", 
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": "22.3193",
                    "longitude": "114.1694"
                  }
                },
                {
                  "@type": "Place",
                  "position": 7,
                  "name": "Tokyo Manufacturing Hub",
                  "description": "Robotics & Precision Technology",
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": "35.6762",
                    "longitude": "139.6503"
                  }
                }
              ]
            })
          }}
        />
      </Head>
      <main className="bg-background min-h-screen font-sans">
        <div className="flex justify-center pt-10 pb-4 bg-background">
          <Link href="/">
            <img src="/bmg-logo.png" alt="Boston Manufacturing Group logo" className="h-16 w-auto cursor-pointer" />
          </Link>
        </div>
        <section className="max-w-4xl mx-auto py-12 px-4">
          <h1 className="text-4xl font-bold text-secondary mb-6 text-center">Sourcing</h1>
          <p className="text-lg text-accent mb-8 text-center">
            At Boston Manufacturing Group (BMG), sourcing is more than just procurement—it's a strategic process that ensures your product is built with the best materials, components, and partners available. Our AI-powered sourcing platform analyzes supplier capabilities, quality metrics, and market dynamics to identify the optimal manufacturing partners for your specific requirements. Our sourcing services are designed to deliver quality, reliability, and cost-effectiveness across a wide range of technical domains.
          </p>

          {/* Global Sourcing Network Section */}
          <div className="bg-accent/10 rounded-xl p-8 mb-12 shadow-lg border-l-8 border-accent">
            <h2 className="text-2xl font-semibold text-accent mb-6 flex items-center gap-2">
              <span>Global Sourcing Network</span>
              <span className="text-xl">🌍</span>
            </h2>
            <p className="text-gray-700 mb-8 text-center">BMG maintains strategic partnerships with qualified suppliers across major manufacturing regions worldwide</p>
            
            {/* Real World Map with Manufacturing Locations */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow-inner relative">
              <h3 className="text-xl font-bold text-center mb-4 text-gray-800">BMG Global Manufacturing Network</h3>
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
                <div className="bg-gray-100 rounded-lg px-4 py-2 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-600 rounded-full border border-white"></div>
                    <span className="text-sm font-medium text-gray-700">BMG Manufacturing Partners</span>
                  </div>
                  <div className="text-xs text-gray-500">Hover for details</div>
                </div>
              </div>
            </div>
            
            
          </div>

          {/* What We Source Section */}
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-xl p-8 mb-12 shadow-lg border-l-8 border-primary">
            <h2 className="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
              <span>What We Source</span>
              <span className="text-xl">🔍</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow p-4 border-t-4 border-primary flex flex-col items-center">
                <img src="/pcba.jpg" alt="PCBA production" className="w-full max-w-xs rounded-lg shadow mb-4" />
                <div className="text-3xl mb-2">💻</div>
                <div className="font-bold text-secondary mb-1">Electronics</div>
                <ul className="list-disc list-inside text-gray-700 text-sm">
                  <li>PCBA</li>
                  <li>Electronic components</li>
                  <li>Cable systems</li>
                  <li>Power supplies</li>
                  <li>and more</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow p-4 border-t-4 border-secondary flex flex-col items-center">
                <img src="/metal.jpg" alt="Metal production" className="w-full max-w-xs rounded-lg shadow mb-4" />
                <div className="text-3xl mb-2">⚙️</div>
                <div className="font-bold text-primary mb-1">Metals</div>
                <ul className="list-disc list-inside text-gray-700 text-sm">
                  <li>Precision machining</li>
                  <li>Stamping</li>
                  <li>Castings</li>
                  <li>Welding supplies</li>
                  <li>Custom metal parts</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow p-4 border-t-4 border-accent flex flex-col items-center">
                <img src="/battery.jpg" alt="Battery production" className="w-full max-w-xs rounded-lg shadow mb-4" />
                <div className="text-3xl mb-2">🔋</div>
                <div className="font-bold text-accent mb-1">Batteries</div>
                <ul className="list-disc list-inside text-gray-700 text-sm">
                  <li>Lithium-Ion (Li-Ion)</li>
                  <li>Nickel-Metal Hydride (Ni-MH)</li>
                  <li>Lead-Acid</li>
                  <li>Other battery technologies</li>
                </ul>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="bg-white rounded-lg shadow p-4 border-t-4 border-secondary flex flex-col items-center">
                <img src="/plastics.jpg" alt="Plastics production" className="w-full max-w-xs rounded-lg shadow mb-4" />
                <div className="text-3xl mb-2">🧩</div>
                <div className="font-bold text-primary mb-1">Plastics</div>
                <ul className="list-disc list-inside text-gray-700 text-sm">
                  <li>Injection molding</li>
                  <li>3D printing materials</li>
                  <li>Vacuum forming</li>
                  <li>Extrusion equipment</li>
                  <li>Advanced plastic solutions</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow p-4 border-t-4 border-primary flex flex-col items-center">
                <img src="/motors.jpg" alt="Motors production" className="w-full max-w-xs rounded-lg shadow mb-4" />
                <div className="text-3xl mb-2">🔩</div>
                <div className="font-bold text-secondary mb-1">Motors</div>
                <ul className="list-disc list-inside text-gray-700 text-sm">
                  <li>Brushless DC (BLDC)</li>
                  <li>Universal motors</li>
                  <li>Induction motors</li>
                  <li>Various applications</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow p-4 border-t-4 border-secondary flex flex-col items-center">
                <img src="/CM.jpg" alt="Contract Manufacturing" className="w-full max-w-xs rounded-lg shadow mb-4" />
                <div className="text-3xl mb-2">🏭</div>
                <div className="font-bold text-accent mb-1">Final Assemblies & Contract Manufacturing</div>
                <ul className="list-disc list-inside text-gray-700 text-sm">
                  <li>Final assembly components</li>
                  <li>Contract manufacturing resources</li>
                  <li>Complete solutions</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full my-12" />

          {/* Sourcing Process Section */}
          <div className="bg-secondary/10 rounded-xl p-8 mb-12 shadow-lg border-l-8 border-secondary">
            <h2 className="text-2xl font-semibold text-secondary mb-6 flex items-center gap-2">
              <span>Our Sourcing Process</span>
              <span className="text-xl">🔗</span>
            </h2>
            <ol className="list-decimal list-inside text-gray-700 mb-8 space-y-2">
              <li><b>Elite Supplier Network:</b> We maintain a global network of thoroughly vetted suppliers, ensuring consistent delivery of high-quality components and materials.</li>
              <li><b>Bespoke Quality Assurance:</b> BMG offers customized quality inspection levels for sourced materials, tailored to your specific standards and needs. We are committed to exceeding your expectations with every delivery.</li>
              <li><b>Cost-Effectiveness Without Compromise:</b> Our deep market understanding allows us to identify the best value options, balancing cost and quality to maximize your ROI.</li>
              <li><b>Hands-On Support:</b> Our team works closely with you from initial engagement through delivery, providing technical support, supplier audits, and design validation as needed.</li>
              <li><b>Transparent Communication:</b> We keep you informed at every step, providing clear reports and recommendations so you can make confident decisions.</li>
            </ol>
          </div>

          {/* Divider */}
          <div className="h-1 bg-gradient-to-r from-secondary via-primary to-accent rounded-full my-12" />

          {/* Why Choose BMG Section */}
          <div className="bg-primary/10 rounded-xl p-8 mb-12 shadow-lg border-l-8 border-primary">
            <h2 className="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
              <span>Why Choose BMG for Sourcing?</span>
              <span className="text-xl">🌟</span>
            </h2>
            <ul className="list-disc list-inside text-gray-700 mb-8">
              <li><b>Access to Thousands of Suppliers:</b> We open doors to a vast supplier base, giving you more options and better leverage.</li>
              <li><b>Technical Expertise:</b> Our team includes manufacturing scientists and engineers who understand the nuances of sourcing for complex products.</li>
              <li><b>Proven Track Record:</b> BMG has saved manufacturing plants over $300 million through improved sourcing and process optimization.</li>
              <li><b>End-to-End Partnership:</b> From initial consultation to sustained production, we're with you every step of the way.</li>
            </ul>
          </div>

          <div className="bg-secondary text-white rounded-lg p-6 text-center mb-8 shadow-lg">
            <h3 className="text-xl font-bold mb-2">Ready to optimize your sourcing?</h3>
            <p className="mb-2">Contact us at <a href="mailto:contact@boston-mfg.com" className="underline">contact@boston-mfg.com</a> or <a href="tel:16174108155" className="underline">(617) 410-8155</a> to discuss your project.</p>
          </div>
        </section>
        <div className="flex justify-center pb-12">
          <a href="/" className="mt-8 inline-block bg-primary text-white font-semibold px-6 py-3 rounded shadow hover:bg-secondary transition">Back to Home</a>
        </div>
      </main>
    </>
  );
} 
