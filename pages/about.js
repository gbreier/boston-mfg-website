import Head from 'next/head';
import Link from 'next/link';

export default function About() {
  return (
    <>
      <Head>
        <title>About | Boston Manufacturing Group</title>
      </Head>
      <main className="bg-background min-h-screen font-sans">
        <div className="flex justify-center pt-10 pb-4 bg-background">
          <Link href="/">
            <img src="/bmg-logo.png" alt="Boston Manufacturing Group logo" className="h-16 w-auto cursor-pointer" />
          </Link>
        </div>
        <section className="max-w-4xl mx-auto py-12 px-4">
          <h1 className="text-4xl font-bold text-secondary mb-6 text-center">About Boston Manufacturing Group</h1>
          <p className="text-lg text-accent mb-8 text-center">
            Boston Manufacturing Group (BMG) provides manufacturing services and support to customers on their way to production. Our services include Sourcing, Technical Support, and Quality Control with a personal approach tailored to our customers' individual needs. BMG provides a revolutionary combination of hands-on assessment and solutions from the leading manufacturing minds in the world, including faculty from leading institutions such as Harvard, MIT, and Boston College.
          </p>

          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-xl p-8 mb-12 shadow-lg border-l-8 border-primary">
            <h2 className="text-2xl font-semibold text-primary mb-6 text-center">The BMG Five Phase Approach</h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-6">
              <li>
                <span className="font-bold text-secondary">Phase 1 – Initial Engagement:</span> We begin with a comprehensive initial consultation to meticulously identify the breadth and depth of your challenge, issue, or requirement. This ensures a thorough understanding of the problem that needs resolution and sets the stage for a successful partnership.
              </li>
              <li>
                <span className="font-bold text-secondary">Phase 2 – Audit and Assessment:</span> Our team immerses itself in a detailed exploration of your existing challenges. We comprehensively evaluate your product's current state and production strategy to gain a deep understanding of your specific situation. This phase includes on-site visits, data collection, and process mapping.
              </li>
              <li>
                <span className="font-bold text-secondary">Phase 3 – Report and Proposal Delivery:</span> After our analysis, BMG presents a concise report outlining the identified issues and recommended actions. Accompanying the report, we share a proposal covering project scope, our engagement process, and the associated costs. Our team, comprising leading U.S. manufacturing scientists, is ready to guide your project towards success. This step ensures transparency and aids in informed decision-making.
              </li>
              <li>
                <span className="font-bold text-secondary">Phase 4 – Expert Engagement and Project Management:</span> BMG deploys globally recognized manufacturing and control process experts to address the identified manufacturing challenges. We closely collaborate with your team, overseeing project management to ensure timely execution and cost-efficiency, driving your production journey towards success.
              </li>
              <li>
                <span className="font-bold text-secondary">Phase 5 – Sustain:</span> BMG promises a persistent partnership until your product is successfully delivered to your customers. We continuously monitor and ensure quality, conducting necessary tests to guarantee a seamless and successful production run. Our commitment extends beyond project completion, ensuring ongoing support and continuous improvement.
              </li>
            </ol>
            <div className="mt-8 text-center">
              <span className="inline-block bg-primary text-white px-4 py-2 rounded font-semibold">Why the Five Phase Approach Works</span>
              <ul className="list-disc list-inside text-gray-700 mt-4 text-left max-w-2xl mx-auto">
                <li><b>Holistic Assessment:</b> We look at both technical and business needs, ensuring solutions are practical and impactful.</li>
                <li><b>Expert-Led:</b> Our process is led by industry veterans and academic leaders in manufacturing and quality control.</li>
                <li><b>Proven Results:</b> This approach has powered the successful delivery of millions of premium-quality products and realized cumulative savings exceeding hundreds of millions of dollars for manufacturing plants around the globe.</li>
              </ul>
            </div>
          </div>

          <div className="bg-secondary/10 rounded-xl p-8 mb-12 shadow-lg border-l-8 border-secondary">
            <h2 className="text-2xl font-semibold text-secondary mb-4">Leadership</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
              <div className="flex flex-col items-center">
                <img src="/guy-breier.png" alt="Guy Breier portrait" className="w-24 h-24 rounded-full object-cover border-2 border-secondary mb-2" />
                <div className="font-bold text-primary">Guy Breier</div>
                <div className="text-accent mb-2">Chief Executive Officer</div>
                <p className="text-gray-700 text-center text-sm">Decades of international expertise in operations, manufacturing, and quality control. Engineering degree from Tel Aviv University, MBA from Boston College, and former Professor of Operations at Boston University. Creator of the proprietary Five Phase Assessment Process.</p>
              </div>
              <div className="flex flex-col items-center">
                <img src="/ron-rubin.png" alt="Dr. Ron Rubin portrait" className="w-24 h-24 rounded-full object-cover border-2 border-secondary mb-2" />
                <div className="font-bold text-primary">Dr. Ron Rubin</div>
                <div className="text-accent mb-2">Advisor</div>
                <p className="text-gray-700 text-center text-sm">Faculty at Boston College, founder of Rubin/Anders Scientific, Ph.D. from Harvard, and former lecturer at MIT. Renowned for scientific leadership and innovation.</p>
              </div>
            </div>
          </div>

          <div className="bg-primary/10 rounded-xl p-6 text-center mb-8 shadow-lg border-l-8 border-primary">
            <h3 className="text-xl font-bold mb-2">Contact Us</h3>
            <p className="mb-2">Email: <a href="mailto:contact@boston-mfg.com" className="underline text-primary">contact@boston-mfg.com</a></p>
            <p className="mb-2">Phone: <a href="tel:16174108155" className="underline text-primary">(617) 410-8155</a></p>
          </div>
        </section>
        <div className="flex justify-center pb-12">
          <a href="/" className="mt-8 inline-block bg-primary text-white font-semibold px-6 py-3 rounded shadow hover:bg-secondary transition">Back to Home</a>
        </div>
      </main>
    </>
  );
} 