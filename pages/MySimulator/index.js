import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function MySimulator() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the login page
    // The simulator HTML files are in public/MySimulator/
    window.location.href = '/MySimulator/login.html';
  }, []);

  return (
    <>
      <Head>
        <title>AI Supply Chain Simulator | Boston Manufacturing Group</title>
        <meta name="description" content="AI-powered supply chain disruption analysis and risk assessment system" />
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
          <p>Loading Simulator...</p>
        </div>
      </div>
    </>
  );
}

