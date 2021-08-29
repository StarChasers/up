import { css } from '@emotion/css'
import { Theme } from '@emotion/react'

const childrenWithDotsHelper = (theme: Theme) => css`
  > *:not(:first-of-type) {
    position: relative;
    margin-left: 25px;

    &::before {
      content: '○';
      position: absolute;
      left: calc(-16px);
      height: 13px;
      display: flex;
      align-items: center;
      font-size: 13px;
      color: ${theme.colors.upNeutralFillNight};
    }
  }
`

export default childrenWithDotsHelper
