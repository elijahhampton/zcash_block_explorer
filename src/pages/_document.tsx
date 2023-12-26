import Document, { Html, Head, Main, NextScript } from "next/document";
import Layout from "../components/Layout";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <Layout>
          <Main />
          <NextScript />
        </Layout>
      </Html>
    );
  }
}

// MyDocument.getInitialProps = async (ctx) => {
//   const initialProps = await Document.getInitialProps(ctx);
//   ctx.res.setHeader(
//     "Content-Security-Policy",
//     "default-src 'self'; img-src 'self' https:; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
//   );
//   return { ...initialProps };
// };

export default MyDocument;
