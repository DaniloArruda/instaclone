import React, { Component } from 'react';
import { 
  View, 
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Gravatar } from 'react-native-gravatar';
import commonStyles from '../commonStyles';
import { logout } from '../store/actions/user';
import { connect } from 'react-redux';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  logout = () => {
    this.props.onLogout();
    this.props.navigation.navigate('Auth');
  }

  render() {
    const options = {
      email: this.props.email, 
      secure: true,
    }
    return (
      <View style={styles.container}>
        <Gravatar options={options} style={styles.avatar} />
        <Text style={styles.nickname}>{this.props.name}</Text>
        <Text style={styles.email}>{this.props.email}</Text>
        <TouchableOpacity onPress={this.logout} style={commonStyles.button}>
          <Text style={commonStyles.buttonText}>Sair</Text>
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
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75
  },
  nickname: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: 'bold',
  },
  email: {
    marginTop: 20,
    fontSize: 25,
  }
});

const mapStateToProps = ({ user }) => {
  return {
    email: user.email,
    name: user.name,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);