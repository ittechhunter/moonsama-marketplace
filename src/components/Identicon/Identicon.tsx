import { useEffect, useRef } from 'react';
import { useStyles } from './Identicon.styles';

import { useActiveWeb3React } from '../../hooks';
import Jazzicon from 'jazzicon';
import { useMediaQuery } from 'beautiful-react-hooks';

export default function Identicon() {
  const styles = useStyles();
  const { account } = useActiveWeb3React();
  const ref = useRef<HTMLDivElement>();
  const hideAddress = useMediaQuery(`(max-width: 500px)`);

  useEffect(() => {
    if (account && ref.current) {
      ref.current.innerHTML = '';
      ref.current.appendChild(
        Jazzicon(hideAddress ? 32 : 16, parseInt(account.slice(2, 10), 16))
      );
    }
  }, [account]);

  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
  return <div className={styles.identiconContainer} ref={ref as any} />;
}
