import { Switch, Route } from 'react-router-dom';
import CollectionPage from './collection';
import HomePage from './home';
import TokenPage from './token';
import MyOrdersPage from './yourorders';
import FreshOrdersPage from './freshorders';
import FreshTradesPage from './freshtrades';
import { PurchaseDialog, BidDialog } from 'components';
import { CancelDialog } from 'components/CancelDialog/CancelDialog';
import { TransferDialog } from 'components/TransferDiaog/TransferDialog';

export const Routing = () => (
  <Switch>
    <Route exact path="/">
      <HomePage />
    </Route>
    <Route path="/collection/:type/:address">
      <CollectionPage />
    </Route>
    <Route path="/token/:type/:address/:id">
      <CancelDialog />
      <PurchaseDialog />
      <BidDialog />
      <TransferDialog />
      <TokenPage />
    </Route>
    <Route path="/freshorders">
      <FreshOrdersPage />
    </Route>
    <Route path="/freshtrades">
      <FreshTradesPage />
    </Route>
    <Route path="/yourorders">
      <CancelDialog />
      <PurchaseDialog />
      <MyOrdersPage />
    </Route>
  </Switch>
);
