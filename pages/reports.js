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
    author: 'Guy Breier, CEO, BMG',
    date: 'Jan 29, 2021',
    summary: 'A proper manufacturing process can position a hardware startup months and even years ahead of its competition.',
    url: '/reports/hardware-startups-and-the-best-path-to-high-volume-manufacturing',
  },
];

export default function Reports() {
  return (
    <>
      <Head>
        <title>Manufacturing Industry Reports & Insights | Supplier Qualification, Hardware Startups | Boston Manufacturing Group</title>
        <meta name="description" content="Expert manufacturing industry reports and insights from BMG's thought leaders. Learn about supplier qualification, hardware startup manufacturing strategies, and prototype-to-production best practices from industry experts with Harvard and MIT backgrounds." />
        <meta name="keywords" content="manufacturing industry reports, supplier qualification process, hardware startup manufacturing, prototype to production insights, manufacturing quality control, industrial process capability, BMG thought leadership" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://boston-mfg.com/reports" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Manufacturing Industry Reports & Insights | Boston Manufacturing Group" />
        <meta property="og:description" content="Expert manufacturing industry reports and insights from BMG's thought leaders on supplier qualification, hardware startups, and prototype-to-production strategies." />
        <meta property="og:image" content="https://boston-mfg.com/bmg-logo.png" />
        <meta property="og:url" content="https://boston-mfg.com/reports" />
        <meta property="og:site_name" content="Boston Manufacturing Group" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Manufacturing Industry Reports & Insights | Boston Manufacturing Group" />
        <meta name="twitter:description" content="Expert manufacturing industry reports and insights from BMG's thought leaders." />
        <meta name="twitter:image" content="https://boston-mfg.com/bmg-logo.png" />
        
        {/* Structured Data - Blog/Articles Collection */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "Manufacturing Industry Reports & Insights",
              "description": "Expert manufacturing industry reports and insights from Boston Manufacturing Group's thought leaders",
              "publisher": {
                "@type": "Organization",
                "name": "Boston Manufacturing Group",
                "url": "https://boston-mfg.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://boston-mfg.com/bmg-logo.png"
                }
              },
              "mainEntity": {
                "@type": "ItemList",
                "itemListElement": [
                  {
                    "@type": "Article",
                    "position": 1,
                    "headline": "Trust but Verify - Supplier Qualification by Process Capability",
                    "description": "Years back, I was in charge of supplier and manufacturing quality for one of the large US-based companies designing and selling complex products.",
                    "author": {
                      "@type": "Person",
                      "name": "Guy Breier"
                    },
                    "datePublished": "2021-02-08T00:00:00.000Z",
                    "publisher": {
                      "@type": "Organization",
                      "name": "Boston Manufacturing Group"
                    },
                    "url": "https://boston-mfg.com/reports/trust-but-verify-supplier-qualification-by-process-capability",
                    "mainEntityOfPage": {
                      "@type": "WebPage",
                      "@id": "https://boston-mfg.com/reports/trust-but-verify-supplier-qualification-by-process-capability"
                    },
                    "articleSection": "Manufacturing Consulting",
                    "keywords": ["supplier qualification", "manufacturing quality", "process capability"]
                  },
                  {
                    "@type": "Article",
                    "position": 2,
                    "headline": "P2P Blog",
                    "description": "Welcome to the Boston Manufacturing Group (BMG) Prototype-to-Production™ blog. BMG supports manufacturing efforts that include sourcing, technical support, and quality control.",
                    "author": {
                      "@type": "Person",
                      "name": "Guy Breier"
                    },
                    "datePublished": "2021-01-29T00:00:00.000Z",
                    "publisher": {
                      "@type": "Organization",
                      "name": "Boston Manufacturing Group"
                    },
                    "url": "https://boston-mfg.com/reports/p2p-blog",
                    "mainEntityOfPage": {
                      "@type": "WebPage",
                      "@id": "https://boston-mfg.com/reports/p2p-blog"
                    },
                    "articleSection": "Manufacturing Consulting",
                    "keywords": ["prototype to production", "manufacturing consulting", "BMG insights"]
                  },
                  {
                    "@type": "Article",
                    "position": 3,
                    "headline": "Hardware startups and the best path to high-volume manufacturing",
                    "description": "A proper manufacturing process can position a hardware startup months and even years ahead of its competition.",
                    "author": {
                      "@type": "Person",
                      "name": "Guy Breier"
                    },
                    "datePublished": "2021-01-29T00:00:00.000Z",
                    "publisher": {
                      "@type": "Organization",
                      "name": "Boston Manufacturing Group"
                    },
                    "url": "https://boston-mfg.com/reports/hardware-startups-and-the-best-path-to-high-volume-manufacturing",
                    "mainEntityOfPage": {
                      "@type": "WebPage",
                      "@id": "https://boston-mfg.com/reports/hardware-startups-and-the-best-path-to-high-volume-manufacturing"
                    },
                    "articleSection": "Manufacturing Consulting",
                    "keywords": ["hardware startups", "high-volume manufacturing", "startup manufacturing"]
                  }
                ]
              }
            })
          }}
        />
        
        {/* Structured Data - Knowledge Base */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Dataset",
              "name": "BMG Manufacturing Knowledge Base",
              "description": "Comprehensive collection of manufacturing industry insights, best practices, and expert analysis from Boston Manufacturing Group",
              "creator": {
                "@type": "Organization",
                "name": "Boston Manufacturing Group",
                "url": "https://boston-mfg.com"
              },
              "keywords": [
                "manufacturing consulting",
                "supplier qualification", 
                "hardware startup manufacturing",
                "prototype to production",
                "quality control processes",
                "manufacturing process capability",
                "industrial best practices"
              ],
              "license": "https://creativecommons.org/licenses/by-nc/4.0/",
              "temporalCoverage": "2021/..",
              "spatialCoverage": {
                "@type": "Place",
                "name": "Global Manufacturing Industry"
              }
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