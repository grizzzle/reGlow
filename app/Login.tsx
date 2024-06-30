import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from 'expo-router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import BackgroundLayout from './BackgroundLayout';
import {auth} from './firebase'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        navigation.navigate('tabs'); 
      }
    });
    return () => unsubscribe();
  }, [auth, navigation]);

  const handleAuthentication = async () => {
    try {
      if (user) {
        await signOut(auth);
      } else {
        if (isLogin) {
          await signInWithEmailAndPassword(auth, email, password);
        } else {
          await createUserWithEmailAndPassword(auth, email, password);
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <BackgroundLayout>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {user ? (
          null
        ) : (
          <AuthScreen
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            handleAuthentication={handleAuthentication}
          />
        )}
      </ScrollView>
    </BackgroundLayout>
  );
}

const AuthScreen = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Hey there!</Text>
      <Text style={styles.subtitle}>{isLogin ? 'Login with your email and password here!' : 'Create an account using your email and password!'}</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <Pressable style={styles.button} onPress={handleAuthentication}>
        <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Sign Up'}</Text>
      </Pressable>
      <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Or Create a New Account' : 'Already have an account? Login'}
      </Text>
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
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#8A4DFF',
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
  toggleText: {
    color: '#8A4DFF',
    fontSize: 16,
    marginTop: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
