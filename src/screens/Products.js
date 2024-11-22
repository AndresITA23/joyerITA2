import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, FlatList, TouchableOpacity } from 'react-native';

const productsByCategory = {
  Collares: [
    { id: '1', name: 'Collar Abejitas', price: 199.99, description: 'Hermoso collar con abejitas de colores.', image: require('../../assets/images/collar_abejitas.png') },
    { id: '2', name: 'Collar Caritas Felices', price: 149.99, description: 'Un collar lleno de caritas felices.', image: require('../../assets/images/collar_caras_felices.png') },
    { id: '3', name: 'Collar Cerezas', price: 129.99, description: 'Collar con colgantes de cerezas.', image: require('../../assets/images/collar_cerezas.png') },
  ],
  Pulseras: [
    { id: '4', name: 'Pulsera Moras', price: 99.99, description: 'Pulsera inspirada en las moras.', image: require('../../assets/images/pulsera_moras.png') },
    { id: '5', name: 'Pulseras Tejidas', price: 89.99, description: 'Pulseras tejidas a mano.', image: require('../../assets/images/pulseras_tejidas.png') },
  ],
  Straps: [
    { id: '6', name: 'Strap Multicolor', price: 59.99, description: 'Strap colorido para tu dispositivo.', image: require('../../assets/images/strap.png') },
  ],
};

const ProductCard = ({ product, onPress }) => (
  <TouchableOpacity style={styles.productCard} onPress={onPress}>
    <View style={styles.productDetails}>
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
    </View>
    <Image source={product.image} style={styles.productImage} />
  </TouchableOpacity>
);

function Category({ route, navigation }) {
  const { categoryTitle } = route.params; 
  const products = productsByCategory[categoryTitle] || []; 
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo-removebg.png')} style={styles.logo} />
      <TextInput style={styles.searchBar} placeholder={`Buscar en ${categoryTitle}`} />
      <Text style={styles.sectionTitle}>{categoryTitle}</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard 
            product={item} 
            onPress={() => navigation.navigate('ProductCard', { 
              product: item, 
              categoryTitle 
            })} 
          />

        )}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
    alignItems: 'center',
    paddingTop: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 20,
    width: '90%',
    marginBottom: 20,
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  productList: {
    paddingHorizontal: 10,
    width: '100%',
    paddingBottom: 20,
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FFF8DC',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
  },
  productDetails: {
    flex: 1,
    marginRight: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#6A5ACD',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
});

export default Category;
