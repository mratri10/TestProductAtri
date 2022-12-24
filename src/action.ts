import { PermissionsAndroid } from "react-native";
import Geolocation from "react-native-geolocation-service";
import { fetch, GET } from "./apis";
import { APPID_WEATHER } from "./constant";
import { LOCATION_DATA_FAIL, LOCATION_DATA_LOADING, LOCATION_DATA_SUCCESS, WATHER_DAILY_FAIL, WATHER_DAILY_LOADING, WATHER_DAILY_SUCCESS, WATHER_DATA_FAIL, WATHER_DATA_LOADING, WATHER_DATA_SUCCESS, WATHER_FORECAST_FAIL, WATHER_FORECAST_LOADING, WATHER_FORECAST_SUCCESS } from "./constant/redux_constant";


  export const getDataWeather = (latitude:string, longitude:string) => {
    return async (dispatch: DispatchType, getState: any) => {
      dispatch({type: WATHER_DATA_LOADING});
      await fetch(GET, 'data/2.5/weather',{appid:APPID_WEATHER, lat:latitude, lon:longitude})
        ?.then(item => {
          dispatch({type: WATHER_DATA_SUCCESS, payload: {
            data:item as WeatherData,
            loading:false,
          } as WeatherDataEntity});
        })
        .catch(e => {
            dispatch({type: WATHER_DATA_FAIL, payload: {
                loading:false,
                error:'Gagal Peroleh Data Cuaca',
              } as WeatherDataEntity});
        });
    };
  };

  export const getForecastWeather = (latitude:string, longitude:string)=>{
    return async (dispatch: DispatchType, getState: any) => {
      dispatch({type: WATHER_FORECAST_LOADING});
      await fetch(GET, 'data/2.5/forecast',{appid:APPID_WEATHER, lat:latitude, lon:longitude,})
        ?.then(item => {
          dispatch({type: WATHER_FORECAST_SUCCESS, payload: {
            loading:false,
            data:item          
          } as WeatherDetailEntity});
        })
        .catch(e => {
            dispatch({type: WATHER_FORECAST_FAIL, payload: {
                loading:false,
                error:'Gagal Peroleh Data Cuaca',
              } as WeatherDetailEntity});
        });
    };
  }

  export const getDailyWeather = (latitude:string, longitude:string)=>{
    return async (dispatch: DispatchType, getState: any) => {
      dispatch({type: WATHER_DAILY_LOADING});
      await fetch(GET, 'data/2.5/forecast',{appid:APPID_WEATHER, lat:latitude, lon:longitude, exclude:'minutely'})
        ?.then(item => {
          dispatch({type: WATHER_DAILY_SUCCESS, payload: {
            data:item,
            loading:false,
          } as WeatherDetailEntity});
        })
        .catch(e => {
            dispatch({type: WATHER_DAILY_FAIL, payload: {
                loading:false,
                error:'Gagal Peroleh Data Cuaca',
              } as WeatherDetailEntity});
        });
    };
  }

  export const getDataLocation = () => {
    return async (dispatch: DispatchType, getState: any) => {
      dispatch({type: LOCATION_DATA_LOADING});

      const requestLocationPermission = async()=>{
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
              title:'Meminta Izin Lokasi',
              message:'Bolehkah Kami Akses Lokasi Kamu',
              buttonNeutral:"Tanya Saya Nanti",
              buttonPositive:'Ya',
              buttonNegative:'Tidak'
            }
          )
          if(granted === 'granted'){
            return true
          }else{
            return false
          }
        } catch (error) {
          return fail
        }
      }
        const result = requestLocationPermission();
    
        result.then(async res=>{
    
          if(res){
            Geolocation.getCurrentPosition(
              position =>{
                dispatch({type:LOCATION_DATA_SUCCESS, payload:{
                  loading:false,
                  location:position,
                }as LocationDataEntity})
              },error =>{
                dispatch({type: LOCATION_DATA_FAIL, payload: {
                  loading:false,
                  error:'Gagal Peroleh Lokasi Pengguna',
                } as LocationDataEntity}); 
              },
              {enableHighAccuracy:true, timeout:1500, maximumAge:10000}
            )
          }
        });
      }
    
  };
  