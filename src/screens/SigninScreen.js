import React, { useState, useEffect } from 'react';
import { ToastAndroid } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { useDispatch, useSelector} from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ImageBackground } from 'react-native';
import { signin } from '../redux/actions';
import { vh, vw } from '../utils/units';
import Button from '../components/Button';
import Input from '../components/Input';

const SigninScreen = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const login = () => {
        if(email === '' || password === ''){
            return ToastAndroid.show("Please fill all the fields", ToastAndroid.SHORT);
        } else {
            const loginCredentials= {
                email, password
            }
            dispatch(signin(loginCredentials)).then((res) => {
                //props.navigation.navigate('ScreenNavigator');
            }).catch((error) => {
            });
        }
    }
    useEffect(() => {
        SplashScreen.hide();
    }, []);
    return (
        <View>
            <StatusBar
                barStyle='dark-content'
                backgroundColor={'white'}
            />
            <ImageBackground source={require('../assets/images/glitter.jpg')} style={styles.backgroundImage}>
                <Text style={styles.headingTextStyle}>Sign In</Text>
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
                <Button text="Sign in" onPress={login}/>
                <TouchableOpacity onPress={() => { props.navigation.navigate('SignupScreen') }}>
                    <Text style={styles.link}>Don't have an Account? Sign up instead</Text>
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

export default SigninScreen;