import { DELETE_SUCCESS, DELETE_FAIL, DELETE_LOADING, DELETE_RESET } from "../constant";

const initState: ProductsDeleteEntity = {
  loading:false,
  error:'',
  isDelete:false
};
  
  export default (
    state: ProductsDeleteEntity = initState,
    action: ReduxAction,
  ): ProductsDeleteEntity => {
    const dataEntity = action.payload as ProductsDeleteEntity
    switch (action.type) {
      case DELETE_LOADING:
        return {
            ...state,
            loading:true
          };
      case DELETE_SUCCESS:
        return {
          loading:false,
          isDelete:true,
        }
      case DELETE_FAIL:
        return {
          loading:false,
          error:dataEntity.error,
          isDelete:false
        }
      case DELETE_RESET:
        return {
          loading:false,
          error:"",
          isDelete:false
        }
      default:
        return state;
    }
  };
  
