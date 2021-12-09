import React from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import ScreenNavigator from './ScreensNavigator';

const MainStack = createStackNavigator();
const MainNavigations = () => {
  const auth = useSelector((state) => state.auth);
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }} >
      { auth.isSignedIn ? 
        <MainStack.Screen name="ScreenNavigator" component={ScreenNavigator} /> :
        <MainStack.Screen name="AuthNavigator" component={AuthNavigator} />
      }
    </MainStack.Navigator>
  )
};

export default MainNavigations;