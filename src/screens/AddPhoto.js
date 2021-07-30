import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Platform, ScrollView, Alert, SafeAreaView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { addPost } from '../store/actions/postActions';
import { launchImageLibrary, launchCamera, } from 'react-native-image-picker';
import { useEffect } from 'react';

const noUser = 'Você deve estar logado para postar!';

const AddPhoto = ({ navigation, onAddPost, name, email, loading }) => {
  const [image, setImage] = useState(null);
  const [comment, setComment] = useState('');

  const handlePickImage = () => {
    if (!name) {
      Alert.alert('Erro!', noUser);
      return;
    }
    launchImageLibrary({
      maxHeight: 600,
      maxWidth: 800
    }, res => {
      if (!res.didCancel) {
        setImage({ uri: res.assets[0].uri, base64: res.assets[0].data })
      }
    });
  }
  const handleNewImage = () => {
    if (!name) {
      Alert.alert('Erro!', noUser);
      return;
    }
    launchCamera({
      maxHeight: 600,
      maxWidth: 800
    }, res => {
      if (!res.didCancel) {
        setImage({ uri: res.assets[0].uri, base64: res.assets[0].data })
      }
    });
  }

  const handleSave = () => {
    if (!name) {
      Alert.alert('Erro!', noUser);
      return;
    }
    onAddPost({
      id: Math.random(),
      nickname: name,
      email: email,
      image,
      comments: [
        {
          nickname: name,
          comment,
        }
      ]
    });
  }

  useEffect(() => {
    if (loading) {
      setImage(null);
      setComment('')
      navigation.navigate('Feed');
    }
  }, [loading]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Compartilhe uma imagem</Text>
          <View style={styles.imageContainer}>
            <Image source={image} style={styles.image} />
          </View>
          <TouchableOpacity style={styles.button} onPress={handlePickImage}>
            <Text style={styles.buttonText}>Escolher</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleNewImage}>
            <Text style={styles.buttonText}>Nova</Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Digite aqui a legenda"
            style={styles.input}
            value={comment}
            editable={name != null}
            onChangeText={text => setComment(text)}
          />
          <TouchableOpacity
            style={[styles.button, loading ? styles.disabled : null]}
            onPress={handleSave}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const mapStateProps = ({ user, post }) => {
  return {
    email: user.email,
    name: user.name,
    loading: post.isUploading
  }
}

const mapDispatchProps = (dispatch) => {
  return {
    onAddPost: post => dispatch(addPost(post))
  }
}

export default connect(mapStateProps, mapDispatchProps)(AddPhoto);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold'
  },
  imageContainer: {
    width: '90%',
    height: Dimensions.get('window').height * 1 / 3,
    marginTop: 10
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#4286f4'
  },
  buttonText: {
    fontSize: 20,
    color: '#fff'
  },
  input: {
    marginTop: 20,
    width: '90%'
  },
  disabled: {
    backgroundColor: '#aaa'
  }
});