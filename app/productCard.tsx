import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useProduct } from './ProductContext';

const ProductCard = ({ name, brand, image, product }) => {
  const { addProductToHome } = useProduct();

  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.brand}>{brand}</Text>
      <TouchableOpacity style={styles.button} onPress={() => addProductToHome(product)}>
        <Text style={styles.buttonText}>Add to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  brand: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#6c63ff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
});

export default ProductCard;
