import React, { Component } from 'react';
import { 
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';

class Splash extends Component {
  
  componentDidMount = () => {
    setTimeout(
      () => this.props.navigation.navigate('App'),
      2000
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/imgs/icon.png')} 
          style={styles.image} />
        <Text style={styles.text} >Insta Clone</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: 200,
    width: 200,
    resizeMode: 'contain'
  },
  text: {
    fontSize: 50,
    fontFamily: 'shelter',
    color: '#000',
  }
})

export default Splash;
