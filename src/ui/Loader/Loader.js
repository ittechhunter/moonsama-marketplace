import { useStyles } from './Loader.styles';

export const Loader = () => {
  const { loader, loaderInner } = useStyles();

  return (
    <span className={loader}>
      <span className={loaderInner}></span>
    </span>
  );
};
