import React from 'react';
import {Text, View} from 'react-native';

function TextSuhu({value = 0, size = 12}: SuhuType) {
  return (
    <View style={{flexDirection: 'row'}}>
      <Text style={{fontSize: size}}>{konversiCelcius(value)}</Text>
      <Text style={{fontSize: size - 8}}>o</Text>
      <Text style={{fontSize: size}}>C</Text>
    </View>
  );
}

const konversiCelcius = (kelvin?: number) => {
  return Math.round(kelvin ? kelvin - 273.15 : 0);
};

export default TextSuhu;
