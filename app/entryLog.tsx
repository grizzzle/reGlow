import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import {auth} from './firebase'; 

const LogbookEntry = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [date, setDate] = useState(route.params?.date || new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [diet, setDiet] = useState([]);
  const [sleepQuality, setSleepQuality] = useState('');

  const dietOptions = ['Nuts', 'Shellfish', 'Gluten', 'Dairy', 'Soy', 'Eggs', 'Fish', 'Spices'];
  const sleepOptions = ['Poor', 'Average', 'Good'];

  const toggleDietOption = (option) => {
    if (diet.includes(option)) {
      setDiet(diet.filter((item) => item !== option));
    } else {
      setDiet([...diet, option]);
    }
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const saveLogEntry = async () => {
    const user = auth.currentUser;
    const userId = user ? user.uid : null;

    if (!userId) {
      alert('User not authenticated');
      return;
    }

    const logEntry = {
      date: date.toISOString().split('T')[0],
      diet,
      sleepQuality,
      userId, // Include the user ID
    };

    try {
      await axios.post('http://localhost:3000/logbookEntries', logEntry); // Ensure this URL is correct and the backend is running
      alert('Saved successfully!');
      navigation.navigate('logbook'); // Ensure this matches your route name
    } catch (error) {
      alert('Error saving: ' + error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Logbook</Text>
      <View style={styles.field}>
        <Text>Date</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
          <Text style={styles.datePickerText}>{date.toISOString().split('T')[0]}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
      </View>
      <View style={styles.field}>
        <Text>Diet</Text>
        <View style={styles.dietContainer}>
          {dietOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.dietButton, diet.includes(option) && styles.dietButtonSelected]}
              onPress={() => toggleDietOption(option)}
            >
              <Text>{option}</Text>
              <Text style={styles.plus}>{diet.includes(option) ? '✔️' : '+'}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.field}>
        <Text>Sleep Quality</Text>
        <View style={styles.sleepContainer}>
          {sleepOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.sleepButton, sleepQuality === option && styles.sleepButtonSelected]}
              onPress={() => setSleepQuality(option)}
            >
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={saveLogEntry}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  field: {
    marginBottom: 20,
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
  },
  datePickerText: {
    fontSize: 16,
  },
  dietContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  dietButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    padding: 10,
    margin: 5,
  },
  dietButtonSelected: {
    backgroundColor: '#e0e0e0',
  },
  plus: {
    marginLeft: 5,
    color: '#6c63ff',
  },
  sleepContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  sleepButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    padding: 10,
    margin: 5,
  },
  sleepButtonSelected: {
    backgroundColor: '#e0e0e0',
  },
  saveButton: {
    backgroundColor: '#6c63ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default LogbookEntry;
