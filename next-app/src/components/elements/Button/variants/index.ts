import StyledButton from '../StyledButton'
import ButtonText from '../ButtonText'

import PrimaryStyledButton from './primary/PrimaryStyledButton'
import PrimaryButtonText from './primary/PrimaryButtonText'
import UploadDashedButton from './uploadDashed/UploadDashedButton'
import UploadDashedButtonText from './uploadDashed/UploadDashedButtonText'

export type possibleVariants = 'primary' | 'uploadDashed'

type TVariant = {
  Button: typeof StyledButton
  Text: typeof ButtonText
}

const variants: { [index in possibleVariants]: TVariant } = {
  primary: {
    Button: PrimaryStyledButton,
    Text: PrimaryButtonText
  },
  uploadDashed: {
    Button: UploadDashedButton,
    Text: UploadDashedButtonText
  }
}

export default variants
