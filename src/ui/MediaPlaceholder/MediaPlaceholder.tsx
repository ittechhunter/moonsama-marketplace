import { useThemeOptions } from 'hooks';
import WhiteLogo from 'assets/images/logo_white.svg';
import Logo from 'assets/images/logo.svg';
import { useStyles } from './MediaPlaceholder.styles';

export const Placeholder = ({ style }: { style?: Record<string, string> }) => {
  const { isDarkTheme } = useThemeOptions();
  const { img, placeholder } = useStyles();
  return (
    <div className={placeholder} style={style}>
      <img src={isDarkTheme ? WhiteLogo : Logo} className={img} alt="" />
    </div>
  );
};
