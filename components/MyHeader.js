import React from 'react';
import IconBtn from './IconBtn';
import {
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
  View,
} from 'native-base';
import {appConstants} from '../consts';
const MyHeader = props => {
  return (
    <Header style={{backgroundColor: appConstants.colors.primary}}>
      {props.backBtnVisible == true ? (
        <Left>
          <IconBtn icon="arrow-back" onPress={props.onPress} />
        </Left>
      ) : (
        <View></View>
      )}

      <Body>
        <Title>{props.headerTitle}</Title>
      </Body>
      <Right>{props.children}</Right>
    </Header>
  );
};
export default MyHeader;
