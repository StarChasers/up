import styled from '@emotion/styled'

export const ExpandableElement = styled('div')`
  position: absolute;
  width: 0;
  height: 0;
  transition: ${(props) => props.theme.transitions.normal};
  overflow: hidden;
`

export default ExpandableElement
