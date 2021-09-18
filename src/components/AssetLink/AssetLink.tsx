import { useStyles } from './AssetLink.styles';

export const AssetLink = (data: any) => {
  let { href, children, asset } = data;
  const styles = useStyles();

  const _onClick = (): boolean | undefined => {
    if (
      !asset.assetAddress.length ||
      !asset.assetId.length ||
      !asset.assetType.length
    )
      return false;
    window.open(
      '/token/' +
        asset.assetType.toLowerCase() +
        '/' +
        asset.assetAddress +
        '/' +
        asset.assetId,
      '_blank'
    );
  };

  return (
    <a
      href={href}
      target="_blank"
      className={styles.assetLink}
      onClick={_onClick}
    >
      {children}
    </a>
  );
};
