import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { login } from '../store/actions/userActions';
import { useEffect } from 'react';

const Login = ({ navigation, onLogin, loading }) => {
  const [name, setName] = useState('Temp');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tried, setTried] = useState(false);

  const handleLogin = () => {
    onLogin({ name, email, password });
    setTried(true);
  }
  const handleDoesntHasAccount = () => {
    navigation.navigate('Register');
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
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDoesntHasAccount} style={styles.button}>
        <Text style={styles.buttonText}>Nova conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const mapStateToProps = ({ user }) => {
  return {
    loading: user.isLoading
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (user) => {
      return dispatch(login(user));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

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