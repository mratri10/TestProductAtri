import { WATHER_DATA_FAIL, WATHER_DATA_LOADING, WATHER_DATA_SUCCESS, WATHER_ONECALL_FAIL } from "../constant/redux_constant";

const initState: WeatherDataEntity = {
  loading:false,
  data:{
    name:'',
    weather:[],
    visibility:0
  },
  error:''
};
  
  export default (
    state: WeatherDataEntity = initState,
    action: ReduxAction,
  ): WeatherDataEntity => {
    const dataEntity = action.payload as WeatherDataEntity
    switch (action.type) {
      case WATHER_DATA_LOADING:
        return {
            ...state,
            loading:true
          };
      case WATHER_DATA_SUCCESS:
        return {
          loading:false,
          data:dataEntity.data,
        }
      case WATHER_DATA_FAIL:
        return {
          loading:false,
          error:dataEntity.error
        }
      default:
        return state;
    }
  };
  
