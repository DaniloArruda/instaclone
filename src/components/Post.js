import React, { Component } from 'react';
import { 
  View, 
  Text,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native';
import Author from './Author';
import Comments from './Comments';
import AddComponent from './AddComment';

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={this.props.image} style={styles.image} />
        <Author email={this.props.email} nickname={this.props.nickname} />
        <Comments comments={this.props.comments} />
        <AddComponent />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 3/4,
    resizeMode: 'contain',
  }
})