import React from 'react';
import Document, { Html, Main, NextScript, Head } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, locale: ctx?.locale || "en" };
  }

  render() {
    return (
      <Html
        dir={this.props.locale.indexOf("-ar") !== -1 ? "rtl" : "ltr"}
        lang={this.props.locale.indexOf("-ar") !== -1 ? "ar" : "en"}
      >
        <Head>
          <meta name="robots" content="max-image-preview: large" />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
            integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
            crossOrigin="anonymous"
          />

          {this.props.locale.indexOf("-ar") !== -1 && (
            <link rel="stylesheet" href="../../styles/bootstrapTheme/theme_RTL.scss" />
          )}

          {/* <!-- Start Google analytics --> */}
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-20ZHK7ZNYB"
            strategy="beforeInteractive"
          />
          <Script id="google-analytics" strategy="beforeInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-20ZHK7ZNYB', {
                page_path: window.location.pathname,
                debug_mode: true,
                linker: { domains: [] } // 👈 disable _gl param
              });
            `}
          </Script>
          {/* <!-- End Google analytics --> */}

          {/* Facebook Pixel */}
          <Script
            id='Facebook-Pixel'
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `!(function (f, b, e, v, n, t, s) {
                if (f.fbq) return;
                n = f.fbq = function () {
                  n.callMethod
                    ? n.callMethod.apply(n, arguments)
                    : n.queue.push(arguments);
                };
                if (!f._fbq) f._fbq = n;
                n.push = n;
                n.loaded = !0;
                n.version = "2.0";
                n.queue = [];
                t = b.createElement(e);
                t.async = !0;
                t.src = v;
                s = b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t, s);
              })(window,document,"script","https://connect.facebook.net/en_US/fbevents.js");
              fbq("init", "418641216127391");
              fbq("track", "PageView");
              fbq("init", "3863780167186594");
              fbq("track", "PageView");
              `
            }}
          />
          <noscript>
            <img height="1" width="1" style={{ display: 'none' }}
              src="https://www.facebook.com/tr?id=418641216127391&ev=PageView&noscript=1" />
            <img height="1" width="1" style={{ display: 'none' }}
              src="https://www.facebook.com/tr?id=3863780167186594&ev=PageView&noscript=1" />
          </noscript>
          {/* Facebook Pixel End */}

          {/* TikTok Analytics */}
          <Script id="Tiktok-analytics" strategy="beforeInteractive">
            {`
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
                ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
                ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
                for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
                ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
                ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";
                  ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};
                  var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;
                  var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
                ttq.load('CGM0OF3C77U84MT11HG0'); ttq.page();
              }(window, document, 'ttq');
            `}
          </Script>
          {/* TikTok Analytics End */}

          {/* Microsoft Clarity */}
          <Script id="microsoft-clarity-tracking" strategy="beforeInteractive">
            {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window,document, "clarity", "script", "gh3ywsd4k4");`}
          </Script>
          {/* Microsoft Clarity End */}

          {/* Google Tag Manager */}
          <Script id="google-gtm" strategy="beforeInteractive" dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-KWXTV8V');`
          }} />
          {/* Google Tag Manager End */}

          {/* Yandex Metrika */}
          <Script id="yandex-metrika" type="text/javascript" strategy="afterInteractive">
            {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
              ym(93265458, "init", {
                  clickmap:true,
                  trackLinks:true,
                  accurateTrackBounce:true,
                  webvisor:true,
                  ecommerce:"dataLayer"
              });`}
          </Script>
          {/* Yandex End */}

          {/* Snap Pixel */}
          <Script id="Snap-Pixel" type="text/javascript" strategy="afterInteractive">
            {`(function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function() {
                a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
                a.queue=[];var s='script';r=t.createElement(s);r.async=!0; r.src=n;
                var u=t.getElementsByTagName(s)[0]; u.parentNode.insertBefore(r,u);
              })(window,document, 'https://sc-static.net/scevent.min.js');
              snaptr('init', '725ccdf6-5ce4-4fc5-a89f-3e9c84a328b8', { 'user_email': '__INSERT_USER_EMAIL__' });
              snaptr('track', 'PAGE_VIEW');
              snaptr('init', '76a01b06-6d42-42c1-b913-83f3ac777a97', { 'user_email': '__INSERT_USER_EMAIL__' });
              snaptr('track', 'PAGE_VIEW');`}
          </Script>
          {/* Snap Pixel End */}

        </Head>
        <body>
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KWXTV8V"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>`}}
          />
          <Main />
          <NextScript />

          {/* Google Maps */}
          <Script
            id="googlemaps"
            type="text/javascript"
            strategy="beforeInteractive"
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCipOxW46MLf5AMEjZMIKzpbZCx1caKcH8&libraries=geometry,drawing,places"
          />

          {/* Freshchat */}
          <Script
            src="https://wchat.freshchat.com/js/widget.js"
            type="text/javascript"
            strategy="beforeInteractive"
          />
          {/* <!--  start Admitad --> */}
          {/* <Script
            type="text/javascript"
            strategy="beforeInteractive"
            src="https://www.artfut.com/static/tagtag.min.js?campaign_code=98c772a893"
          /> */}
          {/* <!-- end Admitad --> */}

          {/* Load only the ElevenLabs script, the component will be loaded dynamically */}
          <script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript"></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
