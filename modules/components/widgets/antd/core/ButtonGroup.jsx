import React from 'react';
// import { Button } from 'antd';
import ButtonGroup from '@material-ui/core/ButtonGroup'

// const ButtonGroup = Button.Group;

export default ({ children, config: { settings } }) => {
  const { renderSize } = settings;
  return <ButtonGroup
    size={renderSize}
    // disableElevation 
    color="primary"
    variant="outlined"
  >{children}</ButtonGroup>;
};
