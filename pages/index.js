import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Boston Manufacturing Group</title>
        <meta name="description" content="Prototype to production manufacturing solutions. Sourcing, technical support, quality control, and more." />
      </Head>
      <main className="bg-gray-50 min-h-screen font-sans">
        {/* Logo */}
        <div className="flex justify-center items-center gap-4 pt-10 pb-4 bg-background">
          <img src="/bmg-logo.png" alt="Boston Manufacturing Group logo" className="h-20 w-auto" />
          <a href="https://www.linkedin.com/company/boston-manufacturing-group/?viewAsMember=true" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="ml-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="6" fill="#0077B5"/>
              <path d="M10.666 13.333H13.333V22.667H10.666V13.333ZM12 11.333C12.7364 11.333 13.333 10.7364 13.333 10C13.333 9.2636 12.7364 8.66699 12 8.66699C11.2636 8.66699 10.667 9.2636 10.667 10C10.667 10.7364 11.2636 11.333 12 11.333ZM16 13.333H18.333V14.333C18.6667 13.6667 19.6667 13 21 13C23.3333 13 23.3333 14.6667 23.3333 16.6667V22.667H20.6667V17.333C20.6667 16.333 20.6667 15.333 19.3333 15.333C18 15.333 18 16.333 18 17.333V22.667H16V13.333Z" fill="white"/>
            </svg>
          </a>
        </div>
        {/* Hero Section with Video Background */}
        <section className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
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
              <a href="#contact" className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded shadow hover:bg-secondary transition">Contact Us</a>
              <a href="/reports" className="inline-block bg-secondary text-white font-semibold px-8 py-3 rounded shadow hover:bg-primary transition">View Reports</a>
              <a href="/sourcing" className="inline-block bg-accent text-white font-semibold px-8 py-3 rounded shadow hover:bg-primary transition">Sourcing</a>
              <a href="/about" className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded shadow hover:bg-secondary transition">About</a>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 px-4 max-w-5xl mx-auto" id="services">
          <h2 className="text-3xl font-bold text-center mb-10 text-blue-900">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-2 text-blue-800">Intelligent Sourcing</h3>
              <p>We identify and procure the best materials and resources for your product, ensuring cost-effectiveness and quality.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-2 text-blue-800">Technical Support</h3>
              <p>Our experts provide ongoing guidance throughout the manufacturing process, keeping your product development on track.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-2 text-blue-800">Quality Control</h3>
              <p>Stringent quality control measures ensure your products meet and exceed industry standards.</p>
            </div>
          </div>
        </section>

        {/* Sourcing Capabilities */}
        <section className="py-16 px-4 bg-white border-t border-b">
          <h2 className="text-3xl font-bold text-center mb-10 text-blue-900">Sourcing Capabilities</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Electronics</h4>
              <ul className="list-disc list-inside text-gray-700">
                <li>PCBA</li>
                <li>Electronic components</li>
                <li>Cable systems</li>
                <li>Power supplies</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Metals & Plastics</h4>
              <ul className="list-disc list-inside text-gray-700">
                <li>Precision machining</li>
                <li>Stamping, castings, welding</li>
                <li>Injection molding, 3D printing</li>
                <li>Vacuum forming, extrusion</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Motors, Batteries, Assemblies</h4>
              <ul className="list-disc list-inside text-gray-700">
                <li>BLDC, universal, induction motors</li>
                <li>Li-Ion, Ni-MH, Lead-Acid batteries</li>
                <li>Final assemblies & contract manufacturing</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Five Phase Process */}
        <section className="py-16 px-4 max-w-5xl mx-auto" id="process">
          <h2 className="text-3xl font-bold text-center mb-10 text-blue-900">Our Five Phase Approach</h2>
          <ol className="space-y-6 text-lg">
            <li><span className="font-semibold text-blue-800">1. Initial Engagement:</span> Comprehensive consultation to understand your needs and challenges.</li>
            <li><span className="font-semibold text-blue-800">2. Audit and Assessment:</span> In-depth evaluation of your product and production strategy.</li>
            <li><span className="font-semibold text-blue-800">3. Report and Proposal Delivery:</span> Concise report and proposal with recommended actions and costs.</li>
            <li><span className="font-semibold text-blue-800">4. Expert Engagement and Project Management:</span> Deployment of top manufacturing experts and project management for execution.</li>
            <li><span className="font-semibold text-blue-800">5. Sustain:</span> Ongoing partnership to ensure quality and successful production runs.</li>
          </ol>
        </section>

        {/* Team */}
        <section className="py-16 px-4 bg-white border-t border-b" id="team">
          <h2 className="text-3xl font-bold text-center mb-10 text-blue-900">Meet the Team</h2>
          <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto justify-center">
            <div className="flex-1 bg-gray-100 rounded-lg p-6 shadow flex flex-col items-center">
              <img src="/guy-breier.png" alt="Guy Breier portrait" className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-blue-200" />
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Guy Breier</h3>
              <a href="https://www.linkedin.com/in/breier/" target="_blank" rel="noopener noreferrer" aria-label="Guy Breier LinkedIn" className="mb-2">
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" rx="6" fill="#0077B5"/>
                  <path d="M10.666 13.333H13.333V22.667H10.666V13.333ZM12 11.333C12.7364 11.333 13.333 10.7364 13.333 10C13.333 9.2636 12.7364 8.66699 12 8.66699C11.2636 8.66699 10.667 9.2636 10.667 10C10.667 10.7364 11.2636 11.333 12 11.333ZM16 13.333H18.333V14.333C18.6667 13.6667 19.6667 13 21 13C23.3333 13 23.3333 14.6667 23.3333 16.6667V22.667H20.6667V17.333C20.6667 16.333 20.6667 15.333 19.3333 15.333C18 15.333 18 16.333 18 17.333V22.667H16V13.333Z" fill="white"/>
                </svg>
              </a>
              <p className="mb-2">Chief Executive Officer</p>
              <p>Guy Breier, the Chief Executive Officer at BMG, combines decades of international expertise in Operations, Manufacturing, and Quality Control with an impressive academic background. Holding an Engineering degree from Tel Aviv University and an MBA from Boston College, he has also enriched his knowledge and contributed to the field as a Professor of Operations at Boston University. His innovative approach culminated in the creation of the proprietary Five Phase Assessment Process, a game-changer in the manufacturing industry. This unique process has not only powered the successful delivery of millions of premium-quality products but also realized cumulative savings exceeding hundreds million dollars for manufacturing plants around the globe.</p>
            </div>
            <div className="flex-1 bg-gray-100 rounded-lg p-6 shadow flex flex-col items-center">
              <img src="/ron-rubin.png" alt="Dr. Ron Rubin portrait" className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-blue-200" />
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Dr. Ron Rubin</h3>
              <a href="https://www.linkedin.com/in/ron-shai-rubin/" target="_blank" rel="noopener noreferrer" aria-label="Ron Rubin LinkedIn" className="mb-2">
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" rx="6" fill="#0077B5"/>
                  <path d="M10.666 13.333H13.333V22.667H10.666V13.333ZM12 11.333C12.7364 11.333 13.333 10.7364 13.333 10C13.333 9.2636 12.7364 8.66699 12 8.66699C11.2636 8.66699 10.667 9.2636 10.667 10C10.667 10.7364 11.2636 11.333 12 11.333ZM16 13.333H18.333V14.333C18.6667 13.6667 19.6667 13 21 13C23.3333 13 23.3333 14.6667 23.3333 16.6667V22.667H20.6667V17.333C20.6667 16.333 20.6667 15.333 19.3333 15.333C18 15.333 18 16.333 18 17.333V22.667H16V13.333Z" fill="white"/>
                </svg>
              </a>
              <p className="mb-2">Advisor</p>
              <p>Dr. Ron Rubin, a distinguished member of the Boston College faculty, is also the esteemed founder of Rubin/Anders Scientific, a premier scientific placement agency serving an impressive roster of law firms and corporate clientele. His academic laurels include a Ph.D. from Harvard University, reinforcing his status as a leader in the scientific community. In addition to his contributions at Boston College, Dr. Rubin has also shared his knowledge as a lecturer at the prestigious Massachusetts Institute of Technology (MIT), showcasing his commitment to fostering the next generation of scientific minds.</p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4 max-w-5xl mx-auto" id="testimonials">
          <h2 className="text-3xl font-bold text-center mb-10 text-blue-900">What People Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="italic mb-4">“I had a great experience with Guy when he was the head of quality at Jibo so I knew that Guy brought serious hardware quality skills to the table. I reached out to him at the Boston Manufacturing Group and he took my team at Pillo through a great quality review process and identified some items we needed to improve with our manufacturer. Very smooth structured experience and great results.”</p>
              <p className="font-semibold text-blue-800">Brian Eberman</p>
              <p className="text-gray-600">CEO at Pilo Health</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="italic mb-4">“While working as a Buyer at Piaggio Fast Forward, I have used the services of Guy Breier and The Boston Manufacturing Group. Guy and the group were instrumental in helping me in several areas including: Identifying the best quality components at a reasonable pricing, provide full quality analysis of every component, conducted Supplier audits and design validation, used the group's professional network to identify technical experts to support the design of the new robot. It has been an absolute pleasure working with The Boston Manufacturing Group, and I'm looking forward to the opportunity to work with them again in the future.”</p>
              <p className="font-semibold text-blue-800">Ariel Lisogorsky</p>
              <p className="text-gray-600">Buyer at Piaggio Fast Forward</p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 px-4 bg-blue-900 text-white" id="contact">
          <h2 className="text-3xl font-bold text-center mb-6">Let's Connect</h2>
          <div className="max-w-xl mx-auto text-center">
            <p className="mb-4">Ready to take your idea to production? Contact us today.</p>
            <p className="mb-2 font-semibold">Email: <a href="mailto:contact@boston-mfg.com" className="underline">contact@boston-mfg.com</a></p>
            <p className="mb-2 font-semibold">Phone: <a href="tel:16174108155" className="underline">(617) 410-8155</a></p>
            <p className="text-sm mt-6">© {new Date().getFullYear()} Boston Manufacturing Group</p>
          </div>
        </section>
      </main>
    </>
  );
} 