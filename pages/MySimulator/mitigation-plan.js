import Head from 'next/head';
import { useEffect } from 'react';

export default function MitigationPlan() {
  useEffect(() => {
    // Redirect to the mitigation plan HTML file
    // The simulator HTML files are in public/MySimulator/
    const queryString = window.location.search;
    window.location.href = `/MySimulator/mitigation-plan.html${queryString}`;
  }, []);

  return (
    <>
      <Head>
        <title>Mitigation Action Plan | Boston Manufacturing Group</title>
        <meta name="description" content="Generate detailed mitigation action plans for supply chain disruptions" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading Mitigation Plan...</p>
        </div>
      </div>
    </>
  );
}

