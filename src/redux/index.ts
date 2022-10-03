import { combineReducers } from "redux";
import HomeReducer from "./homeReducer";
import ProductReducer from "./productReducer";

const rootReducer = combineReducers({
    homeReducer: HomeReducer,
    productReducer: ProductReducer
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export default rootReducer;