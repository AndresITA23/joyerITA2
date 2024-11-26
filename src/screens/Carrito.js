import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

function Carrito({ cart }) {
  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + parseFloat(item.price.replace('$', '')) * item.quantity,
      0
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Carrito de Compras</Text>
      <FlatList
        data={cart}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemQuantity}>Cantidad: {item.quantity}</Text>
              <Text style={styles.itemPrice}>Precio: ${item.price}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <Text style={styles.total}>Total: ${calculateTotal().toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
    padding: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  itemDetails: {
    marginLeft: 15,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#555',
  },
  itemPrice: {
    fontSize: 14,
    color: '#555',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Carrito;
