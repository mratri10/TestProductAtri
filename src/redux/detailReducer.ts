import { GET_DETAIL_SUCCESS, GET_DETAIL_FAIL, GET_DETAIL_LOADING, GET_DETAIL_RESET } from "../constant";

const initState: ProductsDetailEntity = {
  loading:false,
  error:''
};
  
  export default (
    state: ProductsDetailEntity = initState,
    action: ReduxAction,
  ): ProductsDetailEntity => {
    const dataEntity = action.payload as ProductsDetailEntity
    switch (action.type) {
      case GET_DETAIL_LOADING:
        return {
            ...state,
            loading:true
          };
      case GET_DETAIL_SUCCESS:
        return {
          loading:false,
          data:dataEntity.data,
        }
      case GET_DETAIL_FAIL:
        return {
          loading:false,
          error:dataEntity.error
        }
      case GET_DETAIL_RESET:
        return {
          loading:false,
        }
      default:
        return state;
    }
  };
  
