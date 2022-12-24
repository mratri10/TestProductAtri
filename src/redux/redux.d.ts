
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

type WeatherData={
    name:string
    weather:Weather[];
    main?:MainWeather;
    wind?:WindWeather;
    visibility:number
}
type Weather={
    id:number
    main:string
    description:string
    icon:string
}
type MainWeather={
    temp:number;
    feels_like:number;
    temp_min:number;
    temp_max:number;
    pressure:number;
    humidity:number;
    sea_level:number;
    grnd_level:number;
    temp_kf:number;
}
type WindWeather={
    speed:double;
    deg:number;
    gust:double
}
type WeatherDataEntity = {
    loading:boolean;
    data?:WeatherData;
    error?:String;
};

type WeatherDetailEntity = {
    loading:boolean;
    data?:WeatherDetail;
    error?:String;
};

type Coord={
    lat: double;
    lon: double
}

type WeatherCity={
    id: number,
    name: string,
    coord: Coord,
    country: string,
    population: number,
    timezone: number,
    sunrise: number,
    sunset: number
}

type WeatherDetail={    
    list?:WeatherForecast[];
    city?:WeatherCity;
}
type WeatherDaily={
    dt: number;
    sunrise: number;
    sunset: number;
    moonrise: double;
    moonset: double;
    moon_phase: number;
    temp:WeatherTemp;
    feels_like:WeatherTemp;
    pressure: number;
    humidity: number;
    dew_point: double;
    uvi: double;
    clouds: number;
    visibility: number;
    wind_speed: double;
    wind_deg: number;
    wind_gust: double;
    weather:Weather;
    pop: double;
}
type WeatherTemp={
    day: double,
    min: double,
    max: double,
    night: double,
    eve: double,
    morn: double
}
type WeatherCurrent={
    dt: number;
    sunrise: number;
    sunset: number;
    temp: double;
    feels_like: double;
    pressure: number;
    humidity: number;
    dew_point: double;
    uvi: double;
    clouds: number;
    visibility: number;
    wind_speed: double;
    wind_deg: number;
    wind_gust: double;
    weather:Weather;
    pop: double;
}
type WeatherMinute={
    dt:number,
    precipitation:number
}

type WeatherForecast={
    dt:number;
    main:MainWeather;
    weather:Weather[];
    winds:WindWeather;
    visibility:number;
    pop:double;
    dt_txt:string;
}


type LocationDataEntity = {
    loading:boolean;
    location?:GeoPosition;
    error?:String;
};
