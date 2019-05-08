import React, { Component } from 'react';
import { 
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import Header from '../components/Header';
import Post from '../components/Post';

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {
          id: Math.random(),
          nickname: 'Rafael Pereira',
          email: 'rafael@email.com',
          image: require('../../assets/imgs/fence.jpg'),
          comments: [
            {
              nickname: 'João Filho',
              comment: 'Stunning!'
            },
            {
              nickname: 'Maria Joana',
              comment: 'Foto legal! Onde foi tirada?',
            },
          ]
        },
        {
          id: Math.random(),
          nickname: 'José Pereira',
          email: 'jose@email.com',
          image: require('../../assets/imgs/bw.jpg'),
          comments: [],
        }
      ]
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <FlatList
          data={this.state.posts}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) => 
            <Post key={item.id} {...item} />} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff'
  }
})