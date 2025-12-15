import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function AIAnalysis() {
  const [activeSection, setActiveSection] = useState('intro');

  return (
    <>
      <Head>
        <title>Supply Chain Resilience in 2025: Navigating Global Disruptions | Boston Manufacturing Group</title>
        <meta name="description" content="Comprehensive analysis of supply chain challenges, talent shortages, and strategies for building resilient manufacturing operations in 2025 and beyond." />
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

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-6 py-12">
          {/* Header */}
          <header className="mb-12 text-center">
            <div className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
              White Paper
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Supply Chain Resilience in 2025: Navigating Global Disruptions and Talent Challenges
            </h1>
            <div className="text-gray-400 text-sm mb-6">
              Published December 10, 2025 | 12 min read
            </div>
            <div className="flex justify-center items-center gap-4 text-gray-400 text-sm">
              <span>By Guy Breier, CEO, BMG</span>
            </div>
          </header>

          {/* Executive Summary */}
          <section className="mb-12 bg-gradient-to-br from-blue-900/30 to-gray-800/30 rounded-xl p-8 border border-blue-500/30">
            <h2 className="text-2xl font-bold text-blue-300 mb-4">Executive Summary</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              The global supply chain landscape in 2025 continues to face unprecedented challenges from geopolitical tensions, talent shortages, and technological transformation. This white paper examines the critical trends reshaping manufacturing and supply chain operations, providing actionable strategies for building resilience in an increasingly volatile environment.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Key findings reveal a widening talent gap in supply chain management, accelerating automation adoption, and the critical need for diversified supplier networks. Companies that successfully navigate these challenges are implementing multi-faceted approaches combining technology, workforce development, and strategic sourcing partnerships.
            </p>
          </section>

          {/* Main Content */}
          <div className="prose prose-invert max-w-none">
            {/* Section 1 */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">The Evolving Supply Chain Talent Crisis</h2>
              
              <p className="text-gray-300 leading-relaxed mb-4">
                The supply chain industry is experiencing an acute talent shortage that threatens operational continuity across manufacturing sectors. According to recent industry analysis, the demand for skilled supply chain professionals has outpaced supply by a significant margin, with specialized roles in procurement, logistics, and supply chain analytics seeing particularly severe shortages.
              </p>

              <p className="text-gray-300 leading-relaxed mb-4">
                The retirement of experienced professionals, combined with rapid technological change requiring new skill sets, has created a perfect storm. Companies are struggling to fill positions requiring expertise in digital supply chain management, AI-driven analytics, and advanced forecasting techniques. This talent gap is not merely a hiring challenge—it represents a strategic vulnerability that can impact everything from supplier relationships to production efficiency.
              </p>

              <div className="bg-gray-800/50 rounded-lg p-6 my-6 border-l-4 border-blue-500">
                <h4 className="text-xl font-semibold text-blue-300 mb-3">Key Talent Statistics</h4>
                <ul className="text-gray-300 space-y-2">
                  <li>• Supply chain employment projected to grow 28% through 2031</li>
                  <li>• Average salary increases of 15-20% for experienced professionals</li>
                  <li>• 75% of companies report difficulty filling critical supply chain roles</li>
                  <li>• Shortage of 600,000+ logistics and supply chain professionals in the US alone</li>
                </ul>
              </div>

              <div className="my-8">
                <img 
                  src="/Top 2025 supply chain hiring trends.png" 
                  alt="Top 2025 supply chain hiring trends infographic" 
                  className="w-full rounded-lg shadow-xl border border-gray-700"
                />
                <p className="text-center text-gray-400 text-sm mt-3 italic">
                  Figure 1: Top hiring trends shaping the supply chain workforce in 2025
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">Geopolitical Risk and Supply Chain Diversification</h2>
              
              <p className="text-gray-300 leading-relaxed mb-4">
                Geopolitical tensions continue to reshape global supply chains, with companies increasingly recognizing the risks of over-concentration in single regions. The ongoing trade tensions between major economies, regional conflicts, and changing regulatory landscapes have forced manufacturers to rethink their sourcing strategies fundamentally.
              </p>

              <p className="text-gray-300 leading-relaxed mb-4">
                Leading manufacturers are adopting a "China Plus One" or "China Plus Many" strategy, diversifying production across Southeast Asia, Mexico, and other emerging manufacturing hubs. This approach provides resilience against regional disruptions while maintaining access to China's mature manufacturing ecosystem. However, diversification comes with its own challenges, including higher coordination costs, quality control complexities, and the need for expanded supplier relationship management capabilities.
              </p>

              <p className="text-gray-300 leading-relaxed mb-4">
                The trend toward nearshoring and reshoring has accelerated, particularly in North America. Companies are weighing the benefits of proximity—reduced lead times, lower inventory requirements, and enhanced quality oversight—against the higher labor costs associated with domestic or near-domestic production. Mexico has emerged as a particularly attractive option, offering competitive costs, modern manufacturing infrastructure, and geographic proximity to US markets.
              </p>
            </section>

            {/* Section 3 */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">Technology Integration and Digital Transformation</h2>
              
              <p className="text-gray-300 leading-relaxed mb-4">
                Digital transformation is no longer optional for competitive supply chain operations. Companies are rapidly adopting advanced technologies including artificial intelligence, machine learning, Internet of Things (IoT) sensors, and blockchain for supply chain visibility and optimization. These technologies enable real-time tracking, predictive analytics for demand forecasting, and automated decision-making that dramatically improves efficiency and responsiveness.
              </p>

              <p className="text-gray-300 leading-relaxed mb-4">
                AI-powered supply chain platforms can now analyze vast datasets to identify potential disruptions before they occur, suggest optimal sourcing alternatives, and automate routine procurement decisions. Machine learning algorithms continuously improve forecasting accuracy by incorporating multiple data sources including market trends, weather patterns, geopolitical events, and historical performance data.
              </p>

              <div className="bg-gray-800/50 rounded-lg p-6 my-6">
                <h4 className="text-xl font-semibold text-blue-300 mb-3">Digital Supply Chain Technologies</h4>
                <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                  <div>
                    <p className="font-semibold text-blue-200 mb-2">AI &amp; Machine Learning</p>
                    <p className="text-sm">Predictive analytics, demand forecasting, automated decision-making</p>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-200 mb-2">IoT Sensors</p>
                    <p className="text-sm">Real-time tracking, environmental monitoring, quality assurance</p>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-200 mb-2">Blockchain</p>
                    <p className="text-sm">Supply chain transparency, authentication, smart contracts</p>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-200 mb-2">Digital Twins</p>
                    <p className="text-sm">Simulation, scenario planning, optimization modeling</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">Supplier Relationship Management and Quality Assurance</h2>
              
              <p className="text-gray-300 leading-relaxed mb-4">
                As supply chains become more complex and geographically dispersed, effective supplier relationship management (SRM) has become a critical competitive advantage. Companies are moving beyond transactional relationships to develop strategic partnerships with key suppliers, fostering collaboration, transparency, and mutual growth.
              </p>

              <p className="text-gray-300 leading-relaxed mb-4">
                Quality assurance in globally distributed supply chains requires robust verification processes and continuous monitoring. Leading manufacturers are implementing comprehensive supplier qualification programs that assess not only production capabilities but also financial stability, compliance with environmental and labor standards, and alignment with corporate values. Regular audits, performance scorecards, and collaborative improvement initiatives help maintain quality standards across the supplier network.
              </p>

              <p className="text-gray-300 leading-relaxed mb-4">
                The concept of "Trust but Verify" has become a guiding principle in supplier management. While building trusted partnerships is essential, companies must maintain rigorous verification processes to ensure suppliers meet specifications, maintain quality standards, and adhere to ethical practices. This includes on-site inspections, third-party audits, and increasingly, the use of AI-powered analytics to detect quality issues or compliance risks early.
              </p>
            </section>

            {/* Section 5 */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">Sustainability and Environmental Considerations</h2>
              
              <p className="text-gray-300 leading-relaxed mb-4">
                Environmental sustainability has moved from a nice-to-have to a business imperative in supply chain management. Companies face increasing pressure from regulators, investors, and consumers to reduce carbon emissions, minimize waste, and ensure ethical sourcing practices throughout their supply chains.
              </p>

              <p className="text-gray-300 leading-relaxed mb-4">
                Scope 3 emissions—those generated throughout the supply chain beyond a company's direct operations—typically account for the majority of a manufacturer's carbon footprint. Addressing these emissions requires close collaboration with suppliers, transparency into their practices, and often significant investment in cleaner production methods and logistics optimization.
              </p>

              <p className="text-gray-300 leading-relaxed mb-4">
                Forward-thinking companies are implementing circular economy principles, designing products for recyclability, establishing take-back programs, and sourcing recycled materials. These initiatives not only reduce environmental impact but can also provide cost savings and open new revenue streams through material recovery and refurbishment services.
              </p>
            </section>

            {/* Section 6 */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">Strategic Recommendations for Building Resilient Supply Chains</h2>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-900/40 to-gray-800/40 rounded-lg p-6 border border-blue-500/20">
                  <h4 className="text-xl font-semibold text-blue-300 mb-3">1. Invest in Talent Development and Retention</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Develop comprehensive training programs to upskill existing workforce in digital tools and advanced analytics. Partner with educational institutions to create talent pipelines. Implement competitive compensation packages and create clear career progression paths to retain top performers.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-900/40 to-gray-800/40 rounded-lg p-6 border border-blue-500/20">
                  <h4 className="text-xl font-semibold text-blue-300 mb-3">2. Diversify Supplier Networks</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Implement multi-sourcing strategies for critical components. Develop relationships with suppliers in multiple geographic regions. Maintain visibility into second and third-tier suppliers to identify potential concentration risks.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-900/40 to-gray-800/40 rounded-lg p-6 border border-blue-500/20">
                  <h4 className="text-xl font-semibold text-blue-300 mb-3">3. Accelerate Digital Transformation</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Deploy AI-powered supply chain platforms for enhanced visibility and predictive capabilities. Implement IoT sensors for real-time tracking. Invest in data analytics capabilities to enable data-driven decision making.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-900/40 to-gray-800/40 rounded-lg p-6 border border-blue-500/20">
                  <h4 className="text-xl font-semibold text-blue-300 mb-3">4. Build Strategic Supplier Partnerships</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Move beyond transactional relationships to collaborative partnerships. Establish clear communication channels and joint improvement initiatives. Implement comprehensive supplier qualification and continuous monitoring programs.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-900/40 to-gray-800/40 rounded-lg p-6 border border-blue-500/20">
                  <h4 className="text-xl font-semibold text-blue-300 mb-3">5. Enhance Supply Chain Visibility</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Implement end-to-end supply chain visibility platforms. Map entire supplier networks including sub-tier suppliers. Establish real-time monitoring and alert systems for potential disruptions.
                  </p>
                </div>
              </div>
            </section>

            {/* Conclusion */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">Conclusion: Bridging the Supply Chain Talent Gap</h2>
              
              <p className="text-gray-300 leading-relaxed mb-4">
                The supply chain talent gap represents one of the most pressing challenges facing manufacturers in 2025 and beyond. As experienced professionals retire and the complexity of supply chain operations increases with digital transformation and global disruptions, the shortage of qualified talent threatens to become a critical bottleneck limiting organizational growth and operational efficiency.
              </p>

              <p className="text-gray-300 leading-relaxed mb-4">
                This talent crisis is not simply a matter of filling open positions—it reflects a fundamental mismatch between the skills the industry needs and the capabilities available in the workforce. Traditional supply chain education has not kept pace with the rapid evolution of technology, analytics, and strategic thinking required in modern operations. Companies can no longer rely solely on external hiring to meet their talent needs.
              </p>

              <div className="bg-red-900/20 border-l-4 border-red-500 rounded-lg p-6 my-6">
                <h4 className="text-xl font-semibold text-red-300 mb-3">The Disconnect: What Companies Post vs. What They Need</h4>
                <p className="text-gray-300 leading-relaxed mb-4">
                  A critical factor exacerbating the talent shortage is that many companies have not adapted their hiring practices to match the transformed nature of supply chain work. Job postings continue to emphasize traditional qualifications—logistics coordination, inventory management, vendor relations—while the actual demands of the role increasingly require AI literacy, advanced data analytics, predictive modeling, and digital platform proficiency.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Today's supply chain professionals need to interpret machine learning outputs, work with AI-powered forecasting tools, manage IoT sensor networks, and make data-driven decisions using sophisticated analytics platforms. Yet many job descriptions could have been written a decade ago, focusing on Excel proficiency and ERP system experience rather than Python, SQL, or experience with modern supply chain intelligence platforms.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  This disconnect means companies are attracting candidates with outdated skill sets while missing the digitally-savvy professionals who could actually drive transformation. The result is a self-perpetuating cycle: companies struggle to find qualified candidates, settle for traditional skill sets, fall further behind in digital adoption, and become even less attractive to the next generation of tech-enabled supply chain talent. Many organizations simply have not caught up to the fundamental changes reshaping the industry.
                </p>
              </div>

              <h3 className="text-2xl font-bold text-blue-300 mb-4 mt-6">Strategic Solutions for Talent Development</h3>

              <p className="text-gray-300 leading-relaxed mb-4">
                Addressing the talent gap requires a multi-pronged approach combining internal development, strategic partnerships, and cultural transformation:
              </p>

              <div className="bg-gradient-to-r from-blue-900/40 to-gray-800/40 rounded-lg p-6 mb-4 border border-blue-500/20">
                <h4 className="text-xl font-semibold text-blue-300 mb-3">1. Redefine Job Requirements and Invest in Digital Upskilling</h4>
                <p className="text-gray-300 leading-relaxed">
                  First, companies must update their job descriptions to reflect the actual skills needed in modern supply chain roles—data analytics, AI/ML literacy, Python or SQL proficiency, experience with digital supply chain platforms, and comfort with emerging technologies. Then, commit to aggressive upskilling programs that help existing employees bridge the digital divide. This includes training in data visualization tools, predictive analytics, AI interpretation, and cloud-based supply chain platforms. Partner with online learning providers, technology vendors, and internal IT teams to create comprehensive digital transformation academies. The goal is not to turn every supply chain professional into a data scientist, but to create "bilingual" professionals who combine traditional supply chain expertise with digital fluency.
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-900/40 to-gray-800/40 rounded-lg p-6 mb-4 border border-blue-500/20">
                <h4 className="text-xl font-semibold text-blue-300 mb-3">2. Build Academic and Industry Partnerships</h4>
                <p className="text-gray-300 leading-relaxed">
                  Collaborate with universities and technical schools to shape curriculum that addresses real-world supply chain challenges. Offer internships, co-op programs, and apprenticeships that provide students with practical experience while creating a pipeline of qualified candidates. Support STEM education initiatives and supply chain-focused degree programs to ensure a steady flow of talent entering the field.
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-900/40 to-gray-800/40 rounded-lg p-6 mb-4 border border-blue-500/20">
                <h4 className="text-xl font-semibold text-blue-300 mb-3">3. Create Compelling Career Paths</h4>
                <p className="text-gray-300 leading-relaxed">
                  Make supply chain careers more attractive by clearly defining advancement opportunities, offering competitive compensation packages, and highlighting the strategic importance of supply chain roles. Showcase how supply chain professionals directly impact business success, sustainability goals, and global operations. Develop leadership development programs that prepare high-potential employees for expanded responsibilities.
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-900/40 to-gray-800/40 rounded-lg p-6 mb-4 border border-blue-500/20">
                <h4 className="text-xl font-semibold text-blue-300 mb-3">4. Leverage External Expertise</h4>
                <p className="text-gray-300 leading-relaxed">
                  Partner with specialized consulting firms and fractional executives who can provide expertise on-demand, filling critical gaps while internal capabilities are developed. This approach provides immediate access to specialized knowledge in areas like supplier qualification, international sourcing, and supply chain risk management without the long lead times of traditional hiring.
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-900/40 to-gray-800/40 rounded-lg p-6 mb-4 border border-blue-500/20">
                <h4 className="text-xl font-semibold text-blue-300 mb-3">5. Embrace Technology as a Force Multiplier</h4>
                <p className="text-gray-300 leading-relaxed">
                  Implement AI-powered supply chain platforms and automation tools that augment human capabilities, allowing smaller teams to manage more complex operations. Technology should not replace human judgment but rather free professionals from routine tasks so they can focus on strategic decision-making and relationship building.
                </p>
              </div>

              <h3 className="text-2xl font-bold text-blue-300 mb-4 mt-8">The Path Forward</h3>

              <p className="text-gray-300 leading-relaxed mb-4">
                The talent gap will not resolve itself through market forces alone. Organizations that take proactive steps now to develop their people, build educational partnerships, and create compelling career paths will gain a significant competitive advantage. Those that wait will find themselves increasingly constrained by talent availability, unable to execute on strategic initiatives regardless of their technical merit.
              </p>

              <p className="text-gray-300 leading-relaxed mb-4">
                Success requires viewing talent development not as an HR function but as a strategic imperative owned by supply chain leadership and supported at the executive level. It means making long-term investments in people even when short-term pressures favor other priorities. It means recognizing that in an era of rapid change and increasing complexity, your team's capabilities are your most important competitive advantage.
              </p>

              <p className="text-gray-300 leading-relaxed">
                At Boston Manufacturing Group, we understand the challenges of building and maintaining world-class supply chain capabilities. Our team brings decades of hands-on experience helping companies source components, qualify suppliers, and optimize operations—providing the expertise you need while you develop your internal capabilities. Whether you need strategic guidance, tactical execution, or knowledge transfer, we're here to help bridge the gap.
              </p>
            </section>

            {/* Sources Section */}
            <section className="mb-12 bg-gray-800/50 rounded-xl p-8 border border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-6">Sources and References</h2>
              
              <div className="space-y-4 text-gray-300">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="font-semibold text-blue-200 mb-1">DSJ Global</p>
                  <p className="text-sm">Supply Chain Talent Report 2025 - USA: Comprehensive analysis of supply chain hiring trends, salary benchmarks, and talent market dynamics</p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="font-semibold text-blue-200 mb-1">Supply Chain Job Market Analysis</p>
                  <p className="text-sm">Supply Chain Job Report: Current state of supply chain employment, key skills in demand, and workforce development trends</p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="font-semibold text-blue-200 mb-1">U.S. Bureau of Labor Statistics</p>
                  <p className="text-sm mb-1">Occupational Outlook Handbook: Logisticians and Supply Chain Managers - Employment projections and growth statistics</p>
                  <a href="https://www.bls.gov/ooh/business-and-financial/logisticians.htm" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                    www.bls.gov/ooh/business-and-financial/logisticians.htm
                  </a>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="font-semibold text-blue-200 mb-1">Council of Supply Chain Management Professionals (CSCMP)</p>
                  <p className="text-sm mb-1">State of Logistics Report 2024: Talent Challenges and Workforce Development in Supply Chain Operations</p>
                  <a href="https://cscmp.org/CSCMP/Develop/State_of_Logistics_Report.aspx" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                    cscmp.org/CSCMP/Develop/State_of_Logistics_Report.aspx
                  </a>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="font-semibold text-blue-200 mb-1">McKinsey & Company</p>
                  <p className="text-sm mb-1">Supply Chain Talent: Building the Workforce of the Future - Skills gap analysis and workforce transformation strategies</p>
                  <a href="https://www.mckinsey.com/capabilities/operations/our-insights" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                    www.mckinsey.com/capabilities/operations/our-insights
                  </a>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="font-semibold text-blue-200 mb-1">Gartner Supply Chain Research</p>
                  <p className="text-sm mb-1">Future of Supply Chain: Digital Skills and Technology Adoption Trends (2025)</p>
                  <a href="https://www.gartner.com/en/supply-chain" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                    www.gartner.com/en/supply-chain
                  </a>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="font-semibold text-blue-200 mb-1">Deloitte Insights</p>
                  <p className="text-sm mb-1">2025 Manufacturing Industry Outlook: Workforce Challenges and Digital Transformation in Supply Chain</p>
                  <a href="https://www2.deloitte.com/us/en/insights/industry/manufacturing.html" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                    www2.deloitte.com/us/en/insights/industry/manufacturing.html
                  </a>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="font-semibold text-blue-200 mb-1">MIT Center for Transportation & Logistics</p>
                  <p className="text-sm mb-1">Supply Chain Talent Development: Education and Industry Partnership Models (2024)</p>
                  <a href="https://ctl.mit.edu/research" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                    ctl.mit.edu/research
                  </a>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="font-semibold text-blue-200 mb-1">Institute for Supply Management (ISM)</p>
                  <p className="text-sm mb-1">Supply Chain Skills Report: Critical Competencies and Emerging Technology Requirements (2024-2025)</p>
                  <a href="https://www.ismworld.org/supply-management-news-and-reports/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                    www.ismworld.org/supply-management-news-and-reports/
                  </a>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="font-semibold text-blue-200 mb-1">Harvard Business Review</p>
                  <p className="text-sm mb-1">Closing the Supply Chain Talent Gap: Strategies for Upskilling and Workforce Development (2024)</p>
                  <a href="https://hbr.org/topic/supply-chain-management" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                    hbr.org/topic/supply-chain-management
                  </a>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="font-semibold text-blue-200 mb-1">PwC Global Supply Chain Survey</p>
                  <p className="text-sm mb-1">Digital Supply Chain Workforce: AI Skills, Analytics Capabilities, and Training Needs (2024)</p>
                  <a href="https://www.pwc.com/gx/en/industries/industrial-manufacturing/supply-chain.html" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                    www.pwc.com/gx/en/industries/industrial-manufacturing/supply-chain.html
                  </a>
                </div>
              </div>
            </section>

            {/* Download Section */}
            <section className="mb-12 bg-gradient-to-r from-blue-900/40 to-gray-800/40 rounded-xl p-8 border border-blue-500/30 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Download Full White Paper</h3>
              <p className="text-gray-300 mb-6">
                Access the complete white paper including additional data, case studies, and detailed analysis.
              </p>
              <a 
                href="/Supply Chain White Paper 2025-12-10.pdf" 
                download 
                className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-8 py-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition duration-300 shadow-lg"
              >
                📥 Download PDF
              </a>
            </section>

            {/* CTA */}
            <section className="text-center bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-10 border border-gray-700">
              <h3 className="text-3xl font-bold text-white mb-4">Need Help Optimizing Your Supply Chain?</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Boston Manufacturing Group offers expert sourcing, supplier qualification, and supply chain consulting services. Let us help you build a more resilient and efficient supply chain.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact" 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-8 py-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition duration-300 shadow-lg"
                >
                  Contact Us
                </a>
                <a 
                  href="/sourcing" 
                  className="bg-gray-700 text-white font-semibold px-8 py-4 rounded-lg hover:bg-gray-600 transition duration-300"
                >
                  Learn About Our Services
                </a>
              </div>
            </section>
          </div>
        </article>

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

