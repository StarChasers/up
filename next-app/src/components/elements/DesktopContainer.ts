import styled from '@emotion/styled'

import theme from '../../assets/theme'

const DesktopContainer = styled('div')<{ breakpoint?: string }>`
  @media (max-width: ${(props) => props.breakpoint}) {
    display: none !important;
  }
`

DesktopContainer.defaultProps = {
  breakpoint: theme.breakpoints.md
}

export default DesktopContainer
