import { UPDATE_SUCCESS, UPDATE_FAIL, UPDATE_LOADING } from "../constant";

const initState: ProductsUpdateEntity = {
  loading:false,
  error:'',
  isUpdate:false
};
  
  export default (
    state: ProductsUpdateEntity = initState,
    action: ReduxAction,
  ): ProductsUpdateEntity => {
    const dataEntity = action.payload as ProductsUpdateEntity
    switch (action.type) {
      case UPDATE_LOADING:
        return {
            ...state,
            loading:true
          };
      case UPDATE_SUCCESS:
        return {
          loading:false,
          isUpdate:true,
        }
      case UPDATE_FAIL:
        return {
          loading:false,
          error:dataEntity.error,
          isUpdate:false
        }
      default:
        return state;
    }
  };
  
