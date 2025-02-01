export interface WeatherResponse {
    current: Current;    
}

export interface Current {
    temp_c: string;
    condition: Condition;
}

export interface Condition {
    icon: string;
}