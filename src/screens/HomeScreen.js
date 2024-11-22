import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList } from 'react-native';
import Swiper from 'react-native-swiper';

const data = [
  { id: '1', title: 'Collares', image: require('../../assets/images/collar_1.png') },
  { id: '2', title: 'Pulseras', image: require('../../assets/images/pulsera_1.png') },
  { id: '3', title: 'Straps', image: require('../../assets/images/strap_1.png') },
];

const imageData = [
  { id: '1', title: 'Collar Abejitas', image: require('../../assets/images/collar_abejitas.png') },
  { id: '2', title: 'Collar Caritas felices', image: require('../../assets/images/collar_caras_felices.png') },
  { id: '3', title: 'Collar cerezas', image: require('../../assets/images/collar_cerezas.png') },
  { id: '4', title: 'Collar flores blancas', image: require('../../assets/images/collar_flores_blancas.png') },
  { id: '5', title: 'Collar flores moradas', image: require('../../assets/images/collar_flores_moradas.png') },
  { id: '6', title: 'Pulsera moras', image: require('../../assets/images/pulsera_moras.png') },
  { id: '7', title: 'Pulseras tejidas', image: require('../../assets/images/pulseras_tejidas.png') },
  { id: '8', title: 'Pulseras nombre', image: require('../../assets/images/pulseras_nombre.png') },
  { id: '9', title: 'Strap', image: require('../../assets/images/strap.png') },
];

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo-removebg.png')} style={styles.logo} />
      <TextInput style={styles.searchBar} placeholder="ejemplo: collares" />
      <Swiper
        style={styles.carouselContainer}
        showsPagination
        autoplay={true} 
        autoplayTimeout={3000} 
        loop={true}
      >
        {imageData.map((item) => (
          <View key={item.id} style={styles.carouselItem}>
            <Image source={item.image} style={styles.carouselImage} />
          </View>
        ))}
      </Swiper>
      <View style={styles.categoryContainer}>
        {data.map((item) => (
          <View key={item.id} style={[styles.categoryItem, styles.categoryBorder]}>
            <TouchableOpacity 
              style={styles.categoryTextContainer} 
              onPress={() => navigation.navigate('Category', { categoryTitle: item.title })}
            >
              <Text style={styles.categoryText}>{item.title}</Text>
              <Text style={styles.categorySubtitle}>Personaliza el tuyo</Text>
            </TouchableOpacity>
            <Image source={item.image} style={styles.categoryImage} />
          </View> 
        ))}
      </View>
      <TouchableOpacity style={styles.catalogButton} onPress={() => navigation.navigate('Catálogo')}>
        <Text style={styles.catalogButtonText}>Ver catálogo</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5DC',
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 30,
    marginBottom: 10,
  },
  logo: {
    width: 184,
    height: 190,
    marginTop: 0,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    width: '80%',
    marginBottom: 20,
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
    textAlign: 'left',
    alignSelf: 'flex-start',
    paddingLeft: 30,
  },
  carouselContainer: {
    paddingLeft: 3,
    paddingRight: 6,
    height: 400,
  },
  carouselItem: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
  width: '90%',
  height: '90%',
  resizeMode: 'contain', 
  borderRadius: 15,
},
carouselImage: {
  width: '90%', 
  height: 300,   
  resizeMode: 'contain',
  borderRadius: 15,
  backgroundColor: '#fff', // Fondo blanco opcional para imágenes más pequeñas
},
  categoryContainer: {
    width: '90%',
    marginTop: 20,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
    borderColor: '#D2AC8F',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },
  categoryTextContainer: {
    flex: 1,
  },
  categoryText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#000000',
    paddingRight: 10,
  },
  categoryImage: {
    width: 65,
    height: 65,
    borderRadius: 10,
    marginLeft: 10,
  },
  categorySubtitle: {
    fontSize: 13,
    color: '#000000',
  },
  catalogButton: {
    backgroundColor: '#DD6B17',
    borderRadius: 25,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    width: 370,
    justifyContent: 'center',
    alignItems: 'center',
  },
  catalogButtonText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeScreen;

