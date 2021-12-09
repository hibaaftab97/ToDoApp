import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigations from './MainNavigator';
const Navigations = () => {
  return (
    <NavigationContainer>
      <MainNavigations />
    </NavigationContainer>
  )
};

export default Navigations;