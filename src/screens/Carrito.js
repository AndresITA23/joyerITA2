import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { getDocs, query, collection, where, doc, getDoc, updateDoc, arrayRemove, onSnapshot } from 'firebase/firestore';
import { db } from '../../utils/firebase.js';
import { getAuth } from 'firebase/auth';
import images from '../../utils/imageMap.js';
import Icon from 'react-native-vector-icons/MaterialIcons';

function Carrito() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = () => {
      const userId = getAuth().currentUser?.uid;
      if (!userId) {
        alert('Debes estar autenticado para ver el carrito.');
        return;
      }

      const q = query(collection(db, 'carritos'), where('userId', '==', userId));
      const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        if (!querySnapshot.empty) {
          const carritoDoc = querySnapshot.docs[0];
          const products = carritoDoc.data().products;

          const productDetails = await Promise.all(
            products.map(async (product) => {
              const productRef = doc(db, 'personalizedProducts', product.productId);
              const productSnap = await getDoc(productRef);

              const productData = productSnap.data();
              const imageName = productData?.imageName;

              return { ...productData, quantity: product.quantity, productId: product.productId, imageName };
            })
          );

          setCartItems(productDetails);
        } else {
          setCartItems([]);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    };

    fetchCartItems();
  }, []);

  const handleRemove = async (productId) => {
    const userId = getAuth().currentUser?.uid;
    if (!userId) {
      alert('Debes estar autenticado para eliminar productos del carrito.');
      return;
    }

    try {
      const q = query(collection(db, 'carritos'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const carritoDoc = querySnapshot.docs[0];
        const carritoRef = doc(db, 'carritos', carritoDoc.id);

        // Actualizar la cantidad del producto en lugar de eliminar directamente
        const updatedProducts = carritoDoc.data().products.filter(item => item.productId !== productId);
        
        await updateDoc(carritoRef, {
          products: updatedProducts,
        });

        // Actualizar el estado localmente
        setCartItems(cartItems.filter(item => item.productId !== productId));
      }
    } catch (e) {
      console.error('Error removing product from cart: ', e);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {cartItems.length === 0 ? (
        <View style={styles.center}>
          <Text>No hay productos en tu carrito.</Text>
        </View>
      ) : (
        cartItems.map((item, index) => (
          <View key={index} style={styles.productContainer}>
            <Image
              source={images[item.imageName] || images['default.png']}
              style={styles.productImage}
            />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>${item.price}</Text>
              <Text style={styles.productQuantity}>Cantidad: {item.quantity}</Text>
            </View>
            <TouchableOpacity style={styles.removeButton} onPress={() => handleRemove(item.productId)}>
              <Icon name="delete" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8DC',
    paddingHorizontal: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 15,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  productPrice: {
    fontSize: 14,
    color: '#DD6B17',
  },
  productQuantity: {
    fontSize: 14,
    color: '#000',
  },
  removeButton: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#FF6347',
    padding: 15,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Carrito;
