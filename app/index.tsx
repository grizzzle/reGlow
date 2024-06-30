import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable} from 'react-native';
import { useNavigation } from 'expo-router';
import BackgroundLayout from './BackgroundLayout';


const BackgroundImage = require('./assets/images/bg.jpeg');
const PlaceholderImage = require('./assets/images/bottle.jpeg');

export default function App({}) { 
  const navigation = useNavigation();

  return (
    <BackgroundLayout>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Image source={BackgroundImage} style={styles.backgroundImage} />

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Re</Text>
            <Text style={styles.subtitle}>Glow</Text>
          </View>
          <Text style={styles.description}>your all-in-one skincare management app</Text>
          <View style={styles.imageWrapper}>
            <View style={styles.imageContainer}>
              <Image
                source={PlaceholderImage}
                style={styles.image}
              />
            </View>
          </View>
        </View>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Login')}>
          {({ pressed }) => (
            <Text style={[styles.buttonText, { opacity: pressed ? 0.5 : 1 }]}>JOIN NOW</Text>
          )}
        </Pressable>
      </View>
    </BackgroundLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 30,
    position: 'relative', // Add position relative for proper positioning of other elements
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Ensure the image covers the entire background
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 100,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 100,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 10,
    fontSize: 20,
    color: '#888',
    textAlign: 'right',
  },
  imageWrapper: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: 20,
  },
  imageContainer: {
    width: 250,
    height: 250,
    borderRadius: 125,
    overflow: 'hidden',
    marginBottom: 30,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  button: {
    backgroundColor: '#8A4DFF',
    paddingVertical: 20,
    paddingHorizontal: 100,
    borderRadius: 30,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
