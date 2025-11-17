

const base_url = process.env.NEXT_PUBLIC_LOCAL_URL
function generateSiteMap(locale) {

  if (locale == 'default' || locale == '') {
    return `<?xml version="1.0" encoding="UTF-8"?>
      <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <sitemap><loc>${base_url}uae-en/sitemap-category.xml</loc></sitemap>  
        <sitemap><loc>${base_url}uae-en/sitemap-products.xml</loc></sitemap>
        <sitemap><loc>${base_url}uae-en/sitemap.xml</loc></sitemap>
        <sitemap><loc>${base_url}uae-ar/sitemap-category.xml</loc></sitemap>
        <sitemap><loc>${base_url}uae-ar/sitemap-products.xml</loc></sitemap>
        <sitemap><loc>${base_url}uae-ar/sitemap.xml</loc></sitemap>
        <sitemap><loc>${base_url}ksa-en/sitemap-category.xml</loc></sitemap>
        <sitemap><loc>${base_url}ksa-en/sitemap-products.xml</loc></sitemap>
        <sitemap><loc>${base_url}ksa-en/sitemap.xml</loc></sitemap>
        <sitemap><loc>${base_url}ksa-ar/sitemap-category.xml</loc></sitemap>
        <sitemap><loc>${base_url}ksa-ar/sitemap-products.xml</loc></sitemap>
        <sitemap><loc>${base_url}ksa-ar/sitemap.xml</loc></sitemap>
        <sitemap><loc>${base_url}omn-en/sitemap-category.xml</loc></sitemap>
        <sitemap><loc>${base_url}omn-en/sitemap-products.xml</loc></sitemap>
        <sitemap><loc>${base_url}omn-en/sitemap.xml</loc></sitemap>
        <sitemap><loc>${base_url}omn-ar/sitemap-category.xml</loc></sitemap>
        <sitemap><loc>${base_url}omn-ar/sitemap-products.xml</loc></sitemap>
        <sitemap><loc>${base_url}omn-ar/sitemap.xml</loc></sitemap>
        <sitemap><loc>${base_url}bhr-en/sitemap-category.xml</loc></sitemap>
        <sitemap><loc>${base_url}bhr-en/sitemap-products.xml</loc></sitemap>
        <sitemap><loc>${base_url}bhr-en/sitemap.xml</loc></sitemap>
        <sitemap><loc>${base_url}bhr-ar/sitemap-category.xml</loc></sitemap>
        <sitemap><loc>${base_url}bhr-ar/sitemap-products.xml</loc></sitemap>
        <sitemap><loc>${base_url}bhr-ar/sitemap.xml</loc></sitemap>
        <sitemap><loc>${base_url}qat-en/sitemap-category.xml</loc></sitemap>
        <sitemap><loc>${base_url}qat-en/sitemap-products.xml</loc></sitemap>
        <sitemap><loc>${base_url}qat-en/sitemap.xml</loc></sitemap>
        <sitemap><loc>${base_url}qat-ar/sitemap-category.xml</loc></sitemap>
        <sitemap><loc>${base_url}qat-ar/sitemap-products.xml</loc></sitemap>
        <sitemap><loc>${base_url}qat-ar/sitemap.xml</loc></sitemap>
        <sitemap><loc>${base_url}global-en/sitemap-category.xml</loc></sitemap>
        <sitemap><loc>${base_url}global-en/sitemap-products.xml</loc></sitemap>
        <sitemap><loc>${base_url}global-en/sitemap.xml</loc></sitemap>
        <sitemap><loc>${base_url}global-ar/sitemap-category.xml</loc></sitemap>
        <sitemap><loc>${base_url}global-ar/sitemap-products.xml</loc></sitemap>
        <sitemap><loc>${base_url}global-ar/sitemap.xml</loc></sitemap>
        <sitemap><loc>${base_url}kwt-en/sitemap-category.xml</loc></sitemap>  
        <sitemap><loc>${base_url}kwt-en/sitemap-products.xml</loc></sitemap>
        <sitemap><loc>${base_url}kwt-en/sitemap.xml</loc></sitemap>
        <sitemap><loc>${base_url}kwt-ar/sitemap-category.xml</loc></sitemap>
        <sitemap><loc>${base_url}kwt-ar/sitemap-products.xml</loc></sitemap>
        <sitemap><loc>${base_url}kwt-ar/sitemap.xml</loc></sitemap>
       
      </sitemapindex>`;
  } else {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
     <url>
      <loc>${base_url}${locale}</loc>
      </url>
      <url>
      <loc>${base_url}${locale}find-your-store</loc>
      </url>
      <url>
      <loc>${base_url}${locale}about</loc>
      </url>
      <url>
      <loc>${base_url}${locale}contact</loc>
      </url>
      <url>
      <loc>${base_url}${locale}franchise</loc>
      </url>
      <url>
      <loc>${base_url}${locale}service</loc>
      </url>
      <url>
      <loc>${base_url}${locale}service-detail</loc>
      </url>
      <url>
      <loc>${base_url}${locale}careers</loc>
      </url>
      <url>
      <loc>${base_url}${locale}free-sample</loc>
      </url>
      <url>
      <loc>${base_url}${locale}free-consultation</loc>
      </url>
      <url>
      <loc>${base_url}${locale}offers</loc>
      </url>
      <url>
      <loc>${base_url}${locale}tools-and-guides</loc>
      </url>
      <url>
      <loc>${base_url}${locale}blog</loc>
      </url>
      <url>
      <loc>${base_url}${locale}blog-detail</loc>
      </url>
      <url>
      <loc>${base_url}${locale}privacy-policy</loc>
      </url>
      <url>
      <loc>${base_url}${locale}terms-contitions</loc>
      </url>
      <url>
      <loc>${base_url}${locale}accessibility</loc>
      </url>
      <url>
      <loc>${base_url}${locale}cookie-policy</loc>
      </url>
      <url>
      <loc>${base_url}${locale}returns-refund</loc>
      </url>
      <url>
      <loc>${base_url}${locale}b2bRegistration</loc>
      </url>
      <url>
      <loc>${base_url}${locale}faqs</loc>
      </url>
      <url>
      <loc>${base_url}${locale}brands</loc>
      </url>
      <url>
      <loc>${base_url}${locale}contracts</loc>
      </url>
      <url>
      <loc>${base_url}${locale}the-met</loc>
      </url>
   </urlset>
    `;
  }
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

// export async function getServerSideProps({ res, locale }) {
//   let sitemap = '';
//   if (locale != 'default') {
//     sitemap = generateSiteMap(`${locale}/`);
//   } else {
//     sitemap = generateSiteMap(`${locale}`);
//   }
//   res.setHeader('Content-Type', 'text/xml');
//   // we send the XML to the browser
//   res.write(sitemap);
//   res.end();
//   return {
//     props: {},
//   };
// }

 
export async function getServerSideProps({ res, params }) {
  const allowedLocales = [
    'qat-ru', 'qat-ch',
    'uae-ru', 'uae-ch',
    'bhr-ru', 'bhr-ch',
    'ksa-ru', 'ksa-ch',
    'omn-ru', 'omn-ch',
    'kwt-ru', 'kwt-ch',
    'egy-ru', 'egy-ch'
  ]; // not generate sitemap for these
  const locale = params?.locale || 'default';

  if (allowedLocales.includes(locale)) {
    // Return 404 for unsupported locales
    res.statusCode = 404;
    res.end('Not found');
    return { props: {} };
  }

  const sitemap = generateSiteMap(locale === 'default' ? '' : `${locale}/`);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;



