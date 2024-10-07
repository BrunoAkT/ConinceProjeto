import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from '@react-navigation/native';
import { Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Cadastro() {
    const navigation = useNavigation();

    // Estado para alternar a visibilidade da senha
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Esquema de validação com Yup
    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .email("Digite um e-mail válido")
            .required("O e-mail é obrigatório"),
        password: yup
            .string()
            .min(3, "A senha deve ter no mínimo 3 caracteres")
            .matches(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
            .matches(/[!@#$%^&*(),.?":{}|<>]/, "A senha deve conter pelo menos um caractere especial")
            .required("A senha é obrigatória"),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'As senhas não correspondem')
            .required("Confirmação de senha é obrigatória")
    });

    return (
        <View style={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={500} syle={styles.containerHeader}>
                <Text style={styles.message}>Cadastre-se</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                <Formik
                    initialValues={{ email: '', password: '', confirmPassword: '' }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        // Lógica de submissão do formulário
                        navigation.navigate('UsuarioSecundario');
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, validateForm }) => (
                        <>
                            <Text style={styles.title}>E-mail:</Text>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    placeholder="Digite um E-mail..."
                                    style={styles.input}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                />
                            </View>
                            <Text style={styles.errorText}>
                                <ErrorMessage name="email" />
                            </Text>

                            <Text style={styles.title}>Senha:</Text>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    placeholder="Sua Senha"
                                    style={styles.input}
                                    secureTextEntry={!showPassword}
                                    onChangeText={handleChange('password')}
                                    onBlur={(e) => {
                                        handleBlur('password')(e);
                                        validateForm();  // Forçar revalidação após blur
                                    }}
                                    value={values.password}
                                />
                                <TouchableOpacity
                                    onPress={() => setShowPassword(!showPassword)}
                                    style={styles.eyeIcon}
                                >
                                    <Icon name={showPassword ? "eye-off" : "eye"} size={24} color="grey" />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.errorText}>
                                <ErrorMessage name="password" />
                            </Text>

                            <Text style={styles.title}>Confirme sua senha:</Text>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    placeholder="Confirmação"
                                    style={styles.input}
                                    secureTextEntry={!showConfirmPassword}
                                    onChangeText={handleChange('confirmPassword')}
                                    onBlur={(e) => {
                                        handleBlur('confirmPassword')(e);
                                        validateForm();  // Forçar revalidação após blur
                                    }}
                                    value={values.confirmPassword}
                                />
                                <TouchableOpacity
                                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                    style={styles.eyeIcon}
                                >
                                    <Icon name={showConfirmPassword ? "eye-off" : "eye"} size={24} color="grey" />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.errorText}>
                                <ErrorMessage name="confirmPassword" />
                            </Text>
                            <View style={styles.button}>
                                <TouchableOpacity onPress={() => navigation.navigate('Entrar')}>
                                    <Text style={styles.buttontext}>Anterior</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity onPress={handleSubmit}>
                                    <Text style={styles.buttontext}>Próximo</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </Formik>
            </Animatable.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#613CF0",
    },
    containerHeader: {
        flex: 2,
    },
    message: {
        marginTop: 100,
        marginBottom: 100,
        paddingStart: "5%",
        fontSize: 28,
        fontWeight: "bold",
        color: "#fff",
    },
    containerForm: {
        flex: 1,
        backgroundColor: "white",
        paddingStart: 20,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    title: {
        fontSize: 20,
        marginTop: 28,
    },
    input: {
        flex: 1,
        borderBottomWidth: 1,
        height: 40,
        fontSize: 16,
        marginRight: '5%',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    eyeIcon: {
        marginHorizontal: 15,
    },
    button: {
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 15,
    },
    buttontext: {
        fontSize: 20,
        color: "#fff",
        backgroundColor: "#613CF0",
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 4,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
    }
});
