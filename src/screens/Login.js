import React, { Component } from 'react';
import { 
  View, 
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import commonStyles from '../commonStyles';
import MyTextInput from '../components/MyTextInput';
import { login } from '../store/actions/user';
import { connect } from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Temporario',
      email: '',
      password: '',
      emailSelected: {},
      passwordSelected: {}
    };
  }

  login = () => {
    this.props.onLogin({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    })
    this.props.navigation.navigate('Profile');
  }

  render() {
    return (
      <View style={styles.container}>
        <MyTextInput placeholder='Email'
          keyboardType='email-address' value={this.state.email}
          onChangeText={email => this.setState({ email })} />

        <MyTextInput placeholder='Senha' 
          secureTextEntry={true} value={this.state.password}
          onChangeText={password => this.setState({ password })} />

        <TouchableOpacity onPress={this.login} style={commonStyles.button}>
          <Text style={commonStyles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')} style={commonStyles.button}>
          <Text style={commonStyles.buttonText}>Criar nova conta...</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
})

const mapDispatchToProps = dispatch => {
  return {
    onLogin: user => dispatch(login(user))
  }
}

export default connect(null, mapDispatchToProps)(Login);