import Head from 'next/head';
import Link from 'next/link';

export default function P2PBlog() {
  return (
    <>
      <Head>
        <title>P2P Blog | Boston Manufacturing Group</title>
      </Head>
      <main className="bg-background min-h-screen font-sans">
        <section className="max-w-3xl mx-auto py-12 px-4">
          <h1 className="text-3xl font-bold text-secondary mb-4">P2P Blog</h1>
          <div className="flex items-center gap-3 mb-2">
            <img src="/guy-breier.png" alt="Guy Breier portrait" className="w-8 h-8 rounded-full object-cover border-2 border-secondary" />
            <p className="text-accent">Guy Breier, CEO, BMG &middot; Jan 29, 2021</p>
          </div>
          <article className="prose prose-blue max-w-none">
            <p>Welcome to the Boston Manufacturing Group (BMG) Prototype-to-Production™ blog.</p>
            <p>BMG supports manufacturing efforts that include engineering design for product prototypes and production, strategic sourcing for cost and quality, and quality control oversight for the entire manufacturing process. Whether it be Manufacturing Readiness or Quality Oversight, we can help. Our experiences have led us to some insights that may be helpful, and you will find some of them in the blog pages here.</p>
            <p>We offer a choice of services which include: Intelligent Sourcing™ , Design for Manufacturing, Verification and Validation, Quality Control, VA/VE - Cost Reduction and Testing.</p>
            <blockquote className="text-2xl font-bold text-blue-800 my-8">
              When it comes to building a great product, parts and partners matter. BMG can help direct projects to success with unparalleled internal expertise, an intelligent sourcing model, and a network of qualified manufacturers. We guide our clients through the process and work with engineering teams to holistically understand each projects' complexities.
            </blockquote>
            <p>Let us help you. Please reach out to me directly at <a href="tel:16174108155" className="text-primary underline">(617) 410-8155</a> or via email <a href="mailto:guy@boston-mfg.com" className="text-primary underline">guy@boston-mfg.com</a>. I look forward to helping you!</p>
            <p>Guy Breier</p>
            <p>President</p>
            <p>Chestnut Hill, MA</p>
          </article>
        </section>
        <div className="max-w-3xl mx-auto px-4 pb-12">
          <div className="mt-12 pt-8 border-t border-gray-200 flex justify-between items-center">
            <Link href="/reports" legacyBehavior>
              <a className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to All Reports
              </a>
            </Link>
            <Link href="/" legacyBehavior>
              <a className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </a>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
} 