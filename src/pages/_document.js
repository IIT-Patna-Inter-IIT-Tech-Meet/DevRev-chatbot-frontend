import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head >
        <link rel="icon" href="/icons.png" />
        <meta name="description" content="Chatbot" />
        <meta name="og:title" content="Chatbot" />
        <title>ChatBot | Team 46</title>
        </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
