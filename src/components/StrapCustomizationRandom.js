import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { addDoc, collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../utils/firebase.js';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import Toast from 'react-native-toast-message';

function StrapCustomizationRandom({ route, addToCart }) {
  const navigation = useNavigation();
  const { product, categoryTitle } = route.params;

  const [threadColor, setThreadColor] = useState(null);
  const [size, setSize] = useState(null);


  const colors = ['Amarillo', 'Azul', 'Blanco', 'Naranja', 'Rosa Mexicano', 'Rosa Pastel'];
  const sizes = ['20 cm', '24 cm', '28 cm'];

  const handleSave = async () => {
    if (!size || !threadColor ) {
      alert('Por favor, selecciona todas las opciones antes de continuar.');
      return;
    }
  
    const customizedProduct = {
      name: product.name,
      price: product.price,
      description: product.description,
      imageName: product.imageName,
      threadColor,
      size,
    };
  
    try {

      const docRef = await addDoc(collection(db, 'personalizedProducts'), customizedProduct);
      console.log('Document written with ID: ', docRef.id);

      const userId = getAuth().currentUser?.uid;
  
      if (!userId) {
        alert('Debes estar autenticado para agregar productos al carrito.');
        return;
      }
  
      const q = query(collection(db, 'carritos'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {

        const carritoDoc = querySnapshot.docs[0]; 
        const carritoRef = doc(db, 'carritos', carritoDoc.id);
  
        await updateDoc(carritoRef, {
          products: [...carritoDoc.data().products, { productId: docRef.id, quantity: 1 }],
        });
      } else {

        await addDoc(collection(db, 'carritos'), {
          userId: userId,
          products: [{ productId: docRef.id, quantity: 1 }],
        });
      }
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Producto agregado al carrito',
      });
      navigation.navigate('Carrito');
    } catch (e) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error al agregar el producto al carrito',
      });
      console.error('Error adding document: ', e);
    }
  };

  const renderRadioButtons = (options, selected, setSelected) => {
    return options.map((option, index) => (
      <TouchableOpacity
        key={index}
        style={styles.radioOption}
        onPress={() => setSelected(option)}
      >
        <View
          style={[styles.radioCircle, selected === option && styles.radioCircleSelected]}
        />
        <Text style={styles.radioText}>{option}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/logo-removebg.png')}
          style={styles.logo}
        />
        <Text style={styles.categoryTitle}>Personalizar {product.name}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Seleccionar color del hilo</Text>
        {renderRadioButtons(colors, threadColor, setThreadColor)}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Seleccionar tamaño</Text>
        {renderRadioButtons(sizes, size, setSize)}
      </View>

      <TouchableOpacity style={styles.finishButton} onPress={handleSave}>
        <Text style={styles.finishButtonText}>Terminar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8DC',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
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
  section: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#DD6B17',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioCircleSelected: {
    backgroundColor: '#DD6B17',
  },
  radioText: {
    fontSize: 16,
    color: '#000',
  },
  finishButton: {
    backgroundColor: '#DD6B17',
    borderRadius: 25,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  finishButtonText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default StrapCustomizationRandom;
