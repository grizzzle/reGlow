import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { auth } from './firebase';
import { useLogbook } from './LogbookContext';
import { useProduct } from './ProductContext';
import {Picker} from '@react-native-picker/picker';

const LogbookEntry = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { fetchEntries } = useLogbook();
  const { homeProducts } = useProduct();
  const entryId = route.params?.id || null;
  const [date, setDate] = useState(new Date(route.params?.date || Date.now()));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [diet, setDiet] = useState(route.params?.diet || []);
  const [sleepQuality, setSleepQuality] = useState(route.params?.sleepQuality || '');
  const [stressLevel, setStressLevel] = useState(route.params?.stressLevel || '');
  const [exercise, setExercise] = useState(route.params?.exercise || '');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [skinCondition, setSkinCondition] = useState(route.params?.skinCondition || {});
  const [usedProducts, setUsedProducts] = useState(route.params?.usedProducts || []);

  const dietOptions = ['Nuts', 'Shellfish', 'Gluten', 'Dairy', 'Soy', 'Eggs', 'Fish', 'Spices'];
  const sleepOptions = ['Poor', 'Average', 'Good'];
  const stressOptions = ['Low', 'Medium', 'High'];
  const exerciseOptions = ['None', 'Light', 'Moderate', 'Heavy'];
  const skinConditionOptions = ['redness', 'acne', 'blackhead', 'cloggedPores', 'dryness'];
  const severityOptions = ['Low', 'Medium', 'High'];

  const toggleDietOption = (option) => {
    if (diet.includes(option)) {
      setDiet(diet.filter((item) => item !== option));
    } else {
      setDiet([...diet, option]);
    }
  };

  const toggleUsedProduct = (productId) => {
    if (usedProducts.includes(productId)) {
      setUsedProducts(usedProducts.filter((id) => id !== productId));
    } else {
      setUsedProducts([...usedProducts, productId]);
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
      stressLevel,
      exercise,
      skinCondition,
      usedProducts,
      userId, // Include the user ID
    };

    try {
      if (entryId) {
        // Update existing entry
        await axios.put(`http://localhost:3000/logbookEntries/${entryId}`, logEntry);
      } else {
        // Create new entry
        await axios.post('http://localhost:3000/logbookEntries', logEntry);
      }
      alert('Saved successfully!');
      await fetchEntries(); // Fetch latest entries
      navigation.navigate('logbook'); // Ensure this matches your route name
    } catch (error) {
      alert('Error saving: ' + error.message);
    }
  };

  const deleteLogEntry = async () => {
    try {
      await axios.delete(`http://localhost:3000/logbookEntries/${entryId}`);
      alert('Deleted successfully!');
      await fetchEntries(); // Fetch latest entries
      navigation.navigate('logbook'); // Ensure this matches your route name
    } catch (error) {
      alert('Error deleting: ' + error.message);
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
      <View style={styles.field}>
        <Text>Stress Level</Text>
        <View style={styles.stressContainer}>
          {stressOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.stressButton, stressLevel === option && styles.stressButtonSelected]}
              onPress={() => setStressLevel(option)}
            >
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.field}>
        <Text>Exercise</Text>
        <View style={styles.exerciseContainer}>
          {exerciseOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.exerciseButton, exercise === option && styles.exerciseButtonSelected]}
              onPress={() => setExercise(option)}
            >
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.field}>
        <Text>Products Used</Text>
        <View style={styles.productsUsedContainer}>
          {homeProducts.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={[styles.productButton, usedProducts.includes(product.id) && styles.productButtonSelected]}
              onPress={() => toggleUsedProduct(product.id)}
            >
              <Text>{product.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.field}>
        <Text>Skin Condition</Text>
        <Picker
          selectedValue={selectedCondition}
          onValueChange={(itemValue) => setSelectedCondition(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Condition" value="" />
          {skinConditionOptions.map((condition) => (
            <Picker.Item key={condition} label={condition.charAt(0).toUpperCase() + condition.slice(1)} value={condition} />
          ))}
        </Picker>
        {selectedCondition ? (
          <View style={styles.severityContainer}>
            <Text>Severity</Text>
            {severityOptions.map((level) => (
              <TouchableOpacity
                key={level}
                style={[styles.severityButton, skinCondition[selectedCondition] === level && styles.severityButtonSelected]}
                onPress={() => setSkinCondition({ ...skinCondition, [selectedCondition]: level })}
              >
                <Text>{level}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : null}
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={saveLogEntry}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
      {entryId && (
        <TouchableOpacity style={styles.deleteButton} onPress={deleteLogEntry}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      )}
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
  stressContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  stressButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    padding: 10,
    margin: 5,
  },
  stressButtonSelected: {
    backgroundColor: '#e0e0e0',
  },
  exerciseContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  exerciseButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    padding: 10,
    margin: 5,
  },
  exerciseButtonSelected: {
    backgroundColor: '#e0e0e0',
  },
  productsUsedContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  productButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    padding: 10,
    margin: 5,
  },
  productButtonSelected: {
    backgroundColor: '#e0e0e0',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
  },
  severityContainer: {
    marginTop: 10,
  },
  severityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    padding: 10,
    margin: 5,
  },
  severityButtonSelected: {
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
  deleteButton: {
    backgroundColor: '#ff6666',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default LogbookEntry;
