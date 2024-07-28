import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';
import ProductCard from '../productCard';

const numColumns = 2; // Number of columns for the grid

export default function ExploreScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products'); // Adjust the URL as needed
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }
    return data;
  };

  const renderItem = ({ item }) => {
    if (item.empty) {
      return <View style={[styles.card, styles.invisible]} />;
    }
    return <ProductCard name={item.name} brand={item.brand} image={item.image} product={item} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={formatData(products, numColumns)}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        numColumns={numColumns}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  card: {
    flex: 1,
    margin: 10,
  },
  invisible: {
    backgroundColor: 'transparent',
  },
});

export default ExploreScreen;
