import { useActiveWeb3React } from 'hooks';
import { useStyles } from './HeaderBalance.styles';
import { useBalances } from 'hooks/useBalances/useBalances';
import { WMOVR_ADDRESS, ChainId } from '../../constants';
import { StringAssetType } from 'utils/subgraph';
import { Fraction } from 'utils/Fraction';

export const HeaderBalance = () => {
  const { chainId } = useActiveWeb3React();
  const { balanceContainer, balance } = useStyles();

  const [WMOVRBalance] = useBalances([
    {
      assetAddress: WMOVR_ADDRESS[chainId ?? ChainId.EWC] as string,
      assetId: '0',
      assetType: StringAssetType.ERC20,
      id: '1',
    },
  ]);
  let formattedBalance = Fraction.from(WMOVRBalance, 18);


  return (
    <>
      <div className={balanceContainer}>
        <div className={balance}>{formattedBalance?.toFixed(0)}</div>
        {formattedBalance && <p>WMOVR</p>}
      </div>
    </>
  );
};
