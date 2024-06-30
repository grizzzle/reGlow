import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface ProductCardProps {
  name: string;
  brand: string;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, brand, image }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.brand}>{brand}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  textContainer: {
    alignItems: 'center',
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
    marginTop: 5,
  },
});

export default ProductCard;
