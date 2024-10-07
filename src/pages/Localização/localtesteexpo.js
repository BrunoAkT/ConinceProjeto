import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, PermissionsAndroid, Platform, Button } from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/EvilIcons';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import axios from 'axios';
import * as Location from 'expo-location';


export default function MedAdd() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(()=>{
        (async () =>{
            let {status} = await Location.requestForegroundPermissionsAsync();
            if(status !== 'granted'){
                setErrorMsg('A permissão de acesso foi negada')
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();

    },[]);
    console.log(location)

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
                        </Text>
                        
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
