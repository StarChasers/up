import { css } from '@emotion/css'
import styled from '@emotion/styled'
import React from 'react'

import theme from '../../assets/theme'
import ExpandableElement from './ExpandableElement'

export const padding = 15

export const StaticSizeElement = styled('div')``

const ExpandableBalloon: React.FC = (props) => (
  <ExpandableElement
    className={css`
      top: 25px;
      left: 25px;
    `}
  >
    <StaticSizeElement
      className={css`
        background: ${theme.colors.mako};
        border-radius: 0 8px 8px 8px;
        padding: ${padding}px;
      `}
    >
      <span
        className={css`
          color: rgb(218, 215, 210);
          font-size: 16px;
          line-height: 1.5;
          cursor: default;
        `}
      >
        {props.children}
      </span>
    </StaticSizeElement>
  </ExpandableElement>
)

export default ExpandableBalloon
