import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { Discord, Telegram, Twitter } from 'icons';
import { useStyles } from './Footer.styles';
import { Typography } from '@material-ui/core';

export const Footer = () => {
  const { footerWrapper, iconsWrapper, copyrightText, icon } = useStyles();
  return (
    <Container maxWidth={false}>
      <div className={footerWrapper}>
        <Typography variant="h6">Join the community</Typography>

        <div className={iconsWrapper}>
          <a href="#" target="_blank"><Twitter className={icon} /></a>
          <a href="#" target="_blank"><Telegram className={icon} /></a>
          <a href="#" target="_blank"><Discord className={icon} /></a>
        </div>

        <Typography align="center" className={copyrightText}>&copy; 2021 Moonsama</Typography>
      </div>
    </Container>
  );
};
