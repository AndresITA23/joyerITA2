import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList } from 'react-native';

const data = [
  { id: '1', title: 'Collares', image: require('../../assets/images/collar_1.png') },
  { id: '2', title: 'Pulseras', image: require('../../assets/images/pulsera_1.png') },
  { id: '3', title: 'Straps', image: require('../../assets/images/strap_1.png') },
];

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo-removebg.png')} style={styles.logo} />
      <TextInput style={styles.searchBar} placeholder="ejemplo: collares" />
      <Text style={styles.sectionTitle}>Mira nuestros productos</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.carouselItem}>
            <Image source={item.image} style={styles.carouselImage} />
          </View>
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carouselContainer}
      />
      <View style={styles.categoryContainer}>
        {data.map((item) => (
          <View key={item.id} style={[styles.categoryItem, styles.categoryBorder]}>
            <View style={styles.categoryTextContainer}>
              <Text style={styles.categoryText}>{item.title}</Text>
              <Text style={styles.categorySubtitle}>Personaliza el tuyo</Text>
            </View>
            <Image source={item.image} style={styles.categoryImage} />
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.catalogButton} onPress={() => navigation.navigate('Catálogo')}>
        <Text style={styles.catalogButtonText}>Ver catálogo</Text>
      </TouchableOpacity>
    </View>
  );
}

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
    paddingLeft: 25,
    paddingRight: 25,
  },
  carouselItem: {
    backgroundColor: '#D2AC8F',
    borderRadius: 15,
    height: 170,
    padding: 5,
    marginLeft: 1,
    marginRight: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    width: 200,
    height: 160,
    borderRadius: 15,
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
