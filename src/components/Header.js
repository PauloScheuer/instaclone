import React from 'react';
import { connect } from 'react-redux';
import { Gravatar } from 'react-native-gravatar';
import { View, Image, Text, StyleSheet } from 'react-native';

import icon from '../../assets/imgs/icon.png';

const Header = (props) => {
  const name = props.name || 'Anonymous';
  const gravatar = props.email ? (
    <Gravatar style={styles.avatar} options={{ email: props.email, secure: true }} />
  ) : null;
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Image source={icon} style={styles.image} />
        <Text style={styles.title}>Instaclone</Text>
      </View>
      <View style={styles.userContainer}>
        <Text style={styles.user}>
          {name}
        </Text>
        {gravatar}
      </View>
    </View>
  );
}

const mapStateToProps = ({ user }) => {
  return {
    email: user.email,
    name: user.name
  }
}

export default connect(mapStateToProps, null)(Header);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#bbb',
    width: '100%'
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  user: {
    fontSize: 10,
    color: '#888'
  },
  avatar: {
    width: 30,
    height: 30,
    marginLeft: 10
  },
  image: {
    height: 30,
    width: 30,
    resizeMode: 'contain'
  },
  title: {
    color: '#000',
    fontFamily: 'shelter',
    height: 30,
    fontSize: 28
  }
});