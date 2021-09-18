import { Typography } from "@material-ui/core";
import { MonaLisa, ShoppingCart, WalletIcon } from "icons";
import { GlitchText } from "ui";
import { useStyles } from "./styles";

const HomePage = () => {
  const { homeContainer, icon, iconContainer, iconBlock } = useStyles()
  return (
    <div className={homeContainer}>
      <GlitchText fontSize={48}>Discover, collect, and sell NFTs</GlitchText>
      <GlitchText fontSize={24}>Moon Sama, MoonRiver's first NFT marketplace
      </GlitchText>
      <div className={iconBlock}>
        <div className={iconContainer}>
          <WalletIcon className={icon} />
          <Typography>Connect your wallet</Typography>
        </div>
        <div className={iconContainer}>
          <MonaLisa className={icon} />
          <Typography>Explore the marketplace</Typography>
        </div>
        <div className={iconContainer}>
          <ShoppingCart className={icon} />
          <Typography>Buy or sell assets</Typography>
        </div>
      </div>
      <GlitchText fontSize={48}>STILL IN BETA</GlitchText>
      <Typography>
        Some bugs, hiccups and glitches can still be exptected from time to time. We continuously work on making it better and better.
      </Typography>
    </div>
  )
};

export default HomePage;
