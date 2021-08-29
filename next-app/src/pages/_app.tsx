import { ThemeProvider } from '@emotion/react'
import React from 'react'
import { AppProps } from 'next/app'

import GlobalStyle from '../components/elements/Layout/GlobalStyle'
import theme from '../assets/theme'
import Providers from '../components/elements/Layout/Providers'

const App = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={theme}>
    {GlobalStyle}
    <Providers>
      <Component {...pageProps} />
    </Providers>
  </ThemeProvider>
)

export default App
