import axios from 'axios';
import {
  signIn,
  signOut,
  signUp,
} from '../../reducers/authReducers/authConstant';
import {Alert} from 'react-native';

export const userLogin = data => {
  debugger;
  return dispatch => {
    return axios
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCX3tYzocsK9CQI6tduQ6T0zgCsjUyUsyY',
        {
          returnSecureToken: true,
          email: data.email,
          password: data.password,
        },
      )
      .then(res => {
        debugger;
        dispatch({type: signIn, data: res});
        return res;
      })
      .catch(err => {
        if (
          err.response.data.error.message == 'INVALID_PASSWORD' ||
          err.response.data.error.message == 'INVALID_EMAIL'
        ) {
          Alert.alert(
            'Uyarı',
            'Kullanıcı Adı Veya Parola Yanlış',
            [{text: 'Tamam', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
        } else if (
          err.response.data.error.message ==
          'TOO_MANY_ATTEMPTS_TRY_LATER : Too many unsuccessful login attempts. Please try again later.'
        ) {
          Alert.alert(
            'Uyarı',
            'Çok Sayıda Başarısız Girişim Lütfen Sonra Tekrar Dene',
            [{text: 'Tamam', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
        }
        return err;
      });
  };
};

export const userRegister = data => {
  debugger;
  return dispatch => {
    return axios
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCX3tYzocsK9CQI6tduQ6T0zgCsjUyUsyY',
        {
          email: data.email,
          password: data.password,
          returnSecureToken: true,
        },
      )
      .then(res => {
        debugger;
        return axios
          .post('https://todoapp-1e0c1.firebaseio.com/users.json', {
            useremail: data.email,
            username: data.username,
            usersurname: data.usersurname,
          })
          .then(res => {
            debugger;
            return res;
          })
          .catch(err => {
            debugger;
            throw new Error('Something went wrong!');
          });
      })
      .catch(err => {
        throw new Error('Something went wrong!');
      });
  };
};
