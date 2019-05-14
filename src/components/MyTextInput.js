import React, { Component } from 'react';
import { TextInput } from 'react-native';
import commonStyles from '../commonStyles';

export default class MyTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputSelected: {}
    };
  }

  render() {
    return (
      <TextInput style={[commonStyles.input, this.state.inputSelected]}
        onFocus={() => this.setState({ inputSelected: commonStyles.inputSelected })}
        onBlur={() => this.setState({ inputSelected: {} })}
        selectionColor='#4286f4'
        {...this.props} />
    );
  }
}
