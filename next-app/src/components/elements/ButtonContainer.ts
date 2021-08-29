import styled from '@emotion/styled'

/**
 * Wrapper for `Button` element
 */

const ButtonContainer = styled('div')<{ columns?: string }>`
  display: grid;
  grid-template-columns: ${(props) => props.columns || 'auto 1fr'};
`

export default ButtonContainer
