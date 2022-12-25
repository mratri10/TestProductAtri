import { combineReducers } from "redux";
import ProductReducer from "./productReducer";
import DetailReducer from "./detailReducer";
import DeleteReducer from "./deleteReducer";
import PostReducer from "./postReducer";
import UpdateReducer from "./updateReducer";
const rootReducer = combineReducers({
    productReducer:ProductReducer,
    detailReducer:DetailReducer,
    deleteReducer:DeleteReducer,
    postReducer:PostReducer,
    updateReducer:UpdateReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export default rootReducer;