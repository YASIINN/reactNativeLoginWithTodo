import React from 'react';
import {connect} from 'react-redux';
import TextInput from '../components/TextInput';
import {Container, Content, Button, Text} from 'native-base';
import MyHeader from '../components/MyHeader';
import {appConstants} from '../consts';
import {nameValidator} from '../provider/utils';
import {createTodo} from '../actions/';
import Todo from '../models/Todo';
import {ActivityIndicator} from 'react-native';
class NewTodoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      titlerr: false,
      content: '',
      contenterr: false,
      creating: false,
    };
  }
  formValidation = () => {
    console.log(this.props.user);
    if (!nameValidator(this.state.title)) {
      this.setState({titlerr: true});
    } else if (!nameValidator(this.state.content)) {
      this.setState({titlerr: false, contenterr: true});
    } else {
      this.setState({
        creating: true,
      });
      this.props
        .createTodo(
          new Todo(
            this.state.title,
            this.state.content,
            true,
            new Date(),
            this.props.user.user.id,
          ),
        )
        .then(res => {
          this.setState({
            creating: false,
          });
          this.props.navigation.navigate('Todo');
        })
        .catch(err => {
          this.setState({
            creating: false,
          });
        });
    }
  };
  render() {
    return (
      <Container>
        <MyHeader
          backBtnVisible={true}
          onPress={() => {
            this.props.navigation.navigate('Todo');
          }}
          headerTitle={'Görev Ekle'}
        />
        <Content style={{padding: 20}}>
          <TextInput
            label="Başlık"
            returnKeyType="next"
            value={this.state.title}
            onChangeText={text =>
              this.setState({
                title: text,
              })
            }
            error={this.state.titlerr}
            errorText={this.state.titlerr ? 'Başlık Boş Geçilemez' : ''}
          />
          <TextInput
            label="İçerik"
            returnKeyType="next"
            multiline
            numberOfLines={4}
            value={this.state.content}
            onChangeText={text =>
              this.setState({
                content: text,
              })
            }
            error={this.state.contenterr}
            errorText={this.state.contenterr ? 'İçerik Boş Geçilemez' : ''}
          />
          {this.state.creating === true ? (
            <ActivityIndicator color="blue" size="large" />
          ) : (
            <Button
              full
              style={{backgroundColor: appConstants.colors.primary}}
              onPress={this.formValidation}>
              <Text>Ekle</Text>
            </Button>
          )}
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  debugger;
  return {
    user: state.auth,
  };
};
export default connect(mapStateToProps, {createTodo})(NewTodoScreen);
