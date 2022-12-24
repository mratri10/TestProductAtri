import { combineReducers } from "redux";
import WeatherDataReducer from "./weatherDataReducer";
import WeatherForecastReducer from "./weatherForecastReducer";
import LocationReducer from "./locationReducer";

const rootReducer = combineReducers({
    weatherReducer:WeatherDataReducer,
    weatherForecastReducer:WeatherForecastReducer,
    locationReducer:LocationReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export default rootReducer;