import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import {appConstants} from '../consts';
class ForgotPasswordScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Background>
        <BackButton goBack={() => this.props.navigation.navigate('Login')} />
        <Logo />
        <Header>Parolamı Sıfırla</Header>
        <TextInput
          label="Kullanıcı Adı"
          returnKeyType="done"
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />

        <Button mode="contained" style={styles.button}>
          Sıfırlama Bağlantısı Gönder
        </Button>

        <TouchableOpacity
          style={styles.back}
          onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.label}>← Giriş Yap</Text>
        </TouchableOpacity>
      </Background>
    );
  }
}

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  back: {
    width: '100%',
    marginTop: 12,
  },
  button: {
    marginTop: 12,
  },
  label: {
    color: appConstants.colors.secondary,
    width: '100%',
  },
});
