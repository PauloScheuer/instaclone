import React from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import SplashNavigator from './routes/SplashNavigator';
import { setMessage } from './store/actions/messageActions';
import { useEffect } from 'react';

const App = ({ title, text, clearMessage }) => {
  useEffect(() => {
    if (text && text.toString().trim()) {
      Alert.alert(title || 'Mensagem', text);
      clearMessage();
    }
  }, [title, text])
  return (
    <SplashNavigator />
  );
}

const mapStateToProps = ({ message }) => {
  return {
    title: message.title,
    text: message.text,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearMessage: () => dispatch(setMessage({ title: '', text: '' }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
