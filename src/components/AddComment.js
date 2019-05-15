import React, { Component } from 'react';
import { 
  View, 
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback as TWF,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { addComment } from '../store/actions/posts';
import { connect } from 'react-redux';

class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      editMode: false,
    };
  }

  handleAddComment = () => {
    this.props.onAddComment({
      postId: this.props.postId,
      comment: {
        nickname: this.props.name,
        comment: this.state.comment
      }
    });

    this.setState({ comment: '', editMode: false });
  }

  render() {
    let commentArea = null;

    if (this.state.editMode) {
      commentArea = (
        <View style={styles.container}>
          <Icon name='comment-o' size={25} color='#555' />
          <TextInput placeholder='Pode comentar...'
            style={styles.input} 
            value={this.state.comment}
            onChangeText={comment => this.setState({ comment })}
            onSubmitEditing={this.handleAddComment} />
          <TWF onPress={() => this.setState({ editMode: false })}>
            <Icon name='times' size={15} color='#555' />
          </TWF>
        </View>
      )
    } else {
      commentArea = (
        <TWF onPress={() => this.setState({ editMode: true })}>
          <View style={styles.container}>
            <Icon name='comment-o' size={25} color='#555' />
            <Text style={styles.caption}>Adicione um comentário...</Text>
          </View>
        </TWF>
      )
    }

    return (
      <View style={{ flex: 1 }}>
        {commentArea}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  caption: {
    marginLeft: 10,
    fontSize: 15,
    color: '#ccc',
  },
  input: {
    width: '90%',
    justifyContent: 'flex-end'
  }
})

const mapStateToProps = ({ user }) => {
  return {
    name: user.name
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddComment: payload => dispatch(addComment(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddComment);