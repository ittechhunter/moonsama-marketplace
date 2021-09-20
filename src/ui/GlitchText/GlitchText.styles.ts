import makeStyles from '@material-ui/core/styles/makeStyles';
export const useStyles = makeStyles((theme) => ({
  glitch: {
    fontSize: ({ fontSize }: { fontSize?: number }) =>
      fontSize ? fontSize : '8rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    position: 'relative',

    textShadow: `0.05em 0 0 rgba(255, 0, 0, 0.75), -0.025em -0.05em 0 rgba(0, 255, 0, 0.75),
    0.025em 0.05em 0 rgba(0, 0, 255, 0.75)`,

    animation: '$glitch 500ms infinite',
    [theme.breakpoints.down('md')]: {
      fontSize: ({ fontSize }: { fontSize?: number }) =>
        fontSize ? fontSize / 2 : '4rem',
    },
    '& span': {
      position: 'absolute',
      top: 0,
      left: 0,
    },
    '& span:first-child': {
      position: 'absolute',
      top: 0,
      right: 0,
      animation: '$glitch 650ms infinite',
      clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
      transform: 'translate(-0.025em, -0.0125em)',
      opacity: 0.8,
    },
    '& span:last-child': {
      position: 'absolute',
      top: 0,
      right: 0,
      animation: '$glitch 375ms infinite',
      clipPath: 'polygon(0 80%, 100% 20%, 100% 100%, 0 100%)',
      transform: 'translate(0.0125em, 0.025em)',
      opacity: 0.8,
    },
  },
  '@keyframes glitch': {
    '0%': {
      textShadow: `0.05em 0 0 rgba(255, 0, 0, 0.75), -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
          -0.025em 0.05em 0 rgba(0, 0, 255, 0.75)`,
    },
    '14%': {
      textShadow: `0.05em 0 0 rgba(255, 0, 0, 0.75), -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
          -0.025em 0.05em 0 rgba(0, 0, 255, 0.75)`,
    },
    '15%': {
      textShadow: `-0.05em -0.025em 0 rgba(255, 0, 0, 0.75), 0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
          -0.05em -0.05em 0 rgba(0, 0, 255, 0.75)`,
    },
    '49%': {
      textShadow: `-0.05em -0.025em 0 rgba(255, 0, 0, 0.75), 0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
          -0.05em -0.05em 0 rgba(0, 0, 255, 0.75)`,
    },
    '50%': {
      textShadow: `0.025em 0.05em 0 rgba(255, 0, 0, 0.75), 0.05em 0 0 rgba(0, 255, 0, 0.75),
          0 -0.05em 0 rgba(0, 0, 255, 0.75)`,
    },
    '99%': {
      textShadow: `0.025em 0.05em 0 rgba(255, 0, 0, 0.75), 0.05em 0 0 rgba(0, 255, 0, 0.75),
          0 -0.05em 0 rgba(0, 0, 255, 0.75)`,
    },
    '100%': {
      textShadow: `-0.025em 0 0 rgba(255, 0, 0, 0.75), -0.025em -0.025em 0 rgba(0, 255, 0, 0.75),
          -0.025em -0.05em 0 rgba(0, 0, 255, 0.75)`,
    },
  },
}));
