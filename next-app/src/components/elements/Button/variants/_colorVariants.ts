import { TColor } from '../../../../assets/theme/colors'

export type colorStates = {
  unset: TColor
  hover: TColor
  active: TColor
  focus: TColor
  disabled: TColor
}

interface colorVariant {
  [key: string]: colorStates
}

const colorVariants: colorVariant = {
  primary: {
    unset: 'upPrimary',
    hover: 'upPrimaryHover',
    active: 'upPrimaryActive',
    focus: 'upPrimaryActive',
    disabled: 'upPrimaryActive'
  },
  secondary: {
    unset: 'upPositive',
    hover: 'upPositiveHover',
    active: 'upPositiveHover',
    focus: 'upPositiveHover',
    disabled: 'upSuccessBgNight'
  },
  transparent: {
    unset: 'transparent',
    hover: 'transparent',
    active: 'transparent',
    focus: 'transparent',
    disabled: 'transparent'
  }
}

export default colorVariants
