import styled from '@emotion/styled'

import { colorStates } from './variants/_colorVariants'

const StyledButton = styled('div')<{
  disabled?: boolean
  iconAlign?: 'left' | 'right'
  colorStates: colorStates
}>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  flex-direction: ${(props) => (props.iconAlign === 'left' ? 'row' : 'row-reverse')};
`

export default StyledButton
