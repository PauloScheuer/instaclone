import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('App')
    }, 2000)
  }, [])
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/imgs/icon.png')}
        style={styles.image}
      />
      <Text style={styles.header}>Instaclone</Text>
    </View>
  );
}
export default Splash;

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
  header: {
    fontSize: 50,
    fontWeight: 'bold'
  }
});