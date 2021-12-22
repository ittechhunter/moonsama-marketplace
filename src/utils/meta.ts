import { MetaAttributes } from '../hooks/useFetchTokenUri.ts/useFetchTokenUri.types';

export const getMinecraftSkinUrl = (attributes?: MetaAttributes[]) => {
  const attr = attributes?.find(
    (x) => x.trait_type == 'Minecraft Skin External URL'
  );
  return attr?.value as string;
};
