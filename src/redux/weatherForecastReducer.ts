import {  WATHER_FORECAST_FAIL, WATHER_FORECAST_LOADING, WATHER_FORECAST_SUCCESS } from "../constant/redux_constant";

const initState: WeatherDetailEntity = {
  loading:false,
  error:''
};
  
  export default (
    state: WeatherDetailEntity = initState,
    action: ReduxAction,
  ): WeatherDetailEntity => {
    const dataEntity = action.payload as WeatherDetailEntity

    switch (action.type) {
      case WATHER_FORECAST_LOADING:
        return {
            ...state,
            loading:true
          };
      case WATHER_FORECAST_SUCCESS:
        return {
          loading:false,
          data:dataEntity.data,
        }
      case WATHER_FORECAST_FAIL:
        return {
          loading:false,
          error:dataEntity.error
        }
      default:
        return state;
    }
  };
  
