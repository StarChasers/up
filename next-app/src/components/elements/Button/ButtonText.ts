import styled from '@emotion/styled'

import theme from '../../../assets/theme'
import { changeOpacityOnLoading } from './LoaderContainer'
import { colorStates } from './variants/_colorVariants'

const ButtonText = styled('span')<{ isLoading?: boolean; colorStates: colorStates }>`
  font-weight: bold;
  font-size: 16px;
  line-height: 25px;
  text-align: center;
  overflow-wrap: break-word;
  transition: all ${theme.transitions.normal};

  ${(props) => props.isLoading && changeOpacityOnLoading};
`

export default ButtonText
