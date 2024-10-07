import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, PermissionsAndroid, Platform } from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/EvilIcons';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';



export default function MedAdd() {
    const [currentLatitude, setCurrentLatitude] = useState('');
    const [currentLongetude, setCurrentLongetude] = useState('');
    const [location, setLocation] = useState(null);
    const [pharmacies, setPharmacies] = useState([]);

    const navigation = useNavigation();

    useEffect(() => {
        const requestLocationPermission = async () => {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Permissão de Localização',
                        message: 'Este app precisa acessar sua localização.',
                        buttonPositive: 'OK',
                        buttonNegative: 'Não'
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    getLocation();
                } else {
                    alert('Permissao Negada')
                }
            } else {
                getLocation();
            }
        };

        requestLocationPermission();
    }, []);

   
    const getLocation = () => {
        Geolocation.getCurrentPosition(
          (position) => {
            const currentLatitude = JSON.stringify(position.coords.latitude);
            const currentLongetude = JSON.stringify(position.coords.longitude);
            setCurrentLatitude(currentLatitude);
            setCurrentLongetude(currentLongetude);
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            fetchNearbyPharmacies(latitude, longitude);
          },
          (error) => {
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      };
    
      const fetchNearbyPharmacies = async (latitude, longitude) => {
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/search?format=json&q=pharmacy&limit=10&lat=${latitude}&lon=${longitude}&radius=1000`
          );
          setPharmacies(response.data);
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Animatable.View animation="fadeInUpBig" style={styles.containerForm}>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                            <Icon name="close" size={40} style={styles.icon} />
                        </TouchableOpacity>
                        <Text style={styles.message}>Localização</Text>
                    </View>

                    {location ? (
                        <MapView
                            style={styles.map}
                            provider={PROVIDER_GOOGLE}
                            initialRegion={{
                                latitude: location.latitude,
                                longitude: location.longitude,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01,
                            }}
                        >
                            {/* Marcador para a localização atual */}
                            <Marker
                                coordinate={{
                                    latitude: location.latitude,
                                    longitude: location.longitude,
                                }}
                                title="Você está aqui"
                                pinColor="blue"
                            />

                            {/* Marcadores para farmácias próximas */}
                            {pharmacies.map((pharmacy, index) => (
                                <Marker
                                    key={index}
                                    coordinate={{
                                        latitude: parseFloat(pharmacy.lat),
                                        longitude: parseFloat(pharmacy.lon),
                                    }}
                                    title={pharmacy.display_name}
                                    pinColor="green"
                                />
                            ))}
                        </MapView>
                    ) : (
                        <Text>Obtendo localização...</Text>
                    )}


                </Animatable.View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#613CF0",
    },
    scrollView: {
        flexGrow: 1,
    },
    icon: {
        marginTop: 15,
        marginBottom: 15,
        position: "absolute",
    },
    icon2: {
        marginTop: 15,
        marginBottom: 15,
        position: "absolute",
        color: "#613CF0",
    },
    message: {
        marginTop: 15,
        marginBottom: 15,
        fontSize: 28,
        fontWeight: "bold",
        margin: "auto",
    },
    containerForm: {
        flex: 1,
        padding: '5%',
        backgroundColor: "white",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    timeText: {
        borderBottomWidth: 1,
        padding: 10,
        backgroundColor: "#e0e0e0",
        borderRadius: 5,
        marginHorizontal: "auto",
        marginBottom: 10,
        width: '100%',
        fontSize: 18,
        color: "#333",
    },
    timeButton: {
        backgroundColor: "#613CF0",
        fontSize: 20,
        fontWeight: 'bold',
        color: "white",
        textAlign: 'center',
        borderBottomWidth: 1,
        borderRadius: 5,
        width: '90%',
        padding: 10,
        marginBottom: 40,
        margin: 'auto',
    },
    timeNumber: {
        margin: "auto",
        fontSize: 50,
        color: "#333",
    },
    button: {
        position: 'absolute',
        right: 45,
        top: -7,
    },
    submitButton: {
        backgroundColor: "#613CF0",
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        padding: 15,
        textAlign: "center",
        borderRadius: 5,
        marginTop: 20,
    },
    errorText: {
        color: "red",
        marginBottom: 10,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
