import Head from 'next/head';
import Link from 'next/link';

const reports = [
  {
    title: 'Trust but Verify - Supplier Qualification by Process Capability',
    author: 'Guy Breier, CEO, BMG',
    date: 'Feb 8, 2021',
    summary: 'Years back, I was in charge of supplier and manufacturing quality for one of the large US-based companies designing and selling complex... ',
    url: '/reports/trust-but-verify-supplier-qualification-by-process-capability',
  },
  {
    title: 'P2P Blog',
    author: 'Guy Breier, CEO, BMG',
    date: 'Jan 29, 2021',
    summary: 'Welcome to the Boston Manufacturing Group (BMG) Prototype-to-Production™ blog. BMG supports manufacturing efforts that include... ',
    url: '/reports/p2p-blog',
  },
  {
    title: 'Hardware startups and the best path to high-volume manufacturing',
    author: 'Ron Rubin PhD, Managing Director, BMG',
    date: 'Jan 29, 2021',
    summary: 'A proper manufacturing process can position a hardware startup months and even years ahead of its competition.',
    url: '/reports/hardware-startups-and-the-best-path-to-high-volume-manufacturing',
  },
];

export default function Reports() {
  return (
    <>
      <Head>
        <title>Reports | Boston Manufacturing Group</title>
        <meta name="description" content="Reports and insights from Boston Manufacturing Group." />
      </Head>
      <main className="bg-background min-h-screen font-sans">
        <div className="flex justify-center pt-10 pb-4 bg-background">
          <Link href="/">
            <img src="/bmg-logo.png" alt="Boston Manufacturing Group logo" className="h-16 w-auto cursor-pointer" />
          </Link>
        </div>
        <section className="max-w-3xl mx-auto py-12 px-4">
          <h1 className="text-4xl font-bold text-secondary mb-6 text-center">Reports</h1>
          <p className="text-lg text-accent mb-8 text-center">
            Explore our latest reports, insights, and case studies on manufacturing, sourcing, and quality control. Our team regularly publishes findings and recommendations to help you stay ahead in the industry.
          </p>
          <div className="space-y-8">
            {reports.map((report, idx) => (
              <div key={idx} className="bg-white border-l-4 border-primary rounded-lg shadow p-6">
                <h2 className="text-2xl font-semibold text-secondary mb-2">{report.title}</h2>
                <p className="text-accent mb-1">{report.author} &middot; {report.date}</p>
                <p className="text-gray-700 mb-4">{report.summary}</p>
                <Link href={report.url} legacyBehavior>
                  <a className="text-primary font-semibold hover:underline">Read More</a>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
} 