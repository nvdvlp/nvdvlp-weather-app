import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeather(cityName: string): Observable<any> {
    const mainUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=14f1488c19996272466d2776e8c52221&units=metric`;
    return this.http.get<any>(mainUrl);
  }

  getForecastWeather(cityName: string): Observable<any>{
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=14f1488c19996272466d2776e8c52221&units=metric`;
    return this.http.get<any>(forecastUrl);
  }
}