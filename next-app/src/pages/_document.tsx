import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

import theme from '../assets/theme'

class MyDocument extends Document {
  render() {
    return (
      <Html style={{ overflowY: 'scroll', background: theme.colors.upBackground }}>
        <Head>
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link
            href='https://fonts.googleapis.com/css2?family=Bree+Serif&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
