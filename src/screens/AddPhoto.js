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
      Alert.alert('Chegou no callback', JSON.stringify(res));
      if (!res.didCancel) {
        this.setState({ image: { uri: res.uri, base64: res.data } });
      }
    })
  }

  save = async () => {
    Alert.alert('Imagem adicionada', this.state.comment)
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

export default AddPhoto;
