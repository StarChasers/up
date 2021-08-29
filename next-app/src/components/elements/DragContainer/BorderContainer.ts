import styled from '@emotion/styled'

const BorderContainer = styled('div')`
  margin: 16px;
  height: calc(100% - 38px);
  width: calc(100% - 38px);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px dashed rgba(255, 255, 255, 0.4);
  border-radius: 8px;
  z-index: 100;
`

export default BorderContainer
