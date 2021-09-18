import React, { Fragment } from 'react';
import ListMaterial from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import { useThemeOptions } from 'hooks';

import { useStyles } from './List.styles';

import WhiteLogo from 'assets/images/logo_white.svg';
import Logo from 'assets/images/logo.svg';

type ListProps = {
  listItems: {
    image?: string;
    primaryText: string;
    secondaryText?: string;
  }[];
};

export const List = ({ listItems }: ListProps) => {
  const { isDarkTheme } = useThemeOptions();
  const { divider } = useStyles();
  return (
    <ListMaterial>
      {listItems.map(({ primaryText, image, secondaryText }) => (
        <Fragment key={primaryText}>
          <ListItem>
            <ListItemAvatar>
              <Avatar src={image || isDarkTheme ? WhiteLogo : Logo} />
            </ListItemAvatar>
            <ListItemText primary={primaryText} secondary={secondaryText} />
          </ListItem>
          <Divider variant="fullWidth" className={divider} />
        </Fragment>
      ))}
    </ListMaterial>
  );
};
