import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

const BackgroundImage = require('./assets/images/bg.jpeg'); 

export default function BackgroundLayout({ children }) {
  return (
    <View style={styles.container}>
      <Image source={BackgroundImage} style={styles.backgroundImage} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
