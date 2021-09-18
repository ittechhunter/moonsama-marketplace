import { LinkProps } from '@material-ui/core';
import { useStyles } from './ExternalLink.styles';

export const ExternalLink = ({ href, children }: LinkProps) => {
  const styles = useStyles();

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={styles.externalLink}
    >
      {children}
    </a>
  );
};
