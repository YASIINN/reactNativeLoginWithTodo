import React from 'react';
import Navigator from './navigation/index';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducers from './reducers';
import NetInfo from '@react-native-community/netinfo';
import thunk from 'redux-thunk';
import netConnection from './components/netConnection';
const store = createStore(reducers, applyMiddleware(thunk));
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connection: true,
      refreshing: false,
    };
  }
  componentDidMount() {
    this.checkConnection();
  }
  onRefresh = () => {
    this.checkConnection();
  };
  checkConnection = () => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected === false) {
        this.setState({
          connection: false,
        });
      } else {
        this.setState({
          connection: true,
        });
      }
    });
  };
  render() {
    if (this.state.connection === false) {
      return (
        <netConnection
          onRefresh={this.onRefresh}
          refreshing={this.state.refreshing}
        />
      );
    }
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}
export default App;
