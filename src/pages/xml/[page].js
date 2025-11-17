
import { countries_url_path } from '@utils/countriesData';

const EXTERNAL_DATA_URL = 'https://api.sedarglobal.com/fetch/sitemap_xml/';
const base_url = process.env.NEXT_PUBLIC_LOCAL_URL
function generateSiteMap(posts, locale) {
  
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
     <url>
      <loc>${base_url}${locale}</loc>
      </url>
      <url>
      <loc>${base_url}${locale}/find-your-store</loc>
      </url>
      <url>
      <loc>${base_url}${locale}/about</loc>
      </url>
      <url>
      <loc>${base_url}${locale}/contact</loc>
      </url>
      <url>
      <loc>${base_url}${locale}/franchise</loc>
      </url>
      <url>
      <loc>${base_url}${locale}/service</loc>
      </url>
      <url>
      <loc>${base_url}${locale}/service-detail</loc>
      </url>
      <url>
      <loc>${base_url}${locale}/careers</loc>
      </url>
      <url>
      <loc>${base_url}${locale}/free-sample</loc>
      </url>
      <url>
      <loc>${base_url}${locale}/free-consultation</loc>
      </url>
      <url>
      <loc>${base_url}${locale}/offers</loc>
      </url>
      <url>
      <loc>${base_url}${locale}/tools-and-guides</loc>
      </url>
      <url>
      <loc>${base_url}${locale}/blog</loc>
      </url>
      <url>
      <loc>${base_url}${locale}/blog-detail</loc>
      </url>
      <url>
      <loc>${base_url}${locale}/privacy-policy</loc>
      </url>
      <url>
      <loc>${base_url}${locale}/terms-conditions</loc>
      </url>
      <url>
      <loc>${base_url}${locale}/accessibility</loc>
      </url>
      <url>
      <loc>${base_url}${locale}/cookie-policy</loc>
      </url>
      <url>
      <loc>${base_url}${locale}/returns-refund</loc>
      </url>
      <url>
      <loc>${base_url}${locale}/b2bRegistration</loc>
      </url>
      <url>
      <loc>${base_url}${locale}/faqs</loc>
      </url>
      <url>
      <loc>${base_url}${locale}/brands</loc>
      </url>
      <url>
      <loc>${base_url}${locale}/contracts</loc>
      </url>
      <url>
      <loc>${base_url}${locale}/project/hospitality</loc>
      </url>
      <url>
      <loc>${base_url}${locale}/project/government-institutions</loc>
      </url>
      <url>
      <loc>${base_url}${locale}/project/healthcare</loc>
      </url>
      <url>
      <loc>${base_url}${locale}/project/educational-institutions</loc>
      </url>
      <url>
      <loc>${base_url}${locale}/project/residential</loc>
      </url>
      
     
      
     ${posts.map(({ FULL_URL }) => {
       return `
    <url><loc>${FULL_URL.replace(/&/g, '&amp;')
           .replace(/</g, '&lt;')
           .replace(/>/g, '&gt;')
           .replace(/"/g, '&quot;')
           .replace(/'/g, '&apos;') }</loc></url>
  `;
     }).join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res, query }) {
  // We make an API call to gather the URLs for our site
  const page_str = query.page && query.page.toString().substring(query.page.indexOf('-') + 1).split('.')[0] || '';
  const request = await fetch(`${EXTERNAL_DATA_URL}${page_str}?lang=en&site=100001&cn_iso=${countries_url_path[page_str].country_code}`);
  const posts = await request.json();
  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts?.result, page_str);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();
  return {
    props: {},
  };
}

export default SiteMap;



