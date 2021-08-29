import styled from '@emotion/styled'

const TransparentBar = styled('div')`
  display: grid;
  padding: 25px;
  grid-template-columns: 1fr 1fr;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

export default TransparentBar
