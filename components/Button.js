import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {Button as PaperButton} from 'react-native-paper';
import {appConstants} from '../consts/index';
const Button = ({mode, style, children, ...props}) => (
  <PaperButton
    style={[
      styles.button,
      mode === 'outlined' && {backgroundColor: appConstants.colors.primary},
      style,
    ]}
    labelStyle={styles.text}
    mode={mode}
    {...props}>
    {children}
  </PaperButton>
);

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
});

export default memo(Button);
