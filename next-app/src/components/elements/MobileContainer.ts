import styled from '@emotion/styled'

import theme from '../../assets/theme'

const MobileContainer = styled('div')<{ breakpoint?: string }>`
  @media (min-width: ${(props) => props.breakpoint}) {
    display: none;
  }
`

MobileContainer.defaultProps = {
  breakpoint: theme.breakpoints.md
}

export default MobileContainer
