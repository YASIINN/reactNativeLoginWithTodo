import React from 'react';
import {Card, CardItem, Right, CheckBox, Text} from 'native-base';
import {appConstants} from '../consts';
const TodoCard = props => {
  return (
    <Card key={props.cardKey}>
      <CardItem>
        <Text>{props.title}</Text>
        <Right>
          <CheckBox
            checked={props.check}
            color={appConstants.colors.primary}
            onPress={props.onChange}
          />
        </Right>
      </CardItem>
    </Card>
  );
};

export default TodoCard;
