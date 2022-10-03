import { fetch, GET } from "./apis";
import { GETPRODECTLOADED, GETPRODECTLOADING } from "./redux/redux_constant";

export const getProducts = () => {
    return async (dispatch: DispatchType, getState: any) => {
      dispatch({type: GETPRODECTLOADING});
      await fetch(GET, 'products',{token:""})
        ?.then(item => {
            
          dispatch({type: GETPRODECTLOADED, payload: {
            product:item,
            status:true,
            message:'',
          } as ProductViewParams});
        })
        .catch(e => {
            dispatch({type: GETPRODECTLOADED, payload: {
                product:[],
                status:false,
                message:e,
              } as ProductViewParams});
        });
    };
  };
  