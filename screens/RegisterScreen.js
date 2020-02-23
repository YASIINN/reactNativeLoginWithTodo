import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import {appConstants} from '../consts';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import {userRegister} from '../actions/index';
import {
  emailValidator,
  nameValidator,
  passwordValidator,
} from '../provider/utils';
class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      usernamerror: false,
      username: '',
      usersurname: '',
      usersurnameerror: false,
      email: '',
      emailerror: false,
      password: '',
      passworderror: false,
    };
  }
  navigateLogin = () => {
    this.props.navigation.navigate('Login');
  };
  onFormControl = () => {
    debugger;
    if (!nameValidator(this.state.username)) {
      this.setState({usernamerror: true});
    } else if (!nameValidator(this.state.usersurname)) {
      this.setState({usersurnameerror: true, usernamerror: false});
    } else if (!emailValidator(this.state.email)) {
      this.setState({
        emailerror: true,
        usersurnameerror: false,
        usernamerror: false,
      });
    } else if (!passwordValidator(this.state.password)) {
      this.setState({
        emailerror: false,
        usersurnameerror: false,
        usernamerror: false,
        passworderror: true,
      });
    } else {
      this.setState({
        emailerror: false,
        usersurnameerror: false,
        usernamerror: false,
        passworderror: false,
      });
      this.onRegister();
    }
  };
  onRegister = () => {
    debugger;
    this.setState({
      loading: true,
    });
    let data = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username,
      usersurname: this.state.usersurname,
    };
    this.props
      .userRegister(data)
      .then(res => {
        if (res.status != undefined && res.status == 200) {
          this.navigateLogin();
          this.setState({
            loading: false,
            usernamerror: false,
            username: '',
            usersurname: '',
            usersurnameerror: false,
            email: '',
            emailerror: false,
            password: '',
            passworderror: false,
          });
        } else {
          if (res.response.data.error.message == 'EMAIL_EXISTS') {
            alert('Email Adresi Kullanımda');
            this.setState({
              loading: false,
            });
          }
        }
      })
      .catch(err => {
        this.setState({
          loading: false,
        });
        alert('Hata Gerçekleşti Lütfen Daha Sonra Tekrar Dene');
      });
  };
  render() {
    if (this.state.loading == true) {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    return (
      <ScrollView>
        <Background>
          <Logo />
          <BackButton goBack={this.navigateLogin} />

          <Header>Hesap Oluştur</Header>

          <TextInput
            label="Ad"
            returnKeyType="next"
            value={this.state.username}
            onChangeText={text =>
              this.setState({
                username: text,
              })
            }
            error={this.state.usernamerror}
            errorText={this.state.usernamerror ? 'Ad Alanı Boş Geçilemez' : ''}
          />
          <TextInput
            label="Soyad"
            value={this.state.usersurname}
            onChangeText={text => this.setState({usersurname: text})}
            error={this.state.usersurnameerror}
            errorText={
              this.state.usersurnameerror ? 'SoyadAd Alanı Boş Geçilemez' : ''
            }
            returnKeyType="next"
          />

          <TextInput
            label="Email Adresi"
            autoCapitalize="none"
            value={this.state.email}
            onChangeText={text => this.setState({email: text})}
            error={this.state.emailerror}
            errorText={
              this.state.emailerror ? 'Geçerli Bir Email Adresi Giriniz' : ''
            }
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />

          <TextInput
            label="Parola"
            value={this.state.password}
            onChangeText={text => this.setState({password: text})}
            error={this.state.passworderror}
            errorText={
              this.state.passworderror ? 'Geçerli Bir Parola Giriniz' : ''
            }
            returnKeyType="done"
            secureTextEntry
          />

          <Button
            mode="contained"
            style={styles.button}
            onPress={this.onFormControl}>
            Kayıt Ol
          </Button>
          <View style={styles.row}>
            <Text style={styles.label}>Hesabın Var Mı ? </Text>
            <TouchableOpacity onPress={this.navigateLogin}>
              <Text style={styles.link}>Giriş Yap</Text>
            </TouchableOpacity>
          </View>
        </Background>
      </ScrollView>
    );
  }
}

export default connect(null, {userRegister})(RegisterScreen);

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
