import { Button } from 'ui';
import { Typography } from '@material-ui/core';
// import { MonaLisa, ShoppingCart, WalletIcon } from "icons";
import { GlitchText, NavLink } from 'ui';
import { useStyles } from './styles';

const HomePage = () => {
  const {
    homeContainer,
    betaText,
    betaTitle,
    pageContent,
    exploreButton,
    icon,
    iconContainer,
    iconBlock,
  } = useStyles();
  return (
    <div className={homeContainer}>
      <GlitchText fontSize={48}>Discover, collect, and sell NFTs</GlitchText>
      <GlitchText fontSize={24}>
        Moonsama, Moonriver's first NFT marketplace
      </GlitchText>

      {/*<div className={iconBlock}>*/}
      {/*  <div className={iconContainer}>*/}
      {/*    <WalletIcon className={icon} />*/}
      {/*    <Typography>Connect your wallet</Typography>*/}
      {/*  </div>*/}
      {/*  <div className={iconContainer}>*/}
      {/*    <MonaLisa className={icon} />*/}
      {/*    <Typography>Explore the marketplace</Typography>*/}
      {/*  </div>*/}
      {/*  <div className={iconContainer}>*/}
      {/*    <ShoppingCart className={icon} />*/}
      {/*    <Typography>Buy or sell assets</Typography>*/}
      {/*  </div>*/}
      {/*</div>*/}

      <div className={pageContent}>
        <NavLink href="/collections">
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={exploreButton}
          >
            Explore Collections
          </Button>
        </NavLink>
      </div>
    </div>
  );
};

export default HomePage;
