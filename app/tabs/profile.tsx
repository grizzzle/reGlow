import React from 'react';
import { View, Text, Pressable, StyleSheet, StatusBar } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigation } from 'expo-router';

const AuthenticatedScreen = () => {
  const auth = getAuth();
  const navigation = useNavigation();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.navigate('index');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleQuizNavigation = () => {
    navigation.navigate('SkinQuiz');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Welcome to ReGlow!</Text>
      <Text style={styles.subtitle}>Let's simplify and optimize your skincare routine!</Text>
      <Pressable style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
      <Pressable style={styles.quizButton} onPress={handleQuizNavigation}>
        <Text style={styles.buttonText}>Your Skin Type</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#8A4DFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 20,
  },
  quizButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AuthenticatedScreen;
