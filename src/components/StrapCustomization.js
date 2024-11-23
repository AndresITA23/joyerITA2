import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function StrapCustomization() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo-removebg.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Personalizar Strap</Text>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate('StrapCustomizationTheme')}
      >
        <Text style={styles.optionButtonText}>Temática</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate('StrapCustomizationRandom')}
      >
        <Text style={styles.optionButtonText}>Aleatorio</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8DC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 40,
  },
  optionButton: {
    backgroundColor: '#DD6B17',
    borderRadius: 25,
    padding: 15,
    marginBottom: 20,
    width: 200,
    alignItems: 'center',
  },
  optionButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default StrapCustomization;
