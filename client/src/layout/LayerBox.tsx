import * as React from 'react';
import {Box} from '@mui/material';

export interface IBoyLayerProps {
  mode: 'inset' | 'full' | 'rb';
  content?: React.ReactNode;
  children?: React.ReactNode;
}

const LayerBox = (props: IBoyLayerProps) => {
  const className = `layer-wrapper-${props.mode}`;
  const childClassName = `layer-content-${props.mode}`;

  return (
    <Box className={className}>
      <Box className={childClassName}>
        {props.content || props.children}
      </Box>
    </Box>
  );
};

export default LayerBox;
