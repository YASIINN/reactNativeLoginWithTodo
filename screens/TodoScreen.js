import React from 'react';
import {
  Container,
  ScrollableTab,
  TabHeading,
  Text,
  Content,
  View,
} from 'native-base';
import {connect} from 'react-redux';
import {fetchTodo, changeTodo} from '../actions';
import MyHeader from '../components/MyHeader';
import IconBtn from '../components/IconBtn';
import MyTabs from '../components/Tabs';
import MyTab from '../components/Tab';
import TodoCard from '../components/TodoCard';
import {appConstants} from '../consts';
import {ActivityIndicator, RefreshControl, StyleSheet} from 'react-native';
class TodoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      refreshing: false,
    };
  }

  complateTodo = async (item, _i) => {
    item.status = !item.status;
    await this.props.changeTodo(item);
  };

  renderCard = () => {
    console.log();
    let item;
    if (this.props.todo.todo && this.props.todo.todo.length > 0) {
      item = this.props.todo.todo.map((item, i) => (
        <TodoCard
          onChange={() => {
            this.complateTodo(item, i);
          }}
          cardKey={i}
          title={item.title}
          check={!item.status}
        />
      ));
    } else {
    }
    return item;
  };
  onRefresh = () => {
    this.setState({
      refreshing: true,
    });
    this.onFetch('');
  };
  onFetch = key => {
    debugger;
    if (key === 'initial') {
      this.setState({
        loading: true,
      });
    }
    this.props
      .fetchTodo({id: this.props.user.user.id})
      .then(_res => {
        if (key === 'initial') {
          this.setState({
            loading: false,
          });
        } else {
          this.setState({
            refreshing: false,
          });
        }
      })
      .catch(_err => {
        if (key === 'initial') {
          this.setState({
            loading: false,
          });
        } else {
          this.setState({
            refreshing: false,
          });
        }
      });
  };
  componentDidMount() {
    this.onFetch('inital');
  }
  render() {
    return (
      <Container>
        <MyHeader backBtnVisible={false} headerTitle={'Online Görevler'}>
          <IconBtn
            icon="add"
            onPress={() => {
              this.props.navigation.navigate('NewTodo');
            }}
          />
        </MyHeader>
        <MyTabs renderTabBar={() => <ScrollableTab />}>
          <MyTab
            heading={
              <TabHeading
                style={{backgroundColor: appConstants.colors.primary}}>
                <Text>Görevler</Text>
              </TabHeading>
            }>
            <Content
              refreshControl={
                <RefreshControl
                  onRefresh={this.onRefresh}
                  refreshing={this.state.refreshing}
                  title="Yükleniyor"
                  progressBackgroundColor={'#fff'}
                />
              }
              scrollEventThrottle={2500}>
              {this.props.todo.todo.length === 0 ? (
                <View style={styles.container}>
                  <Text>Görev Bulunamadı</Text>
                </View>
              ) : (
                this.renderCard()
              )}
            </Content>
          </MyTab>
          <MyTab
            heading={
              <TabHeading
                style={{backgroundColor: appConstants.colors.primary}}>
                <Text>Tamamlanan</Text>
              </TabHeading>
            }
          />
        </MyTabs>
        {this.state.loading === true ? (
          <View style={styles.container}>
            <ActivityIndicator
              size="large"
              color={appConstants.colors.primary}
            />
          </View>
        ) : (
          <View />
        )}
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const mapStateToProps = state => {
  debugger;
  return {
    user: state.auth,
    todo: state.todo,
  };
};
export default connect(mapStateToProps, {fetchTodo, changeTodo})(TodoScreen);
