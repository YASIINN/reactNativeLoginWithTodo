import {addTodo, getTodo, updateTodo} from './todoConstant';
const INITIAL_STATE = {
  todo: [],
  complatedTodo: [],
};
export default (state = INITIAL_STATE, action) => {
  debugger;
  switch (action.type) {
    case addTodo:
      debugger;
      return Object.assign({}, state, {
        todo: [...state.todo, action.payload],
      });
    case getTodo:
      return Object.assign({}, state, {
        todo: action.payload,
      });
    case updateTodo:
      let deleted = state.todo.filter(item => {
        return item.id == action.payload.id;
      });
      return Object.assign({}, state, {
        todo: deleted,
        complatedTodo: [...state.complatedTodo, action.payload],
      });
    default:
      return state;
  }
};
