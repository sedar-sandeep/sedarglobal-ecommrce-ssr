
import { countries_url_path } from '@utils/countriesData';

const EXTERNAL_DATA_URL = `${process.env.NEXT_PUBLIC_API_URL}fetch/category_sitemap_xml/`;
const base_url = process.env.NEXT_PUBLIC_LOCAL_URL
function generateSiteMap(posts, locale) {

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
     ${posts.map(({ FULL_URL, IMAGE_URL }) => {
    return `
    <url><loc>${FULL_URL.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')}</loc>
        ${IMAGE_URL.map(({ IMAGE_PATH }) => {
          return `
        <image:image>
        <image:loc>${IMAGE_PATH.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&apos;')}</image:loc>
        </image:image>
        `;
        }).join('')}
        </url>
  `;
  }).join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res, query, locale }) {
  // We make an API call to gather the URLs for our site
  const country_code = countries_url_path[locale]?.country_code || '';
  if (country_code != '') {
    const request = await fetch(`${EXTERNAL_DATA_URL}${locale}?lang=en&site=100001&cn_iso=${country_code}`);
    const posts = await request.json();
    // We generate the XML sitemap with the posts data
    const sitemap = generateSiteMap(posts?.result, locale);

    res.setHeader('Content-Type', 'text/xml');
    // we send the XML to the browser
    res.write(sitemap);
    res.end();
    return {
      props: {},
    };
  } else {
    return {
      redirect: {
        destination: `/`,
        statusCode: 301,

      },
    }
  }

}

export default SiteMap;



