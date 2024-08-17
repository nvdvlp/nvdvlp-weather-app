import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private mainUrl = 'https://api.openweathermap.org/data/2.5/weather?q=New+York&appid=14f1488c19996272466d2776e8c52221&units=metric';
  private cityWeatherUrl = 'http://localhost:3001/api/save-city';

  constructor(private http: HttpClient) {}

  getWeather(): Observable<any> {
    return this.http.get<any>(this.mainUrl);
  }

  // cityWeather(cityData: any): Observable<any> {
  //   return this.http.post<any>(this.cityWeatherUrl, cityData);
  // }
}