import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useClasses } from 'hooks';
import { ReactNode } from 'react';
import { styles } from './Header.styles';
import Marquee from "react-fast-marquee";
import { Link } from 'react-router-dom';
import {X} from 'react-feather';

export const Header = ({ children }: { children: ReactNode }) => {
  const { appBar, marquee, marqueeLink, marqueeClose } = useClasses(styles);
  const [mhidden, setMHidden] = useState<boolean>(false);
  return (
    <>
      <AppBar className={appBar} elevation={0}>
        {!mhidden && <div>
          <Marquee className={marquee} gradient={false} pauseOnHover={true} >
            The first batch of
            <Link
              className={marqueeLink}
              to={'/subcollections/0xdea45e7c6944cb86a268661349e9c013836c79a2'}
            >
              Multiverse Art
            </Link>
            auction ends on Jan 1, 5:00 PM UTC. As long as new bids keep rolling in shortly after the deadline, they will still be considered.
          </Marquee>
          <X className={marqueeClose} onClick={() => {setMHidden(true)}}/>
        </div>}
        <Toolbar>{children}</Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};
