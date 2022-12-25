
import { DELETE, fetch, GET, POST, PUT, UPDATE } from "./apis";
import { DELETE_FAIL, DELETE_LOADING, DELETE_RESET, DELETE_SUCCESS, GET_DETAIL_FAIL, GET_DETAIL_LOADING, GET_DETAIL_RESET, GET_DETAIL_SUCCESS, GET_PRODUCT_FAIL, GET_PRODUCT_LOADING, GET_PRODUCT_RESET, GET_PRODUCT_SUCCESS, POST_FAIL, POST_LOADING, POST_SUCCESS, UPDATE_FAIL, UPDATE_LOADING, UPDATE_SUCCESS } from "./constant";

  export const getListProduct = ()=>{
    return async (dispatch: DispatchType, getState: any) => {
      dispatch({type: GET_PRODUCT_LOADING});
      await fetch(GET, 'product',{})
        ?.then(item => {
          dispatch({type: GET_PRODUCT_SUCCESS, payload: {
            loading:false,
            data:item          
          } as ProductsListEntity});
        })
        .catch(e => {
            dispatch({type: GET_PRODUCT_FAIL, payload: {
                loading:false,
                error:'Gagal Peroleh Data Cuaca',
              } as ProductsListEntity});
        });
    };
  }
  export const getResetProduct = ()=>{
    return async (dispatch: DispatchType, getState: any) => {
      dispatch({type: GET_PRODUCT_RESET});
    };
  }

  export const getDetailProduct = (id:string)=>{
    return async (dispatch: DispatchType, getState: any) => {
      dispatch({type: GET_DETAIL_LOADING});
      await fetch(GET, 'product/'+id,{})
        ?.then(item => {
          dispatch({type: GET_DETAIL_SUCCESS, payload: {
            loading:false,
            data:item          
          } as ProductsDetailEntity});
        })
        .catch(e => {
            dispatch({type: GET_DETAIL_FAIL, payload: {
                loading:false,
                error:'Gagal Peroleh Data Cuaca',
              } as ProductsDetailEntity});
        });
    };
  }

  export const resetDetailProduct = ()=>{
    return async (dispatch: DispatchType, getState: any) => {
      dispatch({type: GET_DETAIL_RESET});
      dispatch({type: DELETE_RESET});
    };
  }

  export const deleteProduct = (id:string)=>{
    return async (dispatch: DispatchType, getState: any) => {
      dispatch({type: DELETE_LOADING});
      await fetch(DELETE, 'product/'+id,{})
        ?.then(item => {
          dispatch({type: DELETE_SUCCESS, payload: {
            loading:false,      
            isDelete:true
          } as ProductsDeleteEntity});
        })
        .catch(e => {
            dispatch({type: DELETE_FAIL, payload: {
                loading:false,
                error:'Gagal Peroleh Data Cuaca',
              } as ProductsDeleteEntity});
        });
    };
  }

  export const updateProduct = (id:string, data:TypeProductItem)=>{
    return async (dispatch: DispatchType, getState: any) => {
      dispatch({type: UPDATE_LOADING});
      await fetch(PUT, 'product/'+id,data)
        ?.then(item => {
          dispatch({type: UPDATE_SUCCESS, payload: {
            loading:false,      
            isUpdate:true
          } as ProductsUpdateEntity});
        })
        .catch(e => {
            dispatch({type: UPDATE_FAIL, payload: {
                loading:false,
                error:'Gagal Peroleh Data Cuaca',
              } as ProductsUpdateEntity});
        });
    };
  }

  export const postProduct = (data:TypeProductItem)=>{
    return async (dispatch: DispatchType, getState: any) => {
      dispatch({type: POST_LOADING});
      await fetch(POST, 'product',data)
        ?.then(item => {
          dispatch({type: POST_SUCCESS, payload: {
            loading:false,      
            isUPDATE:true
          } as ProductsPostEntity});
        })
        .catch(e => {
            dispatch({type: POST_FAIL, payload: {
                loading:false,
                error:'Gagal Peroleh Data Cuaca',
              } as ProductsPostEntity});
        });
    };
  }
