import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, FlatList, TouchableOpacity } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../utils/firebase'; 
import images from '../../utils/imageMap'; 

const ProductCard = ({ product, onPress }) => (
  <TouchableOpacity style={styles.productCard} onPress={onPress}>
    <View style={styles.productDetails}>
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
    </View>
    <Image source={product.imageSrc} style={styles.productImage} />
  </TouchableOpacity>
);

function Category({ route, navigation }) {
  const { categoryTitle } = route.params;
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, categoryTitle.toLowerCase());
        const productsSnapshot = await getDocs(productsCollection);
        const productsList = productsSnapshot.docs.map(doc => {
          const data = doc.data();
          const imageSrc = getImageSource(data.imageName); 
          return { id: doc.id, ...data, imageSrc };
        });
        setProducts(productsList);
      } catch (error) {
        console.error("Error al obtener productos: ", error);
      }
    };

    fetchProducts();
  }, [categoryTitle]);

  const getImageSource = (imageName) => {
    if (typeof imageName === 'string') {
      return images[imageName] || require('../../assets/images/default.png'); 
    } else {
      console.error('imageName no es un string:', imageName);
      return require('../../assets/images/default.png');
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text === '') {
      setProducts(products);
    } else {
      const filtered = products.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setProducts(filtered);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo-removebg.png')} style={styles.logo} />
      <TextInput
        style={styles.searchBar}
        placeholder={`Buscar en ${categoryTitle}`}
        value={searchQuery}
        onChangeText={handleSearch}
      />
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
