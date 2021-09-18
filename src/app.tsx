import { AppProviders } from 'providers/AppProvider';
import { Layout } from 'components';
import { AccountDialog, PurchaseDialog, BidDialog } from 'components';
import { Routing } from 'pages';
import { CancelDialog } from 'components/CancelDialog/CancelDialog';
import { TransferDialog } from 'components/TransferDiaog/TransferDialog';

function MyApp() {
  return (
    <AppProviders>
      <AccountDialog />

      <Layout>
        <Routing />
      </Layout>
    </AppProviders>
  );
}

export default MyApp;
