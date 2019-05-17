import React, { Component } from 'react';
import { 
  View, 
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from 'react-native';
import commonStyles from '../commonStyles';
import MyTextInput from '../components/MyTextInput';
import { createUser } from '../store/actions/user';
import { connect } from 'react-redux';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      nameSelected: {},
      emailSelected: {},
      passwordSelected: {},
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <MyTextInput placeholder='Nome' 
          autoFocus={true} value={this.state.name}
          onChangeText={name => this.setState({ name })} />
        <MyTextInput placeholder='Email'
          keyboardType='email-address' value={this.state.email}
          onChangeText={email => this.setState({ email })} />
        <MyTextInput placeholder='Senha' 
          secureTextEntry={true} value={this.state.password}
          onChangeText={password => this.setState({ password })} />

        <TouchableOpacity 
          onPress={() => { this.props.onCreateUser(this.state) }} 
          style={commonStyles.button}>
          <Text style={commonStyles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const mapDispatchToProps = dispatch => {
  return {
    onCreateUser: user => dispatch(createUser(user))
  }
}

export default connect(null, mapDispatchToProps)(Register);