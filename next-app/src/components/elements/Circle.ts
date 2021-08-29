import styled from '@emotion/styled'

import theme from '../../assets/theme'

const Circle = styled('div')<{ size: string; background?: string }>`
  height: ${(props) => props.size};
  width: ${(props) => props.size};
  border-radius: 100%;
  background: ${(props) => props.background};
`

Circle.defaultProps = {
  background: theme.colors.mako
}

export default Circle
