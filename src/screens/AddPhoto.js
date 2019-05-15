import React, { Component } from 'react';
import { 
  View, 
  Text,
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
  Dimensions
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import commonStyles from '../commonStyles';
import { addPost } from '../store/actions/posts';
import { connect } from 'react-redux';

class AddPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      comment: '',
    };
  }

  pickImage = () => {
    ImagePicker.showImagePicker({
      title: 'Escolha a imagem',
      maxHeight: 600,
      maxWidth: 800,
    }, res => {
      if (!res.didCancel) {
        this.setState({ image: { uri: res.uri, base64: res.data } });
      }
    })
  }

  save = async () => {
    this.props.onAddPost({
      id: Math.random(),
      nickname: this.props.name,
      image: this.state.image,
      comments: [{
        nickname: this.props.name,
        comment: this.state.comment
      }]
    });

    this.setState({ image: null, comment: '' });
    this.props.navigation.navigate('Feed');
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Compartilhe uma imagem</Text>
          <View style={styles.imageContainer}>
            <Image source={this.state.image} style={styles.image} />
          </View>

          <TouchableOpacity onPress={this.pickImage} style={commonStyles.button}>
            <Text style={commonStyles.buttonText}>Escolha a foto</Text>
          </TouchableOpacity>
          <TextInput placeholder='Algum comentário para a foto?'
            style={styles.input} value={this.state.comment}
            onChangeText={comment => this.setState({ comment })} />

          <TouchableOpacity onPress={this.save} style={commonStyles.button}>
            <Text style={commonStyles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginTop: Platform.os === 'ios' ? 30 : 10,
    fontWeight: 'bold',
  },
  imageContainer: {
    width: '90%',
    height: Dimensions.get('window').width / 2,
    backgroundColor: '#eee',
    marginTop: 10
  },
  image: {
    width: '100%',
    height: Dimensions.get('window').width / 2,
    resizeMode: 'center',
  },
  input: {
    width: '90%',
    marginTop: 20,
  }
})

const mapStateToProps = ({ user }) => {
  return {
    email: user.email,
    name: user.name
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddPost: post => dispatch(addPost(post))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPhoto);
