import React from 'react';
import {Button, Icon} from 'native-base';
const IconBtn = props => {
  return (
    <Button transparent {...props}>
      <Icon name={props.icon} onPress={props.onPress} />
    </Button>
  );
};

export default IconBtn;
