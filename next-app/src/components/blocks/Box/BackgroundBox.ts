import styled from '@emotion/styled'

const BackgroundBox = styled('div')`
  position: absolute;
  width: calc(100% + 25px);
  height: calc(100% - 25px);
  border-radius: 8px;
  top: 25px;
  left: 10px;
  background: ${(props) => props.theme.colors.shark};
  z-index: -1;
  opacity: 0.7;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    left: -12.5px;
  }
`

export default BackgroundBox
