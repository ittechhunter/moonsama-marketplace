import React, { Fragment, ReactNode } from 'react';
import MaterialTabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';

import { useStyles } from './Tabs.styles';

const a11yProps = (index: number) => {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
};

type TabsProps = {
  tabs: { label: string; view: ReactNode }[];
  containerClassName?: string;
  tabsClassName?: string;
};

export const Tabs = ({
  tabs,
  containerClassName,
  tabsClassName,
}: TabsProps) => {
  const [currentTab, setCurrentTab] = React.useState<number>(0);
  const { tab, tabsStyles, selected } = useStyles();

  const handleChange = (event: unknown, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setCurrentTab(index);
  };

  return (
    <div className={containerClassName}>
      <MaterialTabs
        className={`${tabsStyles} ${tabsClassName || ''}`}
        value={currentTab}
        onChange={handleChange}
        variant="standard"
        TabIndicatorProps={{
          style: {
            display: 'none',
            width: 0,
            height: 0,
          },
        }}
      >
        {tabs.map(({ label }) => (
          <Tab
            key={label}
            classes={{ selected }}
            disableRipple
            className={tab}
            label={label}
            {...a11yProps(1)}
          />
        ))}
      </MaterialTabs>
      <SwipeableViews index={currentTab} onChangeIndex={handleChangeIndex}>
        {tabs.map(({ view }, index) => (
          <Fragment key={index}>{view}</Fragment>
        ))}
      </SwipeableViews>
    </div>
  );
};
