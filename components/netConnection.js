import React from 'react';
import {RefreshControl, StyleSheet} from 'react-native';
import {appConstants} from '../consts';
import {Content, Text} from 'native-base';
const netConnection = props => {
  return (
    <Content
      refreshControl={
        <RefreshControl
          onRefresh={props.onRefresh}
          refreshing={props.refreshing}
          title={appConstants.staticText.loading}
          progressBackgroundColor={'#fff'}
        />
      }
      scrollEventThrottle={500}
      contentContainerStyle={styles.contentStyle}>
      <Text lineBreakMode={1}>{appConstants.staticText.noConnection}</Text>
    </Content>
  );
};
export default netConnection;
const styles = StyleSheet.create({
  contentStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 30,
  },
});
