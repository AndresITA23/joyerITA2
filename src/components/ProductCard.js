import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function ProductCard({ route }) {
  const navigation = useNavigation(); 
  const { product, categoryTitle } = route.params; 

  const handleCustomize = () => {
    switch (categoryTitle) { 
      case 'Collares':
        navigation.navigate('NecklaceCustomization', {
          product: product,
          categoryTitle: categoryTitle
          
        }, console.log(product.imageName));
        break;
      case 'Pulseras':
        navigation.navigate('BraceletCustomization', {
          product: product,
          categoryTitle: categoryTitle
        });
        break;
      case 'Straps':
        navigation.navigate('StrapCustomizationRandom', {
          product: product,
          categoryTitle: categoryTitle
        });
        break;
      default:
        console.warn('Tipo de producto no reconocido');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../../assets/images/logo-removebg.png')} 
          style={styles.logo} 
        />
        <Text style={styles.categoryTitle}>{categoryTitle}</Text>
      </View>

      <Image source={product.imageSrc} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.customizeButton} onPress={handleCustomize}>
          <Text style={styles.customizeButtonText}>Personalizar</Text>
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
  customizeButton: {
    backgroundColor: '#DD6B17',
    borderRadius: 25,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    width: 370,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customizeButtonText: {
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
