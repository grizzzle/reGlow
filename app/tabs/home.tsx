import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/my-products'); // Ensure the URL is correct
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productBrand}>{item.brand}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.subtitle}>Your Current Product Rotation</Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
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
    flexDirection: 'row',
  },
  productCard: {
    width: 150,
    padding: 10,
    marginRight: 15,
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
