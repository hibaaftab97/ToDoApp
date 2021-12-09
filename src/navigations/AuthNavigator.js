import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen';
const AuthStack = createStackNavigator();
const AuthNavigator = () => {
    return (
        <AuthStack.Navigator screenOptions={{headerShown: false}} >
            <AuthStack.Screen name="SigninScreen" component={SigninScreen} />
            <AuthStack.Screen name="SignupScreen" component={SignupScreen} />
        </AuthStack.Navigator>
    )
};

export default AuthNavigator;