import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { getDocs, query, collection, where, doc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../utils/firebase.js';
import { getAuth } from 'firebase/auth';
import images from '../../utils/imageMap.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useStripe } from '@stripe/stripe-react-native';
import { useNavigation } from '@react-navigation/native';

function Carrito() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const stripe = useStripe();
  const navigation = useNavigation();

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

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const HandleNavigate = () => {
    navigation.navigate('Checkout');
  };

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

        const updatedProducts = carritoDoc.data().products.filter(item => item.productId !== productId);

        await updateDoc(carritoRef, {
          products: updatedProducts,
        });

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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}> Resumen de productos</Text>
      </View>
      <ScrollView>
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
        <View style={styles.footer}>
          <Text style={styles.totalPrice}>Total: ${calculateTotalPrice()}</Text>
          <TouchableOpacity style={styles.paymentButton} onPress={HandleNavigate}>
            <Text style={styles.paymentButtonText}>Ir a Checkout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8DC',
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 50,
    marginVertical: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
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
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 15,
    borderRadius: 10,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#808080',
  },
  productQuantity: {
    fontSize: 14,
    color: '#808080',
  },
  removeButton: {
    padding: 10,
    backgroundColor: '#FF6347',
    borderRadius: 50,
  },
  footer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  paymentButton: {
    marginTop: 10,
    backgroundColor: '#DD6B17',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  paymentButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Carrito;
