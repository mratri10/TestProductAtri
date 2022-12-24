import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GeoPosition} from 'react-native-geolocation-service';
import {useDispatch, useSelector} from 'react-redux';
import {getDataLocation, getDataWeather} from '../action';
import SearchWidget from './search/search_widget';
import {ApplicationState} from '../redux';
import WeekWeather from './WeekWeather';
import TextSuhu from '../widget/textSuhu';

function MyApp() {
  const dispatch: React.Dispatch<any> = useDispatch();
  const lokasiData: LocationDataEntity = useSelector(
    (state: ApplicationState) => state.locationReducer,
  );
  const dataLokasi = lokasiData.location as GeoPosition;
  useEffect(() => {
    showProducts();
  }, []);

  useEffect(() => {
    if (dataLokasi) {
      showLocations();
    }
  }, [dataLokasi]);

  const showLocations = async () => {
    await dispatch(
      getDataWeather(
        dataLokasi?.coords.latitude.toString(),
        dataLokasi?.coords.latitude.toString(),
      ),
    );
  };
  const showProducts = async () => {
    await dispatch(getDataLocation());
  };

  return (
    <View style={{flex: 1}} testID="MyAppID">
      <SearchWidget />
      <DashBoard />
    </View>
  );
}

const DashBoard = () => {
  const weatherData: WeatherDataEntity = useSelector(
    (state: ApplicationState) => state.weatherReducer,
  );

  const cuaca = weatherData.data?.weather[0];
  const main = weatherData.data?.main;
  const wind = weatherData.data?.wind;
  const visibility = weatherData.data ? weatherData.data.visibility / 1000 : 0;

  return (
    <View style={styleApp.app}>
      <View style={{alignItems: 'center', marginBottom: 20}}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={{
              uri: `http://openweathermap.org/img/wn/${cuaca?.icon}@2x.png`,
            }}
            style={{width: 40, height: 40}}
          />
          <View>
            <Text style={styleApp.txtDashTitle}>{cuaca?.main}</Text>
            <Text style={styleApp.txtDashDesc}>{cuaca?.description}</Text>
          </View>
        </View>
        <TextSuhu value={main?.temp} size={24} />
        <View style={{flexDirection: 'row'}}>
          <Text style={styleApp.txtDashDesc}>
            Feels like {konversiCelcius(main?.temp)}
          </Text>
          <Text style={{fontSize: 8}}>o</Text>
          <Text style={styleApp.txtDashDesc}>C</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={styleApp.dashItem}>
          <Text style={styleApp.txtDashDesc}>Wind</Text>
          <Text style={styleApp.txtDashItem}>{wind?.speed}m/s</Text>
        </View>
        <View style={styleApp.dashItem}>
          <Text style={styleApp.txtDashDesc}>Humidity</Text>
          <Text style={styleApp.txtDashItem}>{main?.humidity}%</Text>
        </View>
        <View style={styleApp.dashItem}>
          <Text style={styleApp.txtDashDesc}>Pressure</Text>
          <Text style={styleApp.txtDashItem}>{main?.pressure}hPa</Text>
        </View>
        <View style={styleApp.dashItem}>
          <Text style={styleApp.txtDashDesc}>Visibility</Text>
          <Text style={styleApp.txtDashItem}>{visibility}km</Text>
        </View>
      </View>
      <View style={{flex: 1}}>
        <WeekWeather />
      </View>
    </View>
  );
};

const konversiCelcius = (kelvin?: number) => {
  return Math.round(kelvin ? kelvin - 273.15 : 0);
};
const styleApp = StyleSheet.create({
  app: {
    backgroundColor: 'white',
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flex: 1,
  },
  txtDashTitle: {
    fontSize: 14,
  },
  txtDashDesc: {
    fontSize: 12,
    fontWeight: '300',
  },
  txtDashMain: {
    fontSize: 26,
  },
  txtDashItem: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  dashItem: {
    alignItems: 'center',
  },
});

export default MyApp;
