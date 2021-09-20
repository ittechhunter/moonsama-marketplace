import { CircularProgress } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { ExternalLink } from 'components';
import { ChainId } from '../../constants';
import { useActiveWeb3React } from 'hooks';
import { useAllTransactions } from 'state/transactions/hooks';
import { getExplorerLink } from 'utils';
import { useStyles } from './Transaction.styles';
import { CheckCircle, Triangle } from 'react-feather';

export const Transaction = ({ hash }: { hash: string }) => {
  const { chainId } = useActiveWeb3React();
  const allTransactions = useAllTransactions();

  const tx = allTransactions?.[hash];
  const summary = tx?.summary;
  const pending = !tx?.receipt;
  const success =
    !pending &&
    tx &&
    (tx.receipt?.status === 1 || typeof tx.receipt?.status === 'undefined');

  const styles = useStyles({ success, pending });

  return (
    <div>
      <ExternalLink
        href={getExplorerLink(
          chainId ?? ChainId.MOONRIVER,
          hash,
          'transaction'
        )}
      >
        <Typography>{summary ?? hash} ↗</Typography>
        <div className={styles.iconWrapper}>
          {pending ? (
            <CircularProgress />
          ) : success ? (
            <CheckCircle size="16" />
          ) : (
            <Triangle size="16" />
          )}
        </div>
      </ExternalLink>
    </div>
  );
};
