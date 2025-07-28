import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google Analytics 4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID', {
                page_title: document.title,
                page_location: window.location.href,
              });
              
              // Track form submissions
              function trackFormSubmission(formType) {
                gtag('event', 'form_submit', {
                  event_category: 'engagement',
                  event_label: formType,
                  value: 1
                });
              }
              
              // Track contact interactions
              function trackContactClick(method) {
                gtag('event', 'contact_click', {
                  event_category: 'engagement',
                  event_label: method,
                  value: 1
                });
              }
            `,
          }}
        />
        
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="YOUR_GOOGLE_SEARCH_CONSOLE_CODE" />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
        
        {/* Favicon and PWA icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Performance and Security Headers */}
        <meta name="theme-color" content="#2563eb" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="//www.linkedin.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      </Head>
      <body className="font-sans">
        <Main />
        <NextScript />
        
        {/* Additional tracking for page views */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Track page navigation for SPA behavior
              if (typeof gtag !== 'undefined') {
                const originalPushState = history.pushState;
                const originalReplaceState = history.replaceState;
                
                history.pushState = function() {
                  originalPushState.apply(history, arguments);
                  setTimeout(() => {
                    gtag('config', 'GA_MEASUREMENT_ID', {
                      page_title: document.title,
                      page_location: window.location.href,
                    });
                  }, 100);
                };
                
                history.replaceState = function() {
                  originalReplaceState.apply(history, arguments);
                  setTimeout(() => {
                    gtag('config', 'GA_MEASUREMENT_ID', {
                      page_title: document.title,
                      page_location: window.location.href,
                    });
                  }, 100);
                };
              }
            `,
          }}
        />
      </body>
    </Html>
  );
} 