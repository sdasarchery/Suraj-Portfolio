import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta
          property="og:title"
          content="Suraj Nalam | International Archery Medalist & Software Developer"
        />

        <meta
          property="og:description"
          content="International Archery Medalist, Software Developer, and Tech Enthusiast."
        />

        <meta
          property="og:image"
          content="https://res.cloudinary.com/dv8gducrk/image/upload/f_auto,q_auto/dektop_q_a_bg_k0xydg"
        />

        <meta property="og:url" content="https://surajnalam.com" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />

        <meta
          name="twitter:title"
          content="Suraj Nalam | International Archery Medalist & Software Developer"
        />

        <meta
          name="twitter:description"
          content="International Archery Medalist, Software Developer, and Tech Enthusiast."
        />

        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/dv8gducrk/image/upload/f_auto,q_auto/dektop_q_a_bg_k0xydg"
        />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}