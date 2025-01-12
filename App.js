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
import TermsAndConditions from "./src/screens/TermsAndConditions";
import Catalogo from "./src/screens/Catalogo";
import Category from "./src/screens/Products";
import ProductCard from "./src/components/ProductCard";
import NecklaceCustomization from "./src/components/NecklaceCustomization";
import BraceletCustomization from "./src/components/BraceletCustomization";
import StrapCustomization from "./src/components/StrapCustomization";
import StrapCustomizationTheme from "./src/components/StrapCustomizationTheme";
import StrapCustomizationRandom from "./src/components/StrapCustomizationRandom";
import Toast from "react-native-toast-message";
import { StripeProvider } from '@stripe/stripe-react-native';
import Checkout from "./src/screens/Chekout";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function App() {

  
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [cart, setCart] = useState([]);

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


  function HomeStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home Tab" component={HomeScreen} />
        <Stack.Screen name="Catalogo" component={Catalogo} />
        <Stack.Screen name="Category" component={Category} />
        <Stack.Screen name="ProductCard" component={ProductCard} />
        <Stack.Screen name="NecklaceCustomization" component={NecklaceCustomization} />
        <Stack.Screen name="BraceletCustomization" component={BraceletCustomization} />
        <Stack.Screen name="StrapCustomization" component={StrapCustomization} />
        <Stack.Screen name="StrapCustomizationTheme" component={StrapCustomizationTheme} />
        <Stack.Screen name="StrapCustomizationRandom" component={StrapCustomizationRandom} />
        <Stack.Screen name="Checkout" component={Checkout} />
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
        <Stack.Screen name="Términos y Condiciones" component={TermsAndConditions} />
        <Stack.Screen name="Iniciar sesión" component={LoginPage} />
      </Stack.Navigator>
    );
  }

  function MainTabs({ onSignOut }) {
    return (
      <Tab.Navigator
        initialRouteName="Categorías"
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
        <Tab.Screen name="Carrito">
          {(props) => <Carrito {...props} cart={cart} />}
        </Tab.Screen>
        <Tab.Screen name="Categorías" component={HomeStack} />
        <Tab.Screen name="Mi Cuenta">
          {(props) => <MyAccountStack {...props} onSignOut={onSignOut} />}
        </Tab.Screen>
      </Tab.Navigator>
    );
  }

  return (
    <StripeProvider publishableKey="pk_test_51PdBptRxKVbjqFD4ED9ZuR15Ikv1HlkNNch3ICKmUrSeZRymRjY0ZwDHYdC42DPWzbTvtJHTMFVEDEkWncizs7QD006uvMdJUe">
    <NavigationContainer>
      {isSignedIn ? (
        <MainTabs onSignOut={handleSignOut} />
      ) : isRegistering ? (
        <RegisterPage
          onRegister={handleRegistrationComplete}
          onBack={handleRegistrationComplete}
        />
      ) : (
        <LoginPage onSignIn={handleSignIn} onRegister={handleRegisterNavigation} />
      )}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
    </StripeProvider>
  );
}

export default App;