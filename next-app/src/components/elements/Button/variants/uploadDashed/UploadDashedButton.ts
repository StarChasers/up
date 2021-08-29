import styled from '@emotion/styled'

import hexToRGB from '../../../../../utils/hexToRGB'
import StyledButton from '../../StyledButton'
import UploadDashedButtonText from './UploadDashedButtonText'

const UploadDashedButton = styled(StyledButton)`
  border: 3px dashed ${(props) => hexToRGB(props.theme.colors.upBase01, 0.4)};
  border-radius: 8px;
  width: calc(100% - 106px);
  padding: 50px;

  &:active {
    ${UploadDashedButtonText} {
      opacity: 0.7;
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding: 35px;
  }
`

export default UploadDashedButton
