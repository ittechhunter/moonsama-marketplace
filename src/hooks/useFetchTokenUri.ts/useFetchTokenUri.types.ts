import { StaticTokenData } from 'hooks/useTokenStaticDataCallback/useTokenStaticDataCallback';

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
  attributes?: {
    display_type: string;
    trait_type: string;
    value: number | string;
  };
  properties?: any;
};

export type TokenData = {
  meta: TokenMeta | undefined;
  staticData: StaticTokenData;
};
