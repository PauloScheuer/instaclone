import React from 'react';
import { connect } from 'react-redux';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import Author from './Author';
import Comments from './Comments';
import AddComment from './AddComment';

const Post = ({ name, image, email, nickname, comments, id }) => {
  const addComment = name ? <AddComment postId={id} /> : null
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Author email={email} nickname={nickname} />
      <Comments comments={comments} />
      {addComment}
    </View>
  );
}

const mapStateToProps = ({ user }) => {
  return {
    name: user.name
  }
}

export default connect(mapStateToProps, null)(Post);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 3 / 4,
    resizeMode: 'contain'
  }
});