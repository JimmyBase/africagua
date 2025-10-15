const https = require('https');

const SITE_URL = 'https://www.africaguacanarias.com';
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

// Google Search Console API endpoint
const GOOGLE_ENDPOINT = 'https://www.google.com/ping';

async function submitSitemap() {
  const params = new URLSearchParams({
    sitemap: SITEMAP_URL
  });

  const options = {
    method: 'GET',
    hostname: 'www.google.com',
    path: `/ping?${params.toString()}`,
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; AfricaguaBot/1.0; +https://www.africaguacanarias.com)'
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      if (res.statusCode === 200) {
        console.log('✅ Sitemap successfully submitted to Google');
        resolve();
      } else {
        console.error(`❌ Failed to submit sitemap. Status: ${res.statusCode}`);
        reject(new Error(`HTTP ${res.statusCode}`));
      }
    });

    req.on('error', (error) => {
      console.error('❌ Error submitting sitemap:', error);
      reject(error);
    });

    req.end();
  });
}

// Execute submission
submitSitemap().catch(console.error);