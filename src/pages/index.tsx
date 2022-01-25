import { Switch, Route } from 'react-router-dom';
import CollectionPage from './collection';
import HomePage from './home';
import TokenPage from './token';
import LootboxPage from './lootbox';
import MyOrdersPage from './yourorders';
import FreshOrdersPage from './freshorders';
import FreshTradesPage from './freshtrades';
import { PurchaseDialog, BidDialog } from 'components';
import { CancelDialog } from 'components/CancelDialog/CancelDialog';
import { TransferDialog } from 'components/TransferDiaog/TransferDialog';
import { CollectionListPage } from './collection-list';
import MintListPage from './mint-list';
import MyNFTsPage from './mynfts';
import { SubcollectionListPage } from './subcollection-list';

export const Routing = () => (
  <Switch>
    <Route exact path="/">
      <HomePage />
    </Route>
    <Route path="/collections">
      <CollectionListPage />
    </Route>
    <Route path="/collection/:type/:address/:subcollectionId">
      <CollectionPage />
    </Route>
    <Route path="/token/:type/:address/:id">
      <CancelDialog />
      <PurchaseDialog />
      <BidDialog />
      <TransferDialog />
      <TokenPage />
    </Route>
    <Route path="/tokenLootbox/:type/:address/:id">
      <CancelDialog />
      <PurchaseDialog />
      <BidDialog />
      <TransferDialog />
      <LootboxPage />
    </Route>
    <Route path="/mints">
      <MintListPage />
    </Route>
    <Route path="/freshoffers">
      <PurchaseDialog />
      <FreshOrdersPage />
    </Route>
    <Route path="/freshtrades">
      <FreshTradesPage />
    </Route>
    <Route path="/myoffers">
      <CancelDialog />
      <PurchaseDialog />
      <MyOrdersPage />
    </Route>
    <Route path="/mynfts">
      <MyNFTsPage />
    </Route>
    <Route path="/subcollections/:address">
      <SubcollectionListPage />
    </Route>
  </Switch>
);
