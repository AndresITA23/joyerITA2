import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from "./src/screens/HomeScreen";
import LoginPage from "./src/screens/LoginPage";
import RegisterPage from "./src/screens/RegisterPage";
import Carrito from "./src/screens/Carrito";
import MyAccount from "./src/screens/MyAccount";
import EditMyAccount from "./src/screens/EditMyAccount";
import Catalogo from "./src/screens/Catalogo";
import Categories from "./src/screens/Category";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home Tab" component={HomeScreen} />
      <Stack.Screen name="Catálogo" component={Catalogo} />
      <Stack.Screen name="Category" component={Categories} />
    </Stack.Navigator>
  );
}

function MyAccountStack({ onSignOut }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Mi Cuenta Tab">
        {props => <MyAccount {...props} onSignOut={onSignOut} />}
      </Stack.Screen>
      <Stack.Screen name="Editar Mi Cuenta" component={EditMyAccount} />
      <Stack.Screen name="Iniciar sesión" component={LoginPage} />
    </Stack.Navigator>
  );
}

function MainTabs({ onSignOut }) {
  return (
    <Tab.Navigator initialRouteName="Categorías"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Categorías') {
            iconName = focused ? 'reorder-three' : 'reorder-three-outline';
          } else if (route.name === 'Carrito') {
            iconName = focused ? 'cart' : 'cart-outline';
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
      <Tab.Screen name="Carrito" component={Carrito} />
      <Tab.Screen name="Categorías" component={HomeStack} />
      <Tab.Screen name="Mi Cuenta">
        {props => <MyAccountStack {...props} onSignOut={onSignOut} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSignIn = () => {
    setIsSignedIn(true);
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
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
        <MainTabs onSignOut={handleSignOut} />
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
