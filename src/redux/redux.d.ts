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

type Products = {
    name: String;
    description: String;
    price:number;
    quantity:number;
    id:String
}; 
type ProductEntity = {
    loading:boolean;
    product:Products[];
    error:String;
}; 
type ProductViewParams = {
    product:Products[];
    status:boolean;
    message:String
}; 