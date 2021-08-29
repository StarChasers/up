import styled from '@emotion/styled'

import ButtonText from '../../ButtonText'

const PrimaryButtonText = styled(ButtonText)`
  color: ${(props) =>
    props.colorStates.unset === 'transparent'
      ? props.theme.colors.upBase09
      : props.theme.colors.upBase01};
`

export default PrimaryButtonText
