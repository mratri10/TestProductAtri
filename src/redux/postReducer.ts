import { POST_SUCCESS, POST_FAIL, POST_LOADING } from "../constant";

const initState: ProductsPostEntity = {
  loading:false,
  error:'',
  isPost:false
};
  
  export default (
    state: ProductsPostEntity = initState,
    action: ReduxAction,
  ): ProductsPostEntity => {
    const dataEntity = action.payload as ProductsPostEntity
    switch (action.type) {
      case POST_LOADING:
        return {
            ...state,
            loading:true
          };
      case POST_SUCCESS:
        return {
          loading:false,
          isPost:true,
        }
      case POST_FAIL:
        return {
          loading:false,
          error:dataEntity.error,
          isPost:false
        }

      default:
        return state;
    }
  };
  
