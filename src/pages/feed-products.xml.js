
import { countries_url_path } from '@utils/countriesData';

const EXTERNAL_DATA_URL = `${process.env.NEXT_PUBLIC_API_URL}fetch/product_xml/`;

const base_url = process.env.NEXT_PUBLIC_LOCAL_URL
function generateRssFeed(props, ccy_code, cn_iso, country_name) {
  const strExists = ['[PRODUCT_COLOR]', '[PRODUCT_NAME]', '[CATEGORY_NAME]', '[COUNTRY]'];


  return `<?xml version="1.0"?>
    <rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
    <channel>
    <title>
    ${props.SEO_META_TITLE || 'Sedar'}
    </title>
    <link>${base_url}</link>
    <description>
    ${removeSpecialChar(props.SEO_META_DESC || 'Sedar')}
    </description>
    ${props.ITEM.map((data, i) => {
    let meta_desc = data.DESCRIPTION && data.DESCRIPTION.replace(/(<([^>]+)>)/ig, '') && data.DESCRIPTION !== 'null' ? data.DESCRIPTION.replace(/(<([^>]+)>)/ig, '') : props.SEO_META_DESC || 'Sedar';

    let metaDescInclude = strExists.some(el => meta_desc.includes(el));

    if (metaDescInclude) {
      const mapObj = {
        '[CATEGORY_NAME]': data?.TITLE || '',
        '[COUNTRY]': country_name,
        '[PRODUCT_COLOR]': data.COLOR_DESC || '',
        '[PRODUCT_NAME]': spi_desc || '',
      }
      meta_desc = meta_desc.replace(/\[CATEGORY_NAME]|\[COUNTRY]|\[PRODUCT_COLOR]|\[PRODUCT_NAME]/gi, matched => mapObj[matched]);
    }

    
    return (
      `<item>
              <g:id>${data.ITEM_ID || ''}</g:id>
              <g:title>${removeSpecialChar(data.TITLE)}
                -
              ${removeSpecialChar(data.COLOR_DESC)}
                -
              ${removeSpecialChar(data.ITEM_ID)}
              
              </g:title>
              
              <g:description>
              ${removeSpecialChar(meta_desc)}
              </g:description>
              <g:link>${data.ITEM_LINK.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;') || ''}</g:link>
                ${data?.IMAGE_URL?.map((v, i) => {
          if (i == 0) {
            return `<g:image_link>
                    ${v.IMAGE_PATH.replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&apos;')}
                  </g:image_link>`;
          } else if (i > 0) {
            return `<g:additional_image_link>
                    ${v.IMAGE_PATH.replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&apos;')}
                  </g:additional_image_link>`;
          }
        }).join('') || ''}
            <g:condition>${data.ITEM_CONDITION || ''}</g:condition>
            <g:availability>${data.ITEM_AVAILABILITY == 'ondemand' ? 'preorder' : 'in_stock'}</g:availability>
            <g:availability_date>${data.DELIVERY_DATE}</g:availability_date>
            ${data.PRICE_OLD > data.PRICE ?
        `<g:price>${data.PRICE_OLD} ${ccy_code}</g:price> <g:sale_price>${data.PRICE} ${ccy_code}</g:sale_price>`
        : `<g:price>${data.PRICE} ${ccy_code}</g:price>`
      }
           
            <g:shipping>
              <g:country>${cn_iso}</g:country>
              <g:service>${data.ITEM_AVAILABILITY == 'EXPRESS' ? 'Express' : 'Standard'}</g:service>
              <g:price>0 ${ccy_code}</g:price>
            </g:shipping>
            <g:brand>${removeSpecialChar(data?.BRAND_DESC || '')}</g:brand>
              <g:mpn>${data.MPN || ''}</g:mpn>
              <g:google_product_category>${data.SC_TAXONOMY}</g:google_product_category>
             <g:product_type>
              ${removeSpecialChar(data?.PRODUCT_TYPE || '')}
             </g:product_type>
            <g:color>
            ${removeSpecialChar(data?.COLOR_DESC || '')}
            </g:color>
        </item>`
    )
  }).join('')}
   </channel></rss>`;
}

function removeSpecialChar($str){
  return $str.replace(/&/g, '&amp;')       // Replace &
  .replace(/</g, '&lt;')        // Replace <
  .replace(/>/g, '&gt;')        // Replace >
  .replace(/"/g, '&quot;')      // Replace "
  .replace(/'/g, '&apos;')      // Replace '
  .replace(/`/g, '&#x60;')      // Replace backtick `
  .replace(/\//g, '&#x2F;')     // Replace forward slash /
  .replace(/\\/g, '&#x5C;')     // Replace backslash \
  .replace(/\(/g, '&#x28;')     // Replace (
  .replace(/\)/g, '&#x29;')     // Replace )
  .replace(/\{/g, '&#x7B;')     // Replace {
  .replace(/\}/g, '&#x7D;')     // Replace }
  .replace(/\[/g, '&#x5B;')     // Replace [
  .replace(/\]/g, '&#x5D;')    // Replace ]
  || '';
}

function RssFeed() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res, locale }) {
  // We make an API call to gather the URLs for our site
  const country_code = countries_url_path[locale]?.country_code || '';
  const ccy_code = countries_url_path[locale]?.ccy_code || '';
  const country_name = countries_url_path[locale]?.name || '';
  if (country_code != '') {
    const request = await fetch(`${EXTERNAL_DATA_URL}${locale}?lang=en&site=100001&cn_iso=${country_code}&ccy_code=${ccy_code}&locale=${locale}`);
    const posts = await request.json();
    // We generate the XML sitemap with the posts data
    const rssFeed = generateRssFeed(posts?.result, ccy_code, country_code, country_name);

    res.setHeader('Content-Type', 'text/xml');
    // we send the XML to the browser
    res.write(rssFeed);
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

export default RssFeed;



