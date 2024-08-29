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
  forecastData:any;

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

  threeH: number = 0;
  sixH: number = 0;
  nineH: number = 0;
  forecastThree: number = 0;
  forecastSix: number = 0;
  forecastNine: number = 0;
  threeDegreess:number = 0; 
  sixDegreess: number = 0;
  nineDegreess: number = 0;


  states = {
    Drizzle: false,
    Rain: false,
    Thunderstorm: false, 
    Snow: false,
    Atmosphere: false,
    Clouds: false,
    Sunny:false
  };

  
  constructor(private weatherService: WeatherService) {}
  ngOnInit(): void {
    this.getTheWeather();
    this.getTheForecast();
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
    }else if (this.searchValue === ''){
      this.noCity = true;
    } 
  }
  
  getTheForecast(){
    this.weatherService.getForecastWeather(this.cityName).subscribe((data) =>{
      this.forecastData = data;
      console.log(this.forecastData);
      this.forecastThree = data.list[0].weather[0].id;
      this.forecastSix= data.list[1].weather[0].id;
      this.forecastNine = data.list[2].weather[0].id;
      this.getFutureHours();
      this.updateStates();
      this.threeDegreess = data.list[0].main.temp;
      this.sixDegreess = data.list[1].main.temp;
      this.nineDegreess = data.list[2].main.temp;

      this.threeDegreess = Math.floor(this.threeDegreess);
      this.sixDegreess = Math.floor(this.sixDegreess);
      this.nineDegreess = Math.floor(this.nineDegreess);
    },
    (error: any) => { 
      console.log('Error fetching forecast data:', error);
    })
  }

  updateStates(): void {
    if (this.idWeather >= 200 && this.idWeather < 232) {
      this.states.Thunderstorm = true;
      this.states.Drizzle = false;
      this.states.Thunderstorm = false;
      this.states.Rain = false;
      this.states.Snow = false;
      this.states.Atmosphere = false;
      this.states.Sunny = false;
      this.states.Clouds = false;
    }
    if (this.idWeather >= 300 && this.idWeather < 321) {
      this.states.Drizzle = true;
      this.states.Thunderstorm = false;
      this.states.Rain = false;
      this.states.Snow = false;
      this.states.Atmosphere = false;
      this.states.Sunny = false;
      this.states.Clouds = false;
    }
    if (this.idWeather >= 500 && this.idWeather < 531) {
      this.states.Rain = true;
      this.states.Thunderstorm = false;
      this.states.Drizzle = false;
      this.states.Snow = false;
      this.states.Atmosphere = false;
      this.states.Sunny = false;
      this.states.Clouds = false;
    }
    if (this.idWeather >= 600 && this.idWeather < 622) {
      this.states.Snow = true;
      this.states.Thunderstorm = false;
      this.states.Drizzle = false;
      this.states.Rain = false;
      this.states.Atmosphere = false;
      this.states.Sunny = false;
      this.states.Clouds = false;
    }
    if (this.idWeather >= 701&& this.idWeather < 781  ) {
      this.states.Atmosphere = true;
      this.states.Thunderstorm = false;
      this.states.Drizzle = false;
      this.states.Rain = false;
      this.states.Snow = false;
      this.states.Clouds = false;
    }
    if (this.idWeather == 800 ) {
      this.states.Sunny = true;
      this.states.Thunderstorm = false;
      this.states.Drizzle = false;
      this.states.Rain = false;
      this.states.Snow = false;
      this.states.Atmosphere = false;
    }
    if (this.idWeather >= 801 && this.idWeather < 805) {
      this.states.Clouds = true;
      this.states.Sunny = false;
      this.states.Snow = false;
      this.states.Drizzle = false;
      this.states.Thunderstorm = false;
      this.states.Atmosphere = false;
    }
    if (this.forecastThree && this.forecastSix && this.forecastNine >= 200 && this.forecastThree && this.forecastSix && this.forecastNine < 232) {
      this.states.Thunderstorm = true;
      this.states.Drizzle = false;
      this.states.Thunderstorm = false;
      this.states.Rain = false;
      this.states.Snow = false;
      this.states.Atmosphere = false;
      this.states.Sunny = false;
      this.states.Clouds = false;
    }
    if (this.forecastThree && this.forecastSix && this.forecastNine >= 300 && this.forecastThree && this.forecastSix && this.forecastNine < 321) {
      this.states.Drizzle = true;
      this.states.Thunderstorm = false;
      this.states.Rain = false;
      this.states.Snow = false;
      this.states.Atmosphere = false;
      this.states.Sunny = false;
      this.states.Clouds = false;
    }
    if (this.forecastThree && this.forecastSix && this.forecastNine >= 500 && this.idWeather < 531) {
      this.states.Rain = true;
      this.states.Thunderstorm = false;
      this.states.Drizzle = false;
      this.states.Snow = false;
      this.states.Atmosphere = false;
      this.states.Sunny = false;
      this.states.Clouds = false;
    }
    if (this.forecastThree && this.forecastSix && this.forecastNine >= 600 && this.forecastThree && this.forecastSix && this.forecastNine < 622) {
      this.states.Snow = true;
      this.states.Thunderstorm = false;
      this.states.Drizzle = false;
      this.states.Rain = false;
      this.states.Atmosphere = false;
      this.states.Sunny = false;
      this.states.Clouds = false;
    }
    if (this.forecastThree && this.forecastSix && this.forecastNine >= 701&& this.forecastThree && this.forecastSix && this.forecastNine < 781  ) {
      this.states.Atmosphere = true;
      this.states.Thunderstorm = false;
      this.states.Drizzle = false;
      this.states.Rain = false;
      this.states.Snow = false;
      this.states.Clouds = false;
    }
    if (this.forecastThree && this.forecastSix && this.forecastNine == 800 ) {
      this.states.Sunny = true;
      this.states.Thunderstorm = false;
      this.states.Drizzle = false;
      this.states.Rain = false;
      this.states.Snow = false;
      this.states.Atmosphere = false;
    }
    if (this.forecastThree && this.forecastSix && this.forecastNine >= 801 && this.forecastThree && this.forecastSix && this.forecastNine < 805) {
      this.states.Clouds = true;
      this.states.Sunny = false;
      this.states.Snow = false;
      this.states.Drizzle = false;
      this.states.Thunderstorm = false;
      this.states.Atmosphere = false;
    }
  }

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
  }

  getFutureHours(){
    this.threeH = this.date.getHours() + 3;
    this.sixH = this.date.getHours() + 6;
    this.nineH = this.date.getHours() + 9;
  }
}
