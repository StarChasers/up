import { css } from '@emotion/css'

import { ExpandableElement } from '../../components/elements/ExpandableElement'
import { StaticSizeElement, padding } from '../../components/elements/ExpandableBalloon'

const hoverExpandableElementHelper = (props: { width: number; height: number }) => css`
  position: relative;

  ${StaticSizeElement} {
    width: ${props.width - 2 * padding}px;
    height: ${props.height - 2 * padding}px;
  }

  &:hover {
    ${ExpandableElement} {
      width: ${props.width}px;
      height: ${props.height}px;
    }
  }
`

export default hoverExpandableElementHelper
