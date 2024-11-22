import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

function ProductCard({ route }) {
  const { product, categoryTitle } = route.params; // Obtener datos del producto y la categoría

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../../assets/images/logo-removebg.png')} 
          style={styles.logo} 
        />
        <Text style={styles.categoryTitle}>{categoryTitle}</Text>
      </View>

      <Image source={product.image} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.personalizeButton}>
            <Text style={styles.personalizeButtonText}>Personalizar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addToCartButton}>
            <Text style={styles.addToCartButtonText}>Agregar al carrito</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8DC',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  productImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 20,
    color: '#6A5ACD',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    color: '#696969',
    textAlign: 'center',
    marginBottom: 20,
  },
  personalizeButton: {
    backgroundColor: '#DD6B17',
    borderRadius: 25,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    width: 370,
    justifyContent: 'center',
    alignItems: 'center',
  },
  personalizeButtonText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  addToCartButton: {
    backgroundColor: '#DD6B17',
    borderRadius: 25,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    width: 370,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartButtonText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProductCard;
