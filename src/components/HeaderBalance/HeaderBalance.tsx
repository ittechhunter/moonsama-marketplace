import { useActiveWeb3React } from 'hooks';
import { useStyles } from './HeaderBalance.styles';
import { useNativeBalance } from 'hooks/useBalances/useBalances';
import { Fraction } from 'utils/Fraction';

export const HeaderBalance = () => {
  const { balanceContainer, balance } = useStyles();

  const bal = useNativeBalance();
  let formattedBalance = Fraction.from(bal, 18);

  return (
    <>
      <div className={balanceContainer}>
        <div className={balance}>{formattedBalance?.toFixed(0)}</div>
        {formattedBalance && <p>MOVR</p>}
      </div>
    </>
  );
};
