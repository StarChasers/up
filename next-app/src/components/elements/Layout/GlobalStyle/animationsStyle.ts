import { css } from '@emotion/css'

export const fadeIn = css`
  animation-name: fadeIn;
`

export const fadeOut = css`
  animation-name: fadeOut;
`

export const fadeInUp = css`
  animation-name: fadeInUp;
`

const animationsStyle = css`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  .fadeIn {
    ${fadeIn};
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }

  .fadeOut {
    ${fadeOut};
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }

    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  .fadeInUp {
    ${fadeInUp};
  }
`

export default animationsStyle
