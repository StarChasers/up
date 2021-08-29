import { injectGlobal } from '@emotion/css'

import resetStyle from './resetStyle'
import animationsStyle from './animationsStyle'

const GlobalStyle = injectGlobal`
  ${resetStyle};

   body {
     font-family: 'Lato', sans-serif;
     font-size: 16px;
     line-height: 1.2;
     color: #333333;
     overflow-x: hidden;
     font-weight: 400;
   }
 
  ${animationsStyle};
`

export default GlobalStyle
