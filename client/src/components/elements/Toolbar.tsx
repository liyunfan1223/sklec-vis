import * as React from 'react';
import {Box, CircularProgress, Icon, IconButton, Typography} from '@mui/material';
import {Toolbar} from '@mui/material';
import {Menu as MenuIcon} from '@mui/icons-material';
import chroma from 'chroma-js';
import config from '@/config';
import {useAppSelector} from '@/app/hooks';

export interface ISKToolbarProps {
  sidebarOpen: boolean;
  onToggleOpen: () => any;
}

const SKToolbar = (props: ISKToolbarProps) => {
  const loadingText = useAppSelector((state) => state.ui.loadingText);
  return (
    <Toolbar variant={'dense'}
      sx={{height: config.appearance.appBarHeight}}>
      <IconButton
        edge='start'
        color='inherit'
        onClick={props.onToggleOpen}
        sx={{
          marginRight: '24px',
          transition: 'all 0.3s ease-out',
        }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant={'h6'}>
        SKLEC Spatial-temporal Data Visualization
      </Typography>
      <Typography variant={'caption'} sx={{m: 2}}>
        <i>{loadingText}</i>
      </Typography>
      <Box sx={{flexGrow: 1}} />
      {/* <CircularProgress variant={'indeterminate'} size={24} color={'inherit'}  />*/}

    </Toolbar>
  );
};

export default SKToolbar;
