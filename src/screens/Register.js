import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createUser } from '../store/actions/userActions';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';

const Register = ({ navigation, onCreateUser, loading }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tried, setTried] = useState(false);

  const handleRegister = () => {
    onCreateUser({ name, email, password });
    setEmail(''); setName(''); setPassword('');
    setTried(true);
  }

  const handleAlreadyHasAccount = () => {
    navigation.navigate('Login')
  }

  useEffect(() => {
    if (tried && !loading) {
      navigation.navigate('Profile');
      setTried(false)
    }
  }, [loading]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome"
        style={styles.input}
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType='email-address'
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        placeholder="Senha"
        style={styles.input}
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleAlreadyHasAccount} style={styles.button}>
        <Text style={styles.buttonText}>Já possuo conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const mapStateToProps = ({ user }) => {
  return {
    loading: user.isLoading
  }
}

const mapDispatchProps = (dispatch) => {
  return {
    onCreateUser: user => dispatch(createUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchProps)(Register);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#4286f4'
  },
  buttonText: {
    fontSize: 20,
    color: '#fff'
  },
  input: {
    marginTop: 20,
    width: '90%',
    backgroundColor: '#eee',
    height: 40,
    borderWidth: 1,
    borderColor: '#333'
  }
});