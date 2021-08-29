import '@emotion/react'

import { ITheme } from '../src/assets/theme'

declare module '@emotion/react' {
  export interface Theme extends ITheme {}
}
