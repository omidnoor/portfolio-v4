import "../styles/variables.scss";
import "../styles/global.scss";
import "../styles/styles.scss";
import Head from "next/head";
import Script from "next/script";

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-SE5MLR2WBR"
      />
      <Script>
        {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-SE5MLR2WBR');
  `}
      </Script>

      <Component {...pageProps} />
    </>
  );
}

export default App;
