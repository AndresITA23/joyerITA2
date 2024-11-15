import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from "./src/screens/HomeScreen";
import LoginPage from "./src/screens/LoginPage";
import RegisterPage from "./src/screens/RegisterPage";
import Carrito from "./src/screens/Carrito";
import Category from "./src/screens/Category";
import MyAccount from "./src/screens/MyAccount";
import EditMyAccount from "./src/screens/EditMyAccount";
import Catalogo from "./src/screens/Catalogo";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home Tab" component={HomeScreen} />
      <Stack.Screen name="Catálogo" component={Catalogo} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Carrito') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Categorías') {
            iconName = focused ? 'reorder-three' : 'reorder-three-outline';
          } else if (route.name === 'Mi Cuenta') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Carrito" component={Carrito} />
      <Tab.Screen name="Categorías" component={Category} />
      <Tab.Screen name="Mi Cuenta" component={MyAccountStack} />
    </Tab.Navigator>
  );
}

function MyAccountStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Mi Cuenta Tab" component={MyAccount} />
      <Stack.Screen name="Editar Mi Cuenta" component={EditMyAccount} />
    </Stack.Navigator>
  );
}

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSignIn = () => {
    setIsSignedIn(true);
  };

  const handleRegisterNavigation = () => {
    setIsRegistering(true);
  };

  const handleRegistrationComplete = () => {
    setIsRegistering(false);
  };

  return (
    <NavigationContainer>
      {isSignedIn ? (
        <MainTabs />
      ) : (
        isRegistering ? (
          <RegisterPage onRegister={handleRegistrationComplete} onBack={handleRegistrationComplete} />
        ) : (
          <LoginPage onSignIn={handleSignIn} onRegister={handleRegisterNavigation} />
        )
      )}
    </NavigationContainer>
  );
}

export default App;
