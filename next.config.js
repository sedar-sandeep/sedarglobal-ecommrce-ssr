// /** @type {import('next').NextConfig} */
// // const { withSentryConfig } = require("@sentry/nextjs");
// const { i18n } = require('./next-i18next.config')
// // const path = require('path')
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true'
// })

// const nextConfig = {
//   reactStrictMode: true,
//   i18n,
//   suppressHydrationWarning: false,
//   compress: true,
//   images: {
//     // loader: 'akamai',
//     // path: '',
//     deviceSizes: [640, 750, 828, 1080, 1200, 1920],
//     domains: ["ssrapi.sedarglobal.com", "api.sedarglobal.com", "uatapi.sedarglobal.com", "dxbapi.sedarglobal.com"],
//     minimumCacheTTL: 6000,
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: '**.sedarglobal.com',
//       },
//     ],
//   },
//   webpack: (config) => {
//     config.resolve.fallback = { fs: false };

//     return config;
//   },
//   // sassOptions: {
//   //   includePaths: [path.join(__dirname, 'styles')],
//   // },
//   async headers() {
//     return [
//       // {
//       //   source: '/:all*(css)',
//       //   locale: false,
//       //   headers: [
//       //     {
//       //       key: 'Cache-Control',
//       //       value: 'public, max-age=40, must-revalidate',
//       //     }
//       //   ],
//       // },
//       {
//         source: '/:all*(otf|ttf|woff|woff2)',
//         locale: false,
//         headers: [
//           {
//             key: 'Cache-Control',
//             value: 'public, max-age=31536000, must-revalidate',
//           }
//         ],
//       },
//       {
//         source: '/:all*(svg|jpg|png|webp)',
//         locale: false,
//         headers: [
//           {
//             key: 'Cache-Control',
//             value: 'public, max-age=180, s-maxage=180, stale-while-revalidate=180',
//           }
//         ],
//       },
//       // {
//       //   source: '/:all*(js)',
//       //   locale: false,
//       //   headers: [
//       //     {
//       //       key: 'Cache-Control',
//       //       value: 'public, max-age=3600, must-revalidate',
//       //     }
//       //   ],
//       // },
//       {
//         // This doesn't work for 'Cache-Control' key (works for others though):
//         source: '/_next/image(.*)',
//         headers: [
//           {
//             key: 'Cache-Control',
//             // Instead of this value:
//             value: 'public, max-age=180, s-maxage=180, stale-while-revalidate=180',
//             // Cache-Control response header is `public, max-age=60` in production
//             // and `public, max-age=0, must-revalidate` in development
//           },
//         ],
//       },
//     ]
//   },
//   async redirects() {
//     return [
//       {
//         source: '/home',
//         destination: '/',
//         permanent: true,
//       },
//     ];
//   },
//   // Optional build-time configuration options
//   // sentry: {
//   //   hideSourceMaps: true,
//   //   // See the sections below for information on the following options:
//   //   //   'Configure Source Maps':
//   //   //     - disableServerWebpackPlugin
//   //   //     - disableClientWebpackPlugin
//   //   //     - hideSourceMaps
//   //   //     - widenClientFileUpload
//   //   //   'Configure Legacy Browser Support':
//   //   //     - transpileClientSDK
//   //   //   'Configure Serverside Auto-instrumentation':
//   //   //     - autoInstrumentServerFunctions
//   //   //     - excludeServerRoutes
//   //   //   'Configure Tunneling to avoid Ad-Blockers':
//   //   //     - tunnelRoute
//   // },
//   swcMinify: true
// }

// // const sentryWebpackPluginOptions = {
// //   // Additional config options for the Sentry Webpack plugin. Keep in mind that
// //   // the following options are set automatically, and overriding them is not
// //   // recommended:
// //   //   release, url, authToken, configFile, stripPrefix,
// //   //   urlPrefix, include, ignore

// //   org: "sedar-global",
// //   project: "sedarglobal-frontend",
// //   silent: true, // Suppresses all logs
// //   authToken: '91704fc5f1a04fccaa3cc0b41b0225c22212137d690d4e27b914bb59d15433fb',
// //   env: 'production'
// //   // For all available options, see:
// //   // https://github.com/getsentry/sentry-webpack-plugin#options.
// // };


// module.exports = withBundleAnalyzer(nextConfig); //withSentryConfig(nextConfig, sentryWebpackPluginOptions);




// const { i18n } = require('./next-i18next.config')
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true'
// })

// const nextConfig = {
//   reactStrictMode: true,
//   i18n,
//   suppressHydrationWarning: false,
//   compress: true,
//   images: {
//     // loader: 'akamai',
//     // path:'',
//     // deviceSizes: [640, 750, 828, 1080, 1200, 1920],
//     domains: ["api.sedarglobal.com", "uatapi.sedarglobal.com", "dxbapi.sedarglobal.com"],
//     minimumCacheTTL: 6000,
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: '**.sedarglobal.com',
//       },
//     ],
//   },
//   webpack: (config) => {
//     config.resolve.fallback = { fs: false };
//     return config;
//   },
  
//   async headers() {
//     return [
//       {
//         source: '/:all*(otf|ttf|woff|woff2)',
//         locale: false,
//         headers: [
//           {
//             key: 'Cache-Control',
//             value: 'public, max-age=31536000, must-revalidate',
//           }
//         ],
//       },
//       {
//         source: '/:all*(svg|jpg|png|webp)',
//         locale: false,
//         headers: [
//           {
//             key: 'Cache-Control',
//             value: 'public, max-age=180, s-maxage=180, stale-while-revalidate=180',
//           }
//         ],
//       },
//       {
//         source: '/_next/image(.*)',
//         headers: [
//           {
//             key: 'Cache-Control',
//             value: 'public, max-age=180, s-maxage=180, stale-while-revalidate=180',
//           },
//         ],
//       },
//     ]
//   },
//     async redirects() {
//       return [
//         {
//           source: '/home',
//           destination: '/',
//           permanent: true,
//         },
//       ];
//     },
// }

// module.exports = withBundleAnalyzer(nextConfig)



/** @type {import('next').NextConfig} */
const { withSentryConfig } = require("@sentry/nextjs");
const { i18n } = require('./next-i18next.config')
// const path = require('path')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

const nextConfig = {
  reactStrictMode: true,
  i18n,
  suppressHydrationWarning: false,
  compress: true,
    images: {
      loader: 'akamai',
      path:'',
      //deviceSizes: [32,96, 480, 512, 640, 750, 828, 1080, 1200, 1920],
      domains: ["api.sedarglobal.com", "uatapi.sedarglobal.com", "dxbapi.sedarglobal.com"],
      minimumCacheTTL: 6000,
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**.sedarglobal.com',
        },
      ],
    },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  // sassOptions: {
  //   includePaths: [path.join(__dirname, 'styles')],
  // },
    async headers() {
      return [
        {
          source: '/:all*(otf|ttf|woff|woff2)',
          locale: false,
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, must-revalidate',
            }
          ],
        },
        {
          source: '/:all*(svg|jpg|png|webp)',
          locale: false,
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=180, s-maxage=180, stale-while-revalidate=180',
            }
          ],
        },
        {
          source: '/_next/image(.*)',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=180, s-maxage=180, stale-while-revalidate=180',
            },
          ],
        },
      ]
    },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
  // Optional build-time configuration options
 sentry: {
    hideSourceMaps: true,
    allowUrls: [/https?:\/\/((api|www)\.)?sedarglobal\.com/],
    // See the sections below for information on the following options:
    //   'Configure Source Maps':
    //     - disableServerWebpackPlugin
    //     - disableClientWebpackPlugin
    //     - hideSourceMaps
    //     - widenClientFileUpload
    //   'Configure Legacy Browser Support':
    //     - transpileClientSDK
    //   'Configure Serverside Auto-instrumentation':
    //     - autoInstrumentServerFunctions
    //     - excludeServerRoutes
    //   'Configure Tunneling to avoid Ad-Blockers':
    //     - tunnelRoute


   
  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    //tunnelRoute: "/monitoring",


    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors.
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  
  },
  swcMinify: true
}

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  org: "sedar-global",
  project: "sedarglobal-frontend",
  silent: true, // Suppresses all logs
  authToken: '91704fc5f1a04fccaa3cc0b41b0225c22212137d690d4e27b914bb59d15433fb',
  env: 'production'
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};
 

module.exports = withBundleAnalyzer(nextConfig); //withSentryConfig(nextConfig, sentryWebpackPluginOptions);
// module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);










