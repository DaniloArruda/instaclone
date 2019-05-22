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

const initialState = {
  name: '',
  email: '',
  password: '',
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
  }

  componentDidUpdate = prevProps => {
    if (prevProps.loading && !this.props.loading) {
      this.setState({ ...initialState });
      this.props.navigation.navigate('Profile');
    }
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
          style={[commonStyles.button, this.props.loading ? commonStyles.buttonDisabled : null]}>
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

const mapStateToProps = ({ user }) => {
  return {
    loading: user.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCreateUser: user => dispatch(createUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);