import styled from '@emotion/styled'

const DefaultUploadBox = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 45px;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding: 0 35px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding: 0;
  }
`

export default DefaultUploadBox
