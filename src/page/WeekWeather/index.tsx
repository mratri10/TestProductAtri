import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {GeoPosition} from 'react-native-geolocation-service';
import {useDispatch, useSelector} from 'react-redux';
import {getDailyWeather, getForecastWeather} from '../../action';
import {ApplicationState} from '../../redux';
import TextSuhu from '../../widget/textSuhu';

function WeekWeather() {
  const dispatch: React.Dispatch<any> = useDispatch();

  const lokasiData: LocationDataEntity = useSelector(
    (state: ApplicationState) => state.locationReducer,
  );
  const forecastWeather: WeatherDetailEntity = useSelector(
    (state: ApplicationState) => state.weatherForecastReducer,
  );
  const dataLokasi = lokasiData.location as GeoPosition;

  useEffect(() => {
    if (dataLokasi) {
      showDetailWeather();
    }
  }, [dataLokasi]);

  const showDetailWeather = async () => {
    await dispatch(
      getForecastWeather(
        dataLokasi?.coords.latitude.toString(),
        dataLokasi?.coords.latitude.toString(),
      ),
    );
  };
  return (
    <View style={{marginLeft: 5, marginTop: 10}}>
      <FlatList
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        data={forecastWeather.data?.list}
        renderItem={({item, index}) => {
          return <ItemHours index={index} item={item} />;
        }}
      />
    </View>
  );
}

type TypeItemHours = {
  item: WeatherForecast;
  index: number;
};
const ItemHours = ({index, item}: TypeItemHours) => {
  const timestamp = new Date(item.dt);
  const hours = timestamp.getHours() + ':' + timestamp.getMinutes();
  const date = timestamp.getDate() + ':' + timestamp.getUTCFullYear();

  const cuaca = item.weather;
  return (
    <View
      style={{
        marginRight: 5,
        flex: 1,
        flexDirection: 'column',
        marginBottom: 5,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'grey',
        padding: 5,
      }}>
      <FlatList
        horizontal={true}
        data={cuaca}
        renderItem={({item, index}) => (
          <View style={styleW.weather}>
            <Image
              key={index}
              source={{
                uri: `http://openweathermap.org/img/wn/${item.icon}@2x.png`,
              }}
              style={{width: 40, height: 40}}
            />
            <View>
              <Text style={{fontSize: 12}}>{item.main}</Text>
              <Text style={{fontSize: 10, fontWeight: '400'}}>
                {item.description}
              </Text>
            </View>
          </View>
        )}
      />
      <View style={{flexDirection: 'row'}}>
        <View style={{marginRight: 10}}>
          <TextSuhu value={item.main.temp} size={18} />
          <Text>{hours}</Text>
        </View>
        <View style={{flex: 1}}>
          <MainWidget value={item.main.pressure} variable="P" satuan="hPa" />
          <MainWidget value={item.main.humidity} variable="H" satuan="%" />
          <MainWidget value={item.visibility / 1000} variable="V" satuan="km" />
        </View>
      </View>
    </View>
  );
};
type DataW = {
  value: number;
  variable: string;
  satuan?: string;
};
const MainWidget = ({value, variable, satuan}: DataW) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderLeftWidth: 1,
        paddingLeft: 10,
      }}>
      <Text style={{fontSize: 10, fontWeight: 'bold'}}>{variable} :</Text>
      <Text style={{textAlign: 'right', flex: 1, fontSize: 12}}>
        {value}
        {satuan}
      </Text>
    </View>
  );
};

const styleW = StyleSheet.create({
  headWeather: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  descWeather: {
    fontSize: 10,
    fontWeight: '400',
  },
  weather: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default WeekWeather;
