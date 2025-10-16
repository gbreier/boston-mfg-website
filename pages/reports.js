import Head from 'next/head';
import Link from 'next/link';

const reports = [
  {
    title: 'Nvidia\'s $100 Billion Deal: AI Enters a New Phase of Computing Power',
    author: 'Guy Breier, CEO, BMG',
    date: 'Oct 2, 2025',
    summary: 'Nvidia\'s $100 billion commitment to OpenAI marks a pivotal shift in AI development, where computing power—not talent or ideas—has become the primary constraint. This ambitious deal raises critical questions about infrastructure, market concentration, and the economic viability of ever-larger AI models.',
    url: '/reports/nvidia-openai-100-billion-deal',
  },
  {
    title: 'You\'ve Got to See This: Smart Factory in Action',
    author: 'Guy Breier, CEO, BMG',
    date: 'Sep 25, 2025',
    summary: 'Witness the seamless integration of robots, sensors, and real-time data at FUJI\'s Smart Factory. From effortless material navigation to inline inspections and proactive issue detection, this is manufacturing\'s future unfolding—swifter, more intelligent, and exceptionally reliable.',
    url: '/reports/fuji-smart-factory',
  },
  {
    title: 'Toyota\'s $2M Investment in STEM Education: Opportunities and Questions',
    author: 'Guy Breier, CEO, BMG',
    date: 'Apr 17, 2024',
    summary: 'Toyota has committed $2 million to boost STEM education in North Carolina through its Driving Possibilities initiative. While this investment aims to prepare students for future careers and close educational gaps, it raises important questions about corporate influence in education and long-term accountability.',
    url: '/reports/toyota-stem-education-investment',
  },
  {
    title: 'Trust but Verify: Why Supplier Qualification Must Be Rooted in Process Capability',
    author: 'Guy Breier, CEO, BMG',
    date: 'Feb 8, 2021',
    summary: 'When manufacturers assess suppliers, there\'s a tension between trust and verification. Too often, procurement teams accept first-article samples at face value—and that can lead to serious failures downstream. Learn why statistical process capability analysis is essential for supplier qualification.',
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
        <title>Manufacturing Industry Published Articles & Insights | Supplier Qualification, Hardware Startups | Boston Manufacturing Group</title>
        <meta name="description" content="Expert manufacturing industry published articles and insights from BMG's thought leaders. Learn about supplier qualification, hardware startup manufacturing strategies, and prototype-to-production best practices from industry experts with Harvard and MIT backgrounds." />
        <meta name="keywords" content="manufacturing industry reports, supplier qualification process, hardware startup manufacturing, prototype to production insights, manufacturing quality control, industrial process capability, BMG thought leadership" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://boston-mfg.com/reports" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Manufacturing Industry Published Articles & Insights | Boston Manufacturing Group" />
        <meta property="og:description" content="Expert manufacturing industry published articles and insights from BMG's thought leaders on supplier qualification, hardware startups, and prototype-to-production strategies." />
        <meta property="og:image" content="https://boston-mfg.com/bmg-logo.png" />
        <meta property="og:url" content="https://boston-mfg.com/reports" />
        <meta property="og:site_name" content="Boston Manufacturing Group" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Manufacturing Industry Published Articles & Insights | Boston Manufacturing Group" />
        <meta name="twitter:description" content="Expert manufacturing industry published articles and insights from BMG's thought leaders." />
        <meta name="twitter:image" content="https://boston-mfg.com/bmg-logo.png" />
        
        {/* Structured Data - Blog/Articles Collection */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "Manufacturing Industry Published Articles & Insights",
              "description": "Expert manufacturing industry published articles and insights from Boston Manufacturing Group's thought leaders",
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
                    "headline": "Nvidia's $100 Billion Deal: AI Enters a New Phase of Computing Power",
                    "description": "Nvidia's $100 billion commitment to OpenAI marks a pivotal shift in AI development, where computing power—not talent or ideas—has become the primary constraint.",
                    "author": {
                      "@type": "Person",
                      "name": "Guy Breier"
                    },
                    "datePublished": "2025-10-02T00:00:00.000Z",
                    "publisher": {
                      "@type": "Organization",
                      "name": "Boston Manufacturing Group"
                    },
                    "url": "https://boston-mfg.com/reports/nvidia-openai-100-billion-deal",
                    "mainEntityOfPage": {
                      "@type": "WebPage",
                      "@id": "https://boston-mfg.com/reports/nvidia-openai-100-billion-deal"
                    },
                    "articleSection": "Technology & AI",
                    "keywords": ["AI", "Nvidia", "OpenAI", "computing power", "data centers"]
                  },
                  {
                    "@type": "Article",
                    "position": 2,
                    "headline": "You've Got to See This: Smart Factory in Action",
                    "description": "Witness the seamless integration of robots, sensors, and real-time data at FUJI's Smart Factory. The future of manufacturing is unfolding—swifter, more intelligent, and exceptionally reliable.",
                    "author": {
                      "@type": "Person",
                      "name": "Guy Breier"
                    },
                    "datePublished": "2025-09-25T00:00:00.000Z",
                    "publisher": {
                      "@type": "Organization",
                      "name": "Boston Manufacturing Group"
                    },
                    "url": "https://boston-mfg.com/reports/fuji-smart-factory",
                    "mainEntityOfPage": {
                      "@type": "WebPage",
                      "@id": "https://boston-mfg.com/reports/fuji-smart-factory"
                    },
                    "articleSection": "Manufacturing Technology",
                    "keywords": ["smart factory", "automation", "robotics", "Industry 4.0", "FUJI", "manufacturing automation"]
                  },
                  {
                    "@type": "Article",
                    "position": 3,
                    "headline": "Toyota's $2M Investment in STEM Education: Opportunities and Questions",
                    "description": "Toyota has committed $2 million to boost STEM education in North Carolina through its Driving Possibilities initiative, raising important questions about corporate influence in education.",
                    "author": {
                      "@type": "Person",
                      "name": "Guy Breier"
                    },
                    "datePublished": "2024-04-17T00:00:00.000Z",
                    "publisher": {
                      "@type": "Organization",
                      "name": "Boston Manufacturing Group"
                    },
                    "url": "https://boston-mfg.com/reports/toyota-stem-education-investment",
                    "mainEntityOfPage": {
                      "@type": "WebPage",
                      "@id": "https://boston-mfg.com/reports/toyota-stem-education-investment"
                    },
                    "articleSection": "Education & Corporate Responsibility",
                    "keywords": ["STEM education", "Toyota", "corporate investment", "education policy", "North Carolina"]
                  },
                  {
                    "@type": "Article",
                    "position": 4,
                    "headline": "Trust but Verify: Why Supplier Qualification Must Be Rooted in Process Capability",
                    "description": "When manufacturers assess suppliers, there's a tension between trust and verification. Learn why statistical process capability analysis is essential for supplier qualification.",
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
                    "position": 5,
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
                    "position": 6,
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
          <h1 className="text-4xl font-bold text-secondary mb-6 text-center">Published Articles</h1>
          <p className="text-lg text-accent mb-8 text-center">
            Explore our latest published articles, insights, and case studies on manufacturing, sourcing, and quality control. Our team regularly publishes findings and recommendations to help you stay ahead in the industry.
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