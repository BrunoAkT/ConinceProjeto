import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, PermissionsAndroid, Platform, Button } from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/EvilIcons';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';



export default function MedAdd() {
    const [currentLatitude, setCurrentLatitude] = useState('');
    const [currentLongetude, setCurrentLongetude] = useState('');
    const [watchID, setWatchID] = useState(0);

    const callLocation = () => {
        if(Platform.OS === 'ios'){
            getLocation();
        } else {
            const requestLocationPermission = async () => {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: "Permissão de Acesso",
                        message: "Este aplicativo precisa da permissão de sua localização",
                        buttonPositive: "Ok",
                        buttonNeutral: "Pergunte-me Depois",
                        buttonNegative: "Não Permitir"
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED){
                    getLocation();
                } else {
                    alert('Permissao de Localização Negada');
                }            
            };
            requestLocationPermission();    
        }
    }
    const getLocation = () => {
        Geolocation.getCurrentPosition(
            (position) =>{
                const currentLatitude =JSON.stringify(position.coords.latitude);
                const currentLongetude = JSON.stringify(position.coords.longitude);
                setCurrentLatitude(currentLatitude);
                setCurrentLongetude(currentLongetude);
            }, 
            (error) => alert(error.message),
            { enableHighAccuracy: true,  timeout:20000, maximumAge:1000}
        );
        const watchID = Geolocation.watchPosition((postion) => {
            const currentLatitude =JSON.stringify(position.coords.latitude);
            const currentLongetude = JSON.stringify(position.coords.longitude);
            setCurrentLatitude(currentLatitude);
            setCurrentLongetude(currentLongetude); 
        });
        setWatchID(watchID);
    }
    const clearLocation = () =>{
        Geolocation.clearWatch(watchID);
    }


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
                    <View>
                        <Text>
                            Voce está aqui
                        </Text>
                        
                        <Text>
                            Latitude: {currentLatitude}
                        </Text>
                        
                        <Text>
                            longitude: {currentLongetude}
                        </Text>
                        <View>
                            <Button title="Obter Localização" onPress ={callLocation}/>
                        </View>
                        
                        <View>
                            <Button title="Obter Cancelar Localização" onPress ={clearLocation}/>
                        </View>
                    </View>
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
    }
});
