import { GETPRODECTLOADED, GETPRODECTLOADING } from "./redux_constant";

const initState: ProductEntity = {
  loading:false,
  product:[],
  error:''
};
  
  export default (
    state: ProductEntity = initState,
    action: ReduxAction,
  ): ProductEntity => {
    switch (action.type) {
      case GETPRODECTLOADING:
        return {
            ...state,
            loading:true
          };
      case GETPRODECTLOADED:
        return toEntity(action.payload as ProductViewParams);
      default:
        return state;
    }
  };

  const toEntity = (data:ProductViewParams):ProductEntity=>{
    if(data.status){
      return {
        loading:false,
        product:data.product,
        error:''
      }
    }else{
      return{
        loading:false,
        product:[],
        error:data.message
      }
    }
    
  }
  
