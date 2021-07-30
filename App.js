import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import Header from './src/components/Header';
import Post from './src/components/Post';

const comments = [
  {
    nickname: 'Fulano',
    comment: 'Bah, top'
  },
  {
    nickname: 'Beltrano',
    comment: 'Daora'
  },
]

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <Post image={require('./assets/imgs/fence.jpg')} comments={comments} />
    </SafeAreaView>
  );
}
export default App;

const styles = StyleSheet.create({

});