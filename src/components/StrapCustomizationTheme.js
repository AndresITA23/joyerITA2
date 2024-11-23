import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

function StrapCustomizationTheme() {
  const [themeColor, setThemeColor] = useState(null);
  const [threadColor, setThreadColor] = useState(null);
  const [size, setSize] = useState(null);
  const [chaquironColors, setChaquironColors] = useState([]);
  const [charms, setCharms] = useState([]);

  const themeColors = ['Amarillo', 'Azul', 'Blanco', 'Naranja', 'Rosa', 'Rojo'];
  const threadColors = ['Amarillo', 'Azul', 'Blanco', 'Naranja', 'Rosa Mexicano', 'Rosa Pastel'];
  const sizes = ['20 cm', '24 cm', '28 cm'];
  const chaquironOptions = ['Amarillo', 'Azul', 'Blanco', 'Naranja', 'Rosa Mexicano', 'Rosa Pastel'];
  const charmOptions = [
    'Caritas felices de colores',
    'Corazones de colores',
    'Moñitos de colores',
    'Dados de colores',
    'Ositos de peluche de colores',
    'Perlas blancas',
    'Dije sorpresa',
  ];

  const toggleSelection = (option, selected, setSelected, maxSelections) => {
    if (selected.includes(option)) {
      setSelected(selected.filter(item => item !== option));
    } else if (selected.length < maxSelections) {
      setSelected([...selected, option]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/logo-removebg.png')}
          style={styles.logo}
        />
        <Text style={styles.categoryTitle}>Personalizar Strap - Temática</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Color de la temática</Text>
        {themeColors.map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionBox,
              themeColor === color && styles.optionBoxSelected,
            ]}
            onPress={() => setThemeColor(color)}
          >
            <Text style={styles.optionText}>{color}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Color del hilo</Text>
        {threadColors.map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionBox,
              threadColor === color && styles.optionBoxSelected,
            ]}
            onPress={() => setThreadColor(color)}
          >
            <Text style={styles.optionText}>{color}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Tamaño</Text>
        {sizes.map((sizeOption, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionBox,
              size === sizeOption && styles.optionBoxSelected,
            ]}
            onPress={() => setSize(sizeOption)}
          >
            <Text style={styles.optionText}>{sizeOption}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Color de chaquirón (seleccionar 2)</Text>
        {chaquironOptions.map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionBox,
              chaquironColors.includes(color) && styles.optionBoxSelected,
            ]}
            onPress={() =>
              toggleSelection(color, chaquironColors, setChaquironColors, 2)
            }
          >
            <Text style={styles.optionText}>{color}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5. Dijes (seleccionar 4)</Text>
        {charmOptions.map((charm, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionBox,
              charms.includes(charm) && styles.optionBoxSelected,
            ]}
            onPress={() =>
              toggleSelection(charm, charms, setCharms, 4)
            }
          >
            <Text style={styles.optionText}>{charm}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.finishButton}
        onPress={() => {
          if (
            !themeColor ||
            !threadColor ||
            !size ||
            chaquironColors.length !== 2 ||
            charms.length !== 4
          ) {
            alert('Por favor, completa todas las opciones antes de continuar.');
          } else {
            alert('Personalización completada.');
          }
        }}
      >
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
  optionBox: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 10,
    marginBottom: 10,
  },
  optionBoxSelected: {
    borderColor: '#6A5ACD',
    backgroundColor: '#E0E0FF',
  },
  optionText: {
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
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default StrapCustomizationTheme;
