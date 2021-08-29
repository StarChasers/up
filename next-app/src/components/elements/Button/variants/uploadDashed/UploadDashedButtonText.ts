import styled from '@emotion/styled'

import ButtonText from '../../ButtonText'

const UploadDashedButtonText = styled(ButtonText)`
  text-align: center;
  justify-content: center;
  display: flex;
  color: ${(props) => props.theme.colors.upBase01};
  font-weight: bold;
  transition: all ${(props) => props.theme.transitions.normal};
`

export default UploadDashedButtonText
