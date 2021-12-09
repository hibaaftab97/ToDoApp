import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const Input = (props) => {

  const { label, value, onChangeText, placeholder} = props
  return (
    <View>
      <Text style={styles.labelStyle}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          {...props}
          style={styles.inputStyle}
          value={value}
          placeholderTextColor='#CCCCCC'
          onChangeText={onChangeText}
          autoCapitalize='none'
          autoCorrect={false}
          placeholder={placeholder}
        />
      </View>
    </View>
  )
};
const styles = StyleSheet.create({
  inputStyle: {
    width: 330,
    color:'#000000',
    fontFamily: 'Poppins-Bold'
  },
  labelStyle: {
    color: '#423562',
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    paddingLeft: 20
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#d6bfed',
    borderBottomWidth: 1,
    width: 330,
    marginLeft: 20,
    marginBottom: 40,
    justifyContent: 'space-around'
  }
});

export default Input;