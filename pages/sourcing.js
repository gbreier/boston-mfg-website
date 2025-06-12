import Head from 'next/head';
import Link from 'next/link';

export default function Sourcing() {
  return (
    <>
      <Head>
        <title>Sourcing | Boston Manufacturing Group</title>
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
            At Boston Manufacturing Group (BMG), sourcing is more than just procurement—it's a strategic process that ensures your product is built with the best materials, components, and partners available. Our sourcing services are designed to deliver quality, reliability, and cost-effectiveness across a wide range of technical domains.
          </p>

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
                <img src="/cm.jpg" alt="Contract Manufacturing" className="w-full max-w-xs rounded-lg shadow mb-4" />
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