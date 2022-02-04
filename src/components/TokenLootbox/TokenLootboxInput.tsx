import { Paper, Typography, Button } from '@mui/material';
import { TokenMeta } from 'hooks/useFetchTokenUri.ts/useFetchTokenUri.types';
import { StaticTokenData } from 'hooks/useTokenStaticDataCallback/useTokenStaticDataCallback';
import { Order } from 'hooks/marketplace/types';
import { Fraction } from 'utils/Fraction';
import { useActiveWeb3React, useClasses } from 'hooks';
import { useTokenStaticData } from 'hooks/useTokenStaticData/useTokenStaticData';
import { useTokenBasicData } from 'hooks/useTokenBasicData.ts/useTokenBasicData';
import { useFetchTokenUri } from 'hooks/useFetchTokenUri.ts/useFetchTokenUri';
import { useDecimalOverrides } from 'hooks/useDecimalOverrides/useDecimalOverrides';
import { Asset } from 'hooks/marketplace/types';
export interface TokenData {
    meta: TokenMeta | undefined;
    staticData: StaticTokenData;
    order?: Order | undefined;
}

export const TokenLootboxInput = (asset: Asset) => {

    const { chainId, account } = useActiveWeb3React();
    const decimalOverrides = useDecimalOverrides();
    const staticData = useTokenStaticData([asset]);
    const metas = useFetchTokenUri(staticData);
    const balanceData = useTokenBasicData([asset]);
    const decimals = decimalOverrides[asset.assetAddress] ?? balanceData?.[0]?.decimals ?? 0;
    const isFungible = decimals > 0;
    let userItemCount = isFungible
        ? Fraction.from(
            balanceData?.[0]?.userBalance?.toString() ?? '0',
            decimals
        )?.toFixed(2) ?? '0'
        : balanceData?.[0]?.userBalance?.toString() ?? '0';
    userItemCount = account ? userItemCount : '0';



    return (
        <Typography color="textSecondary" variant="subtitle1">
            {`${metas[0]?.name} : ${userItemCount}`}
        </Typography>
    );
};
