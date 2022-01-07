import { StaticTokenData } from 'hooks/useTokenStaticDataCallback/useTokenStaticDataCallback';

export type MetaAttributes = {
    display_type: string;
    trait_type: string;
    value: number | string;
}
export type TokenMeta = {
  description?: string;
  external_url?: string;
  image?: string;
  name?: string;
  title?: string;
  background_color?: string;
  animation_url?: string;
  youtube_url?: string;
  decimals?: string;
  attributes?: MetaAttributes[];
  properties?: any;
  plot?: any,
  marketplace?: any
};

export type TokenData = {
  meta: TokenMeta | undefined;
  staticData: StaticTokenData;
};
