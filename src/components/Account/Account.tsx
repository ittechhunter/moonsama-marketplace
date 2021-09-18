import { Button } from 'ui';
import { UnsupportedChainIdError } from '@web3-react/core';
import { useAccountDialog, useActiveWeb3React } from 'hooks';
import { truncateAddress } from 'utils';
import Identicon from 'components/Identicon/Identicon';
import Power from '@material-ui/icons/Power';
import { Activity, Key } from 'react-feather';
import { useMediaQuery } from 'beautiful-react-hooks';

export const Account = () => {
  const { account, error } = useActiveWeb3React();
  const { setAccountDialogOpen } = useAccountDialog();
  const hideAddress = useMediaQuery(`(max-width: 500px)`)

  const showError = error ? true : false;
  const errMessage =
    error instanceof UnsupportedChainIdError ? 'Wrong Network' : 'Error';

  return (
    <>
      <Button
        variant={hideAddress ? "text" :"outlined"}
        color="primary"
        onClick={() => setAccountDialogOpen(true)}
        fullWidth={true}
        startIcon={
          showError ? (
            <Activity />
          ) : account ? !hideAddress && (
            <div style={{ fontSize: 0 }}>
              <Identicon />
            </div>
          ) : (
            <Power />
          )
        }
      >
        {showError
          ? errMessage
          : account
          ? hideAddress ? <Identicon /> : truncateAddress(account)
          : 'Connect'}
      </Button>
    </>
  );
};
