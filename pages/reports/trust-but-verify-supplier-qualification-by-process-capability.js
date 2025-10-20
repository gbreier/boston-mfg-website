import Head from 'next/head';
import Link from 'next/link';

export default function TrustButVerify() {
  return (
    <>
      <Head>
        <title>Trust but Verify: Why Supplier Qualification Must Be Rooted in Process Capability | Boston Manufacturing Group</title>
      </Head>
      <main className="bg-background min-h-screen font-sans">
        <section className="max-w-3xl mx-auto py-12 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">Trust but Verify: Why Supplier Qualification Must Be Rooted in Process Capability</h1>
          <div className="flex items-center gap-3 mb-8 pb-6 border-b-2 border-gray-200">
            <img src="/guy-breier.png" alt="Guy Breier portrait" className="w-12 h-12 rounded-full object-cover border-2 border-secondary" />
            <div>
              <p className="text-lg font-semibold text-gray-800">Guy Breier, CEO</p>
              <p className="text-sm text-gray-600">Boston Manufacturing Group &middot; Feb 8, 2021</p>
            </div>
          </div>
          <article className="prose prose-lg prose-blue max-w-none space-y-6">
            <p className="text-xl leading-relaxed text-gray-700 mb-8">When manufacturers assess suppliers, there's a tension between trust and verification. Too often, procurement teams accept first-article samples at face value—and that can lead to serious failures downstream.</p>
            
            <h2 className="text-3xl font-bold text-secondary mt-12 mb-6 pt-8 border-t-2 border-gray-200">A Real-World Example: The Drive Belt that Almost Failed Us</h2>
            
            <p className="text-lg leading-relaxed mb-6">Early in my career, managing supplier and quality for a consumer electronics company, I encountered a classic trap. We were sourcing a drive belt—a deceptively simple component that transferred torque from a motor to a brush-roll. But because it rotated at high RPM and demanded precise tension, any deviation in length could kill performance or reliability.</p>
            
            <p className="text-lg leading-relaxed mb-6">We chose a new supplier and required a first article inspection (FAI): 30 samples to confirm compliance with a spec of <strong>150 mm ± 10 mm</strong>. The delivered belts "passed"—but something nagged at me. All the lengths clustered near the lower spec boundary. Why not a balanced mix?</p>
            
            <p className="text-lg leading-relaxed mb-6">When I ran a statistical analysis, the answer became obvious. The process' Cpk (capability index adjusted for offset) was barely above 0.5, implying ~11% defect rate if the line operated at that level. In reality, the supplier had likely hand-picked the samples that "passed" for the FAI, omitting the failures. When we confronted them, they adjusted the mean length upward and established a stable, centered process. The line ran reliably thereafter.</p>
            
            <p className="text-lg leading-relaxed font-semibold text-gray-800 bg-blue-50 p-4 rounded-lg border-l-4 border-primary">That experience taught me a vital lesson: verifying compliance once is not enough. You must ensure the supplier's process is capable—and you must guard against sample bias.</p>
            
            <img src="/trust-but-verify-photo.png" alt="Report illustration or figure from Trust but Verify report" className="w-full max-w-md mx-auto my-6 rounded shadow" />
            
            <h2 className="text-3xl font-bold text-secondary mt-12 mb-6 pt-8 border-t-2 border-gray-200">Why First Article Isn't Enough</h2>
            
            <p className="text-lg mb-4">Here's where many companies go off track:</p>
            
            <ul className="space-y-4 my-6 ml-6">
              <li className="text-lg leading-relaxed"><strong className="text-primary">Spec compliance ≠ stable process.</strong> A supplier can produce a few "good" parts while operating an uncontrolled process.</li>
              
              <li className="text-lg leading-relaxed"><strong className="text-primary">Mean-shift risk.</strong> A distribution skewed toward one spec boundary increases the risk of defects creeping in.</li>
              
              <li className="text-lg leading-relaxed"><strong className="text-primary">Sample selection bias.</strong> Without oversight, suppliers may discard nonconforming units from the FAI pool.</li>
              
              <li className="text-lg leading-relaxed"><strong className="text-primary">Scaling risk.</strong> A process that passes on 30 units may fail when operating at volume.</li>
            </ul>
            
            <h2 className="text-3xl font-bold text-secondary mt-12 mb-6 pt-8 border-t-2 border-gray-200">The Power of Capability Indices</h2>
            
            <p className="text-lg leading-relaxed">In quality engineering, Cp measures how tight a process' spread is relative to tolerance, while Cpk adjusts for mean shift. A Cpk of 1.0 means even with shift, the process stays within spec; below that, defects grow rapidly.</p>
            
            <p className="text-lg leading-relaxed">By demanding that new suppliers submit capability studies—beyond simple FAI—you shift the conversation from "Do you occasionally meet spec?" to "Can you robustly stay in spec over time?"</p>
            
            <h2 className="text-3xl font-bold text-secondary mt-12 mb-6 pt-8 border-t-2 border-gray-200">Best Practices for Capability-Driven Supplier Qualification</h2>
            
            <p className="text-lg mb-4">Here's a playbook:</p>
            
            <ul className="space-y-4 my-6 ml-6">
              <li className="text-lg leading-relaxed"><strong className="text-primary">Define capability thresholds up front.</strong> State minimum acceptable Cp and Cpk values in your supplier quality plans.</li>
              
              <li className="text-lg leading-relaxed"><strong className="text-primary">Require representative run data.</strong> Ask for 25–30 consecutive parts (or more) under typical production conditions, not idealized settings.</li>
              
              <li className="text-lg leading-relaxed"><strong className="text-primary">Audit the sample collection.</strong> Where possible, deploy a trusted field engineer or quality auditor to witness the FAI in situ.</li>
              
              <li className="text-lg leading-relaxed"><strong className="text-primary">Perform statistical diagnostics.</strong> Look not only at mean and sigma, but at skewness and sample truncation (e.g., missing outliers).</li>
              
              <li className="text-lg leading-relaxed"><strong className="text-primary">Track capability over time.</strong> Incorporate SPC (statistical process control) monitoring once production begins.</li>
              
              <li className="text-lg leading-relaxed"><strong className="text-primary">Escalate when capability erodes.</strong> If you observe sustained drift, trigger remediation or replacement.</li>
            </ul>
            
            <h2 className="text-3xl font-bold text-secondary mt-12 mb-6 pt-8 border-t-2 border-gray-200">Strategic Upside: Risk Mitigation & Supplier Maturity</h2>
            
            <p className="text-lg mb-4">By shifting from acceptance to capability, you gain:</p>
            
            <ul className="space-y-4 my-6 ml-6">
              <li className="text-lg leading-relaxed"><strong className="text-primary">Lower defect rate and rework costs.</strong> You catch weak performance before ramp-up.</li>
              
              <li className="text-lg leading-relaxed"><strong className="text-primary">Predictable quality performance.</strong> You can model defect exposure over time.</li>
              
              <li className="text-lg leading-relaxed"><strong className="text-primary">Better supplier alignment.</strong> You encourage supplier investment in process control, reducing variability.</li>
              
              <li className="text-lg leading-relaxed"><strong className="text-primary">Stronger supply chain trust.</strong> Trust is reinforced by data, not anecdotes.</li>
            </ul>
            
            <h2 className="text-3xl font-bold text-secondary mt-12 mb-6 pt-8 border-t-2 border-gray-200">The Bottom Line</h2>
            
            <p className="text-lg leading-relaxed">"Trust but verify" is more than a proverb—it's a strategic imperative in high-stakes manufacturing. As supply chains globalize and complexity intensifies, superficial validations won't suffice. To protect your brand, cost structure, and reputation, you must drive discipline into supplier qualification with robust statistical capability—and you must detect attempts to game the system.</p>
            
            <p className="text-xl font-semibold text-primary mt-6 italic">When data speaks, listen. Let the numbers decide whom you trust.</p>
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