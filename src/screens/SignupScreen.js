import React, { useState } from 'react';
import { ToastAndroid } from 'react-native';
import { useDispatch } from 'react-redux';
import { signup } from '../redux/actions';
import { View, Text, StyleSheet, ImageBackground, StatusBar, TouchableOpacity } from 'react-native';
import { vh, vw } from '../utils/units';
import Button from '../components/Button';
import Input from '../components/Input';

const SignupScreen = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const register = () => {
        if(email === '' || password === ''){
            return ToastAndroid.show("Please fill all the fields", ToastAndroid.SHORT);
        } else {
            const registrationData = {
                email, password
            }
            dispatch(signup(registrationData)).then((res) => {
                props.navigation.navigate('ScreenNavigator');
            }).catch((error) => {
            });
        }
    }
    return (
        <View>
            <StatusBar
                barStyle='dark-content'
                backgroundColor={'white'}
            />
            <ImageBackground source={require('../assets/images/glitter.jpg')} style={styles.backgroundImage}>
                <Text style={styles.headingTextStyle}>Sign Up</Text>
            </ImageBackground>
            <View style={styles.taskContainerStyle}>
                <Input
                    label="Enter Email:"
                    placeholder="Enter your email address"
                    value={email}
                    onChangeText={setEmail}
                    autoCorrect={false}
                    autoCapitalize="none"
                />
                <Input
                    secureTextEntry
                    label="Enter Password:"
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    autoCorrect={false}
                    autoCapitalize="none"
                />
                <Button text="Sign up" onPress={register}/>
                <TouchableOpacity onPress={() => { props.navigation.navigate('SigninScreen') }}>
                    <Text style={styles.link}>Already have an Account? Sign in instead</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    backgroundImage: {
        width: 100 * vw,
        height: 40 * vh
    },
    headingTextStyle: {
        fontSize: 40,
        color: 'white',
        paddingLeft: 40,
        paddingTop: 80,
        fontFamily: 'Poppins-Bold'
    },
    taskContainerStyle: {
        backgroundColor: '#fdf5fc',
        height: 63 * vh,
        width: 100 * vw,
        bottom: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 70,
        alignItems: 'center'
    },
    link: {
        color: 'blue',
        paddingTop: 10
    }
});

export default SignupScreen;