
type ReduxAction = {
    type: String;
    payload?: any;
};

type HomeData = {
    body: String;
    title: String;
    id: number;
}

type DispatchType = (args: ReduxAction) => ReduxAction;

type ReduxState = {
    payload: any;
  };
type ProductsListEntity = {
    loading:boolean,
    error?:string,
    data?:Products[]
}; 

type ProductsDetailEntity = {
    loading:boolean,
    error?:string,
    data?:Products
}; 

type ProductsDeleteEntity = {
    loading:boolean,
    error?:string,
    isDelete?:boolean
}; 
type ProductsUpdateEntity = {
    loading:boolean,
    error?:string,
    isUpdate?:boolean
}; 
type ProductsPostEntity = {
    loading:boolean,
    error?:string,
    isPost?:boolean
}; 

type Products = {
    name: string;
    qty: string;
    picture:string;
    expiredAt:string;
    isActive:boolean;
    id:string
}; 
