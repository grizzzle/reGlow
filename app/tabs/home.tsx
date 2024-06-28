/*
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const AuthenticatedScreen = ({ user, handleAuthentication }) => {
  return (
    <View style={styles.container1}>
      <StatusBar style="auto" />
      <Text style={styles.emailText}>{user.email}</Text>
      <View style={styles.section}>
        <Text style={styles.title}>Welcome to ReGlow!</Text>
        <Text style={styles.subtitle}>Let's simplify and optimise your skincare routine!</Text>
      </View>
      <Pressable style={styles.button} onPress={handleAuthentication}>
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emailText: {
    fontSize: 18,
    marginBottom: 16,
  },
  section: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AuthenticatedScreen;
*/