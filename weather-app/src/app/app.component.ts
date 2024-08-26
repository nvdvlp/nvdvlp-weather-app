import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from './weather-service.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, HttpClientModule],
  providers: [WeatherService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  //api data array
  weatherData: any;

  idWeather: number = 0;
  cityName: string = 'Bogota';
  countryName: string ='';
  date: Date = new Date();
  daysOfTheWeek: string[] = ['Sunday', 'Monday', 'Thuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  dayName: string = this.daysOfTheWeek[this.date.getDay()]
  stringMonth: string = this.months[this.date.getMonth()]
  hours: number = this.date.getHours();
  minutes: number = this.date.getMinutes();
  dayMonth: number = this.date.getDate();
  year: number = this.date.getFullYear();
  periodTime:string = '';
  zoneTime: string = '';
  degressCelsius: number = 0;
  FloorDegress: number = 0;
  humidity: number = 0;
  windSpeed: number = 0;
  pressure: number = 0;
  visibility: number = 0;
  seaLevel: number = 0;
  groundLevel: number = 0;
  searchValue: string = '';
  noCity: boolean = true;
  showWeather:boolean = false;
  stateName: string = '';
  newMinuntes:string = '';
  zeroMinutes : number = 0;
  states = {
    Drizzle: false,
    Rain: false,
    Thunderstorm: false, 
    Snow: false,
    Atmosphere: false,
    Clouds: false,
    Sunny:false
  };

  setZoneTime(){
    if(this.hours >= 0 && this.hours <= 12){
      this.periodTime = 'AM';
    }else{
      this.periodTime = 'PM';
    }
    if (this.hours % 12 === 0) {
      this.hours = 12;
    } else {
      this.hours = this.hours % 12;
    }
    if(this.minutes >= 0 && this.minutes <= 9){
      this.minutes = this.zeroMinutes + this.minutes;
    }else{
      this.minutes
    }
  } 

  constructor(private weatherService: WeatherService) {}
  ngOnInit(): void {
    this.getTheWeather();
  }

  getTheWeather(){
    this.weatherService.getWeather(this.cityName).subscribe(
      (data) => {
        this.weatherData = data;
        this.setZoneTime();
        this.cityName = data.name;
        this.countryName = data.sys.country;
        this.idWeather = data.weather[0].id;
        this.degressCelsius = data.main.temp;
        this.FloorDegress = Math.floor(this.degressCelsius);
        this.humidity = data.main.humidity;
        this.windSpeed = data.wind.speed;
        this.pressure = data.main.pressure;
        this.visibility = data.visibility;
        this.seaLevel = data.main.sea_level;
        this.groundLevel = data.main.grnd_level;
        this.stateName = data.weather[0].main;
        this.updateStates();
        console.log(this.weatherData = data);
        
      },
      (error: any) => { 
        console.log('Error fetching weather data:', error);
      }
    );
  }

  searchCity(){
    if (this.searchValue.trim()) {
      this.noCity = false;
      this.cityName = this.searchValue.trim();
      this.getTheWeather();
    }
  }

  updateStates(): void {
    if (this.idWeather >= 200 && this.idWeather < 232) {
      this.states.Thunderstorm = true;
    }
    if (this.idWeather >= 300 && this.idWeather < 321) {
      this.states.Drizzle = true;
    }
    if (this.idWeather >= 500 && this.idWeather < 531) {
      this.states.Rain = true;
    }
    if (this.idWeather >= 600 && this.idWeather < 622) {
      this.states.Snow = true;
    }
    if (this.idWeather >= 701 && this.idWeather < 781  ) {
      this.states.Atmosphere = true;
    }
    if (this.idWeather >= 701 && this.idWeather < 781  ) {
      this.states.Atmosphere = true;
    }
    if (this.idWeather == 800 ) {
      this.states.Sunny = true;
    }
    if (this.idWeather >= 801 && this.idWeather < 805) {
      this.states.Clouds = true;
    }
  }
  
}
