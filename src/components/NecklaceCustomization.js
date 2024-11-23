import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function NecklaceCustomization() {
  const navigation = useNavigation();

  const [baseColor, setBaseColor] = useState(null);
  const [size, setSize] = useState(null);
  const [objectColor, setObjectColor] = useState(null);
  const [claspColor, setClaspColor] = useState(null);

  const colors = ['Amarillo', 'Azul', 'Blanco', 'Naranja', 'Rosa Mexicano', 'Rosa Pastel'];
  const claspColors = ['Dorado', 'Plateado'];
  const sizes = ['30 cm', '35 cm', '40 cm'];

  const renderRadioButtons = (options, selected, setSelected) => {
    return options.map((option, index) => (
      <TouchableOpacity
        key={index}
        style={styles.radioOption}
        onPress={() => setSelected(option)}
      >
        <View
          style={[
            styles.radioCircle,
            selected === option && styles.radioCircleSelected,
          ]}
        />
        <Text style={styles.radioText}>{option}</Text>
      </TouchableOpacity>
    ));
  };

  const handleFinish = () => {
    if (!baseColor || !size || !objectColor || !claspColor) {
      alert('Por favor, selecciona todas las opciones antes de continuar.');
      return;
    }

    navigation.navigate('Cart', {
      product: {
        baseColor,
        size,
        objectColor,
        claspColor,
      },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/logo-removebg.png')}
          style={styles.logo}
        />
        <Text style={styles.categoryTitle}>Personalizar Collar</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Seleccionar color de chaquira base</Text>
        {renderRadioButtons(colors, baseColor, setBaseColor)}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Seleccionar tamaño</Text>
        {renderRadioButtons(sizes, size, setSize)}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Seleccionar color del objeto del collar</Text>
        {renderRadioButtons(colors, objectColor, setObjectColor)}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Seleccionar color del broche</Text>
        {renderRadioButtons(claspColors, claspColor, setClaspColor)}
      </View>

      <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
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

export default NecklaceCustomization;
