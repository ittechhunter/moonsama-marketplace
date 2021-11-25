import { useActiveWeb3React } from 'hooks';
import { useMemo } from 'react';

import collectionsList from '../../assets/data/collections';

import * as yup from 'yup';
import { StringAssetType } from 'utils/subgraph';

const enum Indexing {
  Sequential = 'sequential',
  None = 'none',
}

export type RawCollection = {
  chainId: number;
  address: string;
  display_name: string;
  symbol: string;
  type: StringAssetType;
  indexing: Indexing;
  contractURI: string;
  tags: string[];
  min_items: number;
  subgraph: string;
  decimals?: number;
  maxId?: number;
};

export type RawCollectionList = {
  name: string;
  collections: RawCollection[];
};

const collectionListSchema = yup.object<RawCollectionList>({
  name: yup.string().required(),
  collections: yup
    .array()
    .of(
      yup
        .object<RawCollection>({
          min_items: yup.number().required(),
          chainId: yup.number().required(),
          address: yup
            .string()
            .isAddress('Expected a valid Ethereum address.')
            .required(),
          display_name: yup.string().required(),
          symbol: yup.string().required(),
          type: yup
            .mixed<StringAssetType>()
            .oneOf([
              StringAssetType.ERC20,
              StringAssetType.ERC1155,
              StringAssetType.ERC721,
            ])
            .required(),
          indexing: yup
            .mixed<Indexing>()
            .oneOf([Indexing.Sequential, Indexing.None])
            .required(),
          contractURI: yup.string().required(),
          tags: yup.array().of(yup.string().required()).required(),
          subgraph: yup.string(),
          decimals: yup.number().optional(),
          maxId: yup.number().optional()
        })
        .required()
    )
    .required(),
});

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useRawCollectionsFromList(): RawCollection[] {
  const { chainId } = useActiveWeb3React();
  const list = useMemo(() => {
    if (!chainId) {
      return [];
    }
    const rawList = collectionListSchema.cast(collectionsList);
    return rawList?.collections.filter((x) => x.chainId === chainId) ?? [];
  }, [chainId]);

  return list;
}
