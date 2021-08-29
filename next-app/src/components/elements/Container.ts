import styled from '@emotion/styled'

const Container = styled('div')`
  width: ${(props) => props.theme.constants.containerSizes.xl};
  min-height: 1px;
  margin: 0 auto;

  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    width: ${(props) => props.theme.constants.containerSizes.lg};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    width: ${(props) => props.theme.constants.containerSizes.md};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    width: ${(props) => props.theme.constants.containerSizes.sm};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    width: 90%;
  }
`

export default Container
