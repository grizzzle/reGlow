import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useLogbook } from '../LogbookContext';

const LogbookOverview = () => {
  const navigation = useNavigation();
  const { entries, fetchEntries } = useLogbook();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEntries = async () => {
      setLoading(true);
      await fetchEntries();
      setLoading(false);
    };

    loadEntries();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.logItem}>
      <TouchableOpacity
        style={styles.entryDetails}
        onPress={() => navigation.navigate('entryLog', { 
          id: item.id, 
          date: item.date, 
          diet: item.diet, 
          sleepQuality: item.sleepQuality, 
          stressLevel: item.stressLevel,
          exercise: item.exercise,
          skinCondition: item.skinCondition,
        })}
      >
        <Text style={styles.logText}>{item.date}</Text>
        <Text style={styles.logText}>Diet: {item.diet.join(', ')}</Text>
        <Text style={styles.logText}>Sleep Quality: {item.sleepQuality}</Text>
        <Text style={styles.logText}>Stress Level: {item.stressLevel}</Text>
        <Text style={styles.logText}>Exercise: {item.exercise}</Text>
        {item.skinCondition && Object.keys(item.skinCondition).map((condition) => (
          <Text key={condition} style={styles.logText}>{condition.charAt(0).toUpperCase() + condition.slice(1)}: {item.skinCondition[condition]}</Text>
        ))}
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6c63ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logbook</Text>
      <Text style={styles.subtitle}>
        Keep a detailed record of your skincare routine, diet choices, and lifestyle factors to achieve healthier, glowing skin.
      </Text>
      {entries.length === 0 ? (
        <Text style={styles.noEntriesText}>No logbook entries yet.</Text>
      ) : (
        <FlatList
          data={entries}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('entryLog')}>
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginVertical: 10,
  },
  logItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'space-between',
  },
  entryDetails: {
    flex: 1,
  },
  logText: {
    fontSize: 18,
  },
  noEntriesText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginVertical: 20,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#6c63ff',
    borderRadius: 50,
    padding: 15,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LogbookOverview;
