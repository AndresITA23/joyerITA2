import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

function Category({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.boldText}>Categorías</Text>
      <Text> </Text>
      <Button 
      onPress={() => navigation.navigate('Home')}
      title="Go to Home"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boldText: {
    fontSize: 24, // Tamaño de la fuente
    fontWeight: 'bold', // Negritas
  },
});

export default Category;