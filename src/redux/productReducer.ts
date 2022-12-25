import { GET_DETAIL_SUCCESS, GET_PRODUCT_FAIL, GET_PRODUCT_LOADING, GET_PRODUCT_RESET, GET_PRODUCT_SUCCESS } from "../constant";

const initState: ProductsListEntity = {
  loading:false,
  error:''
};
  
  export default (
    state: ProductsListEntity = initState,
    action: ReduxAction,
  ): ProductsListEntity => {
    const dataEntity = action.payload as ProductsListEntity
    switch (action.type) {
      case GET_PRODUCT_LOADING:
        return {
            ...state,
            loading:true
          };
      case GET_PRODUCT_SUCCESS:
        return {
          loading:false,
          data:dataEntity.data?.reverse(),
        }
      case GET_PRODUCT_FAIL:
        return {
          loading:false,
          error:dataEntity.error
        }
        case GET_PRODUCT_RESET:
        return {
          loading:false,
          data:[],
          error:''
        }
      default:
        return state;
    }
  };
  
