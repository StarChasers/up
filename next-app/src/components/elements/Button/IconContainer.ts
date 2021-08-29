import styled from '@emotion/styled'

import theme from '../../../assets/theme'
import { changeOpacityOnLoading } from './LoaderContainer'

const IconContainer = styled('div')<{
  disableMargin?: boolean
  iconAlign?: 'left' | 'right'
  isLoading?: boolean
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${(props) =>
    props.disableMargin ? '0' : props.iconAlign === 'left' ? '0 10px 0 0' : '0 0 0 10px'};
  transition: ${theme.transitions.normal};

  ${(props) => props.isLoading && changeOpacityOnLoading};
`

export default IconContainer
