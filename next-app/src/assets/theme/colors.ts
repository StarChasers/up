export type TColor =
  | 'transparent'
  | 'upBase01'
  | 'upBase02'
  | 'upBase03'
  | 'upBase04'
  | 'upBase05'
  | 'upBase06'
  | 'upBase07'
  | 'upBase08'
  | 'upBase09'
  | 'upPrimary'
  | 'upPrimaryHover'
  | 'upPrimaryActive'
  | 'upPrimaryText'
  | 'upSecondary'
  | 'upSecondaryHover'
  | 'upSecondaryActive'
  | 'upAccent'
  | 'upAccentHover'
  | 'upAccentActive'
  | 'upAccentText'
  | 'upSelection'
  | 'upFocus'
  | 'upClear'
  | 'upClearDisabled'
  | 'upClearHover'
  | 'upClearActive'
  | 'upClearInverse'
  | 'upClearInverseHover'
  | 'upClearInverseActive'
  | 'upErrorFill'
  | 'upErrorBg'
  | 'upErrorBgHover'
  | 'upSuccessFill'
  | 'upSuccessBg'
  | 'upSuccessBgHover'
  | 'upWarningFill'
  | 'upWarningBg'
  | 'upWarningBgHover'
  | 'upInfoFill'
  | 'upInfoBg'
  | 'upInfoBgHover'
  | 'upNeutralFill'
  | 'upNeutralBg'
  | 'upNeutralBgHover'
  | 'upText01'
  | 'upText02'
  | 'upText03'
  | 'upLink'
  | 'upLinkHover'
  | 'upPositive'
  | 'upPositiveHover'
  | 'upNegative'
  | 'upNegativeHover'
  | 'upErrorFillNight'
  | 'upErrorBgNight'
  | 'upErrorBgNightHover'
  | 'upSuccessFillNight'
  | 'upSuccessBgNight'
  | 'upSuccessBgNightHover'
  | 'upWarningFillNight'
  | 'upWarningBgNight'
  | 'upWarningBgNightHover'
  | 'upInfoFillNight'
  | 'upInfoBgNight'
  | 'upInfoBgNightHover'
  | 'upNeutralFillNight'
  | 'upNeutralBgNight'
  | 'upNeutralBgNightHover'
  | 'upText01Night'
  | 'upText02Night'
  | 'upText03Night'
  | 'upLinkNight'
  | 'upLinkNightHover'
  | 'upPositiveNight'
  | 'upPositiveNightHover'
  | 'upNegativeNight'
  | 'upNegativeNightHover'
  | 'upSupport01'
  | 'upSupport02'
  | 'upSupport03'
  | 'upSupport04'
  | 'upSupport05'
  | 'upSupport06'
  | 'upSupport07'
  | 'upSupport08'
  | 'upSupport09'
  | 'upSupport10'
  | 'upSupport11'
  | 'upSupport12'
  | 'upSupport13'
  | 'upSupport14'
  | 'upSupport15'
  | 'upSupport16'
  | 'upSupport17'
  | 'upSupport18'
  | 'upSupport19'
  | 'upSupport20'
  | 'upSupport21'
  | 'upSupport22'
  | 'upBackground'
  | 'mako'
  | 'shark'
  | 'timberwolf'

/**
 List of possible colors in your app.
 This is used for better color management and suggestions from your *Editor*.
 **/

const colors: {
  [index in TColor]: string
} = {
  transparent: 'transparent',
  upBase01: '#ffffff',
  upBase02: '#f6f6f6',
  upBase03: '#ededed', // basic border
  upBase04: '#d7d7d7', // hovered borders
  upBase05: '#b0b0b0', // interface icons
  upBase06: '#959595', // hovered interface icons
  upBase07: '#808080', // inverted background
  upBase08: '#333', // dark interface icons
  upBase09: '#000', // icons on inverted background
  upPrimary: '#526ed3', // primary buttons, background
  upPrimaryHover: '#6c86e2', // primary buttons hover
  upPrimaryActive: '#314692', // primary buttons hover
  upPrimaryText: '#fff', // text on primary background
  upSecondary: '#ebefff', // inputs and secondary buttons
  upSecondaryHover: '#dfe3f3', // inputs and secondary buttons hover
  upSecondaryActive: '#d8ddf2', // inputs and secondary buttons pressed
  upAccent: '#ff8078', // fill and outline of accent elements
  upAccentHover: '#ff9a94', // accent elements hover
  upAccentActive: '#e7716a', // accent elements pressed
  upAccentText: '#fff', // text on accent background
  upSelection: 'rgba(112, 182, 246, 0.12)', // selected text background
  upFocus: 'rgba(51, 51, 51, 0.64)', // focus ring color
  upClear: 'rgba(0, 0, 0, 0.08)', // translucent dark fill
  upClearDisabled: 'rgba(0, 0, 0, 0.04)', // translucent dark fill disabled
  upClearHover: 'rgba(0, 0, 0, 0.16)', // translucent dark fill hover
  upClearActive: 'rgba(0, 0, 0, 0.2)', // translucent dark fill pressed
  upClearInverse: 'rgba(255, 255, 255, 0.16)', // translucent light fill
  upClearInverseHover: 'rgba(255, 255, 255, 0.24)', // translucent light fill hover
  upClearInverseActive: 'rgba(255, 255, 255, 0.4)', // translucent light fill pressed
  // Statuses
  upErrorFill: 'rgba(244, 87, 37, 1)', // icons and decorative elements with error status
  upErrorBg: 'rgba(244, 87, 37, 0.12)', // translucent error background
  upErrorBgHover: 'rgba(244, 87, 37, 0.24)', // translucent hover error background
  upSuccessFill: 'rgba(74, 201, 155, 1)', // icon and decorative elements with success status
  upSuccessBg: 'rgba(74, 201, 155, 0.12)', // translucent success background
  upSuccessBgHover: 'rgba(74, 201, 155, 0.24)', // translucent success hover
  upWarningFill: 'rgba(255, 199, 0, 1)', // icon and decorative elements with warning status
  upWarningBg: 'rgba(255, 199, 0, 0.12)', // translucent warning background
  upWarningBgHover: 'rgba(255, 199, 0, 0.24)', // translucent warning background
  upInfoFill: 'rgba(112, 182, 246, 1)', // icon and decorative elements with info status
  upInfoBg: 'rgba(112, 182, 246, 0.12)', // translucent info background
  upInfoBgHover: 'rgba(112, 182, 246, 0.24)', // translucent info background
  upNeutralFill: 'rgb(121, 129, 140)', // icon and decorative elements with neutral status
  upNeutralBg: 'rgba(121, 129, 140, 0.12)', // translucent info background
  upNeutralBgHover: 'rgba(121, 129, 140, 0.24)', // translucent info background
  // Text
  upText01: 'rgba(27, 31, 59, 1)',
  upText02: 'rgba(27, 31, 59, 0.65)',
  upText03: 'rgba(27, 31, 59, 0.4)',
  upLink: '#526ed3',
  upLinkHover: '#6c86e2',
  upPositive: '#3aa981',
  upPositiveHover: '#7ac5aa',
  upNegative: '#dd4c1e',
  upNegativeHover: '#e38163',
  // Modifiers for dark background
  upErrorFillNight: 'rgba(255, 140, 103, 1)',
  upErrorBgNight: 'rgba(244, 87, 37, 0.32)',
  upErrorBgNightHover: 'rgba(244, 87, 37, 0.4)',
  upSuccessFillNight: 'rgb(74, 201, 155)',
  upSuccessBgNight: 'rgba(74, 201, 155, 0.32)',
  upSuccessBgNightHover: 'rgba(74, 201, 155, 0.4)',
  upWarningFillNight: 'rgb(255, 199, 0)',
  upWarningBgNight: 'rgba(255, 199, 0, 0.32)',
  upWarningBgNightHover: 'rgba(255, 199, 0, 0.4)',
  upInfoFillNight: 'rgb(112, 182, 246)',
  upInfoBgNight: 'rgba(112, 182, 246, 0.32)',
  upInfoBgNightHover: 'rgba(112, 182, 246, 0.4)',
  upNeutralFillNight: 'rgb(149, 155, 164)',
  upNeutralBgNight: 'rgb(149, 155, 164, 0.32)',
  upNeutralBgNightHover: 'rgb(149, 155, 164, 0.48)',
  //
  upText01Night: 'rgba(255, 255, 255, 1)',
  upText02Night: 'rgba(255, 255, 255, 0.72)',
  upText03Night: 'rgba(255, 255, 255, 0.6)',
  upLinkNight: '#6788ff',
  upLinkNightHover: '#526ed3',
  upPositiveNight: '#44c596',
  upPositiveNightHover: '#3aa981',
  upNegativeNight: '#ff8c67',
  upNegativeNightHover: '#bb593a',
  //
  upSupport01: '#a8cef1',
  upSupport02: '#3682db',
  upSupport03: '#8dda71',
  upSupport04: '#34b41f',
  upSupport05: '#e29398',
  upSupport06: '#b8474e',
  upSupport07: '#fcc068',
  upSupport08: '#ff8a00',
  upSupport09: '#dab3f9',
  upSupport10: '#7b439e',
  upSupport11: '#fee797',
  upSupport12: '#fcbb14',
  upSupport13: '#ea97c4',
  upSupport14: '#bd65a4',
  upSupport15: '#7fd7cc',
  upSupport16: '#2fad96',
  upSupport17: '#d4aca2',
  upSupport18: '#9d6f64',
  upSupport19: '#d2e9a2',
  upSupport20: '#aadc42',
  upSupport21: '#a0c5df',
  upSupport22: '#3c7ba8',
  // Project custom
  upBackground: '#1a1b1c',
  mako: '#434755',
  shark: '#1F2229',
  timberwolf: '#DAD7D2'
}

export default colors
