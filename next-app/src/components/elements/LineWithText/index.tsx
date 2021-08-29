import React from 'react'

import Line from './Line'
import LineWithTextContainer from './LineWithTextContainer'
import { TypographyP } from '../Typography'
import { css } from '@emotion/css'
import theme from '../../../assets/theme'

const LineWithText: React.FC = (props) => (
  <LineWithTextContainer>
    <Line />
    <TypographyP
      className={css`
        color: ${theme.colors.timberwolf};
        user-select: none;
        font-size: 12px;
      `}
    >
      {props.children}
    </TypographyP>
    <Line />
  </LineWithTextContainer>
)

export default LineWithText
