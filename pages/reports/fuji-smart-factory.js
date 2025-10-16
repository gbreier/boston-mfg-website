import Head from 'next/head';
import Link from 'next/link';

export default function FujiSmartFactory() {
  return (
    <>
      <Head>
        <title>You've Got to See This: Smart Factory in Action | Boston Manufacturing Group</title>
        <meta name="description" content="Witness the seamless integration of robots, sensors, and real-time data at FUJI's Smart Factory. Materials effortlessly navigate the facility, inline inspections streamline quality control, and proactive issue detection prevents disruptions." />
        <meta name="keywords" content="smart factory, automation, robotics, FUJI, Industry 4.0, manufacturing automation, inline inspection, quality control, manufacturing technology" />
        <meta name="author" content="Guy Breier" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://boston-mfg.com/reports/fuji-smart-factory" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="You've Got to See This: Smart Factory in Action" />
        <meta property="og:description" content="Witness the seamless integration of robots, sensors, and real-time data at FUJI's Smart Factory. The future of manufacturing is unfolding—swifter, more intelligent, and exceptionally reliable." />
        <meta property="og:image" content="https://boston-mfg.com/bmg-logo.png" />
        <meta property="og:url" content="https://boston-mfg.com/reports/fuji-smart-factory" />
        <meta property="og:site_name" content="Boston Manufacturing Group" />
        <meta property="article:published_time" content="2025-09-25T00:00:00.000Z" />
        <meta property="article:author" content="Guy Breier" />
        <meta property="article:section" content="Manufacturing Technology" />
        <meta property="article:tag" content="Smart Factory" />
        <meta property="article:tag" content="Automation" />
        <meta property="article:tag" content="Industry 4.0" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="You've Got to See This: Smart Factory in Action" />
        <meta name="twitter:description" content="Witness FUJI's Smart Factory showcasing the future of manufacturing with robots, sensors, and real-time data integration." />
        <meta name="twitter:image" content="https://boston-mfg.com/bmg-logo.png" />
        
        {/* Structured Data */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "You've Got to See This: Smart Factory in Action",
              "description": "Witness the seamless integration of robots, sensors, and real-time data at FUJI's Smart Factory. The future of manufacturing is unfolding—swifter, more intelligent, and exceptionally reliable.",
              "author": {
                "@type": "Person",
                "name": "Guy Breier",
                "jobTitle": "CEO",
                "affiliation": {
                  "@type": "Organization",
                  "name": "Boston Manufacturing Group"
                }
              },
              "datePublished": "2025-09-25T00:00:00.000Z",
              "dateModified": "2025-09-25T00:00:00.000Z",
              "publisher": {
                "@type": "Organization",
                "name": "Boston Manufacturing Group",
                "url": "https://boston-mfg.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://boston-mfg.com/bmg-logo.png"
                }
              },
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://boston-mfg.com/reports/fuji-smart-factory"
              },
              "articleSection": "Manufacturing Technology",
              "keywords": ["smart factory", "automation", "robotics", "Industry 4.0", "FUJI", "manufacturing automation"],
              "about": [
                {
                  "@type": "Thing",
                  "name": "Smart Manufacturing"
                },
                {
                  "@type": "Thing",
                  "name": "Industrial Automation"
                },
                {
                  "@type": "Thing",
                  "name": "Industry 4.0"
                }
              ],
              "video": {
                "@type": "VideoObject",
                "name": "FUJI Smart Factory",
                "description": "A showcase of FUJI's Smart Factory with seamless integration of robots, sensors, and real-time data",
                "thumbnailUrl": "https://i.ytimg.com/vi/VNwks1mYyo8/maxresdefault.jpg",
                "uploadDate": "2025-09-25T00:00:00.000Z",
                "contentUrl": "https://www.youtube.com/watch?v=VNwks1mYyo8",
                "embedUrl": "https://www.youtube.com/embed/VNwks1mYyo8"
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
        <article className="max-w-4xl mx-auto py-12 px-4">
          {/* Breadcrumb */}
          <nav className="text-sm text-accent mb-6">
            <Link href="/" legacyBehavior>
              <a className="hover:text-primary">Home</a>
            </Link>
            {' '}&gt;{' '}
            <Link href="/reports" legacyBehavior>
              <a className="hover:text-primary">Reports</a>
            </Link>
            {' '}&gt;{' '}
            <span className="text-secondary">FUJI Smart Factory</span>
          </nav>

          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
              🤖 You've Got to See This: Smart Factory in Action
            </h1>
          </header>

          {/* Video Embed */}
          <div className="mb-8">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                src="https://www.youtube.com/embed/VNwks1mYyo8"
                title="FUJI Smart Factory"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="mt-3 text-sm text-gray-600 text-center">
              <a 
                href="https://www.youtube.com/watch?v=VNwks1mYyo8" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center gap-1"
              >
                Watch on YouTube
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-bold text-secondary mb-4">Commentary</h2>
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-200">
                <img src="/guy-breier.png" alt="Guy Breier" className="w-12 h-12 rounded-full" />
                <div>
                  <p className="font-semibold text-secondary">Guy Breier</p>
                  <p className="text-sm text-gray-600">CEO, Boston Manufacturing Group • Sep 25, 2025</p>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                I just watched a quick video showcasing FUJI's Smart Factory, and it truly impressed me. Witness the seamless integration of robots, sensors, and real-time data, ensuring uninterrupted production processes.
              </p>

              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 mb-6 border-l-4 border-primary">
                <h3 className="text-xl font-bold text-secondary mb-4">Key Highlights:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">⚡</span>
                    <div>
                      <strong className="text-secondary">Materials effortlessly navigate the facility</strong>
                      <p className="text-gray-700 mt-1">Automated guided vehicles and smart logistics systems ensure components arrive exactly where and when they're needed, eliminating bottlenecks and reducing handling time.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">⚡</span>
                    <div>
                      <strong className="text-secondary">Inline inspections streamline quality control</strong>
                      <p className="text-gray-700 mt-1">Real-time quality checks at every stage of production mean defects are caught immediately, not after batches are complete. This saves time, reduces waste, and ensures consistent product quality.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">⚡</span>
                    <div>
                      <strong className="text-secondary">Proactive issue detection prevents disruptions</strong>
                      <p className="text-gray-700 mt-1">Advanced sensors and AI-powered analytics predict potential equipment failures before they happen, enabling preventive maintenance and minimizing unplanned downtime.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6 text-lg font-medium text-center italic border-t border-b border-gray-200 py-4">
                The future of manufacturing is unfolding before our eyes — swifter, more intelligent, and exceptionally reliable.
              </p>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-secondary mb-3">The Bigger Picture</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  What makes FUJI's Smart Factory particularly noteworthy is how it demonstrates the practical implementation of Industry 4.0 principles. This isn't a theoretical concept or a distant future—it's happening now, and it's delivering real results.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  For companies considering their own digital transformation journey, FUJI's approach offers valuable lessons: start with clear objectives, invest in the right technology infrastructure, and ensure your team is trained to work alongside these advanced systems. The integration of hardware and software, physical and digital, is what makes a truly smart factory.
                </p>
              </div>
            </div>

            {/* Call to Engagement */}
            <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500 mb-8">
              <h3 className="text-xl font-bold text-secondary mb-3 flex items-center gap-2">
                <span>👀</span> Share Your Thoughts
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Have you encountered any remarkable automation or robotics solutions lately? Feel free to comment below; I'm eager to discover what's sparking your interest.
              </p>
            </div>

          </div>

          {/* Back to Reports */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link href="/reports" legacyBehavior>
              <a className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to All Reports
              </a>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}

