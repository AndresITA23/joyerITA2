import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { query, collection, where, doc, getDocs, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/firebase.js";
import { useStripe } from "@stripe/stripe-react-native";


export default function Checkout() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const stripe = useStripe();
    const navigation = useNavigation();

    useEffect(() => {
        const fetchCartItems = () => {
            const userId = getAuth().currentUser?.uid;
            if (!userId) {
                Alert.alert('Debes estar autenticado para ver el carrito.');
                return;
            }

            const q = query(collection(db, "carritos"), where("userId", "==", userId));
            const unsubscribe = onSnapshot(q, async (querySnapshot) => {
                if (!querySnapshot.empty) {
                    const carritoDoc = querySnapshot.docs[0];
                    const products = carritoDoc.data().products;

                    const productDetails = await Promise.all(
                        products.map(async (product) => {
                            const productRef = doc(db, "personalizedProducts", product.productId);
                            const productSnap = await getDoc(productRef);

                            const productData = productSnap.data();
                            const imageName = productData?.imageName;
                            const price = productData?.price;
                            return {
                                ...productData,
                                quantity: product.quantity,
                                productId: product.productId,
                                imageName,
                                price,
                            };
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

    const clearCart = async () => {
        const userId = getAuth().currentUser?.uid;
        if (!userId) {
            Alert.alert('Error', 'Debes estar autenticado para limpiar el carrito.');
            return;
        }
    
        try {
            const q = query(collection(db, "carritos"), where("userId", "==", userId));
            const querySnapshot = await getDocs(q);
    
            if (!querySnapshot.empty) {
                const carritoDoc = querySnapshot.docs[0];
                const carritoRef = doc(db, "carritos", carritoDoc.id);
    
                // Actualizamos el carrito en Firebase para dejarlo vacío
                await updateDoc(carritoRef, { products: [] });
    
                // Limpiamos el estado local
                setCartItems([]);
            }
        } catch (err) {
            console.error('Error al limpiar el carrito:', err);
            Alert.alert('Error', 'No se pudo limpiar el carrito.');
        }
    };
    
    const pago = async () => {
        Alert.alert('Compra exitosa', 'Felicidades, tu compra se realizó con éxito.', [{ text: 'OK' }]);
        await clearCart(); // Limpia el carrito después de la compra exitosa
    };
    

    const handlePayment = async () => {
        const totalPrice = calculateTotalPrice(); // Calculamos el precio total de los productos
        
        if (!stripe) {
            Alert.alert("Error", "Stripe no está correctamente configurado.");
            return;
        }
    
        try {
            // Llamar a la Firebase Function para crear la sesión de pago
            const response = await fetch("https://us-central1-joyerita-5319e.cloudfunctions.net/createCheckoutSession", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: cartItems.map(item => ({
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                    })),
                }),
            });

            const { id: sessionId } = await response.json(); // Recibimos el sessionId de la respuesta
            console.log(1)  
            // Usamos Stripe Checkout con el sessionId
            const { error } = await stripe.redirectToCheckout({
                sessionId: sessionId,
            });
    
            if (error) {
                Alert.alert("Error", error.message);
            }
        } catch (err) {
            console.error(err);
            Alert.alert("Error", "Ocurrió un problema al procesar el pago.");
        }
    };
    
    const renderItem = ({ item }) => (
        <View style={styles.productContainer}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text>${item.price}</Text>
        </View>
    );

    

    return (
        <View style={styles.container}>
            {loading ? (
                <Text>Cargando...</Text>
            ) : (
                <FlatList
                    data={cartItems}
                    keyExtractor={(item) => item.productId.toString()}
                    renderItem={renderItem}
                />
            )}
            {cartItems.length > 0 && (
                <View style={styles.footer}>
                    <Text style={styles.totalPrice}>Total: ${calculateTotalPrice()}</Text>
                    <TouchableOpacity style={styles.paymentButton} onPress={pago}>
                        <Text style={styles.paymentButtonText}>Pagar ahora</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF8DC",
        paddingHorizontal: 20,
    },
    footer: {
        marginTop: 10,
        alignItems: "center",
        marginBottom: 20,
    },
    totalPrice: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    paymentButton: {
        backgroundColor: "#DD6B17",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    paymentButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    productContainer: {
        marginTop: 70,
        flexDirection: "row",
        marginBottom: 20,
        padding: 10,
        backgroundColor: "#FFF",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        alignItems: "center",
    },
    productName: {
        fontSize: 18,
        fontWeight: "bold",
        flex: 1,
    },
});
