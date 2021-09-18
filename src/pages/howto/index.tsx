import makeStyles from '@material-ui/core/styles/makeStyles';
import { GlitchText } from 'ui';

const useStyles = makeStyles(() => ({
  container: {
    textAlign: 'center',
  },
}));

const HowToPage = () => {
  const { container } = useStyles();
  return (
    <div className={container}>
      <GlitchText>How it works? Fucking awesome I guess !!!</GlitchText>
    </div>
  );
};
export default HowToPage;
