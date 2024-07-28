import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, StatusBar } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigation } from 'expo-router';
import { useIsFocused } from '@react-navigation/native'; // Import from @react-navigation/native
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust the import path according to your project structure

const questions = [
  {
    question: 'Age',
    type: 'numeric',
  },
  {
    question: 'What is your skin type?',
    options: ['Normal', 'Oily', 'Dry', 'Combination'],
    type: 'picker',
  },
  {
    question: 'What is your main skin concern?',
    options: ['Acne', 'Aging', 'Hyperpigmentation', 'Sensitivity'],
    type: 'picker',
  },
  {
    question: 'Do you have any allergies or sensitivities to skincare ingredients?',
    options: ['Fragrance', 'Alcohol', 'Parabens', 'Sulfates', 'Essential Oils', 'Retinoids', 'None', 'Other'],
    type: 'picker',
  },
];

const AuthenticatedScreen = () => {
  const auth = getAuth();
  const navigation = useNavigation();
  const isFocused = useIsFocused(); // Hook to detect if the screen is focused
  const [quizResults, setQuizResults] = useState([]);

  useEffect(() => {
    const fetchQuizResults = async () => {
      const user = auth.currentUser;
      if (user) {
        const q = query(collection(db, 'quizResults'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const results = [];
        querySnapshot.forEach((doc) => {
          results.push(doc.data());
        });
        setQuizResults(results);
      }
    };

    if (isFocused) {
      fetchQuizResults(); // Fetch quiz results when the screen is focused
    }
  }, [isFocused]);

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

      <Text style={styles.resultsTitle}>Your Skin Quiz Results:</Text>
      {quizResults.length > 0 ? (
        quizResults.map((result, index) => (
          <View key={index} style={styles.resultContainer}>
            {result.answers.map((answer, idx) => (
              <Text key={idx} style={styles.resultText}>
                {questions[idx].question}: {answer}
              </Text>
            ))}
            {result.otherAllergy && (
              <Text style={styles.resultText}>Other Allergy: {result.otherAllergy}</Text>
            )}
          </View>
        ))
      ) : (
        <Text style={styles.noResults}>No quiz results found.</Text>
      )}
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
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
  },
  resultContainer: {
    marginTop: 10,
  },
  resultText: {
    fontSize: 16,
  },
  noResults: {
    fontSize: 16,
    color: '#888',
    marginTop: 10,
  },
});

export default AuthenticatedScreen;
