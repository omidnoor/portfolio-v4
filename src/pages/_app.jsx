import "../styles/variables.scss";
import "../styles/global.scss";
import "../styles/global.css";
import "../styles/styles.scss";
import Head from "next/head";

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
