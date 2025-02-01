import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { WeatherResponse } from "./domain/weatherResponse";

@Injectable({
    providedIn: 'root'
})

export class WeatherService {
    constructor(private http: HttpClient) { }

    getWeather(city: string): Observable<WeatherResponse> {
        var t = `http://api.weatherapi.com/v1/current.json?key=b51f29262ffa47af98d74625252901&q=${city}&aqi=no`
        return this.http.post<WeatherResponse>(t, null).pipe(
            map((result) => {
                return result;
            }),
            catchError((err: HttpErrorResponse) => {
                return throwError(() => new Error(err.message))
            })
        );
    }
}