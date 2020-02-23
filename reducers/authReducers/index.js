import {signIn, signOut, signUp} from './authConstant';
const INITIAL_STATE = {
  userToken: '',
  user: {id: '', email: ''},
};
export default (state = INITIAL_STATE, action) => {
  if (action.type === signIn) {
    return Object.assign({}, state, {
      userToken: action.data.data.idToken,
      user: {
        id: action.data.data.localId,
        email: action.data.data.email,
      },
    });
  }
  return state;
};
