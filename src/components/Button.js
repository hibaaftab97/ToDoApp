import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { vw } from '../utils/units';

const Button = (props) => {
  
  return (
    <TouchableOpacity {...props} style={[styles.buttonStyle, props?.style]}>
        <Text style={styles.textStyle}>{props?.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textStyle:{
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold'
  },
  buttonStyle:{
    backgroundColor: '#9b6dfd',
    borderRadius: 8,
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    width: 80*vw
  }
});

export default Button;