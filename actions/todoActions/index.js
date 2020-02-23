import axios from 'axios';
import {
  addTodo,
  getTodo,
  deleteTodo,
  updateTodo,
} from '../../reducers/todoReducers/todoConstant';
import {Alert} from 'react-native';
import _ from 'underscore';

export const changeTodo = data => {
  return dispatch => {
    debugger;
    axios
      .put('https://todoapp-1e0c1.firebaseio.com/todo/' + data.id + '.json', {
        data: data,
      })
      .then(res => {
        debugger;
        dispatch({
          type: updateTodo,
          payload: data,
        });
      })
      .catch(err => {
        Alert.alert(
          'Uyarı',
          'Beklenmeyen Bir Hata Gerçekleşti Lütfen Daha Sonra Tekrar Dene',
          [{text: 'Tamam', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      });
  };
};

export const fetchTodo = data => {
  return dispatch => {
    return axios
      .get('https://todoapp-1e0c1.firebaseio.com/todo.json')
      .then(res => {
        let todos = [];
        for (var key in res.data) {
          if (!res.data.hasOwnProperty(key)) continue;
          var obj = res.data[key];
          for (var prop in obj) {
            if (!obj.hasOwnProperty(prop)) continue;
          }
          debugger;
          todos.push({
            title: obj.data.title,
            content: obj.data.content,
            userid: obj.data.userid,
            status: obj.data.status,
            id: key,
          });
        }
        let finded = _.where(todos, {userid: data.id, status: true});
        dispatch({
          type: getTodo,
          payload: finded,
        });
      })
      .catch(err => {
        Alert.alert(
          'Uyarı',
          'Beklenmeyen Bir Hata Gerçekleşti Lütfen Daha Sonra Tekrar Dene',
          [{text: 'Tamam', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
        return err;
      });
  };
};

export const createTodo = data => {
  return dispatch => {
    debugger;
    return axios
      .post('https://todoapp-1e0c1.firebaseio.com/todo.json', {
        data,
      })
      .then(res => {
        debugger;
        if (res.status && res.status === 200) {
          let todo = JSON.parse(res.config.data).data;
          Object.assign(todo, {id: res.data.name});
          dispatch({
            type: addTodo,
            payload: todo,
          });
        }
        return res;
      })
      .catch(err => {
        Alert.alert(
          'Uyarı',
          'Beklenmeyen Bir Hata Gerçekleşti Lütfen Daha Sonra Tekrar Dene',
          [{text: 'Tamam', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
        return err;
      });
  };
};
