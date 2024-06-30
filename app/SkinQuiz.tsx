import React, { useState } from 'react';
import { View, Text, StyleSheet, Picker, Pressable, TextInput } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import {auth} from './firebase'; 
import { db } from './firebase'; // Adjust the import path according to your project structure
import { useNavigation } from 'expo-router';

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

export default function SkinQuiz() {
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));
  const [otherAllergy, setOtherAllergy] = useState('');
  const navigation = useNavigation();

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert('You need to be logged in to submit the quiz.');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'quizResults'), {
        answers,
        otherAllergy: answers.includes('Other') ? otherAllergy : null,
        userId: user.uid,
        timestamp: new Date(),
      });
      alert('Saved successfully!');
      navigation.navigate('tabs');
    } catch (error) {
      alert('Error submitting quiz: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      {questions.map((q, index) => (
        <View key={index} style={styles.questionContainer}>
          <Text style={styles.question}>{q.question}</Text>
          {q.type === 'picker' ? (
            <Picker
              selectedValue={answers[index]}
              onValueChange={(value) => handleAnswerChange(index, value)}
              style={styles.picker}
            >
              {q.options.map((option, idx) => (
                <Picker.Item key={idx} label={option} value={option} />
              ))}
            </Picker>
          ) : q.type === 'numeric' ? (
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={answers[index]}
              onChangeText={(value) => handleAnswerChange(index, value)}
              placeholder="Enter your age"
            />
          ) : null}
          {q.question === 'Do you have any allergies or sensitivities to skincare ingredients?' && answers[index] === 'Other' && (
            <TextInput
              style={styles.textInput}
              value={otherAllergy}
              onChangeText={setOtherAllergy}
              placeholder="Please specify"
            />
          )}
        </View>
      ))}
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Save</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  textInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#8A4DFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
