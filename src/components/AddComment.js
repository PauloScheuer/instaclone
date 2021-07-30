import React from 'react';
import { connect } from 'react-redux';
import { addComment } from '../store/actions/postActions';
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback as TWF, Alert } from 'react-native';
import { useState } from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';

const AddComment = ({ name, postId, onAddComment }) => {
  const [comment, setComment] = useState('');
  const [editMode, setEditMode] = useState(false);

  const handleAddComment = () => {
    onAddComment({
      postId: postId,
      comment: {
        nickname: name,
        comment
      }
    });

    setComment('');
    setEditMode(false);
  }

  return (
    <View style={{ flex: 1 }}>
      {editMode ? (
        <View style={styles.container}>
          <TextInput
            placeholder="Escreva seu comentário..."
            style={styles.input}
            autoFocus={true}
            value={comment}
            onChangeText={(text) => setComment(text)}
            onSubmitEditing={handleAddComment}
          />
          <TWF onPress={() => setEditMode(false)} >
            <Icon name="times" size={15} color="#555" />
          </TWF>
        </View>
      ) : (
          <TWF onPress={() => setEditMode(true)} >
            <View style={styles.container}>
              <Icon name="comment-o" size={15} color="#555" />
              <Text style={styles.caption}>
                Adicione um comentário...
                </Text>
            </View>
          </TWF>
        )}
    </View>
  );
}

const mapStateToProps = ({ user }) => {
  return {
    name: user.name
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onAddComment: payload => dispatch(addComment(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddComment);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  caption: {
    marginLeft: 10,
    fontSize: 12,
    color: '#ccc'
  },
  input: {
    width: '90%',
  }
});