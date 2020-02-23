import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import {connect} from 'react-redux';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import {appConstants} from '../consts';
import {emailValidator, passwordValidator} from '../provider/utils';
import {userLogin} from '../actions/index';
class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      username: '',
      usernameerr: false,
      password: '',
      passworderr: false,
    };
  }

  useronLogin = () => {
    if (!emailValidator(this.state.username)) {
      this.setState({usernameerr: true});
    } else if (!passwordValidator(this.state.password)) {
      this.setState({
        usernameerr: false,
        passworderr: true,
      });
    } else {
      let data = {
        email: this.state.username,
        password: this.state.password,
      };
      this.setState({loading: true});
      this.props.userLogin(data).then(res => {
        if (res.status && res.status === 200) {
          this.props.navigation.navigate('Todo');
        }
        this.setState({loading: false});
      });
    }
  };
  navigatePasswordScreen = () => {
    this.props.navigation.navigate('ForgotPassword');
  };
  render() {
    return (
      <Background>
        <Logo />
        <Header>Online Görevlerim</Header>
        <TextInput
          label="Email Adresi"
          autoCapitalize="none"
          value={this.state.username}
          onChangeText={text => this.setState({username: text})}
          error={this.state.usernameerr}
          errorText={
            this.state.usernameerr ? 'Geçerli Bir Email Adresi Giriniz' : ''
          }
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />

        <TextInput
          label="Parola"
          returnKeyType="done"
          secureTextEntry
          error={this.state.passworderr}
          errorText={this.state.passworderr ? 'Geçerli Bir Parola Giriniz' : ''}
          value={this.state.password}
          onChangeText={text => this.setState({password: text})}
        />

        <View style={styles.forgotPassword}>
          <TouchableOpacity onPress={this.navigatePasswordScreen}>
            <Text style={styles.label}>Parolamı Unuttum ?</Text>
          </TouchableOpacity>
        </View>
        {this.state.loading == false ? (
          <Button mode="contained" onPress={this.useronLogin}>
            Giriş Yap
          </Button>
        ) : (
          <ActivityIndicator size="large" />
        )}

        <View style={styles.row}>
          <Text style={styles.label}>Hesabın Yok MU? </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Register')}>
            <Text style={styles.link}>Kayıt Ol</Text>
          </TouchableOpacity>
        </View>
      </Background>
    );
  }
}

export default connect(null, {userLogin})(LoginScreen);

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: appConstants.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: appConstants.colors.primary,
  },
});
