import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, FlatList, SafeAreaView, } from 'react-native';
import Header from '../components/Header';
import Post from '../components/Post';
import { getPosts } from '../store/actions/postActions';

const Feed = ({ posts, onGetPosts }) => {
  useEffect(() => {
    onGetPosts();
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <FlatList
        data={posts}
        keyExtractor={item => item.id + ''}
        renderItem={({ item }) => {
          return <Post key={item.id} {...item} />
        }}
      />
    </SafeAreaView>
  );
}

const mapStateToProps = ({ post }) => {
  return {
    posts: post.posts
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onGetPosts: () => dispatch(getPosts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fcfcff'
  }
});