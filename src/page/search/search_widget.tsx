import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {ApplicationState} from '../../redux';
import IconApp from '../../widget/iconWidget';

function SearchWidget() {
  const weatherData: WeatherDataEntity = useSelector(
    (state: ApplicationState) => state.weatherReducer,
  );

  return (
    <View style={styleSearch.header}>
      <IconApp name="search" size={18} />
      <Text style={styleSearch.txtTitle}>{weatherData.data?.name}</Text>
    </View>
  );
}

const styleSearch = StyleSheet.create({
  header: {
    flexDirection: 'row',
    margin: 20,
    alignItems: 'center',
  },
  txtTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
  },
});

export default SearchWidget;
