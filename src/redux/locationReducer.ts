import { LOCATION_DATA_FAIL, LOCATION_DATA_LOADING, LOCATION_DATA_SUCCESS, WATHER_DATA_FAIL, WATHER_DATA_LOADING, WATHER_DATA_SUCCESS, WATHER_ONECALL_FAIL } from "../constant/redux_constant";

const initState: LocationDataEntity = {
  loading:false,
  error:''
};
  
  export default (
    state: LocationDataEntity = initState,
    action: ReduxAction,
  ): LocationDataEntity => {
    const dataEntity = action.payload as LocationDataEntity
    switch (action.type) {
      case LOCATION_DATA_LOADING:
        return {
            ...state,
            loading:true
          };
      case LOCATION_DATA_SUCCESS:
        return {
          loading:false,
          location:dataEntity.location
        }
      case LOCATION_DATA_FAIL:
        return {
          loading:false,
          error:dataEntity.error
        }
      default:
        return state;
    }
  };
  
