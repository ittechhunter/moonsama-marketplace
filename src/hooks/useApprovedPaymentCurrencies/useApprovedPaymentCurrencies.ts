import { AddressZero } from '@ethersproject/constants';
import { Asset } from 'hooks/marketplace/types';
import { useCallback, useMemo } from 'react';
import { getAssetEntityId, StringAssetType, stringToStringAssetType } from 'utils/subgraph';
import { approvedCurrency } from '../../assets/data/currencies';

export interface OwnedTokens {
    id: string;
    ownedTokens: { id: string; contract: { id: string } }[];
}

export type ApprovedPaymentCurrency = Asset & { symbol: string }

export const useApprovedPaymentCurrency = (asset: { assetAddress: string, assetId?: string }): Asset & { symbol: string } => {
    return useMemo(() => {
        let customCurrency = undefined
        try {
            customCurrency = approvedCurrency[asset.assetAddress][Math.max(Number.parseInt(asset?.assetId ?? '1') - 1, 0)];
        } catch {}
        if (!customCurrency) {
            return {
                assetAddress: AddressZero,
                assetId: '0',
                assetType: StringAssetType.NATIVE,
                id: `${AddressZero}-0`,
                symbol: 'MOVR'
            }
        }
        return {
            ...customCurrency,
            id: getAssetEntityId(customCurrency.assetAddress, customCurrency.assetId),
            assetType: stringToStringAssetType(customCurrency.assetType)
        }
    }, [asset.assetAddress, asset.assetId]);
};


export const useApprovedPaymentCurrencyCallback = () => {
    const cb = useCallback((asset: { assetAddress: string, assetId?: string }) => {
        let customCurrency = undefined
        try {
            customCurrency = approvedCurrency[asset.assetAddress][Math.max(Number.parseInt(asset?.assetId ?? '1') - 1, 0)];
        } catch {}
        if (!customCurrency) {
            return {
                assetAddress: AddressZero,
                assetId: '0',
                assetType: StringAssetType.NATIVE,
                id: `${AddressZero}-0`,
                symbol: 'MOVR'
            }
        }
        return {
            ...customCurrency,
            id: getAssetEntityId(customCurrency.assetAddress, customCurrency.assetId),
            assetType: stringToStringAssetType(customCurrency.assetType)
        }
    }, []);

    return cb
};
