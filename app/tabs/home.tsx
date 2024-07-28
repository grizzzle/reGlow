import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useProduct } from '../ProductContext';

const HomeScreen = () => {
  const { homeProducts } = useProduct();

  const renderItem = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productBrand}>{item.brand}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.subtitle}>Your Current Product Rotation</Text>
      <FlatList
        data={homeProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productList}
      />
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  productList: {
    flexDirection: 'column',
  },
  productCard: {
    width: '100%',
    height: 200,  // Adjust height as necessary
    padding: 10,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  productBrand: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
});

export default HomeScreen;
